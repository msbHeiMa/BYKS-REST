/*
create table DP_JQSSRSTJ 
(
   ID                   VARCHAR2(36),
   TIME                 DATE,
   JQMC                 VARCHAR2(100),
   RS                   NUMBER(8),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_JQSSRSTJ.CREATE_USER is
'扩展';

comment on column DP_JQSSRSTJ.CREATE_DATE is
'扩展';

comment on column DP_JQSSRSTJ.UPDATE_USER is
'扩展';

comment on column DP_JQSSRSTJ.UPDATE_DATE is
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
              "jqmc":"JQMC",//景区名称
              "sr":"RS",//人数
        };
    },
    getTable: function () {
        return "DP_JQSSRSTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
