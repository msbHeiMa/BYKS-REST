// /*==============================================================*/
// /* Table: WF_ROLEUSER                                           */
// /* Table: WF_BUSI_ROLE                                          */
// /* Table: A4_SYS_DEPARTMENT                                     */
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id":"WF_ROLEUSER.ID",
            "rId": "WF_ROLEUSER.R_ID",
            "userId": "WF_ROLEUSER.USER_ID",
            "ssdwbm": "to_char(WF_ROLEUSER.SSDWBM)",
            "status": "WF_ROLEUSER.STATUS",
            "des": "WF_ROLEUSER.DES",
            "createDate": "WF_ROLEUSER.CREATE_DATE",
            "createUser":"WF_ROLEUSER.CREATE_USER",
            "w_b_rId":"WF_BUSI_ROLE.ID",
            "roleName":"WF_BUSI_ROLE.ROLE_NAME",
            "departmentName":"A4_SYS_DEPARTMENT.DEPARTMENTNAME",
            "departmentId":"to_char(A4_SYS_DEPARTMENT.DEPARTMENTID)",
            "userName":"A4_SYS_USER.USERNAME",
            "user_Id":"A4_SYS_USER.USERID"
        };
    },
    getTable: function () {
        return `WF_ROLEUSER INNER JOIN WF_BUSI_ROLE ON WF_ROLEUSER.R_ID=WF_BUSI_ROLE.ID
                            INNER JOIN A4_SYS_DEPARTMENT ON A4_SYS_DEPARTMENT.DEPARTMENTID=WF_ROLEUSER.SSDWBM
                            INNER JOIN A4_SYS_USER ON A4_SYS_USER.USERID=WF_ROLEUSER.USER_ID 
                `;
    },
    getPageWithRId: function (filter, order, offset, limit, callback) {
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