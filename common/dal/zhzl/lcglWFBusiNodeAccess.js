
/*==============================================================*/
/* Table: WF_BUSI_NODE                                          */
/*==============================================================*/
// create table WF_BUSI_NODE 
// (
//    ID                   VARCHAR2(36)         not null,
//    B_ID                 VARCHAR2(36)         not null,
//    NODE_NAME            VARCHAR2(50)         not null,
//    NODE_CODE            VARCHAR2(50),
//    NODE_PAGEURL         VARCHAR2(200)        not null,
//    NODE_APPROVETYPE     NUMBER(2),
//    NODE_ORDER           NUMBER(2)            not null,
//    STATUS               VARCHAR2(1)          not null,
//    DES                  VARCHAR2(500),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_WF_BUSI_NODE primary key (ID)
// );

// comment on column WF_BUSI_NODE.ID is
// '主键';

// comment on column WF_BUSI_NODE.B_ID is
// '业务名称';

// comment on column WF_BUSI_NODE.NODE_NAME is
// '节点名称';

// comment on column WF_BUSI_NODE.NODE_CODE is
// '节点CODE';

// comment on column WF_BUSI_NODE.NODE_APPROVETYPE is
// '节点审批方式:1 一人审批通过;2 全部审批通过';

// comment on column WF_BUSI_NODE.NODE_ORDER is
// '排序';

// comment on column WF_BUSI_NODE.STATUS is
// '状态';

// comment on column WF_BUSI_NODE.DES is
// '说明';

// comment on column WF_BUSI_NODE.CREATE_USER is
// '扩展';

// comment on column WF_BUSI_NODE.CREATE_DATE is
// '扩展';

// comment on column WF_BUSI_NODE.UPDATE_USER is
// '扩展';

// comment on column WF_BUSI_NODE.UPDATE_DATE is
// '扩展';


var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "bId": "B_ID",
            "nodeName": "NODE_NAME",
            "nodeCode": "NODE_CODE",
            "nodeApproveType":"NODE_APPROVETYPE",
            "nodeUserSource":"NODE_USERSOURCE",
            "nodePageUrl":"NODE_PAGEURL",
            "nodeOrder": "NODE_ORDER",
            "status": "STATUS",
            "des": "DES",
        };
    },
    getTable: function () {
        return "WF_BUSI_NODE";
    },
}, baseAccess.prototype);
module.exports = tableAccess;