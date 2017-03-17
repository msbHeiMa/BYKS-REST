// /*==============================================================*/
// /* Table: ZZ_PROBLEM_REPLY                                       */
// /*==============================================================*/
// create table ZZ_PROBLEM_REPLY 
// (
//    ID                   VARCHAR2(36)         not null,
//    PROBLEM_ID            VARCHAR2(36),
//    REPLY_CONTENT      VARCHAR2(200)        not null,
//    REPLY_DATE         DATE                 not null,
//    USER_ID              VARCHAR2(50),
//    USER_NAME            VARCHAR2(50),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_ZZ_PROBLEM_REPLY primary key (ID)
// );

// comment on table ZZ_PROBLEM_REPLY is
// '群众上报官方回复';


var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "problemId":"PROBLEM_ID",
            "replyContent":"REPLY_CONTENT",
            "replyDate":"REPLY_DATE",
            "userId":"USER_ID",
            "userName":"USER_NAME"
        };
    },
    getTable:function(){
        return "ZZ_PROBLEM_REPLY";
    }
},baseAccess.prototype);
module.exports = tableAccess;
