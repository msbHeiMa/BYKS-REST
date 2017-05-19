var express = require('express');
var fs = require("fs");
var webRes = require("../tools").webRes;
var logger = require("../tools").logger;
var async = require("../tools").async;
var formidable = require("../tools").formidable;
var options = require(ROOT_DIR + "/common/config/options");

/* GET home page. */
module.exports = {
    getRouter:function(dir){
        var router = express.Router();
        router.all('/(*)',function(req,res){
            var route = req.params[0];
            module.exports.runRoute(dir,route,req,res);
        });
        return router;
    },
    runRoute:function(dir,route,req,res){
        logger.log("解析route:"+route);
        var parts = route.split('/');
        findController(dir,parts,function(err,routeInfo){
            if(err){
                var msg = typeof err == "string" ? err : err.message;
                logger.log(msg);
                webRes.exportJson(res,msg);
            }
            else{
                runAction(routeInfo.controller,routeInfo.remaindParts,req,res,function(err,actionInfo){
                    if(err){
                        var msg = typeof err == "string" ? err : err.message;
                        logger.log(msg);
                        webRes.exportJson(res,msg);
                    }
                    else{
                        var isFile = isFileRequest(req);
                        if(!isFile){
                            actionInfo.action.call(actionInfo.controller,req,res);
                        }
                        else{
                            var form = new formidable.IncomingForm();
                            form.uploadDir = "E:/BYKS/BYKS/rest/BYKS/routes/uploadFile/temp";   //文件保存在系统临时目录 options.tmpPath
                            form.maxFieldsSize = 10 * 1024 * 1024;  //上传文件大小限制为最大10M  
                            form.keepExtensions = true;        //使用文件的原扩展名
                            // 检查目标目录，不存在则创建
                            if(!fs.existsSync(form.uploadDir)){
                                fs.mkdirSync(form.uploadDir);
                            }
                            form.parse(req, function (err, fields, files) {
                                if (err) {
                                    webRes.exportJson(res,err);
                                }
                                else{
                                    actionInfo.action.call(actionInfo.controller,req,res,{files:files,fields:fields});
                                }
                            }); 
                        }
                    }
                });
            }
        });
    }
};

function findController(dir,parts,callback){
    var tryFile = dir;
    var index = 0;
    var count = parts.length;
    var fileExists = false;
    async.whilst(
        function() { 
            return !fileExists && index < count; 
        },
        function(callback){
            var part = parts[index];
            index ++;
            tryFile += "/" + part;
            fs.exists(tryFile+".js",function(exists){
                if(exists){
                    fileExists = true;
                    callback(null,tryFile);
                }
                else{
                    callback(null,null);
                }
            });
        },
        function (err, file) {
            if(!err && !file){
                err = "没有找到controller文件"+tryFile;
            }
            callback(err,err ? null :
                {
                    controller: require(file),
                    remaindParts:parts.splice(index)
                });
        }
    );
}
/**
 * @param  {Object} controller
 * @param  {String[]} remaindParts
 * @param  {NSExpress.Request} req
 * @param  {NSExpress.Response} res
 * @param  {Function} callback
 */
function runAction(controller,remaindParts,req,res,callback){
    var method = remaindParts[0];
    var type = typeof controller[method];
    var actionInfo = null;
    switch(type){
        case "function":
            actionInfo = {controller:controller,action:controller[method]};
            break;
        case "object":
            var methods = controller[method];
            var reqMethod = req.method.toLowerCase();
            if(methods[reqMethod] && typeof methods[reqMethod] == "function"){
                actionInfo = {controller:controller,action:methods[reqMethod]};
            }
            else{
                callback("没有找到对应的方法,或限制了请求方式"+method,null);
            }
            break;
        default:
            callback("没有找到对应的方法"+method,null);
            break;
    }
    if(actionInfo){
        if(controller.$$beforeAction){
            controller.$$beforeAction(req,res,actionInfo,function(){
                callback(null,actionInfo);
            });
        }
        else{
            callback(null,actionInfo);
        }
    }
}
/**
 * @param  {NSExpress.Request} req
 * @returns {Boolean}
 */ 
function isFileRequest(req){
    return req.headers && req.headers["content-type"] && req.headers["content-type"].indexOf("multipart/form-data;")>=0;
}