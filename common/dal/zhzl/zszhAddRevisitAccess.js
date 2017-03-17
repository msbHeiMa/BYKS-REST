var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "zId":"Z_ID",//精神病主键
            "visitDate": "VISIT_DATE",//回访日期
            "visitPeople": "VISIT_PEOPLE",//回访人
            "isWithManager": "ISWITHGUARDIAN",//是否和监护人同住
            "isMedication": "ISMEDICATION",//是否按时服药
            "isHarmBehavior": "ISHARMBEHAVIOR",//是否有危害行为
            "visitCom":"VISIT_COM",
            "remarks":"REMARKS",
        };
    },
    getTable: function () {
        return "ZZ_ZSZH_VISITHIS";
    },
}, baseAccess.prototype);
module.exports = tableAccess;
