var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "ID":"id",
             "courseName":"COURSENAME",
             "crowd":"CROWD",
             "keShi":"KESHI",
             "kcImages":"KC_IMAGES",
             "createDate":"TO_CHAR(CREATE_DATE,'yyyy-mm-dd')",
             "updateDate":"UPDATE_DATE",
        };
    },
    getTable: function () {
        return "BYKS_COURSE";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;