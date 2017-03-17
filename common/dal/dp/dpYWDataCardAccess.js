/**
CREATE TABLE "CIGPROXY"."CIG_SCREEN_DATACARD" (
"ID" VARCHAR2(36 BYTE) NOT NULL ,
"FROM_DEPARTMENT" VARCHAR2(100 BYTE) NULL ,
"TO_DEPARTMENT" VARCHAR2(100 BYTE) NULL ,
"RECEIVEDATE" DATE NULL ,
"TITLE" VARCHAR2(50 BYTE) NULL ,
"DATA_NUM" NUMBER(4) NULL ,
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
        //    CREATE TABLE "CIGPROXY"."CIG_SCREEN_MAINTENANCE" (
            "id": "ID",
            "fromDepartment": "FROM_DEPARTMENT",
            "toDepartment": "TO_DEPARTMENT",
            "receiveDate": "RECEIVEDATE",
            "title": "TITLE",
            "dataNum": "DATA_NUM",
            "departmentId":"DEPARTMENT_ID"
        };
    },
    getTable: function () {
        return "DP_YW_DATACARD";
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