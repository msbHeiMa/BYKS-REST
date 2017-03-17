/*==============================================================*/
/* Table: WF_BUSI                                               */
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
            "id": "ID",
            "busiName": "BUSI_NAME",
            "busiType": "BUSI_TYPE",
            "ssdwbm": "SSDWBM",
            "status": "STATUS",
            "des": "DES",
            "wfName": "WF_NAME",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE",
        };
    },
    getTable: function () {
        return "WF_BUSI";
    },

}, baseAccess.prototype);
module.exports = tableAccess;