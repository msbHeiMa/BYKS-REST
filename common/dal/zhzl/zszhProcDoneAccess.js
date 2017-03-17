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
            //WF_APPROVEHIS  已经审核
            "funmdataID":"t1.FUNMDATA_ID",//事件id
            "userId":"t1.USER_ID",//审批人
            "activityName":"t1.ACTIVITY_NAME",//动作名称
            "actionName":"t1.ACTOIN_NAME",//？？
            "content":"t1.CONTENT",//
            "taskSDate":"t1.TASK_SDATE",//任务开始时间
            "taskEDate":"t1.TASK_EDATE",//任务结束时间
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
        return "(WF_APPROVEHIS t1 INNER JOIN  A4_SYS_USER t4 on t4.USERID=t1.USER_ID) INNER JOIN A4_SYS_DEPARTMENT t5 ON t5.DEPARTMENTID=t4.SSDWBS";
    },
},baseAccess.prototype);
module.exports = tableAccess;