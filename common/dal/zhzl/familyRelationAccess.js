var baseAccess = require("../baseAccess");
var personAccess = require(ROOT_DIR + "/common/dal/zhzl/personAccess");

function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "qsPId":"QS_P_ID",
            "hzPId":"HZ_P_ID",
            "relation":"RELATION",
            "personName":"PERSON_NAME",
            "idNumber":"ID_NUMBER",
            "dataSource":"DATA_SOURCE",
        };
    },
    getTable:function(){
        return "ZZ_FAMILY_RELATION";
    },
    _fillPersonInfo:function(rows,callback){
        var dal = new personAccess(this.operater,this.dal);
        if(rows.length == 0){
            callback(null,rows);
        }
        else{
            var filter = {
                id:rows.map(function(sch){return sch.qsPId})
            };
            dal.getObjects(filter,null,function(err,data){
                if(data){
                    var cache={};
                    data.forEach(function(element) {
                        cache[element.id] = element;
                    }, this);
                    rows.forEach(function(element) {
                        element["name"] = cache[element.qsPId] && cache[element.qsPId].name;
                        element["cardNum"] = cache[element.qsPId] && cache[element.qsPId].cardNum;
                        element["phone"] = cache[element.qsPId] && cache[element.qsPId].phone;
                    }, this);
                }
                callback(err,rows);
            });
        }
    },
    getObjectWithPersonInfo:function(filter,callback){
        var self = this;
        this.getObject(filter,function(err,res){
            if(err || !res)callback(err,null);
            else{
                self._fillPersonInfo([res],function(err,data){
                    callback(err,data&&data[0]);
                });
            }
        });
    },
    getObjectsWithPersonInfo:function(filter,order,callback){
        var self = this;
        this.getObjects(filter,order,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillPersonInfo(res,callback);
            }
        });
    },
    getPageWithPersonInfo:function(filter,order,offset,limit,callback){
        var self = this;
        this.getPage(filter,order,offset,limit,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillPersonInfo(res.rows,function(err,data){
                    if(data){
                        res.rows = data;
                    }
                    callback(err,res);
                });
            }
        });
    },
    checkPersonUpdate:function(attrs,filter,callback){
        var that = this;
        if(attrs["idNumber"]&&attrs["idNumber"]!=""){
            var dal = new personAccess(this.operater,this.dal);
            var pFilter = {
                cardNum:attrs["idNumber"]
            };
            dal.getObjects(pFilter,null,function(err,data){
                if(err){
                    callback(err);
                }else if(data.length==0){
                    attrs["qsPId"] = null;
                    that.update(attrs,filter,callback);
                }else{
                    attrs["qsPId"] = data["id"];
                    that.update(attrs,filter,callback);
                }
            });
        }else{
            that.update(attrs,filter,callback);
        }
    },
    checkPersonInsert:function(attrs,callback){
        var that = this;
        attrs["dataSource"]="1";
        if(attrs["idNumber"]&&attrs["idNumber"]!=""){
            var dal = new personAccess(this.operater,this.dal);
            var filter = {
                cardNum:attrs["idNumber"]
            };
            dal.getObject(filter,function(err,data){
                if(data){
                    attrs["qsPId"] = data["id"];
                }
                that.insert(attrs,callback);
            });
        }else{
            that.insert(attrs,callback);
        }
    }
},baseAccess.prototype);
module.exports = tableAccess;
