/*
表1.WF_APPROVEHIS
表2.WF_BUSI_PROC_NODE
表3.WF_BUSI_PROC_NODEUSER
表4.A4_SYS_USER
表5.A4_SYS_DEPARTMENT
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
        //WF_BUSI_PROC_NODE
            "nId":"t2.ID",
            "funmdataID":"t2.FUNMDATA_ID",
            "nodeName":"t2.NODE_NAME",
            "status":"t2.STATUS",
            "state":"t2.STATE",//除去COMPLETED
            "nodeOrder":"t2.NODE_ORDER",
            "startDate":"t2.CREATE_DATE",
            "updateDate":"t2.UPDATE_DATE",
            //WF_BUSI_PROC_NODEUSER
            "nodeId":"t3.N_ID",
            "userId":"t3.USER_ID",
            //A4_SYS_USER
            "userId":"t4.USERID",
            "userName":"t4.USERNAME",
            "SSDWBS":"t4.SSDWBS",
            //A4_SYS_DEPARTMENT
            "departmentId":"t5.DEPARTMENTID",
            "departmentName":"t5.DEPARTMENTNAME",
        };
    },
    getTable:function(){
        return "((WF_BUSI_PROC_NODE t2 INNER JOIN WF_BUSI_PROC_NODEUSER t3 on t3.N_ID=t2.ID) INNER JOIN A4_SYS_USER t4 on t4.USERID=t3.USER_ID) INNER JOIN A4_SYS_DEPARTMENT t5 ON t5.DEPARTMENTID=t4.SSDWBS";
    },
},baseAccess.prototype);
module.exports = tableAccess;