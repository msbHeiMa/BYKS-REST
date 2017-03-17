var baseAccess = require("../baseAccess");
var personAccess = require(ROOT_DIR + "/common/dal/zhzl/personAccess");

function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "hId":"H_ID",
            "pId":"P_ID",
            "isSignGuarantee":"IS_SIGN_GUARANTEE",
            "limitPersons":"LIMIT_PERSONS",
            "realityPersons":"REALITY_PERSONS",
            "houseFileNum":"HOUSE_FILE_NUM",
            "managerTypes":"MANAGER_TYPES",
            "rentalHouseProperty":"RENTAL_HOUSE_PROPERTY",
            "rentalType":"RENTAL_TYPE",
            "roomNumber":"ROOM_NUMBER",
            "rentalUse":"RENTAL_USE",
            "czPId":"CZ_P_ID",
            "dataSource":"DATA_SOURCE",
        };
    },
    getTable:function(){
        return "ZZ_RENTAL_HOUSE";
    },
     _fillPersonInfo:function(rows,callback){
        var dal = new personAccess(this.operater,this.dal);
        if(rows.length == 0){
            callback(null,rows);
        }
        else{
            var filter = {
                id:rows.map(function(sch){return sch.pId}).concat(rows.map(function(sch){return sch.czPId}))
            };
            dal.getObjects(filter,null,function(err,data){
                if(data){
                    var cache={};
                    data.forEach(function(element) {
                        cache[element.id] = element;
                    }, this);
                    rows.forEach(function(element) {
                        element["pName"] = cache[element.pId] && cache[element.pId].name;
                        element["pCardNum"] = cache[element.pId] && cache[element.pId].cardNum;
                        element["pPhone"] = cache[element.pId] && cache[element.pId].phone;
                        element["czName"] = cache[element.czPId] && cache[element.czPId].name;
                        element["czCardNum"] = cache[element.czPId] && cache[element.czPId].cardNum;
                        element["czPhone"] = cache[element.czPId] && cache[element.czPId].phone;
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
},baseAccess.prototype);
module.exports = tableAccess;
