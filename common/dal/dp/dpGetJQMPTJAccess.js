/*
create table DP_JQMPTJ 
(
   ID                   VARCHAR2(36),
   YEAR                 NUMBER(4),
   MPSR                 NUMBER(8),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_JQMPTJ.CREATE_USER is
'扩展';

comment on column DP_JQMPTJ.CREATE_DATE is
'扩展';

comment on column DP_JQMPTJ.UPDATE_USER is
'扩展';

comment on column DP_JQMPTJ.UPDATE_DATE is
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
              "mpsr":"MPSR",//门票收入
        };
    },
    getTable: function () {
        return "DP_JQMPTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
