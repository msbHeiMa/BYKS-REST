/*
create table DP_WYYQY 
(
   ID                   VARCHAR2(36)         not null,
   WYYQY_LX             VARCHAR2(50),
   WYYQY_COUNT          number(5),
   WYYQY_DBL            number(3,2),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE,
   constraint PK_DP_WYYQY primary key (ID)
);

comment on table DP_WYYQY is
'污染源企业分类及数量';

comment on column DP_WYYQY.CREATE_USER is
'扩展';

comment on column DP_WYYQY.CREATE_DATE is
'扩展';

comment on column DP_WYYQY.UPDATE_USER is
'扩展';

comment on column DP_WYYQY.UPDATE_DATE is
'扩展';

*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",//ID
            "wyyqyLx":"WYYQY_LX ",//污染源企业类型
            "wyyqyCount":"WYYQY_COUNT",//污染源企业数量
            "wyyqyDbl":"WYYQY_DBL ",//污染源企业达标率
        };
    },
    getTable: function () {
        return "DP_WYYQY";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
