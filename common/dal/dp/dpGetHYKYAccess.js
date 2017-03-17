/*
table DP_HYTJ 
table DP_KYLTJ
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
              "hyYear":"DP_HYTJ.YEAR",//年度
              "slhyl":"DP_HYTJ.SLHYL",//水路货运量（万吨）
              "glhyl":"DP_HYTJ.GLHYL",//公路货运量（万吨）
              "hyTumover":"DP_HYTJ.HY_TUMOVER",//货运周转量(万吨)
              "kyYear":"DP_KYLTJ.YEAR",//年度
              "kyl":"DP_KYLTJ.KYL",//客运量（万人）
              "kyTumover":"DP_KYLTJ.KY_TUMOVER",//客运周转量
        };
    },
    getTable: function () {
        return "DP_HYTJ INNER JOIN DP_KYLTJ ON DP_HYTJ.YEAR=DP_KYLTJ.YEAR";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
