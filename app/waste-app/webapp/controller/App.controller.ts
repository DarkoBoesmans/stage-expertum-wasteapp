import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import Log from "sap/base/Log";

export default class App extends Controller {
    // #region ***  Lifecycle Methods              ***********
    public onInit(): void {
        const oComponent = this.getOwnerComponent();
        if (oComponent) {
            const oRouter = (oComponent as UIComponent).getRouter();
            if (oRouter) {
                Log.info("Initializing router");
                oRouter.initialize();
            } else {
                Log.error("Router not found");
            }
        } else {
            Log.error("Owner component not found");
        }
    }
    // #endregion
}