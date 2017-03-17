/*
create table DP_GLLCTJ 
(
   ID                   VARCHAR2(36),
   YEAR                 NUMBER(4),
   GLLC                 NUMBER(8),
   TBZZL                NUMBER(5,2),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_GLLCTJ.CREATE_USER is
'扩展';

comment on column DP_GLLCTJ.CREATE_DATE is
'扩展';

comment on column DP_GLLCTJ.UPDATE_USER is
'扩展';

comment on column DP_GLLCTJ.UPDATE_DATE is
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
              "gllc":"GLLC",//公路里程（万公里）
              "tbzzl":"TBZZL",//同比增长率
        };
    },
    getTable: function () {
        return "DP_GLLCTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
