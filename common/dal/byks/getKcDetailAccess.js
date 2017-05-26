var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",//主键
             "kcId":"KC_ID",//课程主键
             "skAdderss":"SK_ADDRESS",//上课地点
             "skTime":"SK_TIME",//上课时间
             "money":"MONEY",//报名费
             "skDs":"SK_DS",//上课导师
             "skDsTel":"SK_DSTEL",//上课导师电话
             "kcFzr":"KC_FZR",//课程负责人
             "kcFzrTel":"KC_FZRTEL",//负责人电话
             "createDate":"CREATE_DATE",//添加日期
             "updateDate":"UPDATE_DATE",//修改日期
        };
    },
    getTable: function () {
        return "BYKS_KCDETAIL";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;