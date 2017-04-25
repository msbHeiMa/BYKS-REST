var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",
             "jcBiaoTi":"JC_BIAOTI",
             "jcIntro":"JC_INTRO",
             "jcImages":"JC_IMAGES",
             "createDate":"TO_CHAR(CREATE_DATE,'yyyy-mm-dd')",
             "updateDate":"UPDATE_DATE",
        };
    },
    getTable: function () {
        return "BYKS_JCNR";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;