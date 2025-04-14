import Controller from "sap/ui/core/mvc/Controller";
import formatter from "../model/formatter";
import MessageToast from "sap/m/MessageToast";
import Event from "sap/ui/base/Event";
import ObjectListItem from "sap/m/ObjectListItem";
import UIComponent from "sap/ui/core/UIComponent";
import List from "sap/m/List";
import Component from "../Component";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import EventBus from "sap/ui/core/EventBus";
import NavigationHelper from "../util/NavigationHelper";
import ListHelper from "../util/ListHelper";
import Filter from "sap/ui/model/Filter";
import FilterOperator from "sap/ui/model/FilterOperator";
import GroupHeaderListItem from "sap/m/GroupHeaderListItem";
import { SearchField$SearchEvent } from "sap/m/SearchField";
import ListBinding from "sap/ui/model/ListBinding";

interface DetailRouteArguments {
    reportID: string;
    layout: string;
}

interface SearchField$LiveChangeEventParameters {
    newValue: string;
    id: string;
}

interface SearchField$LiveChangeEvent extends Event {
    getParameter<T extends keyof SearchField$LiveChangeEventParameters>(name: T): SearchField$LiveChangeEventParameters[T];
    getParameters(): SearchField$LiveChangeEventParameters;
}

export default class Master extends Controller {
    // #region ***  Properties                      ***********
    public formatter = formatter;
    private _initialLoadDone = false;
    private _pendingReportId: string | null = null;
    private _listBindingAttached = false;

    private _navigationHelper: NavigationHelper;
    private _listHelper: ListHelper;
    // #endregion

    // #region ***  Init                    ***********
    public onInit(): void {
        console.log("Master view initialized");

        const oComponent = this.getOwnerComponent() as Component;
        this._navigationHelper = new NavigationHelper(oComponent);
        this._listHelper = new ListHelper();

        this._initRouting();
        this._setupEventBus();
    }

    private _initRouting(): void {
        const oComponent = this.getOwnerComponent();
        if (oComponent) {
            const oRouter = (oComponent as UIComponent).getRouter();
            if (oRouter) {
                oRouter.getRoute("master")?.attachPatternMatched(this.onRouteMatched, this);
                oRouter.getRoute("detail")?.attachPatternMatched(this.onRouteMatched, this);
            } else {
                console.error("Router niet gevonden in component");
            }
        } else {
            console.error("Component niet gevonden");
        }
    }

    private _setupEventBus(): void {
        const oEventBus = EventBus.getInstance();
        oEventBus.subscribe("wasteApp", "reportUpdated", this.onReportUpdated, this);
        oEventBus.subscribe("wasteApp", "reportDeleted", this.onReportDeleted, this);
    }
    // #endregion

    // #region ***  Routes                  ***********
    private onRouteMatched(oEvent: Route$PatternMatchedEvent): void {
        try {
            this._listBindingAttached = false;

            const sRouteName = oEvent.getParameter("name");
            const oArguments = oEvent.getParameter("arguments") as DetailRouteArguments;

            if (sRouteName === "master" && !this._initialLoadDone) {
                this._handleFirstVisit();
            }
            else if (sRouteName === "detail" && oArguments && oArguments.reportID) {
                this._handleDetailRoute(oArguments.reportID);
            }
        } catch (error) {
            console.error("Error in route handling:", error as Error);
        }
    }

    private _handleFirstVisit(): void {
        this._initialLoadDone = true;

        setTimeout(() => this._selectFirstItemVisuallyOnly(), 300);
    }

    private _handleDetailRoute(reportId: string): void {
        this._pendingReportId = reportId;
        setTimeout(() => this._waitForListAndSelectItem(), 100);
    }

