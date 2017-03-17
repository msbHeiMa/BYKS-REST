/**
 * CREATE TABLE "CIGPROXY"."CIG_SCREEN_MAINTENANCE" (
"ID" VARCHAR2(36 BYTE) NOT NULL ,
"AGGREGATE_DATA" NUMBER(8) NULL ,
"ONLINE_USER" NUMBER(4) NULL ,
"ACCESS_TO_AUTHORITY" NUMBER(2) NULL ,
"ACCESS_TO_APPLICATIONS" NUMBER(3) NULL ,
"TWO_DIMENSIONAL" NUMBER(3) NULL ,
"THREE_DIMENSIONAL" NUMBER(3) NULL ,
"POI_NOTE_POINT" NUMBER(5) NULL ,
"SURFACE_COMPONENTS" NUMBER(4) NULL ,
"POPULATION" NUMBER(6) NULL ,
"LEGAL_PERSON" NUMBER(5) NULL ,
"DOCUMENTS" NUMBER(4) NULL ,
"ADDRESS_PLACE" NUMBER(4) NULL ,
"VIDEO_SURVEILLANCE" NUMBER(3) NULL ,
"SENSING_DATA" NUMBER(6) NULL ,
"MONITORING_DATA" NUMBER(8) NULL ,
"CORPORATE_INFORMATION" NUMBER(4) NULL ,
"LIVELIHOOD_INFORMATION" NUMBER(5) NULL ,
"CAMERA" NUMBER(4) NULL ,
"SENSOR" NUMBER(6) NULL ,
"WATER_RESOURCES_INFO" NUMBER(8) NULL ,
"TRAVEL_INFO" NUMBER(8) NULL ,
"METEOROLOGICAL_INFO" NUMBER(8) NULL ,
"CREATE_DATE" DATE NULL ,
"CREATE_USER" VARCHAR2(50 BYTE) NULL ,
"UPDATE_DATE" DATE NULL ,
"UPDATE_USER" VARCHAR2(50 BYTE) NULL 
 */

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
        //    CREATE TABLE "CIGPROXY"."CIG_SCREEN_MAINTENANCE" (
            "id": "ID",
            "aggregateData": "AGGREGATE_DATA",
            "onlineUser": "ONLINE_USER",
            "accessToAuthority": "ACCESS_TO_AUTHORITY",
            "accessToApplications": "ACCESS_TO_APPLICATIONS",
            "twoDimensional": "TWO_DIMENSIONAL",
            "threeDimensional": "THREE_DIMENSIONAL",
            "poiNotePoint": "POI_NOTE_POINT",
            "sufaceComponents": "SURFACE_COMPONENTS",
            "population": "POPULATION",
            "legalPerson": "LEGAL_PERSON",
            "documents": "DOCUMENTS",
            "addressPlace": "ADDRESS_PLACE",
            "videoSurveillance": "VIDEO_SURVEILLANCE",
            "sensingData": "SENSING_DATA",
            "monitoringData": "MONITORING_DATA",
            "corporateInfor": "CORPORATE_INFORMATION",
            "liveliHoodInfo": "LIVELIHOOD_INFORMATION",
            "camera": "CAMERA",
            "sensor": "SENSOR",
            "waterResourcesInfo": "WATER_RESOURCES_INFO",
            "travelInfo": "TRAVEL_INFO",
            "meteorologicalInfo": "METEOROLOGICAL_INFO",
            "wfOfficeNum":"WF_OFFICE_NUM",
            "wfServiceNum":"WF_SERVICE_NUM",
            "createDate": "CREATE_DATE"
        };
    },
    getTable: function () {
        return "DP_YW_CIGAGGREGATEDDATA";
    },
    getPageWithBId: function (filter, order, offset, limit, callback) {
        var self = this;
        this.getPage(filter, order, offset, limit, function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    },
}, baseAccess.prototype);
module.exports = tableAccess;