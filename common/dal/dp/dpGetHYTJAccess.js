/*
create table DP_HYTJ 
(
   ID                   VARCHAR2(36),
   YEAR                 NUMBER(4),
   SLHYL                NUMBER(8),
   GLHYL               NUMBER(8),
   HYZZL                NUMBER(5,2),
   HY_TUMOVER           NUMBER(8)            null
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_HYTJ.CREATE_USER is
'扩展';

comment on column DP_HYTJ.CREATE_DATE is
'扩展';

comment on column DP_HYTJ.UPDATE_USER is
'扩展';

comment on column DP_HYTJ.UPDATE_DATE is
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
              "slhyl":"SLHYL",//水路货运量（万吨）
              "glhyl":"GLHYL",//公路货运量（万吨）
              "hyTumover":"HY_TUMOVER",//货运周转量(万吨)
              "hyzzl":"HYZZL",//货运增长率
        };
    },
    getTable: function () {
        return "DP_HYTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
