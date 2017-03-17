
/*==============================================================*/
/* Table: WF_BUSI_PROC                                          */
/*==============================================================*/
// create table WF_BUSI_PROC 
// (
//    ID                   VARCHAR2(36)         not null,
//    FUNM_ID              VARCHAR2(36)         not null,
//    FUNMDATA_ID          VARCHAR2(36)         not null,
//    BUSI_ID              VARCHAR2(36)         not null,
//    STATUS               VARCHAR2(1)          not null,
//    DES                  VARCHAR2(500),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_WF_BUSI_PROC primary key (ID)
// );

// comment on table WF_BUSI_PROC is
// '流程业务模板实例';

// comment on column WF_BUSI_PROC.ID is
// '主键';

// comment on column WF_BUSI_PROC.FUNM_ID is
// '功能模块ID';

// comment on column WF_BUSI_PROC.FUNMDATA_ID is
// '功能数据ID';

// comment on column WF_BUSI_PROC.BUSI_ID is
// '流程业务模板ID';

// comment on column WF_BUSI_PROC.STATUS is
// '状态';

// comment on column WF_BUSI_PROC.DES is
// '说明';

// comment on column WF_BUSI_PROC.CREATE_USER is
// '扩展';

// comment on column WF_BUSI_PROC.CREATE_DATE is
// '扩展';

// comment on column WF_BUSI_PROC.UPDATE_USER is
// '扩展';

// comment on column WF_BUSI_PROC.UPDATE_DATE is
// '扩展';


var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "funMId": "FUNM_ID",
            "funMDataId": "FUNMDATA_ID",
            "busiId": "BUSI_ID",
            "status": "STATUS",
            "des": "DES",
        };
    },
    getTable: function () {
        return "WF_BUSI_PROC";
    },
}, baseAccess.prototype);
module.exports = tableAccess;