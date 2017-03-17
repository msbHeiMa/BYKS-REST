var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",//主键
            "zId":"Z_ID",//表ZZ_ZSZH_JSBId主键
            "gvisitCyc": "G_VISITCYC", //回访周期
            "pvisitCyc": "P_VISITCYC",//回访周期外键
            "dvisitCyc": "D_VISITCYC",//回访人
            "rgvisitCyc": "RG_VISITCYC",//回访周期
            "rpvisitCyc": "RP_VISITCYC",//回访人
            "rdvisitCyc": "RD_VISITCYC",//回访周期
        };
    },
    getTable:function(){
        return "ZZ_ZSZH_VISITCYC";
    }
},baseAccess.prototype);
module.exports = tableAccess;