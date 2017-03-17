/*==============================================================*/
/* Table: WF_BUSI                                               */
/* Table: A4_SYS_USER                                               */
/* Table: A4_SYS_DEPARTMENT                                               */
/*==============================================================*/
// create table WF_BUSI 
// (
//    ID                   VARCHAR2(36)         not null,
//    BUSI_NAME            VARCHAR2(50)         not null,
//    BUSI_TYPE            VARCHAR2(50)         not null,
//    SSDWBM               NUMBER(20)           not null,
//    STATUS               VARCHAR2(1),
//    DES                  VARCHAR2(500),
//    WF_NAME              VARCHAR2(100),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_WF_BUSI primary key (ID)
// );

// comment on column WF_BUSI.CREATE_USER is
// '扩展';

// comment on column WF_BUSI.CREATE_DATE is
// '扩展';

// comment on column WF_BUSI.UPDATE_USER is
// '扩展';

// comment on column WF_BUSI.UPDATE_DATE is
// '扩展';

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "WF_BUSI.ID",
            "busiName": "WF_BUSI.BUSI_NAME",
            "busiType": "WF_BUSI.BUSI_TYPE",
            "ssdwbm": "to_char(WF_BUSI.SSDWBM)",
            "status": "WF_BUSI.STATUS",
            "des": "WF_BUSI.DES",
            "wfName": "WF_BUSI.WF_NAME",
            "createUser": "WF_BUSI.CREATE_USER",
            "createDate": "WF_BUSI.CREATE_DATE",
            "userId":"A4_SYS_USER.USERID",
            "userName":"A4_SYS_USER.USERNAME",
            "dataDepartmentId":"to_char(A4_SYS_DEPARTMENT.DATADEPARTMENTID)",
            "departmentName":"A4_SYS_DEPARTMENT.DEPARTMENTNAME",
        };
    },
    getTable: function () {
        return "WF_BUSI INNER JOIN A4_SYS_USER ON WF_BUSI.CREATE_USER=A4_SYS_USER.USERID INNER JOIN A4_SYS_DEPARTMENT ON A4_SYS_DEPARTMENT.DEPARTMENTID=WF_BUSI.SSDWBM";
    },

}, baseAccess.prototype);
module.exports = tableAccess;