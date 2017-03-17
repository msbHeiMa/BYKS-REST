
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
/**
 * 新增回访记录：身份证  姓名  曾用名  性别  出生日期  民族  服务处所  联系方式  
 * 婚姻状况  血型  现住地  现住地详细地址  目前危险性评估等级  管理级别   回访频率  
 *  家庭经济状况   是否纳入低保   监护人信息（姓名  身份证 联系方式  现居住地）
 */
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            //t1:ZZ_PERSON  t2:ZZ_ZSZHJSB   t3:ZZ_ZSZH_VISITCYC
            //实有人口信息
            "id": "t1.ID",
            "cardNum": "t1.CARD_NUM",//身份证号码
            "name": "t1.NAME",//姓名
            "usedName": "t1.USED_NAME",//曾用名
            "gender": "t1.GENDER",//性别
            "birthDate": "t1.BIRTH_DATE",//出生日期
            "nation": "t1.NATION",//民族
            "sPlace": "t1.S_PLACE",//服务处所
            "phone": "t1.PHONE",//联系方式
            "maritalStatus": "t1.MARITAL_STATUS",//婚姻状况
            "bloodType": "t1.BLOOD_TYPE",//血型
            "residence": "t1.RESIDENCE",//现住地
            "rAddr": "t1.R_ADDR",//现住地详址
            //精神病信息
            "JSBId": "t2.ID",
            "dangerRank": "t2.DANGER_RANK",//危险等级
            "manageLevel": "t2.MANAGE_LEVEL",//管理等级
            //      "visitCyc":"t2.VISIT_CYC",//随访周期(新添加)
            "ecoSituatio": "t2.ECO_SITUATION",//家庭经济状况
            "isEfficiency": "t2.IS_EFFICIENCY",//是否纳入低保
            //监护人信息
            "guarderCardNum": "t2.GUARDER_CARD_NUM",//身份证号
            "guarderName": "t2.GUARDER_NAME",//姓名
            "guarderTel": "t2.GUARDER_TEL",//联系方式
            "guarderAddr": "t2.GUARDER_ADDR",//监护人详细地址

            //回访周期，推荐回访周期
            "cycJSBId": "t3.t3.Z_ID",
            "gvisitCyc": "t3.G_VISITCYC", //回访周期
            "pvisitCyc": "t3.P_VISITCYC",//回访周期外键
            "dvisitCyc": "t3.D_VISITCYC",//回访人
            "rgvisitCyc": "t3.RG_VISITCYC",//回访周期
            "rpvisitCyc": "t3.RP_VISITCYC",//回访人
            "rdvisitCyc": "t3.RD_VISITCYC",//回访周期
        };
    },
    getTable: function () {
        return "(ZZ_ZSZHJSB t2 INNER JOIN ZZ_PERSON t1 ON t1.ID=t2.P_ID)LEFT JOIN ZZ_ZSZH_VISITCYC t3 ON t2.ID=t3.Z_ID";
    }
}, baseAccess.prototype);
module.exports = tableAccess;