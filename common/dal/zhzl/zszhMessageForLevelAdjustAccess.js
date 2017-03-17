
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            //人员基本信息
            "id": "t1.ID",//id（人口主键）
            "cardNum": "t1.CARD_NUM",//身份证号码
            "name": "t1.NAME",//姓名 
            "rAddr": "t1.R_ADDR",//现住地详址       
            "gridId": "t1.G_ID",//所属单位代码
            "manageLevel": "t2.MANAGE_LEVEL",//管理等级 
            "dangerRank": "t2.DANGER_RANK",//危险等级
            //精神病信息
            "JSBId": "t2.ID",//精神病主键（精神病主键）
            //回访周期，推荐回访周期
            "gvisitCyc": "t3.G_VISITCYC", //回访周期
            "pvisitCyc": "t3.P_VISITCYC",//回访周期外键
            "dvisitCyc": "t3.D_VISITCYC",//回访人
            "rgvisitCyc": "t3.RG_VISITCYC",//回访周期
            "rpvisitCyc": "t3.RP_VISITCYC",//回访人
            "rdvisitCyc": "t3.RD_VISITCYC",//回访周期


        };
    },
    getTable: function () {
        return "ZZ_ZSZHJSB t2 INNER JOIN ZZ_PERSON t1 ON t1.ID=t2.P_ID LEFT JOIN ZZ_ZSZH_VISITCYC t3 ON t2.ID=t3.Z_ID";
    }
}, baseAccess.prototype);
module.exports = tableAccess;