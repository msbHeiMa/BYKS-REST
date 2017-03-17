var userSSDWBMGet=require(ROOT_DIR+"/common/unit/userSSDWBMGet");
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getUser:function(departId,callback){
        var userSql = "SELECT DEPARTMENTID,D_LEVEL,DEPARTMENTNAME FROM A4_SYS_DEPARTMENT WHERE DEPARTMENTID =" + departId;
        this.dal.queryObjects( userSql,{},{}, callback);
    },
    getDownUser: function (departId, level,callback) {//查询当前用户下所有的用户
        if(parseInt(level)<5){
            var curlevel=(parseInt(level)+1)+"";
        }
        var max=userSSDWBMGet.getUserMixValue(level+"");
        var downusersql = "SELECT DEPARTMENTID,D_LEVEL FROM A4_SYS_DEPARTMENT WHERE BITAND(" + max + ",DEPARTMENTID )=" + departId + " AND D_LEVEL=" + curlevel;
        this.dal.queryObjects( downusersql,{},{}, callback);
    },
     getCountByUserLevel: function (queryName,downuser,callback) {
        if(downuser.length>0){
            var levelmaxvalue = userSSDWBMGet.getUserMixValue(downuser[0].D_LEVEL + "");
            var sqlString = [];
        var cur_max = 0;
        var finalcount = [];
        var loopCount = 0;
        for (var i = 0; i < downuser.length; i++) {
            sqlString[i] = "SELECT T1.MANAGE_LEVEL, COUNT(*) AS COU_PEO," + downuser[i].DEPARTMENTID + " as ssdwbm FROM ZZ_ZSZHJSB T1, PSM_PERSON T2 WHERE T1.P_ID = T2. ID  AND BITAND(" + levelmaxvalue+ ", T2.SSDWBM) = " + downuser[i].DEPARTMENTID + " GROUP BY T1.MANAGE_LEVEL ";
        }
        var sqlStringF = "";
        var sqlStringFIN = "";
        for (var i = 0; i < sqlString.length; i++) {
            if (i != sqlString.length - 1)
                sqlStringF += sqlString[i] + " UNION ";
            if (i == sqlString.length - 1)
                sqlStringF += sqlString[i];
        }
        sqlStringFIN = "SELECT A .*, dep.departmentname FROM (" + sqlStringF + ") A INNER JOIN a4_sys_department dep ON dep.departmentid = A .ssdwbm ";
        var sqlStringStatic="SELECT * FROM ("+sqlStringFIN+") WHERE DEPARTMENTNAME like '%"+queryName+"%' "
        this.dal.queryObjects(sqlStringStatic,{},{}, callback);}

        else{
            callback("此部门下并没有对应的统计数据");
        }
        
    },
},baseAccess.prototype);
module.exports = tableAccess;