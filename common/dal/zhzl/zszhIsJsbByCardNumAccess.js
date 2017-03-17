//ZZ_ZSZHJSB
//ZZ_PERSON
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
          "cardNum":"ZZ_PERSON.CARD_NUM",
          "pId":"ZZ_PERSON.ID",
          "p_Id":"ZZ_ZSZHJSB.P_ID",
        };
    },
    getTable: function () {
        return "ZZ_ZSZHJSB INNER JOIN ZZ_PERSON ON ZZ_ZSZHJSB.P_ID=ZZ_PERSON.ID";
 },    
}, baseAccess.prototype);
module.exports = tableAccess;