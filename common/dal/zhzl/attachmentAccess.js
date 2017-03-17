var baseAccess = require("../baseAccess");
var personAccess = require(ROOT_DIR + "/common/dal/zhzl/personAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "fileName":"FILE_NAME",
            "category":"CATEGORY",
            "bId":"B_ID",
            "fileType":"FILE_TYPE",
            "filePath":"FILE_PATH",
            "visitPath":"VISIT_PATH",
            "oId":"O_ID",
            "fileSize":"FILE_SIZE",
            "realType":"REAL_TYPE",
        };
    },
    getTable:function(){
        return "ZZ_ATTACHMENT";
    },
    _fillThumbnail:function(rows,callback){
        var dal = this;
        if(rows.length == 0){
            callback(null,rows);
        }
        else{
            var filter = {
                oId:rows.map(function(sch){return sch.id})
            };
            dal.getObjects(filter,null,function(err,data){
                if(data){
                    var cache={};
                    data.forEach(function(element) {
                        cache[element.oId] = element;
                    }, this);
                    rows.forEach(function(element) {
                        if(cache[element.id]){
                            element["thumbnail"] = {
                                "id":cache[element.id].id,
                                "fileName":cache[element.id].fileName,
                                "category":cache[element.id].category,
                                "visitPath":cache[element.id].visitPath
                            }
                        }
                    }, this);
                }
                callback(err,rows);
            });
        }
    },
    getObjectWithThumbnail:function(filter,callback){
        var self = this;
        this.getObject(filter,function(err,res){
            if(err || !res)callback(err,null);
            else{
                self._fillThumbnail([res],function(err,data){
                    callback(err,data&&data[0]);
                });
            }
        });
    },
    getObjectsWithThumbnail:function(filter,order,callback){
        var self = this;
        this.getObjects(filter,order,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillThumbnail(res,callback);
            }
        });
    },
    getPageWithThumbnail:function(filter,order,offset,limit,callback){
        var self = this;
        this.getPage(filter,order,offset,limit,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillThumbnail(res.rows,function(err,data){
                    if(data){
                        res.rows = data;
                    }
                    callback(err,res);
                });
            }
        });
    }
},baseAccess.prototype);
module.exports = tableAccess;
