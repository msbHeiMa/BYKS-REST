
/*==============================================================*/
/* Table: WF_APPROVEHIS                                         */
/*==============================================================*/
// create table WF_APPROVEHIS 
// (
//    ID                   VARCHAR2(36)         not null,
//    FUNMDATA_ID          VARCHAR2(36)         not null,
//    PROCINST_ID          NUMBER(20)           not null,
//    USER_ID              VARCHAR2(50)         not null,
//    ACTIVITY_NAME        VARCHAR2(20)         not null,
//    ACTOIN_NAME          VARCHAR2(20)         not null,
//    CONTENT              VARCHAR2(500),
//    TASK_SDATE           DATE                 not null,
//    TASK_EDATE           DATE                 not null,
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_WF_APPROVEHIS primary key (ID)
// );

// comment on column WF_APPROVEHIS.ID is
// '主键';

// comment on column WF_APPROVEHIS.FUNMDATA_ID is
// '业务数据ID';

// comment on column WF_APPROVEHIS.PROCINST_ID is
// '流程实例ID';

// comment on column WF_APPROVEHIS.USER_ID is
// '审核用户ID';

// comment on column WF_APPROVEHIS.ACTIVITY_NAME is
// '节点名称';

// comment on column WF_APPROVEHIS.ACTOIN_NAME is
// '审核动作';

// comment on column WF_APPROVEHIS.CONTENT is
// '审核意见';

// comment on column WF_APPROVEHIS.TASK_SDATE is
// '任务到达时间';

// comment on column WF_APPROVEHIS.TASK_EDATE is
// '任务审核时间';

// comment on column WF_APPROVEHIS.CREATE_USER is
// '扩展';

// comment on column WF_APPROVEHIS.CREATE_DATE is
// '扩展';

// comment on column WF_APPROVEHIS.UPDATE_USER is
// '扩展';

// comment on column WF_APPROVEHIS.UPDATE_DATE is
// '扩展';

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "funMDataId": "FUNMDATA_ID",
            "procisntId": "PROCINST_ID",
            "userId": "USER_ID",
            "activityName": "ACTIVITY_NAME",
            "activityId": "ACTIVITY_ID",
            "actionName":"ACTOIN_NAME",
            "content":"CONTENT",
            "taskSDate":"TASK_SDATE",
            "taskEDate":"TASK_EDATE",
        };
    },
    getTable: function () {
        return "WF_APPROVEHIS";
    },
}, baseAccess.prototype);
module.exports = tableAccess;