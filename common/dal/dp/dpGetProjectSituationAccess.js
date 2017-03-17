/*
create table DP_WSGZ 
(
   ID                   VARCHAR2(36)         not null,
   PROJ_NAME            NVARCHAR2(50),
   PROJ_JD              number(3,2),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
              "projName":"PROJ_NAME",//项目名称
              "projJd":"PROJ_JD",//项目进度
        };
    },
    getTable: function () {
        return "DP_WSGZ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
