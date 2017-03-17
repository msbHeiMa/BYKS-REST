

var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "userId": "WF_ROLEUSER.USER_ID",
            "nodeId":"WF_BUSI_NODEROLE.N_ID"
        };
    },
    getTable: function () {
        return "WF_ROLEUSER INNER JOIN WF_BUSI_NODEROLE ON WF_BUSI_NODEROLE.R_ID=WF_ROLEUSER.R_ID";
    },
    /**
     * 获取关联查询的多行数据
     */
    getJoinApproverObjects:function(filter,order,callback){
        var columns = this.getJoinApproverColumns();
        var table = this.getJoinApproverTable();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order);
        this.innerGetObjects(table,fields,where,orderStr,callback);
    },
    getJoinApproverTable:function(){
        return "WF_BUSI_PROC_NODE N INNER JOIN WF_BUSI_PROC_NODEUSER U ON U.N_ID=N.ID AND U.STATUS=1";
    },
    getJoinApproverColumns:function(){
        return {
            "userId": "U.USER_ID",
        };
    }
}, baseAccess.prototype);
module.exports = tableAccess;