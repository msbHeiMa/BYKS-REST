/*
create table DP_LYYTJ 
(
   ID                   VARCHAR2(36),
   YEAR                 NUMBER(4),
   ZSR                  NUMBER(8),
   ZRS                  NUMBER(8),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_LYYTJ.CREATE_USER is
'扩展';

comment on column DP_LYYTJ.CREATE_DATE is
'扩展';

comment on column DP_LYYTJ.UPDATE_USER is
'扩展';

comment on column DP_LYYTJ.UPDATE_DATE is
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
              "zsr":"ZSR",//总收入
              "zrs":"ZRS",//总人口
        };
    },
    getTable: function () {
        return "DP_LYYTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
