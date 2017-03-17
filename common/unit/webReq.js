/******************************************************************************
 *
 * NAME
 *   webReq.js
 *
 * DESCRIPTION
 * Web请求中获取参数
 *****************************************************************************/
var cookie = require("cookie");
module.exports = {
    /**
     * 从Web请求中获取数据，填充到defObj，如果请求中没有该值，直接用defObj的默认值
     * @param {NSExpress.Request} req
     * @param {Object} defObj
     * @returns {Object}
     */
    getParam:function(req,defObj){
        var res = {};
        for (var key in defObj) {
            if (defObj.hasOwnProperty(key)) {
                var defVal = defObj[key];
                if(key.indexOf("[]")!=-1){
                    var value = req.param(key,defVal);
                    if(!Array.isArray(value)){
                        res[key] = [];
                        res[key].push(value);
                    }else{
                        res[key] = req.param(key,defVal);
                    }
                }else{
                    res[key] = req.param(key,defVal);
                }
                
            }
        }
        return res;
    },
    getQueryParam:function(req,defObj){
        var query = req.query;
        var res = {};
        for (var key in defObj) {
            if (defObj.hasOwnProperty(key)) {
                var defVal = defObj[key];
                res[key] = typeof(query[key]) != "undefined" ? query[key] : defVal;
            }
        }
        return res;
    },
    getCookieParam:function(req,defObj){
        var cookies = typeof(req) == "string" ? req : req.headers['cookie'];
        if(cookies){
            cookies = typeof(cookies) == "string" ? cookie.parse(cookies) : cookies;
        }
        var res = {};
        for (var key in defObj) {
            if (defObj.hasOwnProperty(key)) {
                var defVal = defObj[key];
                res[key] = typeof(cookies[key]) != "undefined" ? cookies[key] : defVal;
            }
        }
        return res;
    }
};