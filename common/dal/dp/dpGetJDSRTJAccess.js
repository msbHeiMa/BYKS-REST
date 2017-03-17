/*
create table DP_JDSRTJ 
(
   ID                   VARCHAR2(36),
   YEAR                 NUMBER(4),
   JDMC                 VARCHAR2(100),
   ZSR                  NUMBER(8),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_JDSRTJ.CREATE_USER is
'扩展';

comment on column DP_JDSRTJ.CREATE_DATE is
'扩展';

comment on column DP_JDSRTJ.UPDATE_USER is
'扩展';

comment on column DP_JDSRTJ.UPDATE_DATE is
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
              "jdmc":"JDMC",//景点名称
              "zsr":"ZSR",//总收入
        };
    },
    getTable: function () {
        return "DP_JDSRTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
