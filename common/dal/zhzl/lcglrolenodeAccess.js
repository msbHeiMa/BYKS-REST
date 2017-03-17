
// /*==============================================================*/
// /* Table: WF_BUSI_NODEROLE                                      */
// /*==============================================================*/
// create table WF_BUSI_NODEROLE 
// (
//    ID                   VARCHAR2(36)         not null,
//    N_ID                 VARCHAR2(36)         not null,
//    R_ID                 VARCHAR2(36)         not null,
//    STATUS               VARCHAR2(1)          not null,
//    DES                  VARCHAR2(500),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE
// );


var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "nodeId": "N_ID",
            "Rid": "R_ID",
            "status": "STATUS",
            "des": "DES",
            "createUser": "CREATE_USER",
            "createDate": "CREATE_DATE",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE"
         };
    },
    getTable: function () {
         return "WF_BUSI_NODEROLE";
    },
}, baseAccess.prototype);
module.exports = tableAccess;