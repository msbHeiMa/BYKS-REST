var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",
             "rdBiaoTi":"RD_BIAOTI",
             "rdIntro":"RD_INTRO",
             "rdImages":"RD_IMAGES",
             "createDate":"CREATE_DATE",
             "updateDate":"UPDATE_DATE",
        };
    },
    getTable: function () {
        return "BYKS_RDTS";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;