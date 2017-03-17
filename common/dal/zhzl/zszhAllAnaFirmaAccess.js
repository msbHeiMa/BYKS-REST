// /*==============================================================*/
// /* Table: A4_SYS_DEPARTMENT                                     */
// /* Table: A4_SYS_DEPARTMENTLEVEL                                        */
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
         "levelId":"A4_SYS_DEPARTMENTLEVEL.LEVELID",
         "maxNumber":"A4_SYS_DEPARTMENTLEVEL.MAXNUMBER",
         "departmentId":"A4_SYS_DEPARTMENT.DEPARTMENTID",
         "departmentName":"A4_SYS_DEPARTMENT.DEPARTMENTNAME",
         "dLevel":"A4_SYS_DEPARTMENT.D_LEVEL",
         "displayName":"A4_SYS_DEPARTMENT.DISPLAYNAME"
        };
    },
    getTable: function () {
        return "A4_SYS_DEPARTMENT INNER JOIN A4_SYS_DEPARTMENTLEVEL ON A4_SYS_DEPARTMENT.D_LEVEL=A4_SYS_DEPARTMENTLEVEL.LEVELID"
 },    
}, baseAccess.prototype);
module.exports = tableAccess;
