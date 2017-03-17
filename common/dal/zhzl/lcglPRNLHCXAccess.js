
//*==============================================================*/
/* Table: WF_BUSI                                                */
/* Table: WF_BUSI_NODE                                           */
/* Table: WF_BUSI_ROLE                                           */
/* Table: WF_BUSI_NODEROLE                                       */
/* Table: A4_SYS_USER                                            */
/*===============================================================*/


var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "busiId":"WF_BUSI.ID",
            "nodeId":"WF_BUSI_NODE.ID",
            "nodeBid":"WF_BUSI_NODE.B_ID",
            "nodeName":"WF_BUSI_NODE.NODE_NAME",
            "nodeCode":"WF_BUSI_NODE.NODE_CODE",
            "nodePageurl":"WF_BUSI_NODE.NODE_PAGEURL",
            "nodeApprovetype":"WF_BUSI_NODE.NODE_APPROVETYPE",
            "nodeOrder":"WF_BUSI_NODE.NODE_ORDER",
            "nodeUsersource":"WF_BUSI_NODE.NODE_USERSOURCE",
            "status":"WF_BUSI_NODE.STATUS",
            "des":"WF_BUSI_NODE.DES",
            "roleId":"WF_BUSI_ROLE.ID",
            "roleBid":"WF_BUSI_ROLE.B_ID",
            "roleName":"WF_BUSI_ROLE.ROLE_NAME",
            "rolenodeId":"WF_BUSI_NODEROLE.ID",
            "rolenodeNID":"WF_BUSI_NODEROLE.N_ID",
            "rolenodeRID":"WF_BUSI_NODEROLE.R_ID",
            "rolenodeStatus":"WF_BUSI_NODEROLE.STATUS",
            "rolenodeDes":"WF_BUSI_NODEROLE.DES",
            "createUser": "WF_BUSI_NODE.CREATE_USER",
            "createDate": "WF_BUSI_NODE.CREATE_DATE",
            "updateUser":"WF_BUSI_NODE.UPDATE_USER",
            "updateDate":"WF_BUSI_NODE.UPDATE_DATE",
            "userId":"A4_SYS_USER.USERID",
            "userName":"A4_SYS_USER.USERNAME",
         };
    },
    getTable: function () {
         return ` WF_BUSI INNER JOIN WF_BUSI_NODE ON WF_BUSI. ID = WF_BUSI_NODE.B_ID
                          LEFT JOIN WF_BUSI_NODEROLE ON WF_BUSI_NODE. ID = WF_BUSI_NODEROLE.N_ID
                          LEFT JOIN WF_BUSI_ROLE ON WF_BUSI_ROLE.ID=WF_BUSI_NODEROLE.R_ID
                          LEFT JOIN A4_SYS_USER ON A4_SYS_USER.USERID=WF_BUSI_NODE.CREATE_USER
                `;
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