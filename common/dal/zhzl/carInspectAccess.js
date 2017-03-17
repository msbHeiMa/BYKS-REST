var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "cId":"C_ID",
            "validityTerm":"VALIDITY_TERM",
            "inspectDate":"INSPECT_DATE",
        };
    },
    getTable:function(){
        return "ZZ_CAR_INSPECT";
    }
},baseAccess.prototype);
module.exports = tableAccess;
