/*

create table ZZ_ZSZH_TREATHISTORY 
(
   ID                   VARCHAR2(36),
   Z_ID                 VARCHAR2(36),
   ADMISSION_DATE       DATE,
   TREAT_NAME           VARCHAR2(100),
   HOS_TREAT_S          VARCHAR2(100),
   ATTACK_TYPE          VARCHAR2(2),
   DISCHARGED_DATE      DATE,
   REC_ORGAN_NAME       VARCHAR2(100),
   CREATE_USER          VARCHAR(50),
   CREATE_DATE          DATE,
   UPDATE_USER          VARCHAR(50),
   UPDATE_DATE          DATE,
   constraint PK_ZZ_ZSZH_TREATHISTORY primary key (),
   constraint ZZ_ZSZH_TREATHISTORY unique ()
);

*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID", //主键
            "JSBId": "Z_ID",//表ZZ_ZSZHJSB主键
            "admissionDate": "ADMISSION_DATE",//入院治疗日期
            "treatName": "TREAT_NAME",//治疗医院名称
            "hosTreatS": "HOS_TREAT_S",//实施治疗住院原因'
            "attackType": "ATTACK_TYPE",//诊断类型
            "dischargedDate":"DISCHARGED_DATE",//出院日期
            "recOrganName":"REC_ORGAN_NAME",//接受康复训练机构名称
            "createUser": "CREATE_USER",//创建人ID
            "createDate": "CREATE_DATE",//创建日期
            "updateUser":"UPDATE_USER",//修改人ID
            "updateDate":"UPDATE_DATE",//修改日期    
        };
    },
    getTable: function () {
        return "ZZ_ZSZH_TREATHISTORY";
    },
    getPageWithJSBId: function (filter, order, offset, limit, callback) {
        var self = this;
        this.getPage(filter, order, offset, limit, function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
