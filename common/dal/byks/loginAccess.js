var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",
             "userName":"USERNAME",
             "passWord":"PASSWORD",
             "userImage":"USERIMAGE",
             "createDate":"CREATE_DATE",
             "updateDate":"UPDATE_DATE",
        };
    },
    getTable: function () {
        return "BYKS_USER";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;