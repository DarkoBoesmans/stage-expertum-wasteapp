import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import MessageToast from "sap/m/MessageToast";
import EventBus from "sap/ui/core/EventBus";
import View from "sap/ui/core/mvc/View";
import AttachmentService from "./AttachmentService";

export default class ReportService {
    // #region ***  Properties & Constructor         ***********
    private _reportModel: JSONModel;
    private _view: View;
    private _oDataModel: ODataModel;

    constructor(reportModel: JSONModel, view: View, oDataModel: ODataModel) {
        this._reportModel = reportModel;
        this._view = view;
        this._oDataModel = oDataModel;
    }
    // #endregion

    // #region ***  Data Loading Methods             ***********
    public loadReportData(reportId: string): Promise<void> {
        if (!reportId || reportId === "new") {
            console.log("Not attempting to load data for new report");
            return Promise.resolve();
        }

        if (this._view) {
            this._view.setBusy(true);
        }

        if (!this._oDataModel) {
            return this._loadReportDataWithFetch(reportId);
        }

        try {
            const sPath = `/DumpingReports/${reportId}`;
            const oContextBinding = this._oDataModel.bindContext(sPath, undefined, {
                $expand: "status,wasteType,areaType,locationType,casePriority,attachments"
            });

            return oContextBinding.requestObject()
                .then((oData) => {
                    if (!oData) {
                        MessageToast.show("No data found for this report");
                    } else {
                        const currentEditMode = this._reportModel.getProperty("/editMode");
                        oData.editMode = currentEditMode || false;
                        this._reportModel.setData(oData);
                    }

                    if (this._view) {
                        this._view.setBusy(false);
                    }
                })
                .catch((error) => {
                    MessageToast.show("Error loading report data");
                    console.error("Error:", error);
                    if (this._view) {
                        this._view.setBusy(false);
                    }
                    throw error;
                });
        } catch (error) {
            MessageToast.show("Error processing request");
            console.error("Error:", error);
            if (this._view) {
                this._view.setBusy(false);
            }
            return Promise.reject(error);
        }
    }

    public handleCancelNewReport(): void {
        this._reportModel.setProperty("/editMode", false);
        this._reportModel.setProperty("/isNew", false);

        const oEventBus = EventBus.getInstance();
        oEventBus.publish("wasteApp", "reportCanceled", {});
    }

    private _loadReportDataWithFetch(reportId: string): Promise<void> {
        this._view?.setBusy(true);

        return fetch(`/waste/DumpingReports/${reportId}?$expand=status,wasteType,areaType,attachments`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error loading report: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                const currentEditMode = this._reportModel.getProperty("/editMode");
                data.editMode = currentEditMode || false;
                this._reportModel.setData(data);
                this._view?.setBusy(false);
            })
            .catch(error => {
                console.error("Error loading report:", error);
                MessageToast.show("Error loading report data");
                this._view?.setBusy(false);
                throw error;
            });
    }
    // #endregion

    // #region ***  Report Operations                ***********
    public createNewReport(): void {
        const emptyReport = {
            ID: null,
            address: "",
            location: "",
            status_ID: 1,
            wasteType_ID: null,
            areaType_ID: null,
            locationType_ID: null,
            casePriority_ID: 3,
            extraInfo: "",
            additionalWasteDetails: "",
            email: "",
            notifyWhenResolved: false,
            createdAt: new Date().toISOString(),
            editMode: true,
            isNew: true
        };

        this._reportModel.setData(emptyReport);
    }

    public async saveReport(reportId: string | null): Promise<string | null> {
        try {
            this._view.setBusy(true);

            const reportData = this._reportModel.getData();
            const isNewReport = reportData.isNew;

            const payload: Record<string, any> = {};

            if (reportData.address !== undefined) payload.address = reportData.address;
            if (reportData.location !== undefined) payload.location = reportData.location;
            if (reportData.email !== undefined) payload.email = reportData.email;
            if (reportData.notifyWhenResolved !== undefined) payload.notifyWhenResolved = reportData.notifyWhenResolved;
            if (reportData.extraInfo !== undefined) payload.extraInfo = reportData.extraInfo;
            if (reportData.additionalWasteDetails !== undefined) payload.additionalWasteDetails = reportData.additionalWasteDetails;
            if (reportData.status_ID !== undefined) payload.status_ID = reportData.status_ID;
            if (reportData.wasteType_ID !== undefined) payload.wasteType_ID = reportData.wasteType_ID;
            if (reportData.areaType_ID !== undefined) payload.areaType_ID = reportData.areaType_ID;
            if (reportData.locationType_ID !== undefined) payload.locationType_ID = reportData.locationType_ID;
            if (reportData.casePriority_ID !== undefined) payload.casePriority_ID = reportData.casePriority_ID;

            let response;
            let newReportId = reportId;

            if (isNewReport) {
                response = await fetch(`/waste/DumpingReports`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            } else {
                response = await fetch(`/waste/DumpingReports/${reportId}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                });
            }

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            if (isNewReport) {
                const newReport = await response.json();
                newReportId = newReport.ID;
            }

            this._reportModel.setProperty("/editMode", false);
            this._reportModel.setProperty("/isNew", false);

            // Add the attachment handling code here:
            const pendingAttachment = this._reportModel.getProperty("/pendingAttachment");

            if (pendingAttachment && !pendingAttachment.isUploaded && newReportId) {
                // Create an attachment service to handle the upload
                const attachmentService = new AttachmentService(
                    this._reportModel,
                    this._view,
                    this._loadReportDataWithFetch.bind(this)
                );

                // Create a FileList-like object with our pending file
                const fileList = {
                    0: pendingAttachment.file,
                    length: 1,
                    item: (index: number) => index === 0 ? pendingAttachment.file : null
                } as unknown as FileList;

                // Upload the pending attachment to the newly created report
                await attachmentService.uploadFile(fileList, newReportId, false);

                // Mark the attachment as uploaded and clear the preview URL
                this._reportModel.setProperty("/pendingAttachment/isUploaded", true);
                this._reportModel.setProperty("/attachmentPreviewUrl", null);
            }

            const oEventBus = EventBus.getInstance();
            oEventBus.publish("wasteApp", "reportUpdated", {
                reportId: newReportId,
                isNew: isNewReport
            });

            MessageToast.show(isNewReport ? "Nieuwe melding aangemaakt" : "Wijzigingen opgeslagen");
            return newReportId;
        } catch (error) {
            console.error("Error saving report:", error);
            MessageToast.show(`Fout: ${error instanceof Error ? error.message : "Onbekende fout"}`);
            return null;
        } finally {
            this._view.setBusy(false);
        }
    }

    public async deleteReport(reportId: string): Promise<boolean> {
        try {
            this._view?.setBusy(true);

            const response = await fetch(`/waste/DumpingReports/${reportId}`, {
                method: "DELETE"
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Error: ${response.status} - ${errorText}`);
            }

            // Publish event to notify that a report has been deleted
            const oEventBus = EventBus.getInstance();
            oEventBus.publish("wasteApp", "reportDeleted", {
                reportId: reportId
            });

            return true;
        } catch (error) {
            console.error("Error deleting report:", error);
            MessageToast.show(`Fout bij het verwijderen: ${error instanceof Error ? error.message : "Onbekende fout"}`);
            return false;
        } finally {
            this._view?.setBusy(false);
        }
    }
    // #endregion
}