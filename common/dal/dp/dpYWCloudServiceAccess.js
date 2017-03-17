var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "siteNum": "SITE_NUM",
            "visitNum": "VISIT_NUM",
            "thingsNum":"THINGS_NUM",
            "siteRN":"SITE_ID",
            "visitRN":"VISIT_ID",
            "thingsRN":"THINGS_ID",
        };
    },
    getTable: function () {
        return "DP_YW_CLOUDSERVICE";
    },
}, baseAccess.prototype);
module.exports = tableAccess;