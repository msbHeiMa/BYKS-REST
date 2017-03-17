
/*==============================================================*/
/* Table: WF_TASKTODO                                           */
/*==============================================================*/
// create table WF_TASKTODO 
// (
//    ID                   VARCHAR(36）          not null,
//    FUNMDATA_ID          VARCHAR(36）,
//    PROCINST_ID          NUMBER(20)           not null,
//    SN                   VARCHAR(200）         not null,
//    USER_ID              VARCHAR(50）          not null,
//    FOLIO                VARCHAR(100）         not null,
//    TASK_URL             VARCHAR(500）         not null,
//    TASK_SDATE           DATE                 not null,
//    ACTIVITY_NAME        VARCHAR(100）,
//    ORIGINATOR              VARCHAR(50）          not null,
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    constraint PK_WF_TASKTODO primary key (ID)
// );

// comment on column WF_TASKTODO.ID is
// '主键';

// comment on column WF_TASKTODO.FUNMDATA_ID is
// '业务数据ID';

// comment on column WF_TASKTODO.PROCINST_ID is
// '流程实例ID';

// comment on column WF_TASKTODO.SN is
// '任务序号';

// comment on column WF_TASKTODO.USER_ID is
// '审核用户';

// comment on column WF_TASKTODO.FOLIO is
// '任务名称';

// comment on column WF_TASKTODO.TASK_URL is
// '任务链接';

// comment on column WF_TASKTODO.TASK_SDATE is
// '任务到达时间';

// comment on column WF_TASKTODO.ACTIVITY_NAME is
// '审核环节名称';

// comment on column WF_TASKTODO.ORIGINATOR is
// '申请用户';

// comment on column WF_TASKTODO.CREATE_USER is
// '扩展';

// comment on column WF_TASKTODO.CREATE_DATE is
// '扩展';

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "funMId":"FUNM_ID",
            "funMDataId": "FUNMDATA_ID",
            "procisntId": "PROCINST_ID",
            "sn": "SN",
            "userId": "USER_ID",
            "folio": "FOLIO",
            "taskUrl": "TASK_URL",
            "taskSDate": "TASK_SDATE",
            "activityName": "ACTIVITY_NAME",
            "originator":"ORIGINATOR"
        };
    },
    getTable: function () {
        return "WF_TASKTODO";
    },
}, baseAccess.prototype);
module.exports = tableAccess;