/*
create table DP_CZJRWZJMKZPTJ 
(
   ID                   VARCHAR2(36),
   AREA                 VARCHAR2(50),
   TJ_DATE              DATE,
   CZZSR                NUMBER(9,1),
   CZZSR_TQZZL          NUMBER(5,2),
   DFCZSR               NUMBER(9,1),
   DFCZSR_TQZZL         NUMBER(5,2),
   WBCKYE               NUMBER(9,3),
   WBCKYE_TQZZL         NUMBER(5,2),
   WBDKYE               NUMBER(9,3),
   WBDKYE_TQZZL         NUMBER(5,2),
   JCKZE                NUMBER(8,1),
   JCKZE_TQZJL          NUMBER(5,2),
   CKZE                 NUMBER(8,1),
   CKZE_TQZJL           NUMBER(5,2),
   HTWZ                 NUMBER(8,1),
   HTWZ_TQZJL           NUMBER(5,2),
   SYWZ                 NUMBER(8,1),
   SYWZ_TQZJL           NUMBER(5,2),
   CSJMKZPSR            NUMBER(8),
   CSJMKZPSR_TQZJL      NUMBER(5,2),
   XCJMKZPSR            NUMBER(8),
   XCJMKZPSR_TQZJL      NUMBER(5,2),
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
              "id":"ID",//主键
              "area":"AREA",//地区
              "tjDate":"TO_CHAR(TJ_DATE,'yyyy-mm')",//统计日期
              "czzsr":"CZZSR",//财政总收入（亿元）
              "czzsrTqzzl":"CZZSR_TQZZL",//财政总收入同期增长率
              "dfczsr":"DFCZSR",//地方财政收入(亿元)
              "dfczsrTqzzl":"DFCZSR_TQZZL",//地方财政收入同期增长率
              "wbckye":"WBCKYE",//金融机构本外币存款余额(千万元)
              "wbckyeTqzzl":"WBCKYE_TQZZL",//金融机构本外币存款余额同期增长率
              "wbdkye":"WBDKYE",//金融机构本外币贷款余额(千万元)
              "wbdkyeTqzzl":"WBDKYE_TQZZL",//金融机构本外币贷款余额同期增长率
              "jckze":"JCKZE",//进出口总额(亿元)
              "jckzeTqzjl":"JCKZE_TQZJL",//进出口总额同期增减率
              "ckze":"CKZE",//出口总额(亿元)
              "ckzeTqzjl":"CKZE_TQZJL",//出口总额同期增减率
              "htwz":"HTWZ",//合同外资(万美元)
              "htwzTqzjl":"HTWZ_TQZJL",//合同外资同期增减率
              "sywz":"SYWZ",//实用外资(万美元)
              "sywzTqzjl":"SYWZ_TQZJL",//实用外资同期增减率
              "jmkzpsr":"CSJMKZPSR",//城市军民可支配收入(元)
              "jmkzpsrTqjzl":"CSJMKZPSR_TQZJL",//城市军民可支配收入同期增减率
              "xcjmkzpsr":"XCJMKZPSR",//乡村居民可支配收入(元)
              "xcjmkzpsrTqzjl":"XCJMKZPSR_TQZJL",//乡村居民可支配收入同期增减率
        };
    },
    getTable: function () {
        return "DP_CZJRWZJMKZPTJ ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
