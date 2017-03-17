/*
create table DP_NYHYCZ 
(
   ID                   VARCHAR2(36),
   AREA                 VARCHAR2(50),
   TJ_DATE              DATE,
   TOTAL                NUMBER(9,1),
   TOTAL_ZZL            NUMBER(5,2),
   NY                   NUMBER(9,1),
   NY_ZZL               NUMBER(5,2),
   LY                   NUMBER(9,1),
   LY_ZZL               NUMBER(5,2),
   MY                   NUMBER(9,1),
   MY_ZZL               NUMBER(5,2),
   FISHERY              NUMBER(9,1),
   FISHERY_ZZL          NUMBER(5,2),
   NLMYFWY              NUMBER(9,1),
   NLMYFWY_ZZL          NUMBER(5,2),
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
              "total":"TOTAL",//合计(亿元)
              "totalZzl":"TOTAL_ZZL",//合计增长率
              "ny":"NY",//农业（亿元）
              "nyZzl":"NY_ZZL",//农业增长率
              "ly":"LY",//林业（亿元）
              "lyZzl":"LY_ZZL",//林业增长率
              "my":"MY",//牧业(亿元)
              "myZzl":"MY_ZZL",//牧业增长率
              "fishery":"FISHERY",//渔业(亿元)
              "fisheryZzl":"FISHERY_ZZL",//渔业增长率
              "nlmyfwy":"NLMYFWY",//农林目渔服务业（亿元）
              "nlmyfwfZzl":"NLMYFWY_ZZL",//农林目渔服务业增长率
        };
    },
    getTable: function () {
        return "DP_NYHYCZ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
