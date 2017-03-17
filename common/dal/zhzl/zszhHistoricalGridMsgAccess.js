/*create table ZZ_ZSZH_MOVEOUTHIS 
(
   ID                   VARCHAR2(36)         not null,
   Z_ID                 VARCHAR2(36)         not null,
   MOVEOUT_DATE         DATE                 not null,
   MOVEOUT_PEOPLE       VARCHAR2(50)         not null,
   ORIGINAL_ADDR        VARCHAR2(500)        not null,
   FINAL_ADDR           VARCHAR2(500)        not null,
   MOVEOUT_REASON       VARCHAR2(100),
   REMARKS              VARCHAR2(500),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE,
   WFSTATEV              ARCHAR2(10),
   constraint PK_ZZ_ZSZH_MOVEOUTHIS primary key (ID)
);
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"a1.ID",
            "JSBId":"a1.Z_ID",
            "moveOutDate":"a1.MOVEOUT_DATE",
            "moveOutPeople":"a1.MOVEOUT_PEOPLE",
            "originalAddr":"a1.ORIGINAL_ADDR",
            "finalAddr":"a1.FINAL_ADDR",
            "moveOutReason":"a1.MOVEOUT_REASON",
            "remarks":"a1.REMARKS",
            "wfState":"a1.WFSTATE",
            "originalGrider":"a1.ORIGINAL_GRIDER",

            "personId":"a2.P_ID",//jsb
            "jsbId":"a2.ID",//jsb

            "id":"a3.ID",//person
            "name":"a3.NAME",
            "phone":"a3.PHONE",

            "gridName": "a4.DISPLAYNAME",//depart
            "departmentId":"a4.DEPARTMENTID",
        };
    },
    getTable:function(){
        return "((ZZ_ZSZH_MOVEOUTHIS a1 INNER JOIN ZZ_ZSZHJSB a2 ON a2.ID=a1.Z_ID)LEFT JOIN ZZ_PERSON a3 ON a2.P_ID=a3.ID)LEFT JOIN A4_SYS_DEPARTMENT a4 ON a1.ORIGINAL_ADDR=a4.DEPARTMENTID";
    },
},baseAccess.prototype);
module.exports = tableAccess;