/*
create table DP_LYXGCYSRTJ 
(
   ID                   VARCHAR2(36),
   TIME                 DATE                 not null,
   HY                   VARCHAR2(50),
   SR                   NUMBER(8),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_LYXGCYSRTJ.CREATE_USER is
'扩展';

comment on column DP_LYXGCYSRTJ.CREATE_DATE is
'扩展';

comment on column DP_LYXGCYSRTJ.UPDATE_USER is
'扩展';

comment on column DP_LYXGCYSRTJ.UPDATE_DATE is
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
              "time":"TO_CHAR(TIME,'yyyy-mm-dd')",//时间
              "hy":"HY",//行业
              "sr":"SR",//收入（万元）
        };
    },
    getTable: function () {
        return "DP_LYXGCYSRTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
