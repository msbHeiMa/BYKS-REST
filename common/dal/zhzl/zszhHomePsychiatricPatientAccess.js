/**
 * create table ZZ_PERSON 
(
   ID                   VARCHAR2(36)         not null,
   CARD_NUM             VARCHAR2(18),
   NAME                 VARCHAR2(50),
   USED_NAME            VARCHAR2(50),
   GENDER               VARCHAR2(1),
   BIRTH_DATE           DATE,
   NATION               VARCHAR2(2),
   NATIVE_PLACE         VARCHAR2(6),
   MARITAL_STATUS       VARCHAR2(2),
   POLITICAL_STATUS     VARCHAR2(2),
   EDUCATION            VARCHAR2(2),
   HEIGHT               NUMBER(4),
   BLOOD_TYPE           VARCHAR2(2),
   REL_BELIEF           VARCHAR2(2),
   OCC_CATEGORY         VARCHAR2(5),
   OCCUPATION           VARCHAR2(30),
   SPECIALTY            VARCHAR2(2),
   S_PLACE              VARCHAR2(100),
   DOMICILE             VARCHAR2(6),
   D_ADDR               VARCHAR2(80),
   DEATH                VARCHAR2(1),
   PERSON_TYPE          VARCHAR2(1),
   GRID_NAME            VARCHAR2(30),
   G_ID                 VARCHAR2(36),
   RESIDENCE            VARCHAR2(6),
   R_ADDR               VARCHAR2(80),
   PHONE                VARCHAR2(20),
   TEL                  VARCHAR2(20),
   EMAIL                VARCHAR2(30),
   IS_LEGAL             VARCHAR2(1),
   IS_FLOW              VARCHAR2(1),
   IS_SUPERVISE         VARCHAR2(1),
   DATA_SOURCE          VARCHAR2(1),
   CREATE_DATE          date,
   CREATE_USER          varchar2(50),
   UPDATE_DATE          date,
   UPDATE_USER          varchar2(50),
   constraint PK_ZZ_PERSON primary key (ID)
);
 */

var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {          
           "JSBId":"t1.ID",//精神病主键
           "pId" :"t1.P_ID",
           "beloArea":"t1.BELO_AREA",//街区/所属区域
           "dangerRank" :"t1.DANGER_RANK",//危险等级  3
           "manageLevel":"t1.MANAGE_LEVEL",//管理等级
     //      "visitCyc" :"t1.VISIT_CYC", //回访周期
           "peopleStatus":"t1.PEOPLE_STATUS",//人员状态  
           "isCTrouble":"t1.IS_C_TROUBLE",//有无肇祸史  3
           "attackType":"t1.ATTACK_TYPE",//目前诊断类型  3
           "cTroubleDate":"t1.C_TROUBLE_DATE",//上次发病时间
           "attackDate":"t1.ATTACK_DATE",//初次发病时间
           "peopleStatusQeo":"t1.PEOPLE_STATUS_QEO",//人员现状 
           "griderId":"t1.GRIDERID",
            "stablePeriod":"t1.C_TROUBLE_DATE",//稳定期 需要处理，用现在的时间减去上次肇事肇祸时间
           "nextRevisitDate":"t1.PRE_VISIT_DATE", //需要处理，用上次回访日期加上回访周期
           "wfStatus": "t1.WF_STATUS",

           "id" :"t2.ID",//id
           "name" :"t2.NAME",//姓名 3
           "gender" :"t2.GENDER",//性别 3    
           "cardNum":"t2.CARD_NUM",//身份证号码  3
           "gridId":"t2.G_ID",//网格Id
           "domicile":"t2.DOMICILE",//户籍地 3
           "residence":"t2.RESIDENCE",//现住地 3

           "departmentName":"t4.DEPARTMENTNAME",//单位id
           "displayName":"t4.DISPLAYNAME",//显示单位名称
 //回访周期，推荐回访周期
            "cycJSBId": "t3.t3.Z_ID",
            "gvisitCyc": "t3.G_VISITCYC", //回访周期
            "pvisitCyc": "t3.P_VISITCYC",//回访周期外键
            "dvisitCyc": "t3.D_VISITCYC",//回访人
            "rgvisitCyc": "t3.RG_VISITCYC",//回访周期
            "rpvisitCyc": "t3.RP_VISITCYC",//回访人
            "rdvisitCyc": "t3.RD_VISITCYC",//回访周期
            "griderName": "t4.USERNAME",//网格员

        };
    },
    getTable:function(){
        return  `ZZ_ZSZHJSB  t1 INNER JOIN ZZ_PERSON t2 ON t2.ID=t1.P_ID 
                 LEFT JOIN A4_SYS_DEPARTMENT t4 ON t4.DEPARTMENTID=t2.G_ID
                 LEFT JOIN ZZ_ZSZH_VISITCYC t3 ON t1.ID=t3.Z_ID
                 LEFT JOIN A4_SYS_USER t4 ON t4.USERID=t1.GRIDERID`  ;
    }
},baseAccess.prototype);
module.exports = tableAccess;


