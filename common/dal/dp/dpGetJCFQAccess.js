/*
Table: DP_JCFQRSJ                                            
Table: HBJKQY
create table DP_JCFQRSJ 
(
   ID                   VARCHAR2(36),
   JCD_BM               VARCHAR2(50),
   QY_BM                VARCHAR2(50),
   EVENTID              VARCHAR2(36),
   TIME                 DATE,
   SO2                  NUMBER(8,3),
   DYHW                 NUMBER(8,3),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_JCFQRSJ.CREATE_USER is
'扩展';

comment on column DP_JCFQRSJ.CREATE_DATE is
'扩展';

comment on column DP_JCFQRSJ.UPDATE_USER is
'扩展';

comment on column DP_JCFQRSJ.UPDATE_DATE is
'扩展';
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id": "DP_JCFQRSJ.ID",//ID
             "eventId":"DP_JCFQRSJ.EVENTID ",//企业ID
             "time":"TO_CHAR(DP_JCFQRSJ.TIME,'yyyy-mm-dd HH24')",////监测日期
             "so2":"DP_JCFQRSJ.SO2",//二氧化硫（mg/m³）
             "dyhw":"DP_JCFQRSJ.DYHW",//氮氧化物（mg/m³）
             "hbjkqy_eventId":"HBJKQY.EVENTID",//企业ID
             "enterName":"HBJKQY.ENTERNAME",//企业名称
        };
    },
    getTable: function () {
        return "DP_JCFQRSJ INNER JOIN HBJKQY ON HBJKQY.EVENTID=DP_JCFQRSJ.EVENTID";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
