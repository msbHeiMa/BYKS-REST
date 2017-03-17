/**
CREATE TABLE "CIGPROXY"."CIG_SCREEN_CLUSTERSTATUS" (
"ID" VARCHAR2(36 BYTE) NOT NULL ,
"MALFUNCTION" NUMBER(3) NULL ,
"NORMAL" NUMBER(3) NULL ,
"CHECK" NUMBER(3) NULL ,
"USEDDISK" NUMBER(5) NULL ,
"REMAININGDISK" NUMBER(5) NULL ,
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
            "malfunction": "MALFUNCTION",
            "normal": "NORMAL",
            "checking": "CHECKING",
            "usedDisk": "USEDDISK",
            "remainingDisk": "REMAININGDISK",
            "usedDay":"RUNDAY"
        };
    },
    getTable: function () {
        return "DP_YW_CLUSTERSTATUS";
    },
}, baseAccess.prototype);
module.exports = tableAccess;