    private _waitForListAndSelectItem(): void {
        try {
            const reportId = this._pendingReportId;
            if (!reportId) {
                return;
            }

            const oList = this.byId("reportsList") as List;
            if (!oList) {
                setTimeout(() => this._waitForListAndSelectItem(), 300);
                return;
            }

            const aItems = oList.getItems();
            if (aItems.length > 0) {
                this._selectItemById(reportId);
                this._pendingReportId = null;
                return;
            }

            const oBinding = oList.getBinding("items");
            if (!oBinding) {
                setTimeout(() => this._waitForListAndSelectItem(), 300);
                return;
            }

            if (!this._listBindingAttached) {
                oBinding.attachEventOnce("dataReceived", () => {
                    const storedReportId = this._pendingReportId;
                    if (storedReportId) {
                        setTimeout(() => {
                            this._selectItemById(storedReportId);
                            this._pendingReportId = null;
                        }, 150);
                    }
                });

                this._listBindingAttached = true;
            }
        } catch (error) {
            this._listBindingAttached = false;
        }
    }

    private _selectFirstItemVisuallyOnly(): void {
        const oList = this.byId("reportsList") as List;
        if (!oList) return;

        try {
            const oBinding = oList.getBinding("items") as ListBinding;
            if (!oBinding) {
                console.error("Binding niet gevonden");
                return;
            }

            if (oBinding.isA("sap.ui.model.odata.v4.ODataListBinding")) {
                console.log("OData V4 binding gedetecteerd, wachten op data...");

                if (!oBinding.getContexts().length) {
                    oBinding.attachEventOnce("dataReceived", () => {
                        setTimeout(() => this._findAndSelectNewestItem(oList), 100);
                    });
                } else {
                    this._findAndSelectNewestItem(oList);
                }
            } else {
                this._findAndSelectNewestItem(oList);
            }
        } catch (error) {
            console.error("Fout bij het selecteren van de meest recente melding:", error as Error);
        }
    }

    private _findAndSelectNewestItem(oList: List): void {
        try {
            const aItems = oList.getItems();

            const aReportItems = aItems.filter(item => item instanceof ObjectListItem);

            if (aReportItems.length === 0) {
                console.warn("Geen melding-items gevonden in de lijst");
                return;
            }

            let oNewestItem = aReportItems[0] as ObjectListItem;
            let newestDate = new Date(0);

            aReportItems.forEach(item => {
                const oContext = item.getBindingContext();
                if (oContext) {
                    const createdAt = oContext.getProperty("createdAt");
                    if (createdAt) {
                        const itemDate = new Date(createdAt);
                        if (itemDate > newestDate) {
                            newestDate = itemDate;
                            oNewestItem = item as ObjectListItem;
                        }
                    }
                }
            });

            if (oNewestItem) {
                this._listHelper.selectItemVisually(oList, oNewestItem);

                const oContext = oNewestItem.getBindingContext();
                if (oContext) {
                    const reportId = oContext.getProperty("ID");
                    if (reportId) {
                        this._navigationHelper.navigateToDetail(reportId);
                    }
                }
            }
        } catch (error) {
            console.error("Fout bij het zoeken van het meest recente item:", error as Error);
        }
    }

    private _selectItemById(reportId: string): void {
        const oList = this.byId("reportsList") as List;
        if (!oList) {
            return;
        }

        const oItem = this._listHelper.findItemById(oList, reportId);
        if (oItem) {
            this._listHelper.selectItemVisually(oList, oItem);

            if (!this._navigationHelper.isOnDetailPage(reportId)) {
                this._navigationHelper.navigateToDetail(reportId);
            }
        }
    }
    // #endregion

    // #region ***  EventBus Handlers       ***********
    public onReportUpdated(_sChannelId: string, _sEventId: string, oData: any): void {
        console.log("Report updated event received:", oData.reportId);

        const oList = this.byId("reportsList") as List;
        if (oList) {
            this._listHelper.refreshList(oList);
        }
    }

    public onReportDeleted(_sChannelId: string, _sEventId: string, oData: any): void {
        console.log("Report deleted event received:", oData.reportId);

        const oList = this.byId("reportsList") as List;
        if (oList) {
            const oBinding = oList.getBinding("items");
            if (oBinding) {
                oBinding.refresh();

                oBinding.attachEventOnce("dataReceived", () => {
                    setTimeout(() => this._selectFirstItemVisuallyOnly(), 300);
                });
            }
        }
    }

