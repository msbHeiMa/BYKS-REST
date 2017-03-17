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
//    ASSIST_SITUATION     VARCHAR2(20),
//    GRID_NAME            VARCHAR2(100),
//    BELO_AREA            VARCHAR2(100),
//    PRE_VISIT_DATE       DATE,
//    VISIT_CYC            NUMBER(3),
//    IS_DIAGNOSIS         VARCHAR2(2),
//    DATA_SOURCES         VARCHAR2(100),
//    MANAGE_LEVEL         NUMBER(3),
//    WF_STATUS            VARCHAR2(10),
//    REMARKS              VARCHAR2(500),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_ZZ_ZSZHJSB primary key (ID)
// );
// comment on column ZZ_SCHOOL.SCHOOL_TYPE is
// '编码见5.59';

//精神病表
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id": "ID",//主键
            "pId": "P_ID",//外键 zz_person
            "ecoSituatio":"ECO_SITUATION",
            "peopleStatus": "PEOPLE_STATUS",
            "peopleStatusQeo":"PEOPLE_STATUS_QEO",
            "isEfficiency": "IS_EFFICIENCY",
            "guarderCardNum": "GUARDER_CARD_NUM",
            "guarderName": "GUARDER_NAME",
            "guarderAddr":"GUARDER_ADDR",
            "addReason":"ADDREASON",
            "guarderTel": "GUARDER_TEL",
            "attackDate": "ATTACK_DATE",
            "isCTrouble": "IS_C_TROUBLE",
            "cTroubleCount": "C_TROUBLE_COUNT",
            "cTroubleDate": "C_TROUBLE_DATE",
            "treatS": "TREAT_S",
            "treatName": "TREAT_NAME",
            "hosTreatS": "HOS_TREAT_S",
            "attackType": "ATTACK_TYPE", 
            "recOrganName": "REC_ORGAN_NAME",
            "managePeople": "MANAGE_PEOPLE",
            "assisiSituation": "ASSIST_SITUATION",
            "beloArea": "BELO_AREA",
            "manageLevel": "MANAGE_LEVEL",
            "wfStatus": "WF_STATUS",
            "remarks": "REMARKS",
            "isDiagnosis": "IS_DIAGNOSIS",
            "dataSources": "DATA_SOURCES",
            "gridName": "GRID_NAME",
            "dangerRank": "DANGER_RANK",
            "preVisitDate": "PRE_VISIT_DATE",
            //     "visitCyc": "VISIT_CYC",
            "sicknessName": "SICKNESSNAME",
            "griderId": "GRIDERID",
            "relationship": "RELATIONSHIP",//监护人与当事人关系
            "policeId": "POLICEID",
            "doctorid": "DOCTORID",//医生Id 
            "villageCadresId": "VILLAGE_CADRES_ID",//村委会干部ID
        };
    },
    getTable:function(){
        return "ZZ_ZSZHJSB";
    },
    getPeopleByID:function(filter,order,callback){
        var self = this;
        this.getObject(filter ,function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    }
},baseAccess.prototype);
module.exports = tableAccess;