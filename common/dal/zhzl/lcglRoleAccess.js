// alter table WF_BUSI_ROLE
//    drop constraint FK_WF_BUSI__REFERENCE_WF_BUSI;

// drop table WF_BUSI_ROLE cascade constraints;

// /*==============================================================*/
// /* Table: WF_BUSI_ROLE                                          */
// /*==============================================================*/
// create table WF_BUSI_ROLE 
// (
//    ID                   VARCHAR2(36)         not null,
//    B_ID                 VARCHAR2(36)         not null,
//    ROLE_CODE            VARCHAR2(50)         not null,
//    ROLE_NAME            VARCHAR2(50)         not null,
//    "ORDER"              NUMBER(2)            not null,
//    STATUS               VARCHAR2(1)          not null,
//    DES                  VARCHAR2(100),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_WF_BUSI_ROLE primary key (ID)
// );

// comment on column WF_BUSI_ROLE.CREATE_USER is
// '扩展';

// comment on column WF_BUSI_ROLE.CREATE_DATE is
// '扩展';

// comment on column WF_BUSI_ROLE.UPDATE_USER is
// '扩展';

// comment on column WF_BUSI_ROLE.UPDATE_DATE is
// '扩展';

// alter table WF_BUSI_ROLE
//    add constraint FK_WF_BUSI__REFERENCE_WF_BUSI foreign key (B_ID)
//       references WF_BUSI (ID);

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "bId": "B_ID",
            "roleCode": "ROLE_CODE",
            "roleName": "ROLE_NAME",
            "roleOrder": "ROLE_ORDER",
            "status": "STATUS",
            "des": "DES",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE",
        };
    },
    getTable: function () {
        return "WF_BUSI_ROLE";
    },  
}, baseAccess.prototype);
module.exports = tableAccess;