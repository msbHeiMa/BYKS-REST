var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
         //   "id": "ID",
            "systemId": "SYSTEMID",
            "systemName": "SYSTEMNAME",
        };
    },
    getTable: function () {
        return "DP_YW_SYSTEM";
    },
}, baseAccess.prototype);
module.exports = tableAccess;