/*==============================================================*/
/* Table: ZZ_ZSZHJSB                                            */
/*==============================================================*/
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id": "to_char(t1.DEPARTMENTID)",
            "departName": "t1.DEPARTMENTNAME",
            "displayName":"t1.DISPLAYNAME",
            "dataDepartmentId":"to_char(t1.DATADEPARTMENTID)",
            "userLevel":"t2.D_LEVEL",

        };
    },
    getTable:function(){
        return "A4_SYS_DEPARTMENT t1 INNER JOIN A4_SYS_DEPARTMENT t2 ON t1.dataDepartmentId=t2.DEPARTMENTID";
    },
    getUser:function(filter,callback){
        var self = this;
        this.getObject(filter ,function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    },
    getUsers:function(filter,order,callback){
        var self = this;
        this.getObjects(filter ,order,function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    },
    getJoinUser: function () {
        return  `A4_SYS_USER`;
    },
    getJoinUserColumns: function () {
        return {
            "userId":"USERID",
            "userName":"USERNAME",
            "tel":"LXDH",
            "departmentId":"to_char(SSDWBS)"
        };
    }, 
     getJoinPages: function (offset,limit,filter,order,callback) {
        var columns = this.getJoinUserColumns();
        var table = this.getJoinUser();
        var where = this.buildWhere(filter, columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order,columns);
        this.innerGetPage(offset, limit, table, fields, where, orderStr, callback);
    },
    getJoinObjects: function (filter,order,callback) {
        var columns = this.getJoinUserColumns();
        var table = this.getJoinUser();
        var where = this.buildWhere(filter, columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order,columns);
        this.innerGetObjects( table, fields, where, orderStr, callback);
    },
    getJoinDocterAndPolice: function () {
        return `a4_sys_department 
                inner join A4_SYS_DEPARTMENTLEVEL on a4_sys_department.d_level =A4_SYS_DEPARTMENTLEVEL.levelid 
                inner join A4_SYS_USER on  A4_SYS_USER.SSDWBS=a4_sys_department.departmentid
                inner join  A4_SYS_USERINPOST on A4_SYS_USER.USERID=A4_SYS_USERINPOST.USERID
                inner join  A4_SYS_POSTINFO on A4_SYS_POSTINFO.POSTID=A4_SYS_USERINPOST.POSTID`;
    },
    getJoinDocterAndPoliceColumns: function () {
        return {
            "userLevel":"a4_sys_department.d_level",
            "userId": "A4_SYS_USER.USERID",
            "userName": "A4_SYS_USER.USERNAME",
            "departmentId": "to_char(A4_SYS_USER.SSDWBS)",
            "pName": "A4_SYS_POSTINFO.P_NAME"
        };
    },
    getJoinDocterAndPoliceObjects: function (filter, order, callback) {
        var columns = this.getJoinDocterAndPoliceColumns();
        var table = this.getJoinDocterAndPolice();
        var where = this.buildWhere(filter, columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order, columns);
        this.innerGetObjects( table, fields, where, orderStr, callback);
    },
},baseAccess.prototype);
module.exports = tableAccess;