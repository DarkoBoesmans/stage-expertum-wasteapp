using {managed} from '@sap/cds/common';
using {Attachments} from '@cap-js/attachments';

namespace ivago;

entity DumpingReports : managed {
    key ID                     : UUID;
        // Location information
        latitude               : Decimal(10, 7);
        longitude              : Decimal(10, 7);
        // Address components
        street                 : String(100);
        house_number           : String(20);
        postcode               : String(10);
        city                   : String(50);
        // Additional location info
        location_extra         : String(255);
        // Waste details
        additionalWasteDetails : String(255);
        // Contact & notification
        email                  : String(111);
        notifyWhenResolved     : Boolean default false;
        // Case management
        case_priority          : Integer;
        unique_user_id         : String(50);
        police_intervention    : Boolean default false;
        resp_org_execution     : String(50);
        foto_name              : String(50);
        // Associations
        status                 : Association to Status;
        wasteType              : Association to WasteTypes;
        areaType               : Association to AreaTypes;
        casePriority           : Association to CasePriority;
        locationType           : Association to LocationTypes;
        // Attachments
        attachments            : Composition of many Attachments;
}

entity Status : managed {
    key ID     : Integer;
        status : String(111);
}

entity WasteTypes : managed {
    key ID        : Integer;
        wasteType : String(111);
}

entity AreaTypes : managed {
    key ID       : Integer;
        areaType : String(111);
}

entity LocationTypes : managed {
    key ID           : Integer;
        locationType : String(111);
}

entity CasePriority : managed {
    key ID           : Integer;
        casePriority : String(50);
}
