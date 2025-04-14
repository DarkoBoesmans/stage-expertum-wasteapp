import UIComponent from "sap/ui/core/UIComponent";
import * as models from "./model/models";  // Aangepaste import
import Device from "sap/ui/Device";

/**
 * @namespace wasteapp
 */
export default class Component extends UIComponent {
    public static metadata = {
        manifest: "json"
    };

    private contentDensityClass: string;

    public init(): void {
        // call the base component's init function
        super.init();

        // set the device model
        this.setModel(models.createDeviceModel(), "device");

        // create the views based on the url/hash
        this.getRouter().initialize();
    }

    /**
     * Gets content density class based on the device type.
     *
     * @returns Content density class.
     */
    public getContentDensityClass(): string {
        if (this.contentDensityClass === undefined) {
            if (document.body.classList.contains("sapUiSizeCozy") || document.body.classList.contains("sapUiSizeCompact")) {
                this.contentDensityClass = "";
            } else if (!Device.support.touch) {
                this.contentDensityClass = "sapUiSizeCompact";
            } else {
                this.contentDensityClass = "sapUiSizeCozy";
            }
        }
        return this.contentDensityClass;
    }
}