/*
create table DP_KYLTJ 
(
   ID                   VARCHAR2(36),
   YEAR                 NUMBER(4),
   KYL                  NUMBER(8),
   TBZZL                NUMBER(5,2),
   KY_TUMOVER           NUMBER(8)            NULL
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_KYLTJ.CREATE_USER is
'扩展';

comment on column DP_KYLTJ.CREATE_DATE is
'扩展';

comment on column DP_KYLTJ.UPDATE_USER is
'扩展';

comment on column DP_KYLTJ.UPDATE_DATE is
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
              "kyl":"KYL",//客运量（万人）
              "kyTumover":"KY_TUMOVER",//客运周转量
              "tbzzl":"TBZZL",//同比增长率
        };
    },
    getTable: function () {
        return "DP_KYLTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
