// /*==============================================================*/
// /* Table: ZZ_CFG_SCHOOL_SAFETY_TYPES                            */
// /*==============================================================*/
// create table ZZ_CFG_SCHOOL_SAFETY_TYPES  (
//    ID                   varchar2(36)                    not null,
//    SAFETY_TYPE_NAME     varchar2(200),
//    CAL_TYPE             varchar2(100),
//    CAL_PARAM            varchar2(500),
//    IS_ENABLE            numeric(1,0),
//    CREATE_DATE          datetime,
//    CREATE_USER          varchar2(50),
//    UPDATE_DATE          datetime,
//    UPDATE_USER          varchar2(50),
//    constraint PK_ZZ_CFG_SCHOOL_SAFETY_TYPES primary key (ID)
// );


var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "safetyTypeName":"SAFETY_TYPE_NAME",
            "calType":"CAL_TYPE",
            "calParam":"CAL_PARAM",
            "isEnable":"IS_ENABLE",
        };
    },
    getTable:function(){
        return "ZZ_CFG_SCHOOL_SAFETY_TYPES";
    }
},baseAccess.prototype);
module.exports = tableAccess;