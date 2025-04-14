import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import FileUploader from "sap/ui/unified/FileUploader";
import View from "sap/ui/core/mvc/View";

export default class AttachmentService {
    // #region ***  Properties & Constructor          ***********
    private _reportModel: JSONModel;
    private _view: View;
    private _reloadFunction: (reportId: string) => Promise<void>;

    constructor(
        reportModel: JSONModel,
        view: View,
        reloadFunction: (reportId: string) => Promise<void>
    ) {
        this._reportModel = reportModel;
        this._view = view;
        this._reloadFunction = reloadFunction;
        console.log("[AttachmentService] Constructor initialized");
    }
    // #endregion

    // #region ***  Attachment Operations            ***********
    public async deleteAttachment(reportId: string): Promise<boolean> {
        const currentReport = this._reportModel.getData();
        const attachmentId = currentReport.attachments?.[0]?.ID;

        if (!attachmentId) {
            MessageToast.show("No attachment found to delete");
            return false;
        }

        try {
            const deleteUrl = `/waste/DumpingReports/${reportId}/attachments/${attachmentId}`;
            const response = await fetch(deleteUrl, { method: "DELETE" });

            if (response.ok) {
                MessageToast.show("Attachment deleted successfully");
                return true;
            } else {
                MessageToast.show("Error deleting attachment");
                return false;
            }
        } catch (error) {
            console.error("Exception during attachment deletion:", error);
            MessageToast.show("Error deleting attachment");
            return false;
        }
    }

    public async uploadFile(files: FileList, reportId: string, isReplacing: boolean): Promise<boolean> {
        try {
            if (!files || files.length === 0) {
                MessageToast.show("Geen bestand geselecteerd om te uploaden");
                return false;
            }

            const isNewReport = this._reportModel.getProperty("/isNew");

            if (isReplacing && !isNewReport) {
                const deleted = await this.deleteAttachment(reportId);
                if (!deleted) return false;
            }

            const imageFile = files[0];
            const originalFileName = imageFile.name;
            const fileExtension = originalFileName.substring(originalFileName.lastIndexOf('.'));

            if (isNewReport) {
                this._reportModel.setProperty("/pendingAttachment", {
                    file: imageFile,
                    filename: originalFileName,
                    mimeType: imageFile.type,
                    isUploaded: false
                });

                const reader = new FileReader();
                reader.onload = (e: ProgressEvent<FileReader>) => {
                    if (e.target) {
                        this._reportModel.setProperty("/attachmentPreviewUrl", e.target.result);
                    }
                };
                reader.readAsDataURL(imageFile);

                MessageToast.show("Bestand wordt geüpload na opslaan van de melding");
                return true;
            }

            const newFileName = `${reportId}${fileExtension}`;

            const attachmentData = {
                attachments: [{
                    filename: newFileName,
                    mimeType: imageFile.type
                }]
            };

            const metadataResponse = await fetch(`/waste/DumpingReports/${reportId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(attachmentData)
            });

            if (!metadataResponse.ok) {
                MessageToast.show("Error creating attachment metadata");
                return false;
            }

            await this._reloadFunction(reportId);

            const updatedReport = this._reportModel.getData();

            let attachment = updatedReport.attachments?.find(
                (a: { filename: string }) => a.filename === newFileName
            );

            if (!attachment?.ID && updatedReport.attachments && updatedReport.attachments.length > 0) {
                attachment = updatedReport.attachments[0];
            }

            if (!attachment?.ID) {
                MessageToast.show("Error finding attachment ID");
                console.error("Could not find attachment. Available attachments:", updatedReport.attachments);
                return false;
            }

            const contentResponse = await fetch(
                `/waste/DumpingReports/${reportId}/attachments/${attachment.ID}/content`,
                {
                    method: "PUT",
                    headers: { "Content-Type": imageFile.type },
                    body: imageFile
                }
            );

            if (!contentResponse.ok) {
                MessageToast.show("Error uploading file content");
                return false;
            }

            MessageToast.show("File uploaded successfully");
            return true;
        } catch (error) {
            console.error("Exception during file upload:", error);
            MessageToast.show("Error uploading file");
            return false;
        }
    }
    // #endregion
}