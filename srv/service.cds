using {ivago as my} from '../db/schema';

service CatalogService @(path: '/waste') {
    // Main entity

    entity DumpingReports as projection on my.DumpingReports;
    // Reference data entities
    entity Status         as projection on my.Status;
    entity WasteTypes     as projection on my.WasteTypes;
    entity AreaTypes      as projection on my.AreaTypes;
    entity LocationTypes  as projection on my.LocationTypes;
    entity CasePriority   as projection on my.CasePriority;
}