            // "JSBId": "ZZ_ZSZHJSB.ID",//精神病主键
            // "pId": "ZZ_ZSZHJSB.P_ID",//精神病外键
            // "peopleStatus": "ZZ_ZSZHJSB.PEOPLE_STATUS",//人员状态
            // "isEfficiency": "ZZ_ZSZHJSB.IS_EFFICIENCY",//
            // "guarderCardNum": "ZZ_ZSZHJSB.GUARDER_CARD_NUM",
            // "guarderName": "ZZ_ZSZHJSB.GUARDER_NAME",
            // "guarderTel": "ZZ_ZSZHJSB.GUARDER_TEL",
            // "attackDate": "ZZ_ZSZHJSB.ATTACK_DATE",
            // "isCTrouble": "ZZ_ZSZHJSB.IS_C_TROUBLE",
            // "cTroubleCount": "ZZ_ZSZHJSB.C_TROUBLE_COUNT",
            // "cTroubleDate": "ZZ_ZSZHJSB.C_TROUBLE_DATE",
            // "treatS": "ZZ_ZSZHJSB.TREAT_S",
            // "treatName": "ZZ_ZSZHJSB.TREAT_NAME",
            // "hosTreatS": "ZZ_ZSZHJSB.HOS_TREAT_S",
            // "attackType": "ZZ_ZSZHJSB.ATTACK_TYPE", 
            // "recOrganName": "ZZ_ZSZHJSB.REC_ORGAN_NAME",
            // "managePeople": "ZZ_ZSZHJSB.MANAGE_PEOPLE",
            // "assisiSituation": "ZZ_ZSZHJSB.ASSIST_SITUATION",
            // "beloArea": "ZZ_ZSZHJSB.BELO_AREA",
            // "manageLevel": "ZZ_ZSZHJSB.MANAGE_LEVEL",
            // "wfStatus": "ZZ_ZSZHJSB.WF_STATUS",
            // "remarks": "ZZ_ZSZHJSB.REMARKS",
            // "isDiagnosis": "ZZ_ZSZHJSB.IS_DIAGNOSIS",
            // "dataSources": "ZZ_ZSZHJSB.DATA_SOURCES",
            // "gridName": "ZZ_ZSZHJSB.GRID_NAME",            
            // "preVisitDate": "ZZ_ZSZHJSB.PRE_VISIT_DATE",
            // "visitCyc": "ZZ_ZSZHJSB.VISIT_CYC",
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
             //基础信息t1:ZZ_PERSON  t2:ZZ_ZSZHJSB  t3:医生ZZ_PERSON  t4：警察ZZ_PERSON t5:村干部 ZZ_PERSON 
             "id":"t1.ID",
             "cardNum":"t1.CARD_NUM",//身份证号码
             "name":"t1.NAME",//姓名
             "usedName":"t1.USED_NAME",//曾用名
             "gender":"t1.GENDER",//性别
             "birthDate":"t1.BIRTH_DATE",//出生日期
             "nation":"t1.NATION",//民族
             "nativePlace":"t1.NATIVE_PLACE",//籍贯
             "maritalStatus": "t1.MARITAL_STATUS",//婚姻状况
             "bloodType":"t1.BLOOD_TYPE",//血型
             "politicalStatus":"t1.POLITICAL_STATUS",//政治面貌
             "education": "t1.EDUCATION",//学历
             "relBelief":"t1.REL_BELIEF",//宗教信仰
             "occCategory":"t1.OCC_CATEGORY",//职业类别
             "occupation":"t1.OCCUPATION",//职业
             "sPlace":"t1.S_PLACE",//服务处所
             "phone":"t1.PHONE",//联系方式
             "domicile":"t1.DOMICILE",//户籍地
             "dAddr":"t1.D_ADDR",//户籍地详细地址
             "residence":"t1.RESIDENCE",//现住地
             "rAddr":"t1.R_ADDR",//现住地详址
             "gId":"t1.G_ID",

             "dangerRank": "t2.DANGER_RANK",//危险等级
             "manageLevel": "t2.MANAGE_LEVEL",//管理等级
             "JSBId":"t2.id",
             //管理小组信息
                 //监护人
            "guarderCardNum": "t2.GUARDER_CARD_NUM",//身份证号
            "guarderName": "t2.GUARDER_NAME",//姓名
            "guarderTel": "t2.GUARDER_TEL",//联系方式
            "guarderAddr":"t2.GUARDER_ADDR",//监护人详细地址
            "relationship":"t2.RELATIONSHIP",//监护人与当事人关系
                //村委会干部 关联用户表
            "villageCadresId":"t2.VILLAGE_CADRES_ID",//村委会干部ID
            "villageName":"t5.USERNAME", //村干部姓名
            "villagePhone":"t5.LXDH",//村干部联系电话
                //医生信息
            "dockorId":"t2.DOCTORID",//医生Id 
            "dockorName":"t3.USERNAME",//医生姓名
            "dockorPhone":"t3.LXDH",//医生联系方式
            "dockorDepartmentName":"null",//医生服务处所 departmentId
                //警察信息
            "policeId":"t2.POLICEID",
            "policeName":"t4.USERNAME",//警察姓名
            "policePhone":"t4.LXDH",//警察联系方式
            "policeDepartmentName":"null",//警察服务处所 departmentId
            //肇事肇祸信息
            "isCTrouble": "t2.IS_C_TROUBLE",//有无肇事肇祸历史
            "cTroubleCount": "t2.C_TROUBLE_COUNT",//肇事肇祸次数
            "cTroubleDate": "t2.C_TROUBLE_DATE",//上次肇事肇祸日期
            //医疗信息
            "attackDate": "t2.ATTACK_DATE",//初次发病日期
            "attackType": "t2.ATTACK_TYPE", //目前诊断类型
            "treatS": "t2.TREAT_S",//治疗情况
            "treatName": "t2.TREAT_NAME",//治疗医院名称
            "hosTreatS": "t2.HOS_TREAT_S",//实施住院治疗原因
            "recOrganName": "t2.REC_ORGAN_NAME",//接受康复治疗机构名称

            "gridName": "t6.DISPLAYNAME",//depart
            
        };
    },
     //基础信息t1:ZZ_PERSON  t2:ZZ_ZSZHJSB  t3:医生ZZ_PERSON  t4:警察ZZ_PERSON t5:村管理员 ZZ_PERSON
    getTable:function(){
        return  `ZZ_ZSZHJSB t2 INNER JOIN ZZ_PERSON t1 ON t1.ID=t2.P_ID 
                LEFT JOIN A4_SYS_USER t3 ON t3.USERID=t2.DOCTORID
                LEFT JOIN A4_SYS_USER t4 ON t4.USERID=t2.POLICEID
                LEFT JOIN A4_SYS_USER t5 ON t5.USERID=t2.VILLAGE_CADRES_ID
                LEFT JOIN A4_SYS_DEPARTMENT t6 ON t1.G_ID=t6.DEPARTMENTID` ;
    },
      getJoinJSBPerson: function () {
        return  `ZZ_ZSZHJSB inner join ZZ_PERSON on ZZ_ZSZHJSB.P_ID=ZZ_PERSON.ID
                left join ZZ_ZSZH_VISITCYC on ZZ_ZSZHJSB.ID=ZZ_ZSZH_VISITCYC.Z_ID
                left join A4_SYS_DEPARTMENT on ZZ_PERSON.G_ID = A4_SYS_DEPARTMENT.DEPARTMENTID`;
    },
    getJoinAddPersonColumns: function () {
        return {
            "name": "ZZ_PERSON.NAME",//姓名    1
            "cardNum": "ZZ_PERSON.CARD_NUM",//身份证号码   1
            "rAddr": "ZZ_PERSON.R_ADDR",//现住地详址

            "JSBId": "ZZ_ZSZHJSB.ID",//精神病id
            "dangerRank": "ZZ_ZSZHJSB.DANGER_RANK",//危险等级
            "manageLevel": "ZZ_ZSZHJSB.MANAGE_LEVEL",//管理等级
            "addReason":"ZZ_ZSZHJSB.ADDREASON",//新增原因
            "attackType": "ZZ_ZSZHJSB.ATTACK_TYPE", //目前诊断类型
            "peopleStatusQeo":"ZZ_ZSZHJSB.PEOPLE_STATUS_QEO",//人员现状 
            "isCTrouble": "ZZ_ZSZHJSB.IS_C_TROUBLE",//有无肇事肇祸历史
            "isEfficiency": "ZZ_ZSZHJSB.IS_EFFICIENCY",//是否纳入低保
            "guarderName": "ZZ_ZSZHJSB.GUARDER_NAME",//监护人姓名
            "guarderTel": "ZZ_ZSZHJSB.GUARDER_TEL",//监护人联系方式
            "relationship":"ZZ_ZSZHJSB.RELATIONSHIP",//监护人与当事人关系
            "guarderCardNum": "ZZ_ZSZHJSB.GUARDER_CARD_NUM",//监护人身份证号码
            "guarderAddr":"ZZ_ZSZHJSB.GUARDER_ADDR",//监护人现住详细地址
            "wfStatus": "ZZ_ZSZHJSB.WF_STATUS",

            "visitCyc": "ZZ_ZSZH_VISITCYC.G_VISITCYC", //回访周期

            "gridName":"A4_SYS_DEPARTMENT.DISPLAYNAME"//网格名称
        };
    },
    getJoinObject: function (filter,callback) {
        var columns = this.getJoinAddPersonColumns();
        var table = this.getJoinJSBPerson();
        var where = this.buildWhere(filter, columns);
        var fields = this.buildSelectFields(columns);
        this.innerGetObject(table, fields, where, callback);
    },
},baseAccess.prototype);
module.exports = tableAccess;