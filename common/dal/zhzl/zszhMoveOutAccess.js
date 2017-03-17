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
            "id":"ID",
            "zId":"Z_ID",
            "moveOutDate":"MOVEOUT_DATE",
            "moveOutPeople":"MOVEOUT_PEOPLE",
            "originalAddr":"ORIGINAL_ADDR",
            "finalAddr":"FINAL_ADDR",
            "moveOutReason":"MOVEOUT_REASON",
            "remarks":"REMARKS",
            "wfState":"WFSTATE",
            "originalGrider":"ORIGINAL_GRIDER"
        };
    },
    getTable:function(){
        return "ZZ_ZSZH_MOVEOUTHIS";
    },
},baseAccess.prototype);
module.exports = tableAccess;