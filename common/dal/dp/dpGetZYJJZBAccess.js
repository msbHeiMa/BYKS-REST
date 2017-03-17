/*
create table DP_ZYJJZB 
(
   ID                   VARCHAR2(36),
   AREA                 VARCHAR2(50),
   TJ_DATE              DATE,
   YDL                  NUMBER(9,1),
   YDL_TQZJB            NUMBER(5,2),
   SHXFPLSZE            NUMBER(9,1),
   SHXFPLSZE_TQZJB      NUMBER(5,2),
   GDZCTZ               NUMBER(9,1),
   GDZCTZ_TQZJB         NUMBER(5,2),
   WYGDPNH              NUMBER(9,1),
   WYGDPNH_TQZJB        NUMBER(5,2),
   YJYSYJFZC            NUMBER(9,1),
   YJYSYJFZC_TQZJB      NUMBER(5,2),
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
            "id": "ID",//ID
            "area":"AREA ",//地区
            "tjDate":"TO_CHAR(TJ_DATE,'yyyy-mm')",//统计日期
            "zrk":"ZRK",//总人口（万人）
            "ydl":"YDL",//用电量(亿千瓦时)
            "ydlTqzjl":"YDL_TQZJL",//用电量同期增减率
            "shxfplsze":"SHXFPLSZE",//社会消费品零售总额(亿元)
            "shxfplszeTqzjl":"SHXFPLSZE_TQZJL",//社会消费品零售总额同期增减率
            "gdzctz":"GDZCTZ",//固定资产投资(亿元)
            "gdzctzTqzjl":"GDZCTZ_TQZJL",//固定资产投资同期增减率
            "wygdpnh":"WYGDPNH ",//万元GDP能耗(吨标准煤/万元)
            "wygdpnhTqzjl":"WYGDPNH_TQZJL",//万元GDP能耗同期增减率
            "yjysyjfzc":"YJYSYJFZC",//研究与试验经费支出(亿元)
            "yjysyjfzcTqzjl":"YJYSYJFZC_TQZJL",//研究与试验经费支出同期增减率
        };
    },
    getTable: function () {
        return "DP_ZYJJZB";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
