// /*==============================================================*/
// /* Table: ZZ_EVENT                                          */
// /*==============================================================*/
// CREATE TABLE  ZZ_EVENT
//     ("ID" VARCHAR2(36) NOT NULL ENABLE,
//     "EVENT_NAME" VARCHAR2(100) NOT NULL ENABLE,
//     "EVENT_DES" VARCHAR2(4000) NOT NULL ENABLE,
//     "HAPPEN_DATE" DATE NOT NULL ENABLE,
//     "HAPPEN_PLACE" VARCHAR2(100) NOT NULL ENABLE,
//     "EVENT_SCALE" NUMBER(8, 0) NOT NULL ENABLE,
//     "LONGITUDE" NUMBER(10, 7),
//     "LATITUDE" NUMBER(10, 7),
//     "EVENT_CATEGORY" VARCHAR2(2) NOT NULL ENABLE,
//     "INVOLVED_COUNT" NUMBER(8, 0),
//     "IS_URGENT" VARCHAR2(2),
//     "IS_CRUX" VARCHAR2(2),
//     "REPORT_TOOL" VARCHAR2(2),
//     "STATUS" VARCHAR2(2),
//     "PROPLEM_ID" VARCHAR2(36),
//     "CREATE_USER" VARCHAR2(50),
//     "CREATE_DATE" DATE,
//     "UPDATE_USER" VARCHAR2(50),
//     "UPDATE_DATE" DATE,
//     CONSTRAINT "PK_ZZ_EVENT" PRIMARY KEY ("ID")
//     );


var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "eventName": "EVENT_NAME",
            "eventDesc": "EVENT_DES",
            "happenDate": "HAPPEN_DATE",
            "happenPlace": "HAPPEN_PLACE",
            "eventScale": "EVENT_SCALE",
            "longitude": "LONGITUDE",
            "latitude": "LATITUDE",
            "eventCategory": "EVENT_CATEGORY",
            "involvedCount": "INVOLVED_COUNT",
            "isUrgent": "IS_URGENT",
            "isCrux": "IS_CRUX",
            "reportTool": "REPORT_TOOL",
            "status": "STATUS",
            "problemId": "PROPLEM_ID",
        };
    },
    getTable: function () {
        return "ZZ_EVENT";
    }
}, baseAccess.prototype);
module.exports = tableAccess;