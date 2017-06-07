//BYKS_COURSE
//BYKS_USER
//BYKS_MYMANAGE
//BYKS_KCDETAIL
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"BYKS_MYMANAGE.ID",//我的管理里的数据ID（唯一凭证）
             "userId":"BYKS_MYMANAGE.USER_ID",//用户ID
             "manageType":"BYKS_MYMANAGE.MANAGE_TYPE",//管理类型（报名 关注 上传）
             "kcId":"BYKS_MYMANAGE.KC_ID",//课程ID
             "createDate":"BYKS_MYMANAGE.CREATE_DATE",//数据添加时间
             "user_id":"BYKS_USER.ID",//用户ID
             "userName":"BYKS_USER.USERNAME",//用户名称
             "kcid":"BYKS_COURSE.ID",//课程ID
             "courseName":"BYKS_COURSE.COURSENAME",//课程名称
             "keShi":"BYKS_COURSE.KESHI",//课时
             "kc_id":"BYKS_KCDETAIL.KC_ID",//课程ID
             "money":"BYKS_KCDETAIL.MONEY",//报名费
        };
    },
    getTable: function () {
        return "BYKS_MYMANAGE LEFT JOIN BYKS_USER ON BYKS_MYMANAGE.USER_ID=BYKS_USER.ID LEFT JOIN BYKS_COURSE ON BYKS_MYMANAGE.KC_ID=BYKS_COURSE.ID LEFT JOIN BYKS_KCDETAIL ON BYKS_MYMANAGE.KC_ID=BYKS_KCDETAIL.KC_ID ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;