/*
create table DP_JCFSRSJ 

*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "jcfsNewTime":"TO_CHAR(MAX(TIME),'yyyy-mm-dd HH24')",
        };
    },
    getTable: function () {
        return "DP_JCFSRSJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
