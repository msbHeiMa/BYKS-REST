
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
//姓名  身份证号 出生年月 性别  申请项 变更前 变更后 申请变更原因  岗位 姓名 申请时间 审核结果
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
          
 //WF_APPROVEHIS t1  t2  
 //ZZ_ZSZH_LEVELADJUSHIS t3
 //ZZ_PERSON t4
 //A4_SYS_USERINPOST t5
 //A4_SYS_POSTINFO t6
 //A4_SYS_USER t7
 //WF_BUSI_PROC t8
 //WF_BUSI_CONFIG t9
            "funmdataID": "t1.FUNMDATA_ID",//已办dataid
            "userId": "t1.USER_ID",//已办userId
            "activity1":"t1.ACTIVITY_NAME",
            "actionName":"t1.ACTOIN_NAME",

            "applicantDataId": "t2.FUNMDATA_ID", //申请人数据id  "开始"
            "applicantId": "t2.USER_ID",//申请人id
            "applicantTime": "t2.TASK_SDATE",//申请时间
            "activity2":"t2.ACTIVITY_NAME",

            "id": "t3.ID",
       //     "JSBId": "t3.Z_ID",
            "originalLevel": "t3.ORIGINAL_LEVEL",//变更前等级
            "finalLevel": "t3.FINAL_LEVEL",//变更后等级
            "adjustmentReason": "t3.ADJUSTMENT_REASON",//变更原因

             "JSBId": "t10.ID",//精神病id
             "pId": "t10.P_ID",//人口id

            "pId": "t4.ID",
            "name": "t4.NAME",//姓名    1
            "cardNum": "t4.CARD_NUM",//身份证号码   1
            "gender": "t4.GENDER",//性别   1
            "birthDate": "t4.BIRTH_DATE",//出生日期  1

            "pName": "t6.P_NAME",//申请人-岗位

            "a4sysuserUserName": "t7.USERNAME",//申请人姓名

            "funmodelName": "t9.FUNMODEL_NAME"//申请事项   
        };
    },
    getTable: function () {
        return `(((((((( WF_APPROVEHIS t1 LEFT JOIN WF_APPROVEHIS t2 ON t1.FUNMDATA_ID=t2.FUNMDATA_ID
                                    )LEFT JOIN ZZ_ZSZH_LEVELADJUSHIS t3 ON t1.FUNMDATA_ID=t3.ID
                                )LEFT JOIN ZZ_ZSZHJSB t10 ON t10.ID=t1.FUNMDATA_ID or t3.Z_ID=t10.ID
                            )LEFT JOIN ZZ_PERSON t4 ON t4.ID=t10.P_ID
                        )LEFT JOIN A4_SYS_USERINPOST t5 ON t5.USERID=t2.USER_ID
                    )LEFT JOIN A4_SYS_POSTINFO t6 ON t6.POSTID=t5.POSTID
                )LEFT JOIN A4_SYS_USER t7 ON t7.USERID=t2.USER_ID
            )LEFT JOIN WF_BUSI_PROC t8 ON t8.FUNMDATA_ID=t1.FUNMDATA_ID
        ) LEFT JOIN WF_BUSI_CONFIG t9 ON t9.FUNMODEL_ID=t8.FUNM_ID`},
}, baseAccess.prototype);
module.exports = tableAccess;