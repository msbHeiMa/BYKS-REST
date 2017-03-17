/*
create table DP_JQSSMPTJ 
(
   ID                   VARCHAR2(36),
   TIME                 DATE,
   JQMC                 VARCHAR2(100),
   SR                   NUMBER(8),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_JQSSMPTJ.CREATE_USER is
'扩展';

comment on column DP_JQSSMPTJ.CREATE_DATE is
'扩展';

comment on column DP_JQSSMPTJ.UPDATE_USER is
'扩展';

comment on column DP_JQSSMPTJ.UPDATE_DATE is
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
              "sr":"SR",//收入（万元）
        };
    },
    getTable: function () {
        return "DP_JQSSMPTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
