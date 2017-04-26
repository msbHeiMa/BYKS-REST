var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",
             "zpId":"ZP_ID",
             "plContant":"PL_CONTANT",
             "plrName":"PLR_NAME",
             "createDate":"CREATE_DATE",
             "updateDate":"UPDATE_DATE",
        };
    },
    getTable: function () {
        return "BYKS_PLGL";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;