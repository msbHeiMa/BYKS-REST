/*
table DP_ZYJJZB 
table DP_CZJRWZJMKZPTJ 
table DP_GDPTJ 
table DP_GMYSGYCZ 
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
              "id":"DP_ZYJJZB.ID",//ID
              "tjDate":"TO_CHAR(DP_ZYJJZB.TJ_DATE,'yyyy-mm')",//统计日期
              "zyArea":"DP_ZYJJZB.AREA",
              "czArea":"DP_CZJRWZJMKZPTJ.AREA ",
              "gdpArea":"DP_GDPTJ.AREA ",
              "gmArea":"DP_GMYSGYCZ.AREA",
              "zrk":"DP_ZYJJZB.ZRK",//总人口（万人）
              "gdzctz":"DP_ZYJJZB.GDZCTZ",//固定资产投资总额（亿元）
              "csjmsr":"DP_CZJRWZJMKZPTJ.CSJMKZPSR",//城市居民收入（元）
              "xcjmsr":"DP_CZJRWZJMKZPTJ.XCJMKZPSR",//乡村居民收入（元）
              "czTjDate":"TO_CHAR(DP_CZJRWZJMKZPTJ.TJ_DATE,'yyyy-mm')",
              "gdpTjDate":"TO_CHAR(DP_GDPTJ.TJ_DATE,'yyyy-mm')",
              "gdp":"DP_GDPTJ.GDP",//GDP(亿元)
              "gmTjDate":"TO_CHAR(DP_GMYSGYCZ.TJ_DATE,'yyyy-mm')",
              "gyzjz":"DP_GMYSGYCZ.GYXSCZ",//工业增加值（亿元）
        };
    },
    getTable: function () {
        return `DP_ZYJJZB
                LEFT JOIN DP_CZJRWZJMKZPTJ ON TO_CHAR (
                    DP_ZYJJZB.TJ_DATE,
                    'yyyy-mm'
                ) = TO_CHAR (
                    DP_CZJRWZJMKZPTJ.TJ_DATE,
                    'yyyy-mm'
                ) AND DP_ZYJJZB.AREA=DP_CZJRWZJMKZPTJ.AREA
                LEFT JOIN DP_GDPTJ ON TO_CHAR (
                    DP_CZJRWZJMKZPTJ.TJ_DATE,
                    'yyyy-mm'
                ) = TO_CHAR (DP_GDPTJ.TJ_DATE, 'yyyy-mm') AND DP_CZJRWZJMKZPTJ.AREA=DP_GDPTJ.AREA
                LEFT JOIN DP_GMYSGYCZ ON TO_CHAR (
                    DP_GMYSGYCZ.TJ_DATE,
                    'yyyy-mm'
                ) = TO_CHAR (DP_GDPTJ.TJ_DATE, 'yyyy-mm') AND DP_GDPTJ.AREA=DP_GMYSGYCZ.AREA`;
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
