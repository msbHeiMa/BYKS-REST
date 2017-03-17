/*
create table DP_SNWTLDQCZ 
(
   ID                   VARCHAR2(36),
   SF                   VARCHAR2(10),
   AREA                 VARCHAR2(50),
   TJ_DATE              DATE,
   CZ                   NUMBER(9,2),
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
              "sf":"SF",//省份
              "area":"AREA",//地区
              "tjDate":"TO_CHAR(TJ_DATE,'yyyy-mm')",//统计时间
              "cz":"CZ",//产值（亿元）
        };
    },
    getTable: function () {
        return "DP_SNWTLDQCZ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
