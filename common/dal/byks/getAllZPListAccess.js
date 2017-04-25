var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",//主键
             "utterer":"UTTERER",//发表人
             "fbTime":"TO_CHAR(FB_TIME,'yyyy-mm-dd')",//发表时间
             "worksName":"WORKSNAME",//作品名称
             "worksType":"WORKSTYPE",//作品类型
             "likeTime":"LIKETIME",//点赞次数
             "worksIntro":"WORKSINTRO",//作品内容
             "worksImages":"WORKSIMAGES",//作品图片
             "createDate":"TO_CHAR(CREATE_DATE,'yyyy-mm-dd')",//添加日期
             "updateDate":"UPDATE_DATE",//修改日期
        };
    },
    getTable: function () {
        return "BYKS_ZP";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;