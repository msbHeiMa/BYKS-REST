// /*==============================================================*/
// /* Table: CIG_DATASOURCE_LOG                                          */
// /*==============================================================*/
// CREATE TABLE "CIGPROXY"."CIG_DATASOURCE_LOG" 
//    (	"ID" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
// 	"DATASOURCE_MANAGER_ID" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
// 	"DATASOURCE_NAME" VARCHAR2(100 BYTE) NOT NULL ENABLE, 
//  "ACCESS_STYLE" VARCHAR2(10 BYTE) NOT NULL ENABLE, 
// 	"START_TIME" DATE  NOT NULL ENABLE, 
// 	"END_TIME" DATE, 
// 	"RECORD_AFFECTED" NUMBER(10,0), 
// 	"RUN_DES" VARCHAR2(100 BYTE) NOT NULL ENABLE, 
// 	"END_STATUS" VARCHAR2(20 BYTE) NOT NULL ENABLE, 
// 	"RUN_DETAIL" CLOB NOT NULL ENABLE, 
// 	"CREATE_USER" VARCHAR2(50 BYTE), 
// 	"CREATE_DATE" DATE, 
// 	"UPDATE_USER" VARCHAR2(50 BYTE), 
// 	"UPDATE_DATE" DATE, 
// 	 CONSTRAINT "PK_CIG_DATASOURCE_LOG" PRIMARY KEY ("ID")
//     );
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "dataSourceManagerId": "DATASOURCE_MANAGER_ID",
            "datasourceName": "DATASOURCE_NAME",
            "accessStyle": "ACCESS_STYLE",
            "startTime": "START_TIME",
            "endTime": "END_TIME",
            "recordAffected": "RECORD_AFFECTED",
            "runDes": "RUN_DES",
            "endStatus": "END_STATUS",
            "runDetail": "RUN_DETAIL",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE"
        };
    },
    getTable: function () {
        return "CIG_DATASOURCE_LOG";
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