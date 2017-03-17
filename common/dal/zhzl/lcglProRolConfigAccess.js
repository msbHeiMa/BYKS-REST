
//*==============================================================*/
/* Table: WF_BUSI_NODE                                      */
/*==============================================================*/


var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "nodeId": "ID",
            "Bid": "B_ID",
            "nodeName": "NODE_NAME",
            "nodeCode": "NODE_CODE",
            "nodePageurl": "NODE_PAGEURL",
            "nodeApprovetype": "NODE_APPROVETYPE",
            "nodeUsersource":"NODE_USERSOURCE",
            "nodeOrder": "NODE_ORDER",
            "status": "STATUS",
            "des": "DES",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE"
         };
    },
    getTable: function () {
         return "WF_BUSI_NODE";
    },
    getObjectWithFunModeId: function (filter, callback) {
        var self = this;
        this.getObject(filter, function (err, res) {
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