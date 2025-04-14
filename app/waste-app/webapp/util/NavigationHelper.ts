import UIComponent from "sap/ui/core/UIComponent";
import Component from "../Component";
import Log from "sap/base/Log";

export default class NavigationHelper {
    private _component: Component;

    // #region ***  Constructor & Initialization        ***********
    constructor(component: Component) {
        this._component = component;
    }
    // #endregion

    // #region ***  Navigation Methods                  ***********
    public navigateToDetail(reportId: string): void {
        try {
            const oRouter = this._component.getRouter();
            oRouter.navTo("detail", {
                reportID: reportId
            });

            Log.info(`Navigatie naar detail voor report ID: ${reportId}`);
        } catch (error) {
            Log.error("Navigatie fout:", error as Error);
        }
    }

    public navigateToMaster(): void {
        try {
            const oRouter = this._component.getRouter();
            // SplitContainer heeft geen layout parameter nodig
            oRouter.navTo("master", {});

            Log.info("Navigatie naar master view");
        } catch (error) {
            Log.error("Navigatie fout:", error as Error);
        }
    }

    public navigateToNewReport(): void {
        try {
            const oRouter = this._component.getRouter();
            // SplitContainer heeft geen layout parameter nodig
            oRouter.navTo("detail", {
                reportID: "new"
            });

            Log.info("Navigatie naar nieuwe melding gestart");
        } catch (error) {
            Log.error("Navigatie fout:", error as Error);
        }
    }
    // #endregion

    // #region ***  Utility Methods                     ***********
    public isOnDetailPage(reportId: string): boolean {
        const oRouter = this._component.getRouter();
        const currentHash = oRouter.getHashChanger().getHash();
        return currentHash.includes(`/detail/${reportId}`);
    }
    // #endregion
}