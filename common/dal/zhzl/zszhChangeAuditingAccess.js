// /*==============================================================*/
// /* Table: ZZ_ZSZHJSB                                           */
// /* Table: ZZ_ZSZH_LEVELADJUSHIS                                */
// /* Table: ZZ_PERSON                                           */
// /* Table: A4_SYS_POSTINFO                                      */
// /* Table: A4_SYS_USERINPOST                                    */
// /* Table: A4_SYS_USER                                          */
// /* Table: WF_TASKTODO                                         */
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
          "id":"ZZ_ZSZH_LEVELADJUSHIS.ID",
          "JSBId":"ZZ_ZSZH_LEVELADJUSHIS.Z_ID",
          "adjustmentDate":"ZZ_ZSZH_LEVELADJUSHIS.ADJUSTMENT_DATE",//申请日期
          "adjustmentPeople":"ZZ_ZSZH_LEVELADJUSHIS.ADJUSTMENT_PEOPLE",//申请人-名称
          "originalLevel":"ZZ_ZSZH_LEVELADJUSHIS.ORIGINAL_LEVEL",//变更前等级
          "finalLevel":"ZZ_ZSZH_LEVELADJUSHIS.FINAL_LEVEL",//变更后等级
          "adjustmentReason":"ZZ_ZSZH_LEVELADJUSHIS.ADJUSTMENT_REASON",//变更原因
        
          "pId":"ZZ_PERSON.ID",

          "cardNum":"ZZ_PERSON.CARD_NUM",//身份证号码   1
           "name" :"ZZ_PERSON.NAME",//姓名    1
           "usedName": "ZZ_PERSON.USED_NAME",//曾用名   1
           "gender" :"ZZ_PERSON.GENDER",//性别   1
           "birthDate": "ZZ_PERSON.BIRTH_DATE",//出生日期  1
           "nation": "ZZ_PERSON.NATION",//民族   1
           "maritalStatus": "ZZ_PERSON.MARITAL_STATUS",//婚姻状况   1
           "bloodType":"ZZ_PERSON.BLOOD_TYPE",//血型   1
           "residence":"ZZ_PERSON.RESIDENCE",//现住地   1
           "sPlace": "ZZ_PERSON.S_PLACE",//服务处所    1
           "telPhone": "ZZ_PERSON.TEL",//联系方式  1
           "rAddr": "ZZ_PERSON.R_ADDR",//现住地详址       1
           "gridId" :"ZZ_PERSON.G_ID",//所属单位代码 
           "nativePlace":"ZZ_PERSON.NATIVE_PLACE",//籍贯
           "politicalStatus":"ZZ_PERSON.POLITICAL_STATUS",//政治面貌
          
           "manageLevel":"ZZ_ZSZHJSB.MANAGE_LEVEL",//管理等级 1
           "dangerRank" :"ZZ_ZSZHJSB.DANGER_RANK",//危险等级1

    //      "usedName":"ZZ_PERSON.USED_NAME",//申请人-姓名
          "jsbId":"ZZ_ZSZHJSB.ID",
          "jsbP_id":"ZZ_ZSZHJSB.P_ID",
          "gridName":"ZZ_ZSZHJSB.GRID_NAME",//所属网格
          "userInpostPostId":"A4_SYS_USERINPOST.POSTID",
          "userInpostUserId":"A4_SYS_USERINPOST.USERID",
          "postInfoPostId":"A4_SYS_POSTINFO.POSTID",
          "pName":"P_NAME",//申请人-岗位
          "a4sysuserUserName":"A4_SYS_USER.USERNAME",
          "a4sysuserUserId":"A4_SYS_USER.USERID",

          //"a4departmentId":"A4_SYS_DEPARTMENT.DEPARTMENTID",
          //"gridName":"A4_SYS_DEPARTMENT.DISPLAYNAME",
          "funmdataID":"WF_TASKTODO.FUNMDATA_ID",
          "sn":"WF_TASKTODO.SN",
          "userId":"WF_TASKTODO.USER_ID",
          "funmId":"WF_TASKTODO.FUNM_ID",
        };
    },
    getTable: function () {
        return `(
                    (  
                        (
                            (
                                (
                                    (
                                        WF_TASKTODO INNER JOIN ZZ_ZSZH_LEVELADJUSHIS ON WF_TASKTODO.FUNMDATA_ID=ZZ_ZSZH_LEVELADJUSHIS.Z_ID
                                    )INNER JOIN ZZ_ZSZHJSB ON ZZ_ZSZH_LEVELADJUSHIS.Z_ID=ZZ_ZSZHJSB.ID
                                )INNER JOIN ZZ_PERSON ON ZZ_ZSZHJSB.P_ID=ZZ_PERSON.ID
                            )INNER JOIN A4_SYS_USER ON ZZ_ZSZH_LEVELADJUSHIS.ADJUSTMENT_PEOPLE=A4_SYS_USER.USERNAME
                        )INNER JOIN A4_SYS_USERINPOST ON A4_SYS_USER.USERID=A4_SYS_USERINPOST.USERID
                    )INNER JOIN A4_SYS_POSTINFO ON A4_SYS_USERINPOST.POSTID=A4_SYS_POSTINFO.POSTID
                )`
 },    
}, baseAccess.prototype);
module.exports = tableAccess;