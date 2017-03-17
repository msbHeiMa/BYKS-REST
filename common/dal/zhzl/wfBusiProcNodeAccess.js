
/*==============================================================*/
/* Table: WF_BUSI_PROC_NODE                                     */
/*==============================================================*/
// create table WF_BUSI_PROC_NODE 
// (
//    ID                   VARCHAR2(36)         not null,
//    P_ID                 VARCHAR2(36)         not null,
//    FUNMDATA_ID          VARCHAR2(36)         not null,
//    NODE_NAME            VARCHAR2(50)         not null,
//    STATUS               VARCHAR2(1)          not null,
//    STATE                VARCHAR2(50)         not null,
//    NODE_CODE            VARCHAR2(50),
//    NODE_PAGEURL         VARCHAR2(200)        not null,
//    NODE_APPROVETYPE     NUMBER(2),
//    NODE_ORDER           NUMBER(2)            not null,
//    DES                  VARCHAR2(500),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_WF_BUSI_PROC_NODE primary key (ID)
// );

// comment on table WF_BUSI_PROC_NODE is
// '流程业务模板节点实例';

// comment on column WF_BUSI_PROC_NODE.ID is
// '主键';

// comment on column WF_BUSI_PROC_NODE.P_ID is
// '功能模块ID';

// comment on column WF_BUSI_PROC_NODE.FUNMDATA_ID is
// '功能数据ID';

// comment on column WF_BUSI_PROC_NODE.STATUS is
// '状态';

// comment on column WF_BUSI_PROC_NODE.STATE is
// 'WAITING等待审核,RUNNING正在审核,COMPLETED已审核、WAITED退回时使用';

// comment on column WF_BUSI_PROC_NODE.NODE_CODE is
// '节点CODE';

// comment on column WF_BUSI_PROC_NODE.NODE_APPROVETYPE is
// '节点审批方式:1 一人审批通过;2 全部审批通过';

// comment on column WF_BUSI_PROC_NODE.NODE_ORDER is
// '排序';

// comment on column WF_BUSI_PROC_NODE.DES is
// '说明';

// comment on column WF_BUSI_PROC_NODE.CREATE_USER is
// '扩展';

// comment on column WF_BUSI_PROC_NODE.CREATE_DATE is
// '扩展';

// comment on column WF_BUSI_PROC_NODE.UPDATE_USER is
// '扩展';

// comment on column WF_BUSI_PROC_NODE.UPDATE_DATE is
// '扩展';


var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "procId": "P_ID",
            "funMDataId": "FUNMDATA_ID",
            "nodeName": "NODE_NAME",
            "status": "STATUS",
            "des": "DES",
            "state": "STATE",
            "nodeCode": "NODE_CODE",
            "nodePageUrl": "NODE_PAGEURL",
            "nodeApproveType": "NODE_APPROVETYPE",
            "nodeUserSource":"NODE_USERSOURCE",
            "nodeOrder": "NODE_ORDER",
        };
    },
    getTable: function () {
        return "WF_BUSI_PROC_NODE";
    },
}, baseAccess.prototype);
module.exports = tableAccess;