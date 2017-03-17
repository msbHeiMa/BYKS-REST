var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getHasBase4Column:function(){
        return false;
    },
    getColumns:function(){
        return {
            "id":"ID",
            "domainName":"DOMAINNAME",
            "key":"KEY",
            "value":"VALUE",
            "creator":"CREATOR",
            "createDate":"createDate",
            "updateDate":"updateDate",
        };
    },
    getTable:function(){
        return "DOMAINS";
    }
},baseAccess.prototype);
module.exports = tableAccess;