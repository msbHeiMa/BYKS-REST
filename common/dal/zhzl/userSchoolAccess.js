// /*==============================================================*/
// /* Table: ZZ_USER_SCHOOL                                        */
// /*==============================================================*/
// create table ZZ_USER_SCHOOL  (
//    ID                   varchar2(36)                    not null,
//    USER_ID              varchar2(36),
//    S_ID                 varchar2(36),
//    IS_FOCUS             varchar2(1)                     default '1',
//    CREATE_DATE          datetime,
//    CREATE_USER          varchar2(50),
//    UPDATE_DATE          datetime,
//    UPDATE_USER          varchar2(50),
//    constraint PK_ZZ_USER_SCHOOL primary key (ID)
// );

// alter table ZZ_USER_SCHOOL
//    add constraint FK_ZZ_USER__FK_ZZ_S2_ZZ_SCHOO foreign key (S_ID)
//       references ZZ_SCHOOL (ID);


var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "userId":"USER_ID",
            "sId":"S_ID",
            "isFocus":"IS_FOCUS",
        };
    },
    getTable:function(){
        return "ZZ_USER_SCHOOL";
    }
},baseAccess.prototype);
module.exports = tableAccess;