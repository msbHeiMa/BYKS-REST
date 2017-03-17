
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
             //姓名 身份证号 性别 所属网格 危险等级 管理等级 有无肇事肇祸史 
             //诊断类型 人员现状 
             //迁出网格 操作状态 迁入日期 迁出（移除）日期
             "id":"t1.ID",
             "zId":"t1.Z_ID",
             "originalAddr":"t1.ORIGINAL_ADDR", //原来网格
             "finalAddr":"t1.FINAL_ADDR", //目的网格
             "outDeleteDate":"t1.MOVEOUT_DATE",//移除时间
             "wfState":"t1.WFSTATE",//流程状态

             "inHistoryAddr":"t5.FINAL_ADDR", //目的网格
             "inHistoryDate":"t5.MOVEOUT_DATE",//移除时间

             "JSBId": "t4.id",
             "pId":"t4.P_ID",
             "dangerRank": "t4.DANGER_RANK",//危险等级1
             "manageLevel": "t4.MANAGE_LEVEL",//管理等级1
             "peopleStatusQeo": "t4.PEOPLE_STATUS_QEO",//人员现状 1  
             "isCTrouble": "t4.IS_C_TROUBLE",//有无肇事肇祸历史1
             "attackType": "t4.ATTACK_TYPE", //目前诊断类型1
             "createDate":"t4.CREATE_DATE",//精神病创建时间  判断是否在此创建
             "wfStatus": "t4.WF_STATUS",

             "peopleId":"t2.ID",//人口主键
             "cardNum":"t2.CARD_NUM",//身份证号码
             "name":"t2.NAME",//姓名1
             "gender":"t2.GENDER",//性别1
             "gridId":"t2.G_ID",//网格Id

             "a4departmentId":"t3.DEPARTMENTID",
             "gridName": "t3.DISPLAYNAME",

              "finalAddrDartId":"t6.DEPARTMENTID",
             "finalAddrName": "t6.DISPLAYNAME",

             "originalAddrName": "t7.DISPLAYNAME",


        };
    },
    getTable:function(){
        return  `ZZ_ZSZH_MOVEOUTHIS t1 INNER JOIN ZZ_ZSZHJSB t4 ON t1.Z_ID=t4.ID 
                 LEFT JOIN ZZ_PERSON t2 ON t2.ID=t4.P_ID
                 LEFT JOIN A4_SYS_DEPARTMENT t3 ON t3.DEPARTMENTID=t2.G_ID
                 LEFT JOIN ZZ_ZSZH_MOVEOUTHIS t5 on t5.FINAL_ADDR=t1.ORIGINAL_ADDR
                 LEFT JOIN A4_SYS_DEPARTMENT t6 ON t6.DEPARTMENTID=t1.FINAL_ADDR
                 LEFT JOIN A4_SYS_DEPARTMENT t7 ON t7.DEPARTMENTID=t1.ORIGINAL_ADDR` ;
    }
},baseAccess.prototype);
module.exports = tableAccess;