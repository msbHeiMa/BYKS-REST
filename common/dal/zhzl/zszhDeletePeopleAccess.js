/*==============================================================*/
/* Table:ZZ_ZSZH_ASSISHIS                                          */
/*
create table ZZ_ZSZH_DELETEHIS 
(
   ID                   VARCHAR2(36)         not null,
   Z_ID                 VARCHAR2(36)         not null,
   DELETE_DATE          DATE                 not null,
   DELETE_PEOPLE        VARCHAR2(50)         not null,
   ORIGINAL_ADDR        VARCHAR2(500)        not null,
   DELETE_REASON        VARCHAR2(100),
   REMARKS              VARCHAR2(500),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE,
   WFSTATE              VARCHAR2(10),
   constraint PK_ZZ_ZSZH_DELETEHIS primary key (ID)
);
==================================================*/
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "zId":"Z_ID",
            "deleteDate":"DELETE_DATE",
            "deletePeople":"DELETE_PEOPLE",
            "originalAddr":"ORIGINAL_ADDR",
            "deleteReason":"DELETE_REASON",
            "remarks":"REMARKS",
            "wfState":"WFSTATE"
        };
    },
    getTable:function(){
        return "ZZ_ZSZH_DELETEHIS";
    }
},baseAccess.prototype);
module.exports = tableAccess;