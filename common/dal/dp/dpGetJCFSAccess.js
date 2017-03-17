/*
Table: DP_JCFSRSJ                                            
Table: HBJKQY
create table DP_JCFSRSJ 
(
   ID                   VARCHAR2(36),
   JCD_BM               VARCHAR2(50),
   QY_BM                VARCHAR2(50),
   EVENTID              VARCHAR2(36),
   TIME                 DATE,
   COD                  NUMBER(8,3),
   AD                   NUMBER(8,3),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);

comment on column DP_JCFSRSJ.CREATE_USER is
'扩展';

comment on column DP_JCFSRSJ.CREATE_DATE is
'扩展';

comment on column DP_JCFSRSJ.UPDATE_USER is
'扩展';

comment on column DP_JCFSRSJ.UPDATE_DATE is
'扩展';
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id": "DP_JCFSRSJ.ID",//ID
             "eventId":"DP_JCFSRSJ.EVENTID ",//企业ID
             "time":"TO_CHAR(DP_JCFSRSJ.TIME,'yyyy-mm-dd HH24')",////监测日期
             "cod":"DP_JCFSRSJ.COD",//时间、COD（mg/L）
             "ad":"DP_JCFSRSJ.AD",//氨氮（mg/L）
             "hbjkqy_eventId":"HBJKQY.EVENTID",//企业ID
             "enterName":"HBJKQY.ENTERNAME",//企业名称
        };
    },
    getTable: function () {
        return "DP_JCFSRSJ INNER JOIN HBJKQY ON HBJKQY.EVENTID=DP_JCFSRSJ.EVENTID";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
