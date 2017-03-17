/*
create table DP_LYRSTJJZS 
(
   ID                   VARCHAR2(36),
   YEAR                 NUMBER(4),
   MONTH                NUMBER(2),
   RS                   NUMBER(8),
   XBBHL                NUMBER(5,2),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_LYRSTJJZS.CREATE_USER is
'扩展';

comment on column DP_LYRSTJJZS.CREATE_DATE is
'扩展';

comment on column DP_LYRSTJJZS.UPDATE_USER is
'扩展';

comment on column DP_LYRSTJJZS.UPDATE_DATE is
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
              //"year":"YEAR",//年度
              //"month":"MONTH",//月份
              "time":"TO_CHAR(TIME,'yyyy-mm-dd')",
              "rs":"RS",//人数
              "xbbhl":"XBBHL",//相比变化率
        };
    },
    getTable: function () {
        return "DP_LYRSTJJZS";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
