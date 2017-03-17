/*
create table DP_GMYSGYCZ 
(
   ID                   VARCHAR2(36),
   AREA                 VARCHAR2(50),
   TJ_DATE              DATE,
   GSGYZCZ              NUMBER(8,2),
   GSGYZCZ_ZJL          NUMBER(5,2),
   DZXGYQY              NUMBER(8,2),
   DZXGYQY_ZJL          NUMBER(5,2),
   XXGYQY               NUMBER(8,2),
   XXGYQY_ZJL           NUMBER(5,2),
   XCPCZ                NUMBER(8,2),
   XCPCZ_ZJL            NUMBER(5,2),
   GYXSCZ               NUMBER(8,2),
   GYXSCZ_ZJL           NUMBER(5,2),
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
              "gsgyzcz":"GSGYZCZ",//规上工业总产值（亿元）
              "gsgyzczZjl":"GSGYZCZ_ZJL",//规上工业总产值增减率
              "dzxgyqy":"DZXGYQY",//大中型工业企业(亿元)
              "dzxgyqyZjl":"DZXGYQY_ZJL",//大中型工业企业增减率
              "xxgyqy":"XXGYQY",//小型工业企业(亿元)
              "xxgyqyZjl":"XXGYQY_ZJL",//小型工业企业增减率
              "xcpcz":"XCPCZ",//新产品产值(亿元)
              "xcpczZjl":"XCPCZ_ZJL",//新产品产值增减率
              "gyxscz":"GYXSCZ",//工业销售产值(亿元)
              "gyxsczZjl":"GYXSCZ_ZJL",//工业销售产值增减率
        };
    },
    getTable: function () {
        return "DP_GMYSGYCZ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
