var webRes = require(ROOT_DIR + "/common/tools").webRes;
var webReq = require(ROOT_DIR + "/common/tools").webReq;
var log = require(ROOT_DIR + "/common/tools").log;
var async = require(ROOT_DIR + "/common/tools").async;

var userService = require(ROOT_DIR + "/common/service/system/userService");
var aggDetailService = require(ROOT_DIR + "/common/service/cig/cigAggserviceDetailService");
var aggLogService = require(ROOT_DIR + "/common/service/cig/cigAggserviceLogService");
var aggManagerService = require(ROOT_DIR + "/common/service/cig/cigAggserviceManagerService");
var datasourceLogService = require(ROOT_DIR + "/common/service/cig/cigDatasourceLogService");
var datasourceManagerService = require(ROOT_DIR + "/common/service/cig/cigDatasourceManagerService");
var cigExcelService = require(ROOT_DIR + "/common/service/cig/cigExcelService");

function calcTime(timecollapse) {
    let hours = Math.floor(timecollapse / 1000 / 3600);
    let minutes = Math.floor((timecollapse - hours * 1000 * 3600) / 1000 / 60);
    return "耗时 " + hours + "小时 " + minutes + "分钟";
}

var actions = {
    /**
    * @description 数据聚合服务   
    * @param {NSExpress.Request} req
    * @param {NSExpress.Response} res 
    */
    aggServiceList: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    serviceName: "",
                    offset: 0,
                    limit: 10,
                });
                aggManagerService.queryList(
                    query.serviceName,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    aggServiceGetObj: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    id: "",
                });
                aggManagerService.list(
                    query.id,
                    webRes.exportJson.bind(null, res))
            }
        });
    },
    aggServiceCreate: {

        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var data = webReq.getParam(req, {
                        serviceName: "",
                        serviceType: "",
                        status: "",
                        detail: ""

                    });
                    aggManagerService.create(data, user, webRes.exportJson.bind(null, res));
                }
            });
        }
    },
    aggServiceEdit: {

        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var data = webReq.getParam(req, {
                        id: "",
                        serviceName: "",
                        serviceType: "",
                        status: "",
                        detail: ""
                    });
                    aggManagerService.update(data, user, webRes.exportJson.bind(null, res));
                }
            });
            // webRes.exportJson(res,null,null);
        }
    },
    "aggServiceDelete": {
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var id = webReq.getParam(req, {
                        "id": ""
                    });
                    aggManagerService.delete(id, webRes.exportJson.bind(null, res));
                }
            });

        }
    },

    /**
     * @description 数据聚合服务日志   
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    aggServiceLogList: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    aggserviceId: "",
                    offset: 0,
                    limit: 10,
                });
                aggLogService.queryList(
                    query.aggserviceId,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /**
 * @description 数据聚合服务详情   
 * @param {NSExpress.Request} req
 * @param {NSExpress.Response} res 
 */
    aggServiceDetailList: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    aggserviceId: "",
                    offset: 0,
                    limit: 10,
                });
                aggLogService.queryList(
                    query.aggserviceId,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },


    /**
* @description 数据管理服务   
* @param {NSExpress.Request} req
* @param {NSExpress.Response} res 
*/
    datasourceServiceList: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    accessStyle: "",
                    keyword: "",
                    offset: 0,
                    limit: 10,
                });
                datasourceManagerService.queryList(
                    query.accessStyle,
                    query.keyword,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    datasourceServiceGetObj: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    id: "",
                });
                datasourceManagerService.list(
                    query.id,
                    webRes.exportJson.bind(null, res))
            }
        });
    },
    datasourceServiceCreate: {

        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var data = webReq.getParam(req, {
                        datasourceName: "",
                        datasourceUnit: "",
                        relatedSystem: "",
                        accessStyle: "",
                        runState: 10,//默认运行
                        updateFrequency: "",
                        updateTime: "",
                        accessConfig: ""

                    });
                    datasourceManagerService.create(data, user, webRes.exportJson.bind(null, res));
                }
            });
        }
    },
    datasourceServiceEdit: {

        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var data = webReq.getParam(req, {
                        id: "",
                        datasourceName: "",
                        datasourceUnit: "",
                        relatedSystem: "",
                        runState: "",
                        accessStyle: "",
                        updateFrequency: "",
                        updateTime: "",
                        accessConfig: ""
                    });
                    datasourceManagerService.update(data, user, webRes.exportJson.bind(null, res));
                }
            });
            // webRes.exportJson(res,null,null);
        }
    },
    "datasourceServiceDelete": {
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var id = webReq.getParam(req, {
                        "id": ""
                    });
                    datasourceManagerService.delete(id, webRes.exportJson.bind(null, res));
                }
            });

        }
    },
    datasourceServiceStart: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    id: "",
                });
                datasourceManagerService.serviceStart(
                    query.id,
                    user,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    datasourceServiceStop: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    id: "",
                });
                datasourceManagerService.serviceStop(
                    query.id,
                    user,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /**
    * @description 数据管理日志查询   
    * @param {NSExpress.Request} req
    * @param {NSExpress.Response} res 
    */
    datasourceServiceLogList: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    accessStyle: "",
                    keyword: "",
                    sourceid: "",
                    offset: 0,
                    limit: 10,
                });
                datasourceLogService.queryList(
                    query.accessStyle,
                    query.keyword,
                    query.sourceid,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    //该类型数据源导入详情
    datasourceServiceLogGetDetails: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                //该ID为数据源类型ID
                var query = webReq.getQueryParam(req, {
                    id: "",
                });
                async.autoInject({
                    "managerInfo": function (callback) {
                        datasourceManagerService.list(query.id, callback);

                    },
                    "logInfo": function (callback) {
                        datasourceLogService.queryTypeList(query.id, callback);
                    },
                }, function (err, returnData) {

                    // {label:"数据源名称",name:"datasourceName",type:"display",colSpan:2},
                    // {label:"来源单位",name:"datasourceUnit",type:"display",colSpan:2},
                    // {label:"关联系统名称",name:"relatedSystem",type:"display",colSpan:2},

                    // {label:"最近一次运行",name:"lastRunInfo",type:"display",colSpan:2},//todo
                    // {label:"最近一次正常运行",name:"lastCorrectRunInfo",type:"display",colSpan:2},//todo
                    // {label:"最近30次运行出错次数",name:"latestErrorCount",type:"display",colSpan:2},//todo

                    var result = {};
                    result.datasourceName = returnData.managerInfo.datasourceName;
                    result.datasourceUnit = returnData.managerInfo.datasourceUnit;
                    result.relatedSystem = returnData.managerInfo.relatedSystem;
                    result.runState = returnData.managerInfo.runState;
                    let logInfoRows = returnData.logInfo.rows;
                    let lastRunInfo = null;
                    let lastCorrectRunInfo = null;
                    let latestErrorCount = 0;
                    let i = 0;
                    for (i = 0; i < logInfoRows.length; i++) {
                        if (lastRunInfo == null) {
                            lastRunInfo = {};
                            let startTime = logInfoRows[i].startTime.Format("yyyy-MM-dd hh:mm:ss");
                            let text = calcTime(logInfoRows[i].endTime - logInfoRows[i].startTime);
                            lastRunInfo.text = startTime + " " + text;
                            lastRunInfo.logId = logInfoRows[i].id;
                        }
                        if (lastCorrectRunInfo == null && logInfoRows[i].endStatus == 30) {
                            lastCorrectRunInfo = {};
                            let startTime = logInfoRows[i].startTime.Format("yyyy-MM-dd hh:mm:ss");
                            let text = calcTime(logInfoRows[i].endTime - logInfoRows[i].startTime);
                            lastCorrectRunInfo.text = startTime + " " + text;
                            lastCorrectRunInfo.logId = logInfoRows[i].id;
                        }
                        if (logInfoRows[i].endStatus == 40) {
                            latestErrorCount++;

                        }


                    }
                    result.lastRunInfo = lastRunInfo;
                    result.lastCorrectRunInfo = lastCorrectRunInfo;
                    result.latestErrorCount = latestErrorCount;

                    webRes.exportJson(res, err, result);

                });
            }
        });
    },

    //单条日志的详情
    datasourceServiceLogGetObj: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                //该ID为数据源导入记录ID
                var query = webReq.getQueryParam(req, {
                    id: "",
                });
                datasourceLogService.logObj(
                    query.id,
                    webRes.exportJson.bind(null, res))
            }
        });
    },
    // excelTemlete: function (req, res) {
    //     userService.getCurUser(req, function (err, user) {
    //         if (err) {
    //             webRes.exportJson(res, err);
    //         }
    //         else {
    //             //该ID为数据源导入记录ID
    //             var query = webReq.getQueryParam(req, {
    //                 id: "",
    //             });
    //             datasourceManagerService.list(
    //                 query.id,

    //                 function (err, data) {
    //                     var tem = data.accessConfig;
    //                     excelTempleteProcess(tem, webRes.exportJson.bind(null, res));

    //                 }

    //             )
    //         }
    //     });
    // },
    excelImport: {

        
        /**
         * post参数
         * category,file 
         * @description 
         */
        post:function(req,res,fileForm){
            userService.getCurUser(req,function(err,user){
                if(err){
                    webRes.exportJson(res,err);
                }
                else{

                    cigExcelService.excelImport(fileForm, webRes.exportJson.bind(null, res));
                    //fileService.addFile(user,fileForm.fields,fileForm.files,webRes.exportJson.bind(null,res));
                }
            });
            
        }
    },


}


module.exports = actions;