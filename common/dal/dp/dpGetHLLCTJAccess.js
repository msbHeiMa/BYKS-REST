/*
create table DP_HLLCTJ 
(
   ID                   VARCHAR2(36),
   YEAR                 NUMBER(4),
   HLLC                 NUMBER(8),
   TBZZL                NUMBER(5,2),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_HLLCTJ.CREATE_USER is
'扩展';

comment on column DP_HLLCTJ.CREATE_DATE is
'扩展';

comment on column DP_HLLCTJ.UPDATE_USER is
'扩展';

comment on column DP_HLLCTJ.UPDATE_DATE is
'扩展';


*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
              "id":"ID",//ID
              "year":"YEAR",//年度
              "hllc":"HLLC",//公路里程（万公里）
              "tbzzl":"TBZZL",//同比增长率
        };
    },
    getTable: function () {
        return "DP_HLLCTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
