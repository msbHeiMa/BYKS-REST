var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",//主键
             "userId":"USER_ID",//用户ID
             "manageType":"MANAGE_TYPE",//管理类型
             "zpId":"ZP_ID",//作品ID
             "kcId":"KC_ID",//课程ID
             "createDate":"CREATE_DATE",//添加日期
             "updateDate":"UPDATE_DATE",//修改日期
        };
    },
    getTable: function () {
        return "BYKS_MYMANAGE";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;