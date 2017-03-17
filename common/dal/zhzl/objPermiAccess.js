// /*==============================================================*/
// /* Table: ZZ_OBJ_PERMI                                          */
// /*==============================================================*/
// create table ZZ_OBJ_PERMI  (
//    ID                   varchar2(36)                    not null,
//    USER_ID              varchar2(36),
//    OBJ_TYPE             varchar2(20),
//    OBJ_ID               varchar2(36),
//    CREATE_DATE          date,
//    CREATE_USER          varchar2(50),
//    UPDATE_DATE          date,
//    UPDATE_USER          varchar2(50),
//    constraint PK_ZZ_OBJ_PERMI primary key (ID)
// );

var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "userId":"USER_ID",
            "objType":"OBJ_TYPE",
            "objId":"OBJ_ID",
        };
    },
    getTable:function(){
        return "ZZ_OBJ_PERMI";
    }
},baseAccess.prototype);
module.exports = tableAccess;