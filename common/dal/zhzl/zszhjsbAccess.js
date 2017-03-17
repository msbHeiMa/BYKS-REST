/*==============================================================*/
/* Table: ZZ_ZSZHJSB                                            */
/*==============================================================*/
// create table ZZ_ZSZHJSB 
// (
//    ID                   VARCHAR2(36)         not null,
//    P_ID                 VARCHAR2(36)         not null,
//    PEOPLE_STATUS        VARCHAR2(10),
//    ECO_SITUATION        VARCHAR2(2),
//    IS_EFFICIENCY        VARCHAR2(2)          not null,
//    GUARDER_CARD_NUM     VARCHAR2(18),
//    GUARDER_NAME         VARCHAR2(50)         not null,
//    GUARDER_TEL          VARCHAR2(11)         not null,
//    ATTACK_DATE          DATE,
//    ATTACK_TYPE          VARCHAR2(2)          not null,
//    IS_C_TROUBLE         VARCHAR2(2)          not null,
//    C_TROUBLE_COUNT      NUMBER(3),
//    C_TROUBLE_DATE       DATE,
//    DANGER_RANK          VARCHAR2(2),
//    TREAT_S              VARCHAR2(2)          not null,
//    TREAT_NAME           VARCHAR2(100),
//    HOS_TREAT_S          VARCHAR2(100),
//    REC_ORGAN_NAME       VARCHAR2(100),
//    MANAGE_PEOPLE        VARCHAR2(20),
//    "Assist_Situation"   VARCHAR2(20),
//    GRID_NAME            VARCHAR2(100),
//    "Belo_Area"          VARCHAR2(100),
//    "Pre_Visit_Date"     DATE,
//    "Visit_Cyc"          NUMBER(3),
//    "Is_Diagnosis"       VARCHAR2(2),
//    "Data_Sources"       VARCHAR2(100),
//    "Manage_Level"       NUMBER(3),
//    "WF_Status"          VARCHAR2(10),
//    "Remarks"            VARCHAR2(500),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_ZZ_ZSZHJSB primary key (ID)
// );

// authored by liwei 
// 未完成 目前数据库中暂无此表
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "pId": "P_ID",
            "peopleStatus": "PEOPLE_STATUS",
            "ecoSituation": "ECO_SITUATION",
            "isEfficiency": "IS_EFFICIENCY",
            "guarderCardNum": "GUARDER_CARD_NUM",
            "guarderName": "GUARDER_NAME",
            "guarderTel": "GUARDER_TEL",
            "attackDate": "ATTACK_DATE",
            "attackType": "ATTACK_TYPE",
            "isCTrouble": "IS_C_TROUBLE",
            "cTroubleCount": "C_TROUBLE_COUNT",
            "cTroubleDate": "C_TROUBLE_DATE",
            "dangerRank": "DANGER_RANK",
            "treatS": "TREAT_S",
            "treatName": "TREAT_NAME",
            "hosTreatS": "HOS_TREAT_S",
            "recOranName": "REC_ORGAN_NAME",
            "managePeople": "MANAGE_PEOPLE",
            "assistSituation": "Assist_Situation",
            "gridName": "GRID_NAME",
            "beloArea": "Belo_Area",
            "preVisitDate": "Pre_Visit_Date",
     //       "visitCyc": "Visit_Cyc",
            "isDiagnosis": "Is_Diagnosis",
            "dataSources": "Data_Sources",
            "manageLevel": "Manage_Level",
            "wfStatus": "WF_Status",
            "remarks": "Remarks"
        };
    },
    getTable: function () {
        return "ZZ_ZSZHJSB";
    }
}, baseAccess.prototype);
module.exports = tableAccess;