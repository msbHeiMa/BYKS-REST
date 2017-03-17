
/*==============================================================*/
/* Table: WF_BUSI_PROC_NODEUSER                                 */
/*==============================================================*/
// create table WF_BUSI_PROC_NODEUSER 
// (
//    ID                   VARCHAR2(36)         not null,
//    N_ID                 VARCHAR2(36)         not null,
//    USER_ID              VARCHAR2(50)         not null,
//    STATUS               VARCHAR2(1)          not null,
//    DES                  VARCHAR2(500),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_WF_BUSI_PROC_NODEUSER primary key (ID)
// );

// comment on table WF_BUSI_PROC_NODEUSER is
// '流程节点审核用户实例';

// comment on column WF_BUSI_PROC_NODEUSER.ID is
// '主键';

// comment on column WF_BUSI_PROC_NODEUSER.N_ID is
// '功能模块ID';

// comment on column WF_BUSI_PROC_NODEUSER.STATUS is
// '状态';

// comment on column WF_BUSI_PROC_NODEUSER.DES is
// '说明';

// comment on column WF_BUSI_PROC_NODEUSER.CREATE_USER is
// '扩展';

// comment on column WF_BUSI_PROC_NODEUSER.CREATE_DATE is
// '扩展';

// comment on column WF_BUSI_PROC_NODEUSER.UPDATE_USER is
// '扩展';

// comment on column WF_BUSI_PROC_NODEUSER.UPDATE_DATE is
// '扩展';



var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "nodeId": "N_ID",
            "userId": "USER_ID",
            "status": "STATUS",
            "des": "DES",
        };
    },
    getTable: function () {
        return "WF_BUSI_PROC_NODEUSER";
    },
}, baseAccess.prototype);
module.exports = tableAccess;