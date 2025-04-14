import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import MessageToast from "sap/m/MessageToast";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";
import UI5Event from "sap/ui/base/Event";
import Button from "sap/m/Button";
import RadioButtonGroup from "sap/m/RadioButtonGroup";
import formatter from '../model/formatter';
import Page from "sap/m/Page";
import ReportService from "../util/ReportService";
import AttachmentService from "../util/AttachmentService";
import UIStateHelper from "../util/UIStateHelper";
import Event from "sap/ui/base/Event";
import MessageBox from "sap/m/MessageBox";

interface DetailRouteArgs {
    reportID: string;
    layout: string;
}

interface FileUploadEvent {
    getParameter(name: string): any;
    getParameter(name: "files"): FileList;
}

interface AppComponent extends UIComponent {
    getHelper(): any;
}

export default class Detail extends Controller {
    // #region ***  Properties                      ***********
    private _reportId: string | null = null;
    private _reportModel: JSONModel = new JSONModel({});
    private files: FileList;
    private isReplacing: boolean = false;

    private _reportService: ReportService;
    private _attachmentService: AttachmentService;
    private _uiHelper: UIStateHelper;

    public formatter = formatter;
    // #endregion

    // #region ***  Lifecycle Methods              ***********
    public onInit(): void {
        this._reportModel = new JSONModel({ editMode: false });
        const view = this.getView();
        const oComponent = this.getOwnerComponent();

        if (!view || !oComponent) {
            console.error("Essential components missing during initialization");
            return;
        }

        view.setModel(this._reportModel, "report");

        const oDataModel = oComponent.getModel() as ODataModel;

        this._reportService = new ReportService(this._reportModel, view, oDataModel);

        this._attachmentService = new AttachmentService(
            this._reportModel,
            view,
            (reportId: string) => this._reportService.loadReportData(reportId)
        );

        this._uiHelper = new UIStateHelper(this, this._reportModel);

        const oRouter = (oComponent as UIComponent).getRouter();
        oRouter.getRoute("detail")?.attachPatternMatched(this._onRouteMatched.bind(this), this);
    }

    public onBeforeRendering(): void {
        const currentData = this._reportModel.getData();
        if (currentData && typeof currentData.editMode === 'undefined') {
            this._reportModel.setProperty("/editMode", false);
        }
    }
    // #endregion

    // #region ***  Navigation Handlers            ***********
    private _onRouteMatched(oEvent: Route$PatternMatchedEvent): void {
        const args = oEvent.getParameter("arguments") as DetailRouteArgs;
        this._reportId = args.reportID;

        if (this._reportId === "new") {
            this._reportService.createNewReport();
            this._updatePageTitle();
        } else if (this._reportId) {
            this._reportService.loadReportData(this._reportId);
        } else {
            MessageToast.show("Report ID is missing");
        }
    }

    public onNavBack(): void {
        const oRouter = UIComponent.getRouterFor(this);
        const oOwnerComponent = this.getOwnerComponent();

        if (oOwnerComponent) {
            const appComponent = oOwnerComponent as UIComponent;
            oRouter.navTo("master", {}, true);
        } else {
            oRouter.navTo("master", {}, true);
        }
    }
    // #endregion

    // #region ***  UI Helpers                     ***********
    private _updatePageTitle(): void {
        const view = this.getView();
        if (view) {
            const page = this.byId("detailPage") as Page;
            if (page) {
                const isNew = this._reportModel.getProperty("/isNew");
                const isEdit = this._reportModel.getProperty("/editMode");

                if (isNew) {
                    page.setTitle("Nieuwe melding aanmaken");
                } else if (isEdit) {
                    page.setTitle("Melding bewerken");
                } else {
                    page.setTitle("Melding details");
                }
            }
        }
    }

    public formatAddress(street: string, houseNumber: string, postcode: string, city: string): string {
        let address = "";
        
        if (street) {
            address += street;
            
            if (houseNumber) {
                address += " " + houseNumber;
            }
        }
        
        if (postcode || city) {
            if (address) {
                address += ", ";
            }
            
            if (postcode) {
                address += postcode;
                
                if (city) {
                    address += " ";
                }
            }
            
            if (city) {
                address += city;
            }
        }
        
        return address || "Onbekend adres";
    }
    // #endregion

