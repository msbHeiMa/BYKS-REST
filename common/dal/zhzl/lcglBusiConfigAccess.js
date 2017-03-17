
/*==============================================================*/
/* Table: WF_BUSI_CONFIG                                        */
/*==============================================================*/
// create table WF_BUSI_CONFIG 
// (
//    ID                   VARCHAR2(36)         not null,
//    FUNMODEL_ID          VARCHAR2(36)         not null,
//    FUNMODEL_NAME        VARCHAR2(100)        not null,
//    FUNMODEL_TYPE        VARCHAR2(50)         not null,
//    FUNMODEL_TABLENAME   VARCHAR2(100),
//    STATUS               VARCHAR2(1)          not null,
//    DES                  VARCHAR2(500),
//    FUNMODEL_SPAGEURL    VARCHAR2(200)        not null,
//    BUSI_ID              VARCHAR2(36)         not null,
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE
// );

// comment on column WF_BUSI_CONFIG.ID is
// '主键';

// comment on column WF_BUSI_CONFIG.FUNMODEL_ID is
// '功能模块ID';

// comment on column WF_BUSI_CONFIG.FUNMODEL_NAME is
// '功能模块名称';

// comment on column WF_BUSI_CONFIG.FUNMODEL_TYPE is
// '功能模块类型,肇事肇祸:ZSZH，事件上报：SJSB';

// comment on column WF_BUSI_CONFIG.STATUS is
// '状态';

// comment on column WF_BUSI_CONFIG.DES is
// '说明';

// comment on column WF_BUSI_CONFIG.FUNMODEL_SPAGEURL is
// '功能模块发起页面';

// comment on column WF_BUSI_CONFIG.BUSI_ID is
// '流程业务模板ID';

// comment on column WF_BUSI_CONFIG.CREATE_USER is
// '扩展';

// comment on column WF_BUSI_CONFIG.CREATE_DATE is
// '扩展';

// comment on column WF_BUSI_CONFIG.UPDATE_USER is
// '扩展';

// comment on column WF_BUSI_CONFIG.UPDATE_DATE is
// '扩展';

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "funModelId": "FUNMODEL_ID",
            "funModelName": "FUNMODEL_NAME",
            "funModelType": "FUNMODEL_TYPE",
            "funModelTableName": "FUNMODEL_TABLENAME",
            "funModelSPageUrl": "FUNMODEL_SPAGEURL",
            "busiId": "BUSI_ID",
            "status": "STATUS",
            "des": "DES",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE"
        };
    },
    getTable: function () {
        return "WF_BUSI_CONFIG";
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