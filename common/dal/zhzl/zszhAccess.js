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
            "id": "t1.ID",//主键
            "pId": "t1.P_ID",//外键 zz_person
            "ecoSituatio":"t1.ECO_SITUATION",
            "peopleStatus": "t1.PEOPLE_STATUS",
            "peopleStatusQeo":"t1.PEOPLE_STATUS_QEO",
            "isEfficiency": "t1.IS_EFFICIENCY",
            "guarderCardNum": "t1.GUARDER_CARD_NUM",
            "guarderName": "t1.GUARDER_NAME",
            "guarderAddr":"t1.GUARDER_ADDR",
            "addReason":"t1.ADDREASON",
            "guarderTel": "t1.GUARDER_TEL",
            "attackDate": "t1.ATTACK_DATE",
            "isCTrouble": "t1.IS_C_TROUBLE",
            "cTroubleCount": "t1.C_TROUBLE_COUNT",
            "cTroubleDate": "t1.C_TROUBLE_DATE",
            "treatS": "t1.TREAT_S",
            "treatName": "t1.TREAT_NAME",
            "hosTreatS": "t1.HOS_TREAT_S",
            "attackType": "t1.ATTACK_TYPE", 
            "recOrganName": "t1.REC_ORGAN_NAME",
            "managePeople": "t1.MANAGE_PEOPLE",
            "assisiSituation": "t1.ASSIST_SITUATION",
            "beloArea": "t1.BELO_AREA",
            "manageLevel": "t1.MANAGE_LEVEL",
            "wfStatus": "t1.WF_STATUS",
            "remarks": "t1.REMARKS",
            "isDiagnosis": "t1.IS_DIAGNOSIS",
            "dataSources": "t1.DATA_SOURCES",
            "gridName": "t1.GRID_NAME",
            "dangerRank": "t1.DANGER_RANK",
            "preVisitDate": "t1.PRE_VISIT_DATE",
      //      "visitCyc": "t1.VISIT_CYC",
            "sicknessName":"t1.SICKNESSNAME",
            
            "gridId":"t2.G_ID",//网格Id
            "griderId":"t1.GRIDERID",
        };
    },
    getTable:function(){
        return "ZZ_ZSZHJSB t1 INNER JOIN ZZ_PERSON t2 ON t2.ID=t1.P_ID";
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