    // #region ***  Attachment Handlers            ***********
    public onDeleteImage(): void {
        if (!this._reportId) {
            MessageToast.show("Report ID is missing");
            return;
        }

        this._attachmentService.deleteAttachment(this._reportId)
            .then(success => {
                if (success && this._reportId) {
                    this._reportService.loadReportData(this._reportId);
                }
            });
    }

    public onChangeImage(): void {
        this.isReplacing = true;
        this._uiHelper.showUploadControls(true);
    }

    public async onUpload(): Promise<void> {
        if (!this.files || this.files.length === 0 || !this._reportId) {
            MessageToast.show("Geen bestand geselecteerd of geen rapport ID");
            return;
        }

        const success = await this._attachmentService.uploadFile(
            this.files,
            this._reportId,
            this.isReplacing
        );

        if (success) {
            this._uiHelper.hideUploadControls();
            this.isReplacing = false;

            if (this._reportId) {
                this._reportService.loadReportData(this._reportId);
            }
        }
    }

    public onCancelUpload(): void {
        this._uiHelper.hideUploadControls();
        this.isReplacing = false;
    }

    public changeUploaderData(event: FileUploadEvent): void {
        const files = event.getParameter("files");

        if (files && files.length > 0) {
            (this.byId("uploadButton") as Button)?.setEnabled(true);
            this.files = files;
            this.onUpload();
        }
    }
    // #endregion

    // #region ***  Report Edit Handlers           ***********
    public onStatusChange(oEvent: UI5Event): void {
        const radioButtonGroup = oEvent.getSource() as RadioButtonGroup;
        const selectedIndex = radioButtonGroup.getSelectedIndex();
        const statusId = selectedIndex + 1;
        this._reportModel.setProperty("/status_ID", statusId);
    }

    public onEditReport(): void {
        this._uiHelper.enableEditMode();
    }

    public onCancelEdit(): void {
        this._uiHelper.disableEditMode();

        if (this._reportId) {
            this._reportService.loadReportData(this._reportId);
        }

        MessageToast.show("Wijzigingen geannuleerd");
    }

    public async onSaveReport(): Promise<void> {
        try {
            const newReportId = await this._reportService.saveReport(this._reportId);

            if (newReportId) {
                this._reportId = newReportId;

                if (this._reportModel.getProperty("/isNew")) {
                    const oRouter = UIComponent.getRouterFor(this);
                    oRouter.navTo("detail", {
                        reportID: this._reportId,
                        layout: "TwoColumnsMidExpanded"
                    }, true);
                }

                await this._reportService.loadReportData(this._reportId);
            }
        } catch (error) {
            MessageToast.show("Error saving report");
        }
    }

    public onDeleteReport(): void {
        if (!this._reportId || this._reportId === "new") {
            MessageToast.show("Kan deze melding niet verwijderen");
            return;
        }

        MessageBox.confirm(
            "Bent u zeker dat u deze melding permanent wilt verwijderen?",
            {
                title: "Melding verwijderen",
                actions: [MessageBox.Action.DELETE, MessageBox.Action.CANCEL],
                emphasizedAction: MessageBox.Action.DELETE,
                onClose: (action: string) => {
                    if (action === MessageBox.Action.DELETE) {
                        this._deleteReport();
                    }
                }
            }
        );
    }

    private async _deleteReport(): Promise<void> {
        if (!this._reportId) return;
    
        const success = await this._reportService.deleteReport(this._reportId);
    
        if (success) {
            MessageToast.show("Melding succesvol verwijderd");
    
            const oRouter = UIComponent.getRouterFor(this);
            const oComponent = this.getOwnerComponent() as AppComponent;
            
            if (!oComponent) {
                oRouter.navTo("master", {}, true);
                return;
            }
            
            const oHelper = oComponent.getHelper();
            const oNextUIState = oHelper.getNextUIState(0);
    
            oRouter.navTo("master", {
                layout: oNextUIState.layout
            }, true);
        }
    }
    // #endregion
}