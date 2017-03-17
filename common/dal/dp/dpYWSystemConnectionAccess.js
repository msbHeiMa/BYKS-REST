/**
CREATE TABLE "CIGPROXY"."CIG_SCREEN_DOCKERSTATISTICS" (
"ID" VARCHAR2(36 BYTE) NOT NULL ,
"STATISTICSDATE" DATE NULL ,
"STARTTIME" NUMBER(5) NULL ,
"STOPTIME" NUMBER(5) NULL ,
"USEDMEMORY" NUMBER(5) NULL ,
"REMAININGMEMORY" NUMBER(5) NULL ,
"CREATE_USER" VARCHAR2(50 BYTE) NULL ,
"CREATE_DATE" DATE NULL ,
"UPDATE_USER" VARCHAR2(50 BYTE) NULL ,
"UPDATE_DATE" DATE NULL 
)
 */

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "office": "OFFICE",
            "system": "SYSTEM",
        };
    },
    getTable: function () {
        return "DP_YW_SYSTEMCONNECTION";
    },
}, baseAccess.prototype);
module.exports = tableAccess;