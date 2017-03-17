var baseAccess = require("../baseAccess");
var departmentAccess = require(ROOT_DIR + "/common/dal/system/departmentAccess");
var flowPersonAccess = require(ROOT_DIR + "/common/dal/zhzl/flowPersonAccess");

function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "cardNum":"CARD_NUM",
            "name":"NAME",
            "usedName":"USED_NAME",
            "gender":"GENDER",
            "birthDate":"BIRTH_DATE",
            "nation":"NATION",
            "nativePlace":"NATIVE_PLACE",
            "maritalStatus":"MARITAL_STATUS",
            "politicalStatus":"POLITICAL_STATUS",
            "education":"EDUCATION",
            "height":"HEIGHT",
            "bloodType":"BLOOD_TYPE",
            "photoPath":"PHOTO_PATH",
            "relBelief":"REL_BELIEF",
            "occCategory":"OCC_CATEGORY",
            "occupation":"OCCUPATION",
            "specialty":"SPECIALTY",
            "sPlace":"S_PLACE",
            "domicile":"DOMICILE",
            "dAddr":"D_ADDR",
            "death":"DEATH",
            "personType":"PERSON_TYPE",
            "gId":"G_ID",
            "residence":"RESIDENCE",
            "rAddr":"R_ADDR",
            "phone":"PHONE",
            "tel":"TEL",
            "email":"EMAIL",
            "isLegal":"IS_LEGAL",
            "isFlow":"IS_FLOW",
            "isSupervise":"IS_SUPERVISE",
            "dataSource":"DATA_SOURCE",
            "createDate":"CREATE_DATE",
        };
    },
    getTable:function(){
        return "ZZ_PERSON";
    },
    _fillGridName:function(rows,callback){
        var dal = new departmentAccess(this.operater,this.dal);
        if(rows.length == 0){
            callback(null,rows);
        }
        else{
            var filter = {
                departmentId:rows.map(function(sch){return sch.gId})
            };
            dal.getObjects(filter,null,function(err,data){
                if(data){
                    var cache={};
                    data.forEach(function(element) {
                        cache[element.departmentId] = element;
                    }, this);
                    rows.forEach(function(element) {
                        element["gridName"] = cache[element.gId] && cache[element.gId].displayName;
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
    //获取分页信息，带上是否流出外县的状态，用于列表中判断是否可再次流出
    getPageWithStatus:function(filter,order,offset,limit,callback){
        var self = this;
        this.getPageWithGridName(filter,order,offset,limit,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillStatus(res.rows,function(err,data){
                    if(data){
                        res.rows = data;
                    }
                    callback(err,res);
                });
            }
        });
    },
    _fillStatus:function(rows,callback){
        var dal = new flowPersonAccess(this.operater,this.dal);
        if(rows.length == 0){
            callback(null,rows);
        }
        else{
            var filter = {
                pId:rows.map(function(sch){return sch.id})
            };
            dal.getObjects(filter,null,function(err,data){
                if(data){
                    var cache={};
                    data.forEach(function(element) {
                        cache[element.pId] = element["isOutCountry"]==null?"0":element["isOutCountry"];
                    }, this);
                    rows.forEach(function(element) {
                        element["isOutCountry"] = cache[element.id]==null?"0":cache[element.id];
                    }, this);
                }
                callback(err,rows);
            });
        }
    },
},baseAccess.prototype);

module.exports = tableAccess;