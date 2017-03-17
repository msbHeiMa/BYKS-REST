
/*==============================================================*/
/* Table: WF_BUSI_CONFIG                                        */
/* Table: A4_SYS_USER                                           */
/*==============================================================*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "funModelId": "WF_BUSI_CONFIG.FUNMODEL_ID",
            "funModelName": "WF_BUSI_CONFIG.FUNMODEL_NAME",
            "funModelType": "WF_BUSI_CONFIG.FUNMODEL_TYPE",
            "funModelTableName": "WF_BUSI_CONFIG.FUNMODEL_TABLENAME",
            "funModelSPageUrl": "WF_BUSI_CONFIG.FUNMODEL_SPAGEURL",
            "busiId": "WF_BUSI_CONFIG.BUSI_ID",
            "status": "WF_BUSI_CONFIG.STATUS",
            "des": "WF_BUSI_CONFIG.DES",
            "createUser": "WF_BUSI_CONFIG.CREATE_USER",
            "createDate": "WF_BUSI_CONFIG.CREATE_DATE",
            "userId":"A4_SYS_USER.USERID",
            "userName":"A4_SYS_USER.USERNAME",
        };
    },
    getTable: function () {
        return "WF_BUSI_CONFIG INNER JOIN A4_SYS_USER ON A4_SYS_USER.USERID=WF_BUSI_CONFIG.CREATE_USER";
    },
}, baseAccess.prototype);
module.exports = tableAccess;