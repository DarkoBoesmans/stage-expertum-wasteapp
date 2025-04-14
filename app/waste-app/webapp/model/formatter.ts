import { ValueState } from "sap/ui/core/library";
import Log from "sap/base/Log";

export default {
    // #region ***  Status Formatters                 ***********
    statusState: function (statusID: any): ValueState {
        Log.info("statusState called with: " + statusID + " (type: " + typeof statusID + ")");

        const status = typeof statusID === 'string' ? parseInt(statusID, 10) : statusID;

        switch (status) {
            case 1:
                return ValueState.Warning;
            case 2:
                return ValueState.Information;
            case 3:
                return ValueState.Success;
            default:
                Log.warning("Unknown status ID: " + statusID);
                return ValueState.None;
        }
    },

    statusText: function (text: string): string {
        return text || "";
    },
    // #endregion

    // #region ***  Date Formatters                   ***********
    formatDate: function (date: any): string {
        if (!date) {
            return "Geen datum";
        }

        try {
            const oDate = new Date(date);
            if (isNaN(oDate.getTime())) {
                Log.warning("Invalid date: " + date);
                return "Ongeldige datum";
            }

            return oDate.toLocaleString('nl-BE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch (e) {
            Log.error("Error formatting date: " + e);
            return "Datum fout";
        }
    },

    formatDateOnly: function (date: string | Date | null | undefined): string {
        if (!date) {
            return "";
        }

        try {
            const oDate = typeof date === 'string' ? new Date(date) : date;
            if (isNaN(oDate.getTime())) {
                Log.warning("Invalid date: " + date);
                return "";
            }

            const options: Intl.DateTimeFormatOptions = {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            };

            return oDate.toLocaleDateString('nl-BE', options);
        } catch (e) {
            Log.error("Error formatting date: " + e);
            return "";
        }
    },

    formatTimeOnly: function (date: string | Date | null | undefined): string {
        if (!date) {
            return "";
        }

        try {
            const oDate = typeof date === 'string' ? new Date(date) : date;
            if (isNaN(oDate.getTime())) {
                Log.warning("Invalid time: " + date);
                return "";
            }

            const options: Intl.DateTimeFormatOptions = {
                hour: '2-digit',
                minute: '2-digit'
            };

            return oDate.toLocaleTimeString('nl-BE', options);
        } catch (e) {
            Log.error("Error formatting time: " + e);
            return "";
        }
    },

    // Voeg deze formatter toe om een volledig adres string te maken
    formatAddress(street: string, houseNumber: string, postcode: string, city: string): string {
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
    },

    // Formatter voor coördinaten
    formatCoordinates(latitude: string, longitude: string): string {
        if (latitude && longitude) {
            return `${latitude}, ${longitude}`;
        }
        return "Onbekende locatie";
    }
    // #endregion
};