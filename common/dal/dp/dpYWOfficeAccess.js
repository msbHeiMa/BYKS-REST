var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
          //  "id": "ID",
            "officeId": "OFFICEID",
            "officeName": "OFFICENAME",
        };
    },
    getTable: function () {
        return "DP_YW_OFFICE";
    },
}, baseAccess.prototype);
module.exports = tableAccess;