
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            //人员基本信息
            "id": "ID",//id
            "JSBId": "Z_ID",//精神病主键
            "attackDate": "ATTACK_DATE",//初次发病日期
            "attackType": "ATTACK_TYPE", //目前诊断类型
            "treatS": "TREAT_S",//治疗情况
            "treatName": "TREAT_NAME",//治疗医院名称
            "hosTreatS": "HOS_TREAT_S",//实施住院治疗原因
            "recOrganName": "REC_ORGAN_NAME",//接受康复训练结构名称          
        };
    },
    getTable:function(){
        return "ZZ_ZSZH_MEDICALCARE";
    }
},baseAccess.prototype);
module.exports = tableAccess;