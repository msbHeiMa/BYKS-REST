/*
create table DP_XFTJ 
(
   ID                   VARCHAR2(36)         not null,
   XF_DATE              DATE,
   XF_LX                VARCHAR2(36),
   XF_COUNT             number(8),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE
);
*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",//ID
             "xfDate":"TO_CHAR(XF_DATE,'yyyy-mm-dd') ",//信访时间
             "xfXq":"XF_XQ",//辖区
             "xfCount":"XF_COUNT",//投诉数量
        };
    },
    getTable: function () {
        return "DP_XFTJ";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
