
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
           "JSBId":"Z_ID",
           "zszhDate":"ZSZH_DATE",//肇事肇祸日期
           "zszhAddr":"ZSZH_ADDR",//肇事肇祸地点
           "zszhCom":"ZSZH_COM",//肇事肇祸结果
        };
    },
    getTable:function(){
        return "ZZ_ZSZH_ZSZH";
    }
},baseAccess.prototype);
module.exports = tableAccess;