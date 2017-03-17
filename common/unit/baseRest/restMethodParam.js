/******************************************************************************
*
* NAME
*   restMehtodParam.js
*
* DESCRIPTION
* rest基本表查询的初始化参数。
*****************************************************************************/
var parseReceivedData = require('./receiveddataparse');
module.exports = {
    restGetParam: function (req) {
        var restGetJson = {};
        restGetJson.receiveUrl = parseReceivedData.parseUrl(req);
        restGetJson.urlparam = req.query;
        restGetJson.cookies=req.cookies;
        return restGetJson;
    },
    restModifyParam:function (req) {
        var restTableJson = {};
        restTableJson.receiveBody = parseReceivedData.parseBody(req);
        restTableJson.receiveUrl = parseReceivedData.parseUrl(req);
        restTableJson.cookies=req.cookies;
        return restTableJson;
    },
    restSonGetParam: function (req) { 
        var restSonGetJson = {};
        restSonGetJson.receiveUrl = parseReceivedData.parseUrlsontable(req);
        restSonGetJson.urlparam = req.query;
        restSonGetJson.cookies=req.cookies;
        return restSonGetJson;
    },
    restSonModifyParam: function (req) { 
        var restSonModifyParam = {};
        restSonModifyParam.receiveBody = parseReceivedData.parseBody(req);
        restSonModifyParam.receiveUrl = parseReceivedData.parseUrlsontable(req);
        restSonModifyParam.cookies=req.cookies;
        return restSonModifyParam;
    },
    restSchParam:function(req){
        var restSonModifyParam =restSonModifyParam=parseReceivedData.parseschemas(req);
        return restSonModifyParam;
    }
};