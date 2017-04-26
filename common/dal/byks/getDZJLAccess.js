var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",//主键
             "zpId":"ZP_ID",//作品ID
             "userId":"USER_ID",//用户ID
             "createDate":"CREATE_DATE",
        };
    },
    getTable: function () {
        return "BYKS_DZJL";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;