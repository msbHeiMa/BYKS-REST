var http = require("http");
var urlParser = require("url");
var querystring = require("querystring");
var charset = require("charset");
var Iconv = require("iconv").Iconv;
var that = {
    requestWhileNotTimeout:function(options,timeout,maxTimes,callback){
        var timeoutTimes = 0;
        var succ = false;
        whileFunc(function(callback){
            var time = new Date().getTime();
            var timer = setTimeout(function(){
                req.abort();
            },timeout * 1000);
            var req = that.request(options,function(err,data){
                clearTimeout(timer);
                if(err){
                    console.log(`超时${timeoutTimes}次，原因${err.message}`);
                    timeoutTimes+=1;
                }
                else{
                    succ = true;
                }
                callback(null,data);
            });
        },function(){
            return timeoutTimes <= maxTimes && !succ;
        },function(err,data){
            var res = data && data[data.length-1];
            callback(err ? err : (res ? null :`超时超过${timeoutTimes}次`),res);
        });
        function whileFunc(doFn,checkFn,callback){
            var res = [];
            whileInner(res,checkFn,doFn,function(err){
                callback(err,res);
            });
            function whileInner(res,checkFn,doFn,endFn){
                if(checkFn()){
                    doFn(function(err,data){
                        res.push(data);
                        if(err){
                            endFn(err);
                        }
                        else{
                            whileInner(res,checkFn,doFn,endFn);
                        }
                    });
                }
                else{
                    endFn();
                }
            }
        }
    },
    request:function(options,callback){
        var postData = "";
        var contentType = "";
        if(options.data){
            if(typeof options.data == "string"){
                postData = options.data;
            }
            else{
                switch(options.dataType){
                    case "json":
                        postData = JSON.stringify(options.data);
                        break;
                    case "form":
                    default:
                        postData = querystring.stringify(options.data);
                        urlParser.
                        break;
                }
            }
            switch(options.dataType){
                case "json":
                    contentType = 'application/json';
                    break;
                case "form":
                default:
                    contentType = 'application/x-www-form-urlencoded';
                    break;
            }
            delete options.data;
            delete options.dataType;
        }
        if(!options.method){
            options.method = postData ? "post" : "get";
        }
        if(options.url){
            var url = urlParser.parse(options.url);
            options.hostname = url.hostname;
            options.port = url.port;
            options.path = url.path;
            delete options.url;
        }
        var headers = options.headers || {};
        if(postData){
            headers['Content-Type'] = contentType;
            headers['Content-Length'] = Buffer.byteLength(postData);
        }
        if(options.cookie){
            if(Array.isArray(options.cookie)){
                for(var i=0;i<options.cookie.length;i++){
                    headers['Cookie'] = (headers['Cookie']==null?"":headers['Cookie'])+options.cookie[i]+";";
                }
            }else{
                headers['Cookie'] = options.cookie;
            }
            delete options.cookie;
        }
        options.headers = headers;
        var req = http.request(options, (res) => {
            // console.log(`STATUS: ${res.statusCode}`);
            // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            // res.setEncoding('utf8');
            var bodyChunk = [];
            var bodySize = 0;
            res.on('data', (chunk) => {
                bodyChunk.push(chunk);
                bodySize += chunk.length;
                // console.log(`BODY: ${chunk}`);
            });
            res.on('end', () => {
                var buffer = new Buffer(bodySize), pos = 0;
                for(var i = 0, l = bodyChunk.length; i < l; i++) {
                    bodyChunk[i].copy(buffer, pos);
                    pos += bodyChunk[i].length;
                }
                var cs = charset(res.headers,buffer);     
                if(cs!=null){
                    var toUtf8 = new Iconv(cs,'UTF-8//TRANSLIT//IGNORE');
                    callback(null,{"res":res,"data":toUtf8.convert(buffer).toString()});
                }else{
                    callback(null,{"res":res,"data":buffer.toString()});
                }
                
            })
        });
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
            callback(e,null);
        });

        if(postData){
            req.write(postData);
        }
        req.end();
        return req;
    }
};
module.exports = that;