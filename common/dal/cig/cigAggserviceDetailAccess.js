// /*==============================================================*/
// /* Table: CIG_AGGSERVICE_DETAIL                                          */
// /*==============================================================*/
// CREATE TABLE "CIGPROXY"."CIG_AGGSERVICE_DETAIL" 
//    (	"ID" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
// 	"AGGSERVICE_ID" VARCHAR2(36 BYTE) NOT NULL ENABLE, 
// 	"FIELD_NAME" VARCHAR2(100 BYTE) NOT NULL ENABLE, 
// 	"FIELD_ID" VARCHAR2(100 BYTE) NOT NULL ENABLE,
// 	"FIELD_TYPE" VARCHAR2(50 BYTE) NOT NULL ENABLE,
// 	"FIELD_TYPE_DETAIL" VARCHAR2(200 BYTE),
// 	"QUERY_SETTING" VARCHAR2(100 BYTE) NOT NULL ENABLE,
// 	"CREATE_USER" VARCHAR2(50 BYTE), 
// 	"CREATE_DATE" DATE, 
// 	"UPDATE_USER" VARCHAR2(50 BYTE), 
// 	"UPDATE_DATE" DATE, 
// 	 CONSTRAINT "PK_CIG_AGGSERVICE_DETAIL" PRIMARY KEY ("ID")
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
            "fieldName": "FIELD_NAME",
            "fieldId": "FIELD_ID",
            "fieldType": "FIELD_TYPE",
            "fieldTypeDetail": "FIELD_TYPE_DETAIL",
            "querySetting": "QUERY_SETTING",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE"
        };
    },
    getTable: function () {
        return "CIG_AGGSERVICE_DETAIL";
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