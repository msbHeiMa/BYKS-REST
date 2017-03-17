
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
           //人员基本信息
           /***姓名 身份证号 性别 户籍地 户籍地详细地址  现住地 现住地详细地址 
            目前诊断类型 危险等级  有无肇事肇祸历史 肇事肇祸次数*/       
           "id" :"ZZ_PERSON.ID",//id
           "name" :"ZZ_PERSON.NAME",//姓名
           "cardNum":"ZZ_PERSON.CARD_NUM",//身份证号码
           "gender" :"ZZ_PERSON.GENDER",//性别
           "domicile":"ZZ_PERSON.DOMICILE",//户籍地
           "dAddr":"ZZ_PERSON.D_ADDR",//户籍地详细地址
           "residence":"ZZ_PERSON.RESIDENCE",//现住地
           "rAddr":"ZZ_PERSON.R_ADDR",//现住地详址
           //精神病信息
           "JSBId":"ZZ_ZSZHJSB.ID",//精神病主键
           "attackType": "ZZ_ZSZHJSB.ATTACK_TYPE", //目前诊断类型
           "dangerRank" :"ZZ_ZSZHJSB.DANGER_RANK",//危险等级
           "isCTrouble": "ZZ_ZSZHJSB.IS_C_TROUBLE",//有无肇事肇祸历史
           "cTroubleCount": "ZZ_ZSZHJSB.C_TROUBLE_COUNT",//肇事肇祸次数  
        };
    },
    getTable:function(){
        return "ZZ_ZSZHJSB INNER JOIN ZZ_PERSON ON ZZ_PERSON.ID=ZZ_ZSZHJSB.P_ID";
    }
},baseAccess.prototype);
module.exports = tableAccess;