    private _executeSearch(searchQuery: string): void {
        try {
            console.log(`Zoekopdracht uitvoeren: "${searchQuery}"`);

            const oList = this.byId("reportsList") as List;
            if (!oList) {
                console.error("Lijst niet gevonden");
                return;
            }

            const oBinding = oList.getBinding("items") as ListBinding;
            if (!oBinding) {
                console.error("Binding niet gevonden voor lijst");
                return;
            }

            const aFilters = [];
            if (searchQuery && searchQuery.length > 0) {
                try {
                    // Update de filters voor de nieuwe adresstructuur
                    const startsWithFilters = [
                        // Adres componenten
                        new Filter("street", FilterOperator.StartsWith, searchQuery),
                        new Filter("house_number", FilterOperator.StartsWith, searchQuery),
                        new Filter("postcode", FilterOperator.StartsWith, searchQuery),
                        new Filter("city", FilterOperator.StartsWith, searchQuery),

                        // Overige velden
                        new Filter("additionalWasteDetails", FilterOperator.StartsWith, searchQuery),
                        new Filter("extraInfo", FilterOperator.StartsWith, searchQuery),
                        new Filter("email", FilterOperator.StartsWith, searchQuery),
                        new Filter("locationType/locationType", FilterOperator.StartsWith, searchQuery),
                        new Filter("casePriority/casePriority", FilterOperator.StartsWith, searchQuery)
                    ];

                    const allFilters = [...startsWithFilters];

                    aFilters.push(new Filter({
                        filters: allFilters,
                        and: false
                    }));

                } catch (filterError) {
                    console.error("Fout bij maken van filters:", filterError as Error);
                }
            }

            try {
                (oBinding as ListBinding).filter(aFilters);
            } catch (bindingError) {
                console.error("Fout bij toepassen van filter op binding:", bindingError as Error);
            }
        } catch (error) {
            console.error("Onverwachte fout bij zoeken:", error as Error);
        }
    }

    private _capitalizeFirstLetter(text: string): string {
        if (!text || text.length === 0) return text;
        return text.charAt(0).toUpperCase() + text.slice(1);
    }

    public onSearch(oEvent: SearchField$SearchEvent): void {
        try {
            const inputValue = (oEvent.getParameter("query") || "").trim();
            const sQuery = this._capitalizeFirstLetter(inputValue);

            this._executeSearch(sQuery);
        } catch (error) {
            console.error("Fout in onSearch:", error as Error);
        }
    }

    public onSearchLiveChange(oEvent: SearchField$LiveChangeEvent): void {
        try {
            const inputValue = oEvent.getParameter("newValue").trim();
            const sQuery = this._capitalizeFirstLetter(inputValue);

            this._executeSearch(sQuery);
        } catch (error) {
            console.error("Fout bij live zoeken:", error as Error);
        }
    }
    // #endregion

    // #region ***  Event Handlers          ***********
    public onListItemPress(oEvent: Event): void {
        const oItem = oEvent.getSource() as ObjectListItem;
        if (!oItem) {
            MessageToast.show("Error: No item selected");
            return;
        }

        const sAddress = oItem.getTitle() || "onbekend adres";
        const oBindingContext = oItem.getBindingContext();

        MessageToast.show("Item geselecteerd: " + sAddress);

        if (oBindingContext) {
            const reportId = oBindingContext.getProperty("ID");
            this._navigationHelper.navigateToDetail(reportId);
        }
    }

    public onNewReportPress(): void {
        this._navigationHelper.navigateToNewReport();
    }

    public getGroupHeader(oGroup: { key: string; count: number }): GroupHeaderListItem {
        return new GroupHeaderListItem({
            title: oGroup.key || "Onbekend afvaltype",
            upperCase: false,
            // Convert count to string to match the expected type
            count: String(oGroup.count)
        }).addStyleClass("sapMGHLIUpperCase");
    }
    // #endregion

    // #region ***  Lifecycle               ***********
    public onExit(): void {
        const oEventBus = EventBus.getInstance();
        oEventBus.unsubscribe("wasteApp", "reportUpdated", this.onReportUpdated, this);
        oEventBus.unsubscribe("wasteApp", "reportDeleted", this.onReportDeleted, this);
    }
    // #endregion
}