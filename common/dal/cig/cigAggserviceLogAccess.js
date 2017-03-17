// /*==============================================================*/
// /* Table: CIG_AGGSERVICE_LOG                                          */
// /*==============================================================*/
//    CREATE TABLE "CIGPROXY"."CIG_AGGSERVICE_LOG" 
//    (	"ID" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
//    "AGGSERVICE_ID" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
// 	"QUERY_DATE" DATE, 
// 	"QUERY_STATUS" VARCHAR2(50 BYTE) , 
// 	"QUERY_DETAIL" VARCHAR2(500 BYTE) , 
// 	"CREATE_USER" VARCHAR2(50 BYTE), 
// 	"CREATE_DATE" DATE, 
// 	"UPDATE_USER" VARCHAR2(50 BYTE), 
// 	"UPDATE_DATE" DATE, 
// 	 CONSTRAINT "PK_CIG_AGGSERVICE_LOG" PRIMARY KEY ("ID")
//     );
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "aggserviceId": "AGGSERVICE_ID",
            "queryDate": "QUERY_DATE",
            "queryStatus": "QUERY_STATUS",
            "queryDetail": "QUERY_DETAIL",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE"
        };
    },
    getTable: function () {
        return "CIG_AGGSERVICE_LOG";
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