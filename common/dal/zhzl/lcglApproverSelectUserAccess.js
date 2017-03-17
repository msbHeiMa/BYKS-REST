/*
    用到表A4_SYS_USER和表A4_SYS_DEPARTMENT进行多表查询
 */
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "userId":"A4_SYS_USER.USERID",
            "userName":"A4_SYS_USER.USERNAME",
            "ssdwbs":"to_char(A4_SYS_USER.SSDWBS)",
            "departmentId":"to_char(A4_SYS_DEPARTMENT.DEPARTMENTID)",
            "departmentName":"A4_SYS_DEPARTMENT.DEPARTMENTNAME",
        };
    },
    getTable: function () {
        return "A4_SYS_USER INNER JOIN A4_SYS_DEPARTMENT ON A4_SYS_USER.SSDWBS=A4_SYS_DEPARTMENT.DEPARTMENTID";
    },
    getPageWithDepartmentId: function (filter, order, offset, limit, callback) {
        var self = this;
        this.getPage(filter, order, offset, limit, function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;