var baseAccess = require("../baseAccess");
var departmentAccess = require(ROOT_DIR + "/common/dal/system/departmentAccess");

function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "pId":"P_ID",
            "flowReason":"FLOW_REASON",
            "flowDate":"FLOW_DATE",
            "outflowAddress":"OUTFLOW_ADDRESS",
            "outGId":"OUT_G_ID",
            "inflowAddress":"INFLOW_ADDRESS",
            "inGId":"IN_G_ID",
        };
    },
    getTable:function(){
        return "ZZ_FLOW_TRACK";
    },
    _fillGridName:function(rows,callback){
        var dal = new departmentAccess(this.operater,this.dal);
        if(rows.length == 0){
            callback(null,rows);
        }
        else{
            var filter = {
                departmentId:rows.map(function(sch){return sch.outGId}).concat(rows.map(function(sch){return sch.inGId}))
            };
            dal.getObjects(filter,null,function(err,data){
                if(data){
                    var cache={};
                    data.forEach(function(element) {
                        cache[element.departmentId] = element;
                    }, this);
                    rows.forEach(function(element) {
                        element["outGName"] = element.outGId==null?"县外":(cache[element.outGId] && cache[element.outGId].displayName);
                        element["inGName"] = element.inGId==null?"县外":(cache[element.inGId] && cache[element.inGId].displayName);
                    }, this);
                }
                callback(err,rows);
            });
        }
    },
    getObjectWithGridName:function(filter,callback){
        var self = this;
        this.getObject(filter,function(err,res){
            if(err || !res)callback(err,null);
            else{
                self._fillGridName([res],function(err,data){
                    callback(err,data&&data[0]);
                });
            }
        });
    },
    getObjectsWithGridName:function(filter,order,callback){
        var self = this;
        this.getObjects(filter,order,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillGridName(res,callback);
            }
        });
    },
    getPageWithGridName:function(filter,order,offset,limit,callback){
        var self = this;
        this.getPage(filter,order,offset,limit,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillGridName(res.rows,function(err,data){
                    if(data){
                        res.rows = data;
                    }
                    callback(err,res);
                });
            }
        });
    },
},baseAccess.prototype);
module.exports = tableAccess;
