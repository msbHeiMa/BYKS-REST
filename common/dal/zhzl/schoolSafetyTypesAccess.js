// /*==============================================================*/
// /* Table: ZZ_SCHOOL_SAFETY_TYPES                                */
// /*==============================================================*/
// create table ZZ_SCHOOL_SAFETY_TYPES  (
//    ID                   varchar2(36)                    not null,
//    S_ID                 varchar2(36)                    not null,
//    T_ID                 varchar2(36)                    not null,
//    CAL_PARAM            varchar2(100),
//    CREATE_DATE          date,
//    CREATE_USER          varchar2(50),
//    UPDATE_DATE          date,
//    UPDATE_USER          varchar2(50),
//    constraint PK_ZZ_SCHOOL_SAFETY_TYPES primary key (ID)
// );

// alter table ZZ_SCHOOL_SAFETY_TYPES
//    add constraint FK_ZZ_SCHOO_FK_ZZ_S1_ZZ_SCHOO foreign key (S_ID)
//       references ZZ_SCHOOL (ID);

// alter table ZZ_SCHOOL_SAFETY_TYPES
//    add constraint FK_ZZ_SCHOO_FK_ZZ_SST_ZZ_CFG_S foreign key (T_ID)
//       references ZZ_CFG_SCHOOL_SAFETY_TYPES (ID);

var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "sId":"S_ID",
            "tId":"T_ID",
            "calParam":"CAL_PARAM",
        };
    },
    getTable:function(){
        return "ZZ_SCHOOL_SAFETY_TYPES";
    }
},baseAccess.prototype);
module.exports = tableAccess;