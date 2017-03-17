var da = require(ROOT_DIR + "/common/dal/dataAccess");
var cigScreenMaintenanceAccess = require(ROOT_DIR + "/common/dal/dp/dpYWMaintenanceAccess");
var cigScreenDataCardAccess = require(ROOT_DIR + "/common/dal/dp/dpYWDataCardAccess");
var cigScreenClusterStatusAccess = require(ROOT_DIR + "/common/dal/dp/dpYWClusterStatusAccess");
var cigScreenSecurityEventAccess = require(ROOT_DIR + "/common/dal/dp/dpYWSecurityEventAccess");
var cigScreenDockerStatisticsAccess = require(ROOT_DIR + "/common/dal/dp/dpYWDockerStatisticsAccess");
var cigScreenSystemConnectionAccess = require(ROOT_DIR + "/common/dal/dp/dpYWSystemConnectionAccess");
var dpYWDockerMemAcc = require(ROOT_DIR + "/common/dal/dp/dpYWDockerMemAccess");
var cigNetworkAccess = require(ROOT_DIR + "/common/dal/dp/dpYWcigNetworkAccess.js");
var async = require(ROOT_DIR + "/common/tools").async;
var dataFilter = require(ROOT_DIR + "/common/tools").dataFilter;
var dpYWOfficeAccess = require(ROOT_DIR + "/common/dal/dp/dpYWOfficeAccess.js");
var dpYWSystemAccess = require(ROOT_DIR + "/common/dal/dp/dpYWSystemAccess.js");
var dpYWCloudServiceAccess = require(ROOT_DIR + "/common/dal/dp/dpYWCloudServiceAccess.js");
var that = {
    getCloudMsg: function (flag, callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new dpYWCloudServiceAccess(null, dal);
        var filter = {};
        var order = [];
        if (flag == 0) {
            order = ["SITE_ID asc"];
            filter = { siteRN: { type: "not null" } }
        }
        else if (flag == 1) {
            order = ["VISIT_ID asc"];
            filter = { visitRN: { type: "not null" } }
        }
        else {
            order = ["THINGS_ID asc"]
            filter = { thingsRN: { type: "not null" } }
        }
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getObjects.bind(cigScreenAcc, filter, order)
        ], function (err, data) {
            dal.close(function () { });
            if (data && data[1] != null) {
                var curStaticTime = [];
                var indexTime = 0;
                for (var i = 0; i < data[1].length; i++) {
                    curStaticTime[i] = new Date();
                }
                for (var i = data[1].length-1; i >= 0; i--) {
                    curStaticTime[i].add("d", -1 * (indexTime++));
                }
                 for(var i=0;i<data[1].length;i++){
                        data[1][i].curStaticTime=curStaticTime[i].Format("yyyy-MM-dd");
                    }
                var returnData={};
                returnData.total=data[1].length;
                if (flag == 0) {
                    var result = dataFilter.dataFilter(data[1], ["siteRN", "siteNum", "curStaticTime"]);
                    returnData.unit="个";
                    returnData.title="站点数量";      
                }
                else if (flag == 1) {
                     var result = dataFilter.dataFilter(data[1], ["visitRN", "visitNum", "curStaticTime"]);
                     returnData.unit="次";
                     returnData.title="站点访问量统计"
                }
                else {
                      var result = dataFilter.dataFilter(data[1], ["thingsRN", "thingsNum", "curStaticTime"]);
                      returnData.unit="次";
                      returnData.title="事物量统计"
                }
                returnData.rows=result;
            }
            callback(err, returnData);
        });
    },
    getCIGPortalData: function (callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new cigScreenMaintenanceAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getObject.bind(cigScreenAcc, filter)
        ], function (err, data) {
            dal.close(function () { });
            if (data && data[1] != null) {
                var result = dataFilter.dataFilter(data[1], ["aggregateData", "accessToAuthority", "wfOfficeNum", "wfServiceNum"]);
            }
            callback(err, result);
        });
    },
    getOffice: function (callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new dpYWOfficeAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getObjects.bind(cigScreenAcc, filter, ["officeId asc"])
        ], function (err, data) {
            dal.close(function () { });
            callback(err, data && data[1]);
        });
    },
    getSystem: function (callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new dpYWSystemAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getObjects.bind(cigScreenAcc, filter, ["systemId asc"])
        ], function (err, data) {
            dal.close(function () { });
            callback(err, data && data[1]);
        });
    },
    queryMaintenanceList: function (callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new cigScreenMaintenanceAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getPage.bind(cigScreenAcc, filter, ["CREATE_DATE desc"], 0, 1)
        ], function (err, data) {
            if (data != null) {
                var curDate = new Date();
                var curHour = curDate.getHours();//获取系统时，
                var curUserOnline=5230;
                if (6 <= curHour && curHour <= 12) {
                    var flagDate=new Date();
                    flagDate.setHours(6);
                    flagDate.setMinutes(0);
                    flagDate.setSeconds(0);
                    var diffHour=(curDate.getTime()-flagDate.getTime())/(1000*3600);   //相差秒数 
                    var dateStart=6,
                    dateEnd=12,
                    userOnlineStart=6000,
                    userOnlineEnd=8000;
                    curUserOnline=(userOnlineEnd-userOnlineStart)/(dateEnd-dateStart)*diffHour+userOnlineStart;
                
                }
                else if (12 <= curHour && curHour <= 18) {
                    var flagDate=new Date();
                    flagDate.setHours(12);
                    flagDate.setMinutes(0);
                    flagDate.setSeconds(0);
                    var diffHour=(curDate.getTime()-flagDate.getTime())/(1000*3600);   //相差秒数 
                    var dateStart=12,
                    dateEnd=18,
                    userOnlineStart=8000,
                    userOnlineEnd=6000;
                    curUserOnline=userOnlineStart+(userOnlineEnd-userOnlineStart)/(dateEnd-dateStart)*diffHour;
                }
                var plusFlag=1-2*Math.random();
                if(plusFlag>0){
                    curUserOnline=parseInt(curUserOnline)+parseInt(Math.random()*3);
                }
                else{
                    curUserOnline=parseInt(curUserOnline)-parseInt(Math.random()*3);
                }
                data[1].rows[0].aggregateData = data[1].rows[0].aggregateData + parseInt(Math.random() * 200);
                var rows={
                    aggregateData:data[1].rows[0].aggregateData,
                    onlineUser:curUserOnline,
                    accessToApplications:data[1].rows[0].accessToApplications,
                    accessToAuthority:data[1].rows[0].accessToAuthority
                };
                delete data[1].rows[0]["RN"];
                var returnData = rows;
                returnData.createDate=curDate;
                var obj =returnData;
                var filter = { id: data[1].rows[0].id };
                delete obj["id"];
                async.series([
                    // cigScreenAcc.insert.bind(cigScreenAcc, data[1].rows[0]),
                    cigScreenAcc.update.bind(cigScreenAcc, obj, filter)
                ], function (err, data) {
                    dal.close(function () {
                        callback(err, returnData);
                    });
                });
            }
            else {
                callback(err);
            }

        });
    },
    queryMaintenanceList1: function (callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new cigScreenMaintenanceAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getPage.bind(cigScreenAcc, filter, ["CREATE_DATE desc"], 0, 1)
        ], function (err, data) {
            if (data != null) {
                var curDate = new Date();
                var curYear = curDate.getFullYear(),   //获取系统的年；
                    curMonth = curDate.getMonth() + 1,  //获取系统月份，由于月份是从0开始计算，所以要加1
                    curDay = curDate.getDate(),// 获取系统日，
                    curHour = curDate.getHours(), //获取系统时，
                    curMinutes = curDate.getMinutes(),//分
                    curSeconds = curDate.getSeconds(); //秒

                var createMonth = data[1].rows[0].createDate.getMonth() + 1,
                    createDay = data[1].rows[0].createDate.getDate(),
                    createHour = data[1].rows[0].createDate.getHours(),
                    createMinutes = data[1].rows[0].createDate.getMinutes(),
                    createSeconds = data[1].rows[0].createDate.getSeconds();

                //两个时间间隔转换为时分秒
                parseInt(Math.random() * 100)//浮动100以内
                var diffDate = new Date() - data[1].rows[0].createDate;
                //计算相隔天数
                var days = Math.floor(diffDate / (24 * 3600 * 1000))
                //计算相隔小时
                var leave1 = diffDate % (24 * 3600 * 1000)    //计算天数后剩余的毫秒数
                var hours = Math.floor(leave1 / (3600 * 1000))
                var difHoursTotal = days * 24 + hours;
                //计算相差分钟数
                var leave2 = leave1 % (3600 * 1000)        //计算小时数后剩余的毫秒数
                var minutes = Math.floor(leave2 / (60 * 1000))
                var difMinutesTotal = (days * 24 + hours) * 60
                //计算相差秒数
                var leave3 = leave2 % (60 * 1000)      //计算分钟数后剩余的毫秒数
                var seconds = Math.round(leave3 / 1000)

                if (seconds > 1) {
       /**聚合数据 */data[1].rows[0].aggregateData = data[1].rows[0].aggregateData + seconds * parseInt(Math.random() * 100)
   //    /**传感数据 */data[1].rows[0].sensingData = data[1].rows[0].sensingData + seconds * parseInt(250 + Math.random() * 50)
   //    /**监测数据 */data[1].rows[0].monitoringData = data[1].rows[0].monitoringData + seconds * parseInt(250 + Math.random() * 50)
                }
                //小时间隔跳动数据
                if ((curHour - createHour > 1) || difHoursTotal > 1) {
                    var tempDiffHours = 0;
                    if ((curHour - createHour > 1) && (difHoursTotal < 1)) {
                        tempDiffHours = tempDiffHours;
                    }
                    else if (difHoursTotal > 1 && difHoursTotal < 24) {
                        tempDiffHours = difHoursTotal;
                    }
                    else if (difHoursTotal > 24) {
                        tempDiffHours = difHoursTotal - 24 + 1;
                    }
                    
        /**人口 */data[1].rows[0].population = data[1].rows[0].population + tempDiffHours * parseInt(2 + Math.random() * 3);
        /**法人 */data[1].rows[0].legalPerson = data[1].rows[0].legalPerson + tempDiffHours * parseInt(Math.random() * 50);
        /**企业 */data[1].rows[0].corporateInfor = data[1].rows[0].corporateInfor + tempDiffHours * parseInt(2 + Math.random() * 3);
        /**民生 */data[1].rows[0].liveliHoodInfo = data[1].rows[0].liveliHoodInfo + tempDiffHours * parseInt(2 + Math.random() * 3);
        /**水利 */data[1].rows[0].waterResourcesInfo = data[1].rows[0].waterResourcesInfo + tempDiffHours * parseInt(1000 + Math.random() * 2000);
        /**气象 */data[1].rows[0].meteorologicalInfo = data[1].rows[0].meteorologicalInfo + tempDiffHours * parseInt(1000 + Math.random() * 2000)
                }
                //分钟间隔跳动数据
                if ((createMinutes - createMinutes > 1) || difMinutesTotal > 1) {
                    var tempDiffMinutes = 0;
                    if ((createMinutes - createMinutes > 1) && (difMinutesTotal < 1)) {
                        tempDiffHours = difMinutesTotal;
                    }
                    else if (difMinutesTotal > 1 && difMinutesTotal < 60) {
                        tempDiffHours = difHoursTotal;
                    }
                    else if (difHoursTotal > 60) {
                        tempDiffHours = difHoursTotal - 60 + 1;
                    }
        /**气象 */data[1].rows[0].meteorologicalInfo = data[1].rows[0].meteorologicalInfo + tempDiffHours * parseInt(1000 + Math.random() * 2000)
                }
                //按照时间段跳动，可设定峰值事件。
                var A = 0; var B = 0; var A1 = 0; var B1 = 0;
                var flag = parseInt(Math.random() * 2);
                if (6 <= curHour && curHour <= 12) {
                    if ((6000 < data[1].rows[0].aggregateData) && ((data[1].rows[0].aggregateData) < 7000)) {
                        A = 3; A1 = 1; B = 2; B1 = 1;
                    }
                    else if ((7000 < data[1].rows[0].aggregateData) && ((data[1].rows[0].aggregateData) < 7800)) {
                        A = 4; A1 = 1; B = 3; B1 = 1;
                    }
                    else if ((7800 < data[1].rows[0].aggregateData) && ((data[1].rows[0].aggregateData) < 8000)) {
                        A = 2; A1 = 1; B = 2; B1 = 1;
                    }
                    if (seconds > 1) {
                        if (flag == 0) {//加上
                            data[1].rows[0].aggregateData = data[1].rows[0].aggregateData + seconds * parseInt(Math.random() * A + A1)
                        }
                        if (flag == 1) {//减去
                            data[1].rows[0].aggregateData = data[1].rows[0].aggregateData - seconds * parseInt(Math.random() * B + B1)
                        }
                    }
                }
                else if (12 <= curHour && curHour <= 18) {
                    if ((8000 < data[1].rows[0].onlineUser)) {
                        A = 3; A1 = 1; B = 2; B1 = 1;
                        flag = 0;
                    }
                    if ((8000 >= data[1].rows[0].onlineUser) && ((data[1].rows[0].onlineUser) > 7000)) {
                        A = 3; A1 = 1; B = 2; B1 = 1;
                    }
                    else if ((7000 > data[1].rows[0].onlineUser) && ((data[1].rows[0].onlineUser) > 6200)) {
                        A = 4; A1 = 1; B = 3; B1 = 1;
                    }
                    else if ((6200 > data[1].rows[0].onlineUser) && ((data[1].rows[0].onlineUser) >= 6000)) {
                        A = 2; A1 = 1; B = 2; B1 = 1;
                    }
                    if (data[1].rows[0].onlineUser < 6000) {
                        A = 2; A1 = 1; B = 2; B1 = 1;
                        flag = 1;
                    }
                    if (flag == 0) {//加上
                        data[1].rows[0].onlineUser = data[1].rows[0].onlineUser - seconds * parseInt(Math.random() * 3 + A1)
                    }
                    if (flag == 1) {//减去
                        data[1].rows[0].onlineUser = data[1].rows[0].onlineUser + seconds * parseInt(Math.random() * B + B1)
                    }
                }
                //   data[1].rows[0].id=unit.getUuid(),
                //    delete data[1].rows[0]["createDate"];
                delete data[1].rows[0]["RN"];
                var returnData = data[1].rows[0];
                data[1].rows[0]["createDate"] = curDate;
                var obj = data[1].rows[0];
                var filter = { id: data[1].rows[0].id };
                delete obj["id"];
                async.series([
                    // cigScreenAcc.insert.bind(cigScreenAcc, data[1].rows[0]),
                    cigScreenAcc.update.bind(cigScreenAcc, obj, filter)
                ], function (err, data) {
                    dal.close(function () {
                        callback(err, returnData);
                    });
                });
            }
            else {
                callback(err);
            }

        });
    },
    /**
     * {"success":1,"data":{"aggregateData":44365863,"onlineUser":7864,"accessToAuthority":30,"accessToApplications":150,"twoDimensional":198,"threeDimensional":435,"poiNotePoint":54589,"sufaceComponents":5459,"population":642058,"legalPerson":55197,"documents":2335,"addressPlace":4589,"videoSurveillance":180,"sensingData":880526,"monitoringData":33591793,"corporateInfor":4289,"liveliHoodInfo":12270,"camera":4232,"sensor":712232,"waterResourcesInfo":76380991,"travelInfo":1472232,"meteorologicalInfo":33481167,"createDate":"2017-02-14T07:05:28.471Z","UPDATE_DATE":"2017-02-14 15:05:28","UPDATE_USER":"系统"}}
     */
    queryDataCardList: function (callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new cigScreenDataCardAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getPage.bind(cigScreenAcc, filter, ["RECEIVEDATE desc"], 0, 16)
        ], function (err, data) {
            dal.close(function () { });
            var a_index = parseInt(Math.random() * 15)
            var b_index = 0;
            while (1) {
                b_index = parseInt(Math.random() * 15)
                if (a_index != b_index) {
                    break;
                }
            }
            var c_index = 0;
            while (1) {
                c_index = parseInt(Math.random() * 15)
                if ((c_index != b_index) && (c_index != a_index)) {
                    break;
                }
            }
            var d_index = 0;
            while (1) {
                d_index = parseInt(Math.random() * 15);
                if ((d_index != b_index) && (d_index != a_index) && (d_index != c_index)) {
                    break;
                }
            }
            var returnData = {
                total: 4,
                rows: []
            }
            returnData.rows.push(data[1].rows[a_index]);
            returnData.rows.push(data[1].rows[b_index]);
            returnData.rows.push(data[1].rows[c_index]);
            returnData.rows.push(data[1].rows[d_index]);
            callback(err, returnData);
        });
    },
    queryDataCardListRealDate: function (callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new cigScreenDataCardAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getPage.bind(cigScreenAcc, filter, ["RECEIVEDATE desc"], 0, 10)
        ], function (err, data) {
            dal.close(function () { });
            if (data && data[1] != null) {
                for (var i = 0; i < data[1].rows.length; i++) {
                    data[1].rows[i].receiveDate = data[1].rows[i].receiveDate.Format("yyyy-MM-dd");
                }
                var curData = data && data[1];
                var rows = new Array();
                for (var i = 0; i < curData.rows.length; i++) {
                    rows[i] = {
                        "fromDepartment": curData.rows[i].fromDepartment,//姓名
                        "receiveDate": curData.rows[i].receiveDate,//姓名
                        "dataNum": curData.rows[i].dataNum,//精神病主键
                    }
                }
                var returnData = {
                    "rows": rows,
                    "total": 10
                }
            }
            callback(err, returnData);
        });
    },
    queryClusterStatusList: function (callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new cigScreenClusterStatusAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getPage.bind(cigScreenAcc, filter, ["CREATE_DATE desc"], 0, 1)
        ], function (err, data) {
            dal.close(function () {
            });
               if(data && data[1]!=null){
                data[1].diskUnit="TB"
        }
         callback(err, data && data[1]);
         
    });
    },
    querySecurityEventList: function (offset, limit, callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new cigScreenSecurityEventAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getPage.bind(cigScreenAcc, filter, ["EVENTNUM desc"], offset, limit)
        ], function (err, data) {
            dal.close(function () {
                callback(err, data && data[1]);
            });
        });
    },
    queryDockerTimeList: function (offset, limit, callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new cigScreenDockerStatisticsAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getPage.bind(cigScreenAcc, filter, ["statisticsDate asc"], offset, limit)
        ], function (err, data) {
            dal.close(function () { });
            if (data && data[1] != null) {
                for (var i = 0; i < data[1].rows.length; i++) {
                    data[1].rows[i].statisticsDate = data[1].rows[i].statisticsDate.Format("hh:mm");
                }
                var curData = data && data[1];
                var rows = new Array();
                for (var i = 0; i < curData.rows.length; i++) {
                    rows[i] = {
                        "statisticsDate": curData.rows[i].statisticsDate,//姓名
                        "startTime": curData.rows[i].startTime,//姓名
                        "stopTime": curData.rows[i].stopTime,//精神病主键
                    }
                }
                var returnData = {
                    "rows": rows,
                    "total": curData.total,
                    "title": "Docker容器启停耗时"
                }
            }
            callback(err, returnData);
        });
    },
    queryDockerMemList: function (flag, callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new dpYWDockerMemAcc(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getPage.bind(cigScreenAcc, filter, ["NODE_ID asc"], 0, 60)
        ], function (err, data) {
            dal.close(function () { });
            if (data && data[1] != null) {
                var nodeMem = new Array();
                for (var i = 0; i < 3; i++) {
                    nodeMem[i] = new Array();
                }
                var nodeIndex = 0;
                for (var i = 0; i < 60; i++) {
                    nodeMem[nodeIndex][i % 20] = data[1].rows[i];
                    if (i % 20 == 19) {
                        nodeIndex++;
                    }
                }
                var curStaticTime = [];
                var indexTime = 0;
                var curDate = new Date();
                for (var i = 0; i < 20; i++) {
                    curStaticTime[i] = new Date();
                }
                for (var i = 19; i >= 0; i--) {
                    curStaticTime[i].add("s", -15 * (indexTime++));
                }
            }
            for (var i = 0; i < 3; i++) {
                for (var j = 0; j < 20; j++) {
                    nodeMem[i][j].statisticsDate = curStaticTime[j];
                    if (i == 0) {
                        nodeMem[i][j].usedMem = nodeMem[i][j].usedMem + parseInt(Math.random() * 10)
                    }
                    else if (i == 1) {
                        nodeMem[i][j].usedMem = nodeMem[i][j].usedMem + parseInt(Math.random() * 40);
                        nodeMem[i][j].RN = j + 1;
                    }
                    else if (i == 2) {
                        nodeMem[i][j].usedMem = nodeMem[i][j].usedMem + parseInt(Math.random() * 10);
                        nodeMem[i][j].RN = j + 1;
                    }

                }
            }
            if (flag == 0) {
                var returnData =
                    {
                        title: "Docker内存消耗",
                        totalNode: "3",
                        rows: [
                            {
                                nodeName: nodeMem[0][0].nodeName,
                                historicalData: nodeMem[0],
                                total: 20
                            },
                            {
                                nodeName: nodeMem[1][0].nodeName,
                                historicalData: nodeMem[1],
                                total: 20
                            }, {
                                nodeName: nodeMem[2][0].nodeName,
                                historicalData: nodeMem[2],
                                total: 20
                            }]
                    }
            }
            if (flag == 1) {
                var returnData =
                    {
                        title: "Docker内存消耗",
                        totalNode: "3",
                        rows: [
                            {
                                nodeName: nodeMem[0][0].nodeName,
                                historicalData: nodeMem[0][19],
                                total: 1
                            },
                            {
                                nodeName: nodeMem[1][0].nodeName,
                                historicalData: nodeMem[1][19],
                                total: 1
                            }, {
                                nodeName: nodeMem[2][0].nodeName,
                                historicalData: nodeMem[2][19],
                                total: 1
                            }]
                    }
            }

            callback(err, returnData);
        });
    },
    queryDockerMemNewest: function (flag, callback) {
        var nodeMem = new Array();
        for (var i = 0; i < 3; i++) {
            nodeMem[i] = new Array();
        }
        var returnData =
            {
                title: "Docker内存消耗",
                rows: [
                    {
                        nodeName: nodeMem[0][0].nodeName,
                        historicalData: nodeMem[0],
                        total: 20
                    },
                    {
                        nodeName: nodeMem[1][0].nodeName,
                        historicalData: nodeMem[0],
                        total: 20
                    }, {
                        nodeName: nodeMem[2][0].nodeName,
                        historicalData: nodeMem[0],
                        total: 20
                    }]
            }
        callback(err, returnData);
    },
    querySystemConnectionList: function (callback) {
        var dal = new da.dataAccess();
        var cigScreenAcc = new cigScreenSystemConnectionAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigScreenAcc.getPage.bind(cigScreenAcc, filter, ["office asc"], 0, 30)
        ], function (err, data) {
            dal.close(function () { });
            if (data && data[1] != null || data && data[1] != undefined) {
                var curOffice = data[1].rows[0].office;
                var officeSystem = new Array();
                var systemIndex = 0;
                var officeList = new Array();;
                var officeIndex = 0;
                officeSystem[officeIndex] = { "officeName": curOffice, "system": [] };
                for (var i = 0; i < data[1].rows.length; i++) {
                    if (data[1].rows[i].office != curOffice) {
                        curOffice = data[1].rows[i].office;
                        officeSystem[++officeIndex] = { "name": curOffice, "system": [] }
                        systemIndex = 0;
                    }
                    if (data[1].rows[i].office == curOffice) {
                        officeSystem[officeIndex].system[systemIndex++] = { "systemName": data[1].rows[i].system };
                    }
                }
                var returnData = {
                    "rows": officeSystem,
                    "total": officeSystem.length,
                    "title": "委办局和系统信息",
                    "汇聚系统": "CIG"
                }
            }
            callback(err, returnData);
        });
    },
    getNetworkTraffic: function (flag, callback) {
        var dal = new da.dataAccess();
        var cigNetworkAcc = new cigNetworkAccess(null, dal);
        var filter = {};
        async.series([
            dal.open.bind(dal, false),
            cigNetworkAcc.getJoinNetWorkPages.bind(cigNetworkAcc, filter, ["DP_YW_CIGNETWORK.NODE_ID desc"], 0, 30)
        ], function (err, data) {
            dal.close(function () { });
            if (data != null) {
                var curDate = new Date();
                var curYear = curDate.getFullYear(),   //获取系统的年；
                    curMonth = curDate.getMonth() + 1,  //获取系统月份，由于月份是从0开始计算，所以要加1
                    curDay = curDate.getDate(),// 获取系统日，
                    curHour = curDate.getHours(); //获取系统时，
                var nodeNet = new Array();
                for (var i = 0; i < 3; i++) {
                    nodeNet[i] = new Array();
                }
                var nodeIndex = 0;
                for (var i = 0; i < 30; i++) {
                    nodeNet[nodeIndex][i % 10] = data[1].rows[i];
                    if (i % 10 == 9) {
                        nodeIndex++;
                    }
                }
                var curStaticTime = [];
                var indexTime = 0;
                var curDate = new Date();
                for (var i = 0; i < 10; i++) {
                    curStaticTime[i] = new Date();
                }
                for (var i = 9; i >= 0; i--) {
                    curStaticTime[i].add("s", -30 * (indexTime++));
                }

                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 10; j++) {
                        nodeNet[i][j].statisticsDate = curStaticTime[j];
                        if (i == 1) {
                            nodeNet[i][j].RN = j + 1;
                        }
                        else if (i == 2) {
                            nodeNet[i][j].RN = j + 1;
                        }
                    }
                }
                for (var i = 0; i < 3; i++) {
                    for (var j = 0; j < 10; j++) {
                        if (curHour > 6 & curHour < 7) {//30-40
                            nodeNet[i][j].flowIn = parseInt(30 + Math.random() * 7)
                            nodeNet[i][j].flowOut = parseInt(34 + Math.random() * 7)
                        }
                        else if (curHour > 7 & curHour < 8) {//40-70
                            nodeNet[i][j].flowIn = parseInt(40 + Math.random() * 20)
                            nodeNet[i][j].flowOut = parseInt(50 + Math.random() * 20)
                        }
                        else if (curHour > 8 & curHour < 9) {//70-100
                            nodeNet[i][j].flowIn = parseInt(70 + Math.random() * 20)
                            nodeNet[i][j].flowOut = parseInt(75 + Math.random() * 30)
                        }
                        else if (curHour > 9 & curHour < 12) {//100-125
                            nodeNet[i][j].flowIn = parseInt(100 + Math.random() * 18)
                            nodeNet[i][j].flowOut = parseInt(105 + Math.random() * 20)
                        }
                        else if (curHour > 12 & curHour < 17) {//100-125
                            nodeNet[i][j].flowIn = parseInt(100 + Math.random() * 17)
                            nodeNet[i][j].flowOut = parseInt(105 + Math.random() * 20)
                        }
                        else if (curHour > 17 & curHour < 18) {//60-100
                            nodeNet[i][j].flowIn = parseInt(60 + Math.random() * 25)
                            nodeNet[i][j].flowOut = parseInt(70 + Math.random() * 430)
                        }
                        else if (curHour > 18 & curHour < 19) {//30-60
                            nodeNet[i][j].flowIn = parseInt(30 + Math.random() * 20)
                            nodeNet[i][j].flowOut = parseInt(40 + Math.random() * 30)
                        }
                        else if ((curHour > 19 & curHour < 24) || (curHour > 0 & curHour < 6)) {
                            nodeNet[i][j].flowIn = parseInt(30 + Math.random() * 7)
                            nodeNet[i][j].flowOut = parseInt(34 + Math.random() * 7)
                        }
                    }
                }
                if (flag == "0") {
                    var returnData =
                        {
                            title: "节点网络流量",
                            totalNode: "3",
                            rows: [
                                {
                                    nodeName: nodeNet[0][0].nodeName,
                                    historicalData: nodeNet[0],
                                    total: 10
                                },
                                {
                                    nodeName: nodeNet[1][0].nodeName,
                                    historicalData: nodeNet[1],
                                    total: 10
                                }, {
                                    nodeName: nodeNet[2][0].nodeName,
                                    historicalData: nodeNet[2],
                                    total: 10
                                }]
                        }
                }
                if (flag == "1") {
                    var returnData =
                        {
                            title: "节点网络流量",
                            totalNode: "3",
                            rows: [
                                {
                                    nodeName: nodeNet[0][0].nodeName,
                                    historicalData: nodeNet[0][9],
                                    total: 1
                                },
                                {
                                    nodeName: nodeNet[1][0].nodeName,
                                    historicalData: nodeNet[1][9],
                                    total: 1
                                }, {
                                    nodeName: nodeNet[2][0].nodeName,
                                    historicalData: nodeNet[2][9],
                                    total: 1
                                }]
                        }
                } callback(err, returnData);

            }

            else {
                callback(err);
            }
        });
    },
};
module.exports = that;
