/**
CREATE TABLE "CIGPROXY"."CIG_SCREEN_SYSTEMCONNECTION" (
"ID" VARCHAR2(36 BYTE) NULL ,
"OFFICE" VARCHAR2(100 BYTE) NULL ,
"SYSTEM" VARCHAR2(100 BYTE) NULL ,
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
            "statisticsDate": "STATISTICSDATE",
            "usedMem": "USEDMEMORY",
            "totalMem": "REMAININGMEMORY",
            "nodeName":"NODE_NAME",
            "nodeId":"NODE_ID"
        };
    },
    getTable: function () {
        return "DP_YW_DOCKERMEM";
    },
}, baseAccess.prototype);
module.exports = tableAccess;