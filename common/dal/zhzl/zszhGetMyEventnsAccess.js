/*
WF_APPROVEHIS
WF_BUSI_PROC
WF_BUSI_CONFIG
ZZ_PERSON
ZZ_ZSZHJSB
ZZ_ZSZH_LEVELADJUSHIS
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "userId":"WF_APPROVEHIS.USER_ID",
            "activityName":"WF_APPROVEHIS.ACTIVITY_NAME",
            "actoinName":"WF_APPROVEHIS.ACTOIN_NAME",
            "content":"WF_APPROVEHIS.CONTENT",
            "taskSdate":"WF_APPROVEHIS.TASK_SDATE",
            "funmdataID":"WF_APPROVEHIS.FUNMDATA_ID",
            "busiProc_funmdataId":"WF_BUSI_PROC.FUNMDATA_ID",
            "busiProc_busiId":"WF_BUSI_PROC.BUSI_ID",
            "busiConfig_busiId":"WF_BUSI_CONFIG.BUSI_ID",
            "funmodelName":"WF_BUSI_CONFIG.FUNMODEL_NAME",
            "JSBId":"ZZ_ZSZHJSB.ID",
            "jsb_pId":"ZZ_ZSZHJSB.P_ID",
            "pId":"ZZ_PERSON.ID",
            "name":"ZZ_PERSON.NAME",
            "cardNum":"ZZ_PERSON.CARD_NUM",
            "zID":"ZZ_ZSZH_LEVELADJUSHIS.Z_ID",
            "lID":"ZZ_ZSZH_LEVELADJUSHIS.ID",
        };
    },
    getTable:function(){
        return `WF_APPROVEHIS LEFT JOIN WF_BUSI_PROC ON WF_APPROVEHIS.FUNMDATA_ID=WF_BUSI_PROC.FUNMDATA_ID
                              LEFT JOIN ZZ_ZSZH_LEVELADJUSHIS ON WF_APPROVEHIS.FUNMDATA_ID=ZZ_ZSZH_LEVELADJUSHIS.ID
                              LEFT JOIN WF_BUSI_CONFIG ON WF_BUSI_CONFIG.BUSI_ID=WF_BUSI_PROC.BUSI_ID
                              LEFT JOIN ZZ_ZSZHJSB ON ZZ_ZSZHJSB.ID=WF_APPROVEHIS.FUNMDATA_ID OR ZZ_ZSZHJSB.ID=ZZ_ZSZH_LEVELADJUSHIS.Z_ID
                              LEFT JOIN ZZ_PERSON ON ZZ_PERSON.ID=ZZ_ZSZHJSB.P_ID`
    },
},baseAccess.prototype);
module.exports = tableAccess;