/******************************************************************************
*
* NAME
*   rest.js
*
* DESCRIPTION
* rest基本表查询的初始化参数。
*路由注释：
*tablel:用于基本表的简单的操作，例如rest/tables/app
*view:用于字母表的查询，包含外键的表格查询。rest/views/app/外键数值
*addschemas：用于表构架维护中，对于fields等表的插入操作。例如：rest/addschemas/app前提是存在app表。
*uuid：用于uuid生成，可选生成数量。例如：rest/uuid?number=5  
*schemastable：用于查询表构架信息
*schemasdomain：用于查询域字段
*socketmessage：用于接受并写入用于发送的socket信息，同时发送socket
*tablesrownum：用于基本表查询，只查询符合结果条数。
*tableuserrows：用于socket查询，在服务端自动添加用户信息进行查询。
*tablesuserrownum：用于socket查询，在服务端自动添加用户信息进行查询，只用于数量查询
*****************************************************************************/

var webRes = require(global.ROOT_DIR+"/common/tools").webRes;
var log = require(global.ROOT_DIR+"/common/tools").log;
var url = require(global.ROOT_DIR + "/common/tools").url;


console.log(global.ROOT_DIR);
module.exports = {
    tables:  {
        "get":function(req,res){
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restGetRows(restMethodParam.restGetParam(req),webRes.exportRestJson.bind(null, res));
        },
         "delete":function (req,res) {
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restDeleteRows(restMethodParam.restModifyParam(req),webRes.exportRestJson.bind(null, res));
        },
        "post":function(req,res){
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restInsertRows(restMethodParam.restModifyParam(req),webRes.exportRestJson.bind(null, res));
        },
        "put":function (req,res) {
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restUpdateRows(restMethodParam.restModifyParam(req),webRes.exportRestJson.bind(null, res));
        }
    },
    view: {
        "get": function (req, res) {
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam = require(global.ROOT_DIR + "/common/unit/baseRest/restMethodParam");
            restTableService.restSonGetRows(restMethodParam.restSonGetParam(req), webRes.exportRestJson.bind(null, res));
        },
        "delete": function (req, res) {
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam = require(global.ROOT_DIR + "/common/unit/baseRest/restMethodParam");
            restTableService.restSonDeleteRows(restMethodParam.restSonModifyParam(req), webRes.exportRestJson.bind(null, res));
        },
        "post": function (req, res) {
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam = require(global.ROOT_DIR + "/common/unit/baseRest/restMethodParam");
            restTableService.restInsertRows(restMethodParam.restModifyParam(req), webRes.exportRestJson.bind(null, res));
        },
        "put": function (req, res) {
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam = require(global.ROOT_DIR + "/common/unit/baseRest/restMethodParam");
            restTableService.restUpdateRows(restMethodParam.restModifyParam(req), webRes.exportRestJson.bind(null, res));
        }
    },
    addschemas: function (req, res) {
        var schemaService = require(global.ROOT_DIR + "/common/service/baseRest/schemaService");
        var parseReceivedData = require(global.ROOT_DIR + "/common/unit/baseRest/receiveddataparse");
        schemaService.insertSchemas(parseReceivedData.parseUrl(req), webRes.exportJson.bind(null, res));
    },
    uuid: {
        "get":function(req,res) {
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restUuid(restMethodParam.restGetParam(req),webRes.exportJson.bind(null, res));
        }
    },
    schemastable: {
        "get":function (req,res) {
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restSchGetRows(restMethodParam.restGetParam(req),webRes.exportRestJson.bind(null, res));
        }
    },
    schemasdomain: {
        "get": function (req, res) {
            var schemaService = require(global.ROOT_DIR + "/common/service/baseRest/schemaService");
            var parseReceivedData = require(global.ROOT_DIR + "/common/unit/baseRest/receiveddataparse");
            var receiveData = parseReceivedData.parseUrl(req);
            receiveData.param = url.parse(req.url, true).query;
            schemaService.selectdomain(receiveData, webRes.exportJson.bind(null, res));
        }},
    socketmessage:{
        "post":function (req,res) {
            var socket=require(global.ROOT_DIR + "/common/service/baseRest/socketserver");
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");      
            restTableService.restInsertRows(restMethodParam.restModifyParam(req),webRes.exportRestJson.bind(null, res));        
            socket.sendNotification(socket.getReceiverId(req));
        }
    },
    tablesrownum:{
        "get":function(req,res){
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restGetRowsNumber(restMethodParam.restGetParam(req),webRes.exportRestJson.bind(null, res));
        }
    },
    tableuserrows:{
        "get":  function(req,res){
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restUserRows(restMethodParam.restGetParam(req),webRes.exportRestJson.bind(null, res));
        }
    },
    tablesuserrownum:{
        "get":function(req,res){
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restUserRowsNum(restMethodParam.restGetParam(req),webRes.exportRestJson.bind(null, res));
        }
    },
    createtable:{
        "post":function(req,res){
            var restTableService = require(global.ROOT_DIR + "/common/service/baseRest/restTableService");
            var restMethodParam=require(global.ROOT_DIR+"/common/unit/baseRest/restMethodParam");
            restTableService.restCreateTable(restMethodParam.restSchParam(req),webRes.exportRestJson.bind(null, res));
        }
    }
};

