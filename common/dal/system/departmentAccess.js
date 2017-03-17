var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getHasBase4Column:function(){
        return false;
    },
    getColumns:function(){
        return {
            "departmentId":"to_char(DEPARTMENTID)",
            "departmentName":"DEPARTMENTNAME",
            "level":"D_LEVEL",
            "category":"CATEGORY",
            "comments":"COMMENTS",
            "creator":"CREATOR",
            "auditLevell":"AUDITLEVELL",
            "departmentOrder":"DEPARTMENTORDER",
            "dataDepartmentId":"DATADEPARTMENTID",
            "departmentXMin":"DEPARTMENTXMIN",
            "departmentXMax":"DEPARTMENTXMAX",
            "departmentYMin":"DEPARTMENTYMIN",
            "departmentYMax":"DEPARTMENTYMAX",
            "featureClassName":"FEATURECLASSNAME",
            "oldDepartmentId":"OLDDEPARTMENTID",
            "displayName":"DISPLAYNAME",
            "departmentXCen":"DEPARTMENTXCEN",
            "departmentYCen":"DEPARTMENTYCEN",
            "departmentFullName":"DEPARTMENTFULLNAME",
            "mdmCode":"MDMCODE",
            "updateTime":"UPDATETIME",
        };
    },
    getTable:function(){
        return "A4_SYS_DEPARTMENT";
    }
},baseAccess.prototype);
module.exports = tableAccess;

/**
 * CREATE TABLE "CIGPROXY"."A4_SYS_DEPARTMENT" 
   (	
    "DEPARTMENTID" NUMBER(20,0), 
	"DEPARTMENTNAME" NVARCHAR2(50), 
	"D_LEVEL" NUMBER(2,0), 
	"CATEGORY" NVARCHAR2(50), 
	"COMMENTS" NVARCHAR2(40), 
	"CREATOR" NVARCHAR2(40), 
	"AUDITLEVELL" NUMBER(1,0), 
	"DEPARTMENTORDER" NUMBER(12,0), 
	"DATADEPARTMENTID" NUMBER(20,0), 
	"DEPARTMENTXMIN" NUMBER(10,7), 
	"DEPARTMENTXMAX" NUMBER(10,7), 
	"DEPARTMENTYMIN" NUMBER(12,7), 
	"DEPARTMENTYMAX" NUMBER(12,7), 
	"FEATURECLASSNAME" NVARCHAR2(64), 
	"OLDDEPARTMENTID" NVARCHAR2(50), 
	"DISPLAYNAME" NVARCHAR2(2000), 
	"DEPARTMENTXCEN" NUMBER(12,7), 
	"DEPARTMENTYCEN" NUMBER(12,7), 
	"DEPARTMENTFULLNAME" NVARCHAR2(100), 
	"MDMCODE" NVARCHAR2(50), 
	"UPDATETIME" DATE
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 524288 NEXT 524288 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "CIGPROXY_DATA";


 */