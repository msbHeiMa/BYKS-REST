var baseAccess = require("../baseAccess");
var departmentAccess = require(ROOT_DIR + "/common/dal/system/departmentAccess");
var rentalHouseAccess = require(ROOT_DIR + "/common/dal/zhzl/rentalHouseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "nId":"N_ID",
            "flowIn":"FLOW_IN",
            "flowOut":"FLOW_OUT",
            "time":"TIME"
        };
    },
    getTable:function(){
        return "DP_YW_CIGNETFLOW";
    },
    /**
     * 获取关联表的分页查询
     */
    getJoinNetWorkPages:function(filter,order,offset,limit,callback){
        var columns = this.getJoinNetworkColumns();
        var table = this.getJoinNetwork();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order,columns);
        this.innerGetPage(offset,limit,table,fields,where,orderStr,callback);
    },
   
    getJoinNetwork:function(){
        return "DP_YW_CIGNETFLOW inner join DP_YW_CIGNETWORK on DP_YW_CIGNETFLOW.N_ID=DP_YW_CIGNETWORK.ID";
    },
    getJoinNetworkColumns:function(){
        return {
        //    "fid":"DP_YW_CIGNETFLOW.ID",
        //    "nId":"DP_YW_CIGNETFLOW.N_ID",
            "flowIn":"DP_YW_CIGNETFLOW.FLOW_IN",
            "flowOut":"DP_YW_CIGNETFLOW.FLOW_OUT",
       //     "time":"DP_YW_CIGNETFLOW.TIME",
            "nodeId":"DP_YW_CIGNETWORK.NODE_ID",
            "nodeName":"DP_YW_CIGNETWORK.NODE_NAME",
            "nCardId":"DP_YW_CIGNETWORK.N_CARD_ID",
            "nCardName":"DP_YW_CIGNETWORK.N_CARD_NAME"

        };
    },
},baseAccess.prototype);
module.exports = tableAccess;
