// /*==============================================================*/
// /* Table: WF_ROLEUSER                                           */
// /*==============================================================*/
// create table WF_ROLEUSER 
// (
//    ID                   VARCHAR2(36)         not null,
//    R_ID                 VARCHAR2(36)         not null,
//    USER_ID              VARCHAR2(50)         not null,
//    SSDWBM               NUMBER(20)           not null,
//    STATUS               VARCHAR2(1)          not null,
//    DES                  VARCHAR2(100),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_WF_ROLEUSER primary key (ID)
// );

// comment on column WF_ROLEUSER.CREATE_USER is
// '扩展';

// comment on column WF_ROLEUSER.CREATE_DATE is
// '扩展';

// comment on column WF_ROLEUSER.UPDATE_USER is
// '扩展';

// comment on column WF_ROLEUSER.UPDATE_DATE is
// '扩展';

// alter table WF_ROLEUSER
//    add constraint FK_WF_ROLEU_REFERENCE_WF_BUSI_ foreign key (R_ID)
//       references WF_BUSI_ROLE (ID);

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "rId": "R_ID",
            "userId": "USER_ID",
            "ssdwbm": "SSDWBM",
            "status": "STATUS",
            "des": "DES",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE",
        };
    },
    getTable: function () {
        return "WF_ROLEUSER";
    },
    getPageWithRId: function (filter, order, offset, limit, callback) {
        var self = this;
        this.getPage(filter, order, offset, limit, function (err, res) {
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