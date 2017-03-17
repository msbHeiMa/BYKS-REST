var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
          "funmId":"FUNMODEL_ID",
          "funmodelName":"FUNMODEL_NAME",
          "createDate":"CREATE_DATE",
        };
    },
    getTable: function () {
        return "WF_BUSI_CONFIG";
 },    
}, baseAccess.prototype);
module.exports = tableAccess;