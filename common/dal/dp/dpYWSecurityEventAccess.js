/**
CREATE TABLE "CIGPROXY"."CIG_SCREEN_SECURITYEVENT" (
"ID" VARCHAR2(36 BYTE) NULL ,
"IPADDRESS" VARCHAR2(50 BYTE) NULL ,
"EVENTNUM" NUMBER(4) NULL 
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
            "ipAddress": "IPADDRESS",
            "eventNum": "EVENTNUM",
        };
    },
    getTable: function () {
        return "DP_YW_SECURITYEVENT";
    },
}, baseAccess.prototype);
module.exports = tableAccess;