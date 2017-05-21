//BYKS_ZP
//BYKS_MYMANAGE
//BYKS_COURSE
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"BYKS_MYMANAGE.ID",//主键
             "userId":"BYKS_MYMANAGE.USER_ID",//用户ID
             "manageType":"BYKS_MYMANAGE.MANAGE_TYPE",//管理类型
             "zpId":"BYKS_MYMANAGE.ZP_ID",//作品ID
             "kcIp":"BYKS_MYMANAGE.KC_ID",//课程ID
             "kc_id":"BYKS_COURSE.ID",//课程ID
             "courseName":"BYKS_COURSE.COURSENAME",//课程名称
             "crowd":"BYKS_COURSE.CROWD",//适合人群
             "keShi":"BYKS_COURSE.KESHI",//课时
             "kcImages":"BYKS_COURSE.KC_IMAGES",//课程图片
             "zp_id":"BYKS_ZP.ID",//作品ID
             "utterer":"BYKS_ZP.UTTERER",//发表人
             "worksName":"BYKS_ZP.WORKSNAME",//作品名称
             "worksType":"BYKS_ZP.WORKSTYPE",//作品类型
             "likeTime":"BYKS_ZP.LIKETIME",//点赞次数
             "worksIntro":"BYKS_ZP.WORKSINTRO",//作品内容
             "worksImages":"BYKS_ZP.WORKSIMAGES",//作品图片
             "createDate":"TO_CHAR(BYKS_MYMANAGE.CREATE_DATE,'yyyy-mm-dd')",//添加日期
             "updateDate":"BYKS_MYMANAGE.UPDATE_DATE",//修改日期
        };
    },
    getTable: function () {
        return "BYKS_MYMANAGE LEFT JOIN BYKS_ZP ON BYKS_MYMANAGE.ZP_ID=BYKS_ZP.ID LEFT JOIN BYKS_COURSE ON BYKS_COURSE.ID=BYKS_MYMANAGE.KC_ID";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;