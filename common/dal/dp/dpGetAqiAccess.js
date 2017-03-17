/*
create table DP_AQI 
(
   ID                   VARCHAR2(36)         not null,
   JC_DATE              DATE,
   AQI                  number(5),
   PFK_BM               VARCHAR2(50),
   PFL                  VARCHAR2(50),
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
              "jcDate":"TO_CHAR(JC_DATE,'yyyy-mm-dd')",//检测时间
              "aqi":"AQI",//AQI
              "pfkBm":"PFK_BM",//空气质量等级
              "pm2_5":"PM2_5",//空气质量指数
        };
    },
    getTable: function () {
        return "DP_AQI";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
