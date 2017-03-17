// /*==============================================================*/
// /* Table: CIG_DATASOURCE_MANAGER                                          */
// /*==============================================================*/
// CREATE TABLE "CIGPROXY"."CIG_DATASOURCE_MANAGER" 
//    (	"ID" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
// 	"DATASOURCE_NAME" VARCHAR2(100 BYTE) NOT NULL ENABLE, 
// 	"DATASOURCE_UNIT" VARCHAR2(200 BYTE) , 
// 	"RELATED_SYSTEM" VARCHAR2(200 BYTE) , 
// 	"ACCESS_STYLE" VARCHAR2(10 BYTE) NOT NULL ENABLE, 
// 	"UPDATE_FREQUENCY" VARCHAR2(20 BYTE) NOT NULL ENABLE, 
// 	"UPDATE_TIME" VARCHAR2(20 BYTE) NOT NULL ENABLE,  
// 	"ACCESS_CONFIG" CLOB NOT NULL ENABLE, 
//  "RUN_STATE"  VARCHAR2(10 BYTE) NOT NULL ENABLE
// 	"CREATE_USER" VARCHAR2(50 BYTE), 
// 	"CREATE_DATE" DATE, 
// 	"UPDATE_USER" VARCHAR2(50 BYTE), 
// 	"UPDATE_DATE" DATE, 
// 	 CONSTRAINT "PK_CIG_DATASOURCE_MANAGER" PRIMARY KEY ("ID")
//     );

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "datasourceName": "DATASOURCE_NAME",
            "datasourceUnit": "DATASOURCE_UNIT",
            "relatedSystem": "RELATED_SYSTEM",
            "accessStyle": "ACCESS_STYLE",
            "updateFrequency": "UPDATE_FREQUENCY",
            "runState":"RUN_STATE",
            "updateTime": "UPDATE_TIME",
            "accessConfig": "ACCESS_CONFIG",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE"
        };
    },
    getTable: function () {
        return "CIG_DATASOURCE_MANAGER";
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