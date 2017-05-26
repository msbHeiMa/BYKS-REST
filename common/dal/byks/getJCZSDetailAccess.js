var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",//主键
             "jcnrId":"JCNR_ID",//精彩内容ID
             "ssTime":"TO_CHAR(SS_TIME,'yyyy-mm-dd')",//上市时间
             "cpJs":"CP_JS",//产品介绍
             "cpCd":"CP_CD",//产品长度
             "cpKd":"CP_KD",//产品宽度
             "cpGd":"CP_GD",//产品高度
             "shrq":"SHRQ",//适合人群
             "zjgs":"ZJGS",//组建个数
             "kzxt":"KZXT",//可组形态
             "cpzs":"CPZS",//成品展示
             "createDate":"TO_CHAR(CREATE_DATE,'yyyy-mm-dd')",//创建日期
             "updateDate":"UPDATE_DATE",//修改日期
        };
    },
    getTable: function () {
        return "BYKS_CPDETAIL";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;