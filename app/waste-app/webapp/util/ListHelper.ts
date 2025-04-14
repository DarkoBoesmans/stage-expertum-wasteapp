import List from "sap/m/List";
import ObjectListItem from "sap/m/ObjectListItem";
import Log from "sap/base/Log";

export default class ListHelper {
    // #region ***  Item Retrieval Methods          ***********
    public findItemById(oList: List, reportId: string): ObjectListItem | null {
        try {
            const aItems = oList.getItems();
            Log.info(`Zoeken naar item met ID ${reportId} in lijst met ${aItems.length} items`);

            for (let i = 0; i < aItems.length; i++) {
                const oItem = aItems[i] as ObjectListItem;
                const oBindingContext = oItem.getBindingContext();

                if (oBindingContext) {
                    const itemId = oBindingContext.getProperty("ID");

                    if (itemId === reportId) {
                        Log.info(`Item gevonden voor ID ${reportId}`);
                        return oItem;
                    }
                }
            }

            Log.warning(`Geen item gevonden met ID ${reportId}`);
            return null;
        } catch (error) {
            Log.error("Fout bij zoeken item op ID", error as Error);
            return null;
        }
    }

    public getFirstItem(oList: List): ObjectListItem | null {
        try {
            const aItems = oList.getItems();
            if (aItems.length > 0) {
                return aItems[0] as ObjectListItem;
            }
            return null;
        } catch (error) {
            Log.error("Fout bij ophalen eerste item", error as Error);
            return null;
        }
    }
    // #endregion

    // #region ***  Item Manipulation Methods       ***********
    public selectItemVisually(oList: List, oItem: ObjectListItem): void {
        try {
            oList.setSelectedItem(oItem);
            Log.info("Item visueel geselecteerd");
        } catch (error) {
            Log.error("Fout bij visuele selectie", error as Error);
        }
    }
    // #endregion

    // #region ***  List Operations                 ***********
    public refreshList(oList: List): void {
        try {
            const oBinding = oList.getBinding("items");
            if (oBinding) {
                oBinding.refresh();
                Log.info("Lijst binding refreshed");
            }
        } catch (error) {
            Log.error("Fout bij vernieuwen lijst", error as Error);
        }
    }
    // #endregion
}