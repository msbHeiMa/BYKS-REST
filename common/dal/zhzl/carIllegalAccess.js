var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "cId":"C_ID",
            "illegalNumber":"ILLEGAL_NUMBER",
            "illegalDate":"ILLEGAL_DATE",
            "illegalAdd":"ILLEGAL_ADD",
            "illegalAction":"ILLEGAL_ACTION",
            "score":"SCORE",
            "amount":"AMOUNT",
            "status":"STATUS",
        };
    },
    getTable:function(){
        return "ZZ_CAR_ILLEGAL";
    }
},baseAccess.prototype);
module.exports = tableAccess;
