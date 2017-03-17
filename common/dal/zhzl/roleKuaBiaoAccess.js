// Table: WF_BUSI_ROLE                                          
// Table: A4_SYS_USER  
// Table: WF_BUSI 

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "WF_BUSI_ROLE.ID",
            "bId": "WF_BUSI_ROLE.B_ID",
            "roleCode": "WF_BUSI_ROLE.ROLE_CODE",
            "roleName": "WF_BUSI_ROLE.ROLE_NAME",
            "roleOrder": "WF_BUSI_ROLE.ROLE_ORDER",
            "status": "WF_BUSI_ROLE.STATUS",
            "des": "WF_BUSI_ROLE.DES",
            "createUser": "WF_BUSI_ROLE.CREATE_USER",
            "createDate": "WF_BUSI_ROLE.CREATE_DATE",
            "busiId":"WF_BUSI.ID",
            "busiName":"WF_BUSI.BUSI_NAME",
            "userId":"A4_SYS_USER.USERID",
            "userName":"A4_SYS_USER.USERNAME",
        };
    },
    getTable: function () {
        return `WF_BUSI_ROLE LEFT JOIN WF_BUSI ON WF_BUSI_ROLE.B_ID=WF_BUSI.ID
                             LEFT JOIN A4_SYS_USER ON A4_SYS_USER.USERID=WF_BUSI_ROLE.CREATE_USER`;
    },  
}, baseAccess.prototype);
module.exports = tableAccess;