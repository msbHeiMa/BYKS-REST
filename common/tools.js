/******************************************************************************
 *
 * NAME
 *   tools.js
 *
 * DESCRIPTION
 * 工具集合
 * 
 * 使用时：
 * var tools = require("/common/tools");
 * tools.tool1.setInterval(function (params) {});
 * 
 * 对于一些引用的工具，也可以这样来减少依赖
 * var async = require("/common/tools").async;
 * 后续可以在此文件中使用其他库对他进行替换，也可以随时给他增加方法，或注入一些逻辑，方便写代码
 * exports = {
 *      ...
 *      async : require("anycompany/async")
 *      ...
 * }
 * 
 * var async = require("async");
 * async.myLogic = function(){
 * };
 * exports = {
 *      ...
 *      async : async
 *      ...
 * }
 *****************************************************************************/

var async = require("async");
var jsdom = require("jsdom");
// var charset = require("charset");
var logger = require("./unit/logger");
var webRes = require("./unit/webRes");
var webReq = require("./unit/webReq");
var httpUnit = require("./unit/httpUnit");
var cache =  require("./unit/cache");

var dataFilter =  require("./unit/dataFilter");
var uuidGet = require("./unit/uuidGet");
var crypto = require("./unit/crypto");
var queryString = require('querystring');
var url = require('url');
var http = require('http');
var socketio= require('socket.io');
var formidable = require('formidable');

module.exports = {
    webRes : webRes,
    webReq : webReq,
    logger : logger,
    async : async,
    jsdom : jsdom,
    cache : cache,
    dataFilter : dataFilter,
    // charset : charset,
    httpUnit : httpUnit,
    uuidGet : uuidGet,
    queryString:queryString,
    url:url,
    http:http,
    socketio:socketio,
    crypto:crypto,
    formidable:formidable
};


