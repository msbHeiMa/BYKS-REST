// /*==============================================================*/
// /* Table: CIG_AGGSERVICE_MANAGER                                          */
// /*==============================================================*/
// CREATE TABLE "CIGPROXY"."CIG_AGGSERVICE_MANAGER" 
//    (	"ID" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
// 	"SERVICE_NAME" VARCHAR2(100 BYTE) NOT NULL ENABLE, 
// 	"SERVICE_TYPE" VARCHAR2(200 BYTE) , 
// 	"STATUS" VARCHAR2(50 BYTE) , 
// 	"DETAIL" VARCHAR2(500 BYTE) , 
// 	"CREATE_USER" VARCHAR2(50 BYTE), 
// 	"CREATE_DATE" DATE, 
// 	"UPDATE_USER" VARCHAR2(50 BYTE), 
// 	"UPDATE_DATE" DATE, 
// 	 CONSTRAINT "PK_CIG_AGGSERVICE_MANAGER" PRIMARY KEY ("ID")
//     );
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "serviceName": "SERVICE_NAME",
            "serviceType": "SERVICE_TYPE",
            "status": "STATUS",
            "detail": "DETAIL",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE"
        };
    },
    getTable: function () {
        return "CIG_AGGSERVICE_MANAGER";
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