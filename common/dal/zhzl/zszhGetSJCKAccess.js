/*
create table ZZ_ZSZH_SJCK
(
   ID                   VARCHAR2(36),
   DSR_NAME             VARCHAR2(50),
   DSR_ID               VARCHAR2(36),
   DSR_CARDNUM          NUMBER(18),
   TYPE                 VARCHAR2(50),
   DIZHI                VARCHAR2(100),
   GRID_NAME            VARCHAR2(30),
   SF_TIME              VARCHAR2(30),
   TEL                  VARCHAR2(18),
   BA_NUM               VARCHAR2(18),
   REPORT_TIME          DATE,
   BA_QD                VARCHAR2(18),
   REPORT_NAME          VARCHAR2(18),
   SJMS                 VARCHAR2(150),
   BEIZHU               VARCHAR2(150),
   SQCL_IMG             VARCHAR2(100 BYTE),
   SHCL_IMG             VARCHAR2(100 BYTE),
   CREATE_DATE          date,
   CREATE_USER          varchar2(50),
   UPDATE_DATE          date,
   UPDATE_USER          varchar2(50)
);

*/
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "dsrName":"DSR_NAME",//当事人
            "dsrId":"DSR_ID",//当事人ID
            "dsrCardnum":"DSR_CARDNUM",//当事人证件号码
            "type":"TYPE",//事件类型
            "dizhi":"DIZHI",//事件地址
            "gridName":"GRID_NAME",//所属网格
            "sfTime":"SF_TIME",//事发时间'
            "tel":"TEL",//联系方式
            "baNum":"BA_NUM",//报案编号
            "reportTime":"REPORT_TIME",//上报时间
            "baQd":"BA_QD",//报案渠道
            "reportName":"REPORT_NAME",//上报人
            "sjms":"SJMS",//事件描述
            "beizhu":"BEIZHU",//备注
            "sqclImg":"SQCL_IMG",//事前处理图片
            "shclImg":"SHCL_IMG",//事后处理图片
        };
    },
    getTable:function(){
        return "ZZ_ZSZH_SJCK"
    },
},baseAccess.prototype);
module.exports = tableAccess;