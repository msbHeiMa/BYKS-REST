var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",//主键
             "rdBiaoTi":"RD_BIAOTI",//热点标题
             "rdIntro":"RD_INTRO",//热点内容
             "rdImages":"RD_IMAGES",//热点图片（单张）
             "rdXxnr":"RD_XXNR",//详细内容
             "rdXximgs":"RD_XXIMGS",//详细图片（多张）
             "createDate":"TO_CHAR(CREATE_DATE,'yyyy-mm-dd')",//创建日期
             "updateDate":"UPDATE_DATE",//修改日期
        };
    },
    getTable: function () {
        return "BYKS_RDTS";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;