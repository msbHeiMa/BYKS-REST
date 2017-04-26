//BYKS_PLGL
//BYKS_USER
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"BYKS_PLGL.ID",
             "zpId":"BYKS_PLGL.ZP_ID",
             "plContant":"BYKS_PLGL.PL_CONTANT",
             "plrName":"BYKS_PLGL.PLR_NAME",
             "createDate":"BYKS_PLGL.CREATE_DATE",
             "updateDate":"BYKS_PLGL.UPDATE_DATE",
             "userImage":"BYKS_USER.USERIMAGE",
             "userName":"BYKS_USER.USERNAME",
        };
    },
    getTable: function () {
        return "BYKS_PLGL INNER JOIN BYKS_USER ON BYKS_PLGL.PLR_NAME=BYKS_USER.USERNAME";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;