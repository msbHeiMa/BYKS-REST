var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "type":"TYPE",
             "name":"NAME",
             "value":"VALUE",
             "color":"COLOR",
        };
    },
    getTable: function () {
        return "BYKS_TBSJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;