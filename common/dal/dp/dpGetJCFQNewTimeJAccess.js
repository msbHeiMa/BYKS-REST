/*
create table DP_JCFQRSJ 

*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "jcfqNewTime":"TO_CHAR(MAX(TIME),'yyyy-mm-dd HH24')",
        };
    },
    getTable: function () {
        return "DP_JCFQRSJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
