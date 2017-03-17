/**
 * 通过SQL构造的action，供一些简单的业务逻辑使用
 * 使用方法：
 *  1.创建routes文件
 *  2.添加方法
 *      "get***List":actionService.getSqlObjectsQuery(***Service.allSql) //取所有行
 *      "get***Item":actionService.getSqlObjectQuery(***Service.allSql) //取一行
 *      "get***":actionService.getSqlMixQuery({
 *          data1:{
 *             sql:***Service.sql1,
 *             defParams:{
 *             },
 *             isList:true
 *          }
 *      })
 *  3.请求时直接返回该sql查询的结果
 * 
 * 暂时用在大屏统计接口上，数据源没定，直接从临时表里面取数据
 */
var dataAccess = require(ROOT_DIR+"/common/dal/dataAccess").dataAccess;
var webRes = require(ROOT_DIR+"/common/tools").webRes;
var webReq = require(ROOT_DIR+"/common/tools").webReq;
var async = require(ROOT_DIR+"/common/tools").async;

var service = {
    getSqlQueryTemplate:function(isList,sql,defParams){
        var params = service._parseSqlParams(sql);
        params = unit.mixin(params,defParams);
        var queryMethod = isList ? "queryObjects" : "queryObject";
        return function(req,res){
            var params1 = webReq.getQueryParam(req,params);
            var dal = new dataAccess();
            async.series([
                dal.open.bind(dal,false),
                function(callback){
                    if(isList){
                        dal[queryMethod](sql,params1,{},callback);
                    }else{
                        dal[queryMethod](sql,params1,callback);
                    }
                }
            ],function(err,data){
                dal.close(function(){});
                webRes.exportJson(res,err,data && data[1]);
            });
            
        }
    },
    getSqlQueryCanDeal:function(queryArray,defParams,dealData){
        return function(req,res){
            var dal = new dataAccess();
            async.series([
                dal.open.bind(dal,false),
                function(callback){
                    async.mapLimit(queryArray,10,function(item, callback) {
                        var sql = item["sql"];
                        var params = service._parseSqlParams(sql);
                        params = unit.mixin(params,defParams);
                        if(item["param"]){
                            for (var key in item["param"]) {
                                if (params.hasOwnProperty(key)) {
                                    params[key] = item["param"][key];
                                }
                            }
                        }
                        var params1 = webReq.getQueryParam(req,params);
                        if(item["isList"]){
                             dal["queryObjects"](sql,params1,{},callback);
                        }else{
                             dal["queryObject"](sql,params1,callback);
                        }
                    }, function(err,data) {
                        if(err){
                            callback(err,data);
                        }else{
                            if(dealData && typeof dealData === 'function'){
                                var result = dealData(data);
                                callback(err,result);
                            }else{
                                callback(err,data&&data[0]);
                            }
                        }
                    });
                }
            ],function(err,data){
                dal.close(function(){});
                webRes.exportJson(res,err,data && data[1]);
            });
            
        }
    },
    getSqlObjectsQuery:function(sql,defParams){
        return service.getSqlQueryTemplate(true,sql,defParams);
    },
    getSqlObjectQuery:function(sql,defParams){
        return service.getSqlQueryTemplate(false,sql,defParams);
    },
    getSqlMixQuery:function(obj){
        var params = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var options = obj[key];
                var keyParams = service._parseSqlParams(options.sql);
                params[key] = options.defParams ? unit.mixin(keyParams,options.defParams) : keyParams;
            }
        }
        return function(req,res){
            var params1 = webReq.getQueryParam(req,params);
            var dal = new dataAccess();
            var tasks = {};
            for (var key in obj) {
                if (obj.hasOwnProperty(key)) {
                    var options = obj[key];
                    var params1 = webReq.getQueryParam(req,params[key]);
                    var queryMethod = options.isList === false ? "queryObject" : "queryObjects";
                    tasks[key] = dal[queryMethod].bind(dal,sql,params[key],{},false);
                }
            }
            async.series([
                dal.open.bind(dal,false),
                function(callback){
                    dal.auto(tasks,callback);
                }
            ],function(err,data){
                dal.close(function(){});
                webRes.exportJson(res,err,data && data[1]);
            });
        }
    },
    _parseSqlParams:function(sql){
        var reg  = new RegExp(":\\w+","g");
        var params = {
        };
        var matchs = sql.match(reg);
        matchs.forEach(function(item) {
            var key = item.substr(1);
            params[key] = null;
        }, this);
        return params;
    }
};
module.exports = service;