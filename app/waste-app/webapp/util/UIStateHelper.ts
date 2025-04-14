import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import VBox from "sap/m/VBox";
import Label from "sap/m/Label";
import Controller from "sap/ui/core/mvc/Controller";

export default class UIStateHelper {
    // #region ***  Properties & Constructor          ***********
    private _controller: Controller;
    private _reportModel: JSONModel;

    constructor(controller: Controller, reportModel: JSONModel) {
        this._controller = controller;
        this._reportModel = reportModel;
    }
    // #endregion

    // #region ***  Edit Mode Methods                ***********
    public enableEditMode(): void {
        this._reportModel.setProperty("/editMode", true);
        this._reportModel.refresh(true);
    }

    public disableEditMode(): void {
        this._reportModel.setProperty("/editMode", false);
        this._reportModel.refresh(true);
    }
    // #endregion

    // #region ***  UI Control Methods               ***********
    public showUploadControls(isReplacing: boolean): void {
        const uploadVBox = this._controller.byId("newImageUploadVBox") as VBox;
        if (uploadVBox) {
            const uploadLabel = this._controller.byId("uploadTitleLabel") as Label;
            if (uploadLabel) {
                uploadLabel.setText(isReplacing ? "Foto vervangen:" : "Foto uploaden:");
            }

            uploadVBox.setVisible(true);
        }
    }

    public hideUploadControls(): void {
        const uploadVBox = this._controller.byId("newImageUploadVBox") as VBox;
        if (uploadVBox) {
            uploadVBox.setVisible(false);
        }
    }
    // #endregion
}