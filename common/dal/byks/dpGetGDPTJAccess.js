/*
create table DP_GDPTJ 
(
   ID                   VARCHAR2(36),
   AREA                 VARCHAR2(50),
   TJ_DATE              DATE,
   GDP                  NUMBER(9,1),
   GDP_TQZZL            NUMBER(5,2),
   DYCY                 NUMBER(9,1),
   DYCY_TQZZL           NUMBER(5,2),
   DYCY_ZB              NUMBER(3,1),
   DECY                 NUMBER(9,1),
   DECY_TQZZL           NUMBER(5,2),
   DECY_ZB              NUMBER(3,1),
   DSCY                 NUMBER(9,1),
   DSCY_TQZZL           NUMBER(5,2),
   DSCY_ZB              NUMBER(3,1),
   ZLXXCY               NUMBER(9,1),
   ZLXXCY_TQZZL         NUMBER(5,2),
   ZLXXCY_ZB            NUMBER(3,1),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
              "id":"ID",//ID
              "area":"AREA",//地区
              "tjDate":"TO_CHAR(TJ_DATE,'yyyy-mm')",//统计日期
              "gdp":"GDP",//GDP（亿元）
              "gdpTqzzl":"GDP_TQZZL",//GDP同期增长率
              "dycy":"DYCY",//第一产业(亿元)
              "dycyTqzzl":"DYCY_TQZZL",//第一产业同期增长率
              "dycyZb":"DYCY_ZB",//第一产业占比
              "decy":"DECY",//第二产业（亿元）
              "decyTqzzl":"DECY_TQZZL",//第二产业同期增长率
              "decyZb":"DECY_ZB",//第二产业占比
              "dscy":"DSCY",//第三产业（亿元）
              "dscyTqzzl":"DSCY_TQZZL",//第三产业同期增长率
              "dscyZb":"DSCY_ZB",//第三产业占比
              "zlxxcy":"ZLXXCY",//战略新兴产业（亿元）
              "zlxxcyTqzzl":"ZLXXCY_TQZZL",//战略新兴产业同期增长率
              "zlxxcyZb":"ZLXXCY_ZB",//战略新兴产业占比
        };
    },
    getTable: function () {
        return "DP_GDPTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
