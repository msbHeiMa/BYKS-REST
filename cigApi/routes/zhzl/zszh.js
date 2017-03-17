var webRes = require(ROOT_DIR + "/common/tools").webRes;
var webReq = require(ROOT_DIR + "/common/tools").webReq;
var log = require(ROOT_DIR + "/common/tools").log;
var async = require(ROOT_DIR + "/common/tools").async;
var zszhAccess = require(ROOT_DIR + "/common/dal/zhzl/zszhAccess");
var userService = require(ROOT_DIR + "/common/service/system/userService");
var zszhService = require(ROOT_DIR + "/common/service/zhzl/zszhService");
var areaService = require(ROOT_DIR + "/common/service/zhzl/areaService");
var options = require(ROOT_DIR + "/common/config/options");
var zszhRevisitService = require(ROOT_DIR + "/common/service/zhzl/zszhRevisitService");
var zszhRevisitSysService = require(ROOT_DIR + "/common/service/zhzl/zszhRevisitSysService");
var zszhListStatisticsService = require(ROOT_DIR + "/common/service/zhzl/zszhListStatisticsService");
var zszhUserAccess = require(ROOT_DIR + "/common/dal/zhzl/zszhUserAccess");
var zszhListGriderService = require(ROOT_DIR + "/common/service/zhzl/zszhListGriderService");
var zszhLevelAdjustService = require(ROOT_DIR + "/common/service/zhzl/zszhLevelAdjustService");
var zszhMoveOutService = require(ROOT_DIR + "/common/service/zhzl/zszhMoveOutService");
var zszhChangeAuditingService = require(ROOT_DIR + "/common/service/zhzl/zszhChangeAuditingService");


var pictureService = require(ROOT_DIR + "/common/service/zhzl/pictureService");
var wfWorkflowService = require(ROOT_DIR + "/common/service/zhzl/wfWorkflowService");

var actions = {
    /**!!!完成可测
     * 输入参数 offset=&limit=&queryName=
     * @description 肇事肇祸首页 人员展示列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     * @示例地址 完成。等需求确定再改相应字段
     */
    zszhHomePsychiatricPatient: function (req, res) {//listJsbByDepartMent
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {//URLDecoder.decode(request.getParameter("参数名"),"UTF-8")
                var query = webReq.getQueryParam(req, {
                    offset: 0,
                    limit: 10,
                    queryName: "",//需搜索 和精神病人
                    selectedDepartmentId: "",//查询单位
                    dangerRank: "",//危险等级
                    manageLevel: "",//管理等级
                    attackType: "",//目前诊断类型
                    peopleStatusQeo: "",//人员现状
                    cigrole: ""
                });
                var receiveFilter = {};
                if (query.dangerRank != "" && query.dangerRank != null) {
                    receiveFilter.dangerRank = query.dangerRank;
                }
                if (query.manageLevel != "" && query.manageLevel != null) {
                    receiveFilter.manageLevel = query.manageLevel;
                }
                if (query.attackType != "" && query.attackType != null) {
                    receiveFilter.attackType = query.attackType;
                }
                if (query.peopleStatusQeo != "" && query.peopleStatusQeo != null) {
                    query.peopleStatusQeo = decodeURI(decodeURI(query.peopleStatusQeo))
                    receiveFilter.peopleStatusQeo = query.peopleStatusQeo;
                }
                if (query.selectedDepartmentId == "" || query.selectedDepartmentId == null) {
                    query.selectedDepartmentId = user.userDepartmentId;
                }
                var acc = new zszhUserAccess(null);
                var filter = { "id": query.selectedDepartmentId + "" };
                //查询用户信息
                async.series([
                    acc.open.bind(acc, false),
                    acc.getUser.bind(acc, filter),
                ], function (err, userMsg) {
                    acc.close(function () { });
                    if (err) {
                        webRes.exportJson(res, err);
                    }
                    else {
                        if (userMsg[1] == null) {
                            webRes.exportJson(res, "没有查询到指定的部门信息");
                        }
                        else {
                            user.cigrole = query.cigrole;
                            zszhService.zszhHomeListPsychiatricPatientByDepartment(user,
                                receiveFilter,
                                query.queryName,
                                userMsg[1],
                                query.offset,
                                query.limit,
                                webRes.exportJson.bind(null, res));
                        }
                    }
                }
                );
            }
        });
    },

    /**
     * {"JSBId":"26fe66ba-9cc2-40c4-82e3-df40c87220a8",精神病主键
     * "pId":"72a3c664-c1c5-45ee-9527-49aee8b7f97d",  
     * "beloArea":"龙山街道","dangerRank":"02",  所属区域
     * "manageLevel":1,管理等级
     * "visitCyc":21,回访周期
     * "peopleStatus":"正常",  
     * "isCTrouble":"1",有无肇祸史
     * "attackType":"05",目前诊断类型
     * "cTroubleDate":"2016-11-16T10:41:33.000Z",
     * "attackDate":"2016-11-16T10:41:27.000Z",
     * "id":"72a3c664-c1c5-45ee-9527-49aee8b7f97d",
     * "name":"王萌萌",  姓名
     * "gender":"1",    性别
     * "SSDWBM":1191870604509184, 单位代码
     * "stablePeriod":48,稳定期
     * "peopleStatusQeo":"在家养病",人员现状
     * "nextRevisitDate":"2017-01-25T07:32:25.556Z", 下一次回访日期
     * "cardNum":"220602199809187753","RN":1}身份证号
     */
    /**!!!完成可测 查危险等级3-6  ？？？？判断用户是警察，还是前端界面区分，做两个界面出来
     * 输入参数 offset=&limit=&queryName=&selectedDepartmentId
     * @description 肇事肇祸首页 人员展示列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     * @示例地址 完成。
     */
    zszhPsychiatricPatientDetail: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                    cardNum:""
                });
                if(query.JSBId!=""){
                    var filter = {"JSBId":query.JSBId};
                }
                else if(query.cardNum!=""){
                    var filter = {"cardNum":query.cardNum};
                }
                else{
                     var filter = {"JSBId":query.JSBId};
                }
                zszhService.zszhPsychiatricPatientDetail(user,
                    filter,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    //查询结果
    /**{
            "success": 1, "data":
                {
                    "id": "187aad17-203c-425f-a649-cdefe2689b66",
                    "cardNum": "230602199809184543",
                    "name": "陈梦",
                    "usedName": null,
                    "gender": "1",
                    "birthDate": "2016-11-02T10:40:47.000Z",
                    "nation": "1",
                    "nativePlace": "0",
                    "maritalStatus": "01",
                    "bloodType": "A",
                    "politicalStatus":"0", //政治面貌 （新加字段）
                    "education": "0",
                    "relBelief": "1",
                    "occCategory": "工人",
                    "occupation": "工人",
                    "sPlace": "川步村",
                    "phone": "2938172",
                    "domicile": null,
                    "dAddr": "川步村",
                    "residence": "11",
                    "rAddr": "川步村",
                    "dangerRank": "02",
                    "manageLevel": 2,
                    "JSBId": "533d5fdc-522c-4730-8304-a47063cc41bd",
                    "guarderCardNum": "110602199109115342",
                    "guarderName": "郝发",
                    "guarderTel": "15521231221",
                    "guarderAddr": "长兴县龙山社区小李村43号",
                    "relationship": null,
                    "villageCadresId": "631ae043-c0e7-489c-8d87-700e9a88b11a",
                    "villageName": "郝发",
                    "villagePhone": "2938172",
                    "dockorId": "50f2a201-c3ec-4276-92fd-c7407c96e388",
                    "dockorName": "周查",
                    "dockorPhone": "2938172",
                    "dockorDepartmentName": "体育场社区",
                    "policeId": "c80eb1fe-5d8f-4697-99a7-a11f4bd571c0",
                    "policeName": "郝苗",
                    "policePhone": "2938172",
                    "policeDepartmentName": "双拥社区",
                    "isCTrouble": "0",
                    "cTroubleCount": null,
                    "cTroubleDate": "2016-12-27T12:18:20.000Z",
                    "attackDate": "2016-11-16T10:41:27.000Z",
                    "attackType": "01",
                    "treatS": "01",
                    "treatName": "长兴县医院",
                    "hosTreatS": "01",
                    "recOrganName": "长兴县医院"
                }
        }*/
    queryJSBDetailByCardNum: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    cardNum: ""
                });
                var filter = {"cardNum":query.cardNum};
                zszhService.zszhPsychiatricPatientDetail(user,
                   filter,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /**
    * 输入参数 JSBId
    * @description 查询治疗病史  精神病主键id（JSBId）
    * @param {NSExpress.Request} req
    * @param {NSExpress.Response} res 
    * @示例地址  http://127.0.0.1:3003/zszh/zszhQueryJsbTreatHistory?JSBId=533d5fdc-522c-4730-8304-a47063cc41bd
    */
    zszhQueryJsbTreatHistory: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                    offset: 0,
                    limit: 10,
                });
                zszhService.queryJsbTreatHistoryList(
                    query.JSBId,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /*
        {
            "success":1,
                "data":
                     {"total":1,
                        "rows":[{
                            "id":"123456789",//主键
                            "zId":"533d5fdc-522c-4730-8304-a47063cc41bd",//表ZZ_ZSZHJSB主键
                            "admissionDate":"2017-01-18T01:30:49.000Z",//入院治疗日期
                            "treatName":"长兴县医院",//治疗医院名称
                            "hosTreatS":"01",//实施治疗住院原因
                            "attackType":"01",//诊断类型
                            "dischargedDate":"2017-01-18T01:32:32.000Z",//出院日期
                            "recOrganName":"长兴县医院",//接受康复训练机构
                            "createUser":"282402504832",//创建人ID
                            "createDate":"2017-01-18T01:33:17.000Z",//创建日期
                            "updateUser":null,//修改人ID
                            "updateDate":null,//修改日期
                            "RN":1}]
                    }
        }
     */
    /**
    * 输入参数 id=
    * @description 查询人口头像  正常人员主键id
    * @param {NSExpress.Request} req
    * @param {NSExpress.Response} res 
    * @示例地址  http://127.0.0.1:3005/zszh/readImageByPsmId?id=187aad17-203c-425f-a649-cdefe2689b66
    */
    queryImageByPsmId: function (req, res) {///完成了  搜索功能没有
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    id: ""
                });
                zszhService.queryZzPerson(
                    query.id,
                    webRes.exportImage.bind(null, res)
                );
            }
        });
    },
    /**
    * 输入参数 JSBId=
    * @description 查询人口头像  精神病主键id
    * @param {NSExpress.Request} req
    * @param {NSExpress.Response} res 
    * @示例地址 
    */
    queryImageByJSBId: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: ""
                });
                zszhService.queryPsychiatricPatientByJSBId(user,
                    query.JSBId,
                    webRes.exportImage.bind(null, res)
                );
            }
        });
    },
    processExecute: {

        /** 流程处理
        * 输入参数  
        * @description  发起回访 ①sn：前端可查②action：approval，decline，comments：评审意见
        * @param {NSExpress.Request} req
        * @param {NSExpress.Response} res 
        */
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var sch = webReq.getParam(req, {//读取后台生成的全部数据
                        sn: "",
                        action: "",
                        comments: ""
                    });
                    var actionState="";
                    if (sch.action=="同意"){
                        actionState="APPROVE";
                        }
                    else if(sch.action=="驳回"){
                     actionState="DECLINE";
                    }
                    wfWorkflowService.processExecute(user, sch.sn, actionState, sch.comments, webRes.exportJson.bind(null, res))
                }
            });
        }
    },

    setDangerRank: { //危险级别调整
        /** 
         * 输入参数  
         * zId: "精神病主键",originalLevel: "原级别", finalLevel: "调整后级别","adjustmentType":"调整类型" "adjustReason": "调整原因"
         * @description  级别调整 ①新增级别调整记录②人员状态：级别调整中③发起流程
         * @param {NSExpress.Request} req
         * @param {NSExpress.Response} res 
         */
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var sch = webReq.getParam(req, {
                        JSBId: "",
                        adjustmentDate: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                        adjustmentPeople: user.userId,
                        originalLevel: "",
                        finalLevel: "",
                        adjustmentType: "01",
                        adjustReason: "",
                    });
                    var jsbState = webReq.getParam(req, {
                        id: sch.JSBId,
                        peopleStatus: "级别调整中"
                    });
                    //迁出表操作数据
                    var setLevel = {
                        zId: sch.JSBId,
                        adjustmentDate: sch.adjustmentDate,
                        adjustmentPeople: sch.adjustmentPeople,
                        originalLevel: sch.originalLevel,
                        finalLevel: sch.finalLevel,
                        adjustReason: sch.adjustReason,
                        adjustmentType: sch.adjustmentType,
                        wfState: "级别调整中"
                    };
                    var postData = { funMDataId: "", funMId: "494E315CB465B78FE05011AC02000B20", busiData: "" }
                    zszhLevelAdjustService.validate(setLevel, function (err) {
                        if (err) {
                            webRes.exportJson(res, err);
                        }
                        else {
                            setLevel.id = unit.getUuid();
                            postData.funMDataId = setLevel.id;
                            zszhService.setLevel(user, jsbState, setLevel, postData, webRes.exportJson.bind(null, res));//修改zszhjsb表的字段变成迁出中
                        }
                    });
                }
            });
        }
    },
    setManagerLevel: { //管理级别调整
        /** 
         * 输入参数  
         * zId: "精神病主键",originalLevel: "原级别", finalLevel: "调整后级别","adjustmentType":"调整类型" "adjustReason": "调整原因"
         * @description  级别调整 ①新增级别调整记录②人员状态：级别调整中③发起流程
         * @param {NSExpress.Request} req
         * @param {NSExpress.Response} res 
         */
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var sch = webReq.getParam(req, {
                        JSBId: "",
                        adjustmentDate: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                        adjustmentPeople: user.userId,
                        originalLevel: "",
                        finalLevel: "",
                        adjustmentType: "02",
                        adjustReason: "",
                    });
                    var jsbState = webReq.getParam(req, {
                        id: sch.JSBId,
                        PEOPLE_STATUS: "级别调整中"
                    });
                    //迁出表操作数据
                    var setLevel = {
                        zId: sch.JSBId,
                        adjustmentDate: sch.adjustmentDate,
                        adjustmentPeople: sch.adjustmentPeople,
                        originalLevel: sch.originalLevel,
                        finalLevel: sch.finalLevel,
                        adjustReason: sch.adjustReason,
                        adjustmentType: sch.adjustmentType,
                        wfState: "级别调整中"
                    };
                    var postData = { funMDataId: "", funMId: "494E315CB465B78FE05011AC02000B21", busiData: "" }
                    zszhLevelAdjustService.validate(setLevel, function (err) {
                        if (err) {
                            webRes.exportJson(res, err);
                        }
                        else {
                            setLevel.id = unit.getUuid();
                            postData.funMDataId = setLevel.id;
                            zszhService.setLevel(user, jsbState, setLevel, postData, webRes.exportJson.bind(null, res));//修改zszhjsb表的字段变成迁出中
                        }
                    });
                }
            });
        }
    },

    // processExecute: {
    //     /** 流程处理
    //     * 输入参数  
    //     * @description  发起回访 ①sn：前端可查②action：approval，decline，comments：评审意见
    //     * @param {NSExpress.Request} req
    //     * @param {NSExpress.Response} res 
    //     */
    //     post: function (req, res) {
    //         userService.getCurUser(req, function (err, user) {
    //             if (err) {
    //                 webRes.exportJson(res, err);
    //             }
    //             else {
    //                 var sch = webReq.getParam(req, {//读取后台生成的全部数据
    //                     sn: "",
    //                     action: "",
    //                     comments: ""
    //                 });
    //                 wfWorkflowService.processExecute(user, sch.sn, sch.action, sch.comments, webRes.exportJson.bind(null, res))
    //             }
    //         });
    //     }
    // },

    setRevisitSys: { //
        /** 
        * 输入参数  
        * zId: "精神病主键",originalCyc: "原周期", finalCyc: "调整后周期","adjustReason":"调整原因" 
        * @description  级别调整 ①新增级别调整记录②人员状态：级别调整中③发起流程
        * @param {NSExpress.Request} req
        * @param {NSExpress.Response} res 
        */
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var sch = webReq.getParam(req, {//id后台生成
                        JSBId: "",
                        adjustmentDate: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                        adjustmentPeople: user.userId,
                        originalCyc: "",
                        finalCyc: "",
                        adjustReason: "",
                        cigrole: ""
                    });
                    var jsbVisitCyc = webReq.getParam(req, {
                        zId: sch.JSBId,
                        visitCyc: sch.finalCyc,
                    });
                    user.cigrole = sch.cigrole;
                    //迁出表操作数据
                    var revisitSys = {
                        zId: sch.JSBId,
                        adjustmentDate: sch.adjustmentDate,
                        adjustmentPeople: sch.adjustmentPeople,
                        originalCyc: sch.originalCyc,
                        finalCyc: sch.finalCyc,
                        adjustReason: sch.adjustReason,
                    };
                    zszhRevisitSysService.validate(revisitSys, function (err) {
                        if (err) {
                            webRes.exportJson(res, err);
                        }
                        else {
                            revisitSys.id = unit.getUuid();
                            zszhService.setRevisitSys(user, jsbVisitCyc, revisitSys, webRes.exportJson.bind(null, res));//修改zszhjsb表的字段变成迁出中
                        }
                    });
                }
            });
        }
    },
     /** 
         * 输入参数  危险界别 管理等级 回访周期  分配网格员  基础信息页面
         * JSBId 精神病主键
         * @description  管理等级和危险等级变更的信息展示页面
         * @param {NSExpress.Request} req
         * @param {NSExpress.Response} res 
         */
    listMessageForSettings: function (req, res) {//for 危险等级变更  管理等级边等页的查询
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                    cigrole: ""
                });
                user.cigrole = query.cigrole;
                zszhService.listMessageForSettings(user,
                    query.JSBId,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /**
     * 输出结果：
     * {"success":1,
     * "data":{
     * "id":"b345052b-6eba-42ae-938a-e952f1d080a6",  人口主键
     * "cardNum":"110602199109185343",  身份证号
     * "name":"刘鑫",  姓名
     * "rAddr":"渚山村",  现居地详细住址
     * "gridId":1130315334549504, 所属单位代码
     * "JSBId":"533d5fdc-522c-4730-8304-a47063cc41bd",  精神病主键
     * "dangerRank":"02",危险等级
     * "manageLevel":2   管理等级
     * visitCyc:"3"回访周期
     * }
     * }
     */
    /** 
         * 输入参数  
         * JSBId 精神病主键
         * @description  管理等级和危险等级变更的信息展示页面
         * @param {NSExpress.Request} req
         * @param {NSExpress.Response} res 
         */
    listMessageForLevleSetting: function (req, res) {//for 危险等级变更  管理等级边等页的查询
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                    cigrole: ""
                });
                user.cigrole = query.cigrole;
                zszhService.listMessageForLevelSetting(user,
                    query.JSBId,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /**
     * 输出结果：
     * {"success":1,
     * "data":{
     * "id":"b345052b-6eba-42ae-938a-e952f1d080a6",  人口主键
     * "cardNum":"110602199109185343",  身份证号
     * "name":"刘鑫",  姓名
     * "usedName":null, 曾用名
     * "gender":"1",  性别
     * "birthDate":"2016-11-02T10:40:47.000Z", 出生日期
     * "nation":"1",  民族
     * "sPlace":"渚山村", 服务处所
     * "telPhone":"15521231221",联系方式
     * "maritalStatus":"01", 婚姻状况
     * "bloodType":"A", 血型
     * "residence":"渚山村",现居地
     * "sAddr":"渚山村",  现居地详细住址
     * "SSDWBM":1130315334549504, 所属单位代码
     * "pID":"b345052b-6eba-42ae-938a-e952f1d080a6",     人口主键
     * "JSBId":"533d5fdc-522c-4730-8304-a47063cc41bd",  精神病主键
     * "dangerRank":"02",危险等级
     * "manageLevel":2   管理等级
     * }
     * }
     */
    /**
     * 肇事肇祸信息 
     * 输入：JSBId offset limit
     */
    zszhMessage: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                });
                zszhService.listZszhMessage(user,
                    query.JSBId,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /*
        {"success":1,
            "data":{"total":1,
                "rows":[
                            {"JSBId":"533d5fdc-522c-4730-8304-a47063cc41bd",//精神病id
                            "zszhDate":"2017-01-18T09:46:47.000Z",//肇事肇祸日期
                            "zszhAddr":"大街",//肇事肇祸地点
                            "zszhCom":"送进医院",//处置结果
                            "RN":1
                            }
                       ]
                    }
        }
     */
    /**
     * 输入：JSBId
     * description:查询最近三次回访记录
     */
    lastThreeRevisit: function (req, res) {//完成可测
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                });
                zszhService.lastThreeRevisit(user,
                    query.JSBId,
                    0,
                    3,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /*
    示例：http://localhost:3003/zszh/lastThreeRevisit?JSBId=533d5fdc-522c-4730-8304-a47063cc41bd
        {"success":1,
                "data":{"total":1,
                    "rows":[{
                        "id":"123456789", //主键
                        "zId":"533d5fdc-522c-4730-8304-a47063cc41bd",//表ZZ_ZSZHJSB主键
                        "visitDate":"2017-01-18T10:12:18.000Z",//回访时间
                        "visitPeople":"村长",//回访人员
                        "visitCom":"正常",//回访结果
                        "remarks":"正常",/备注
                        "iswithmanager":"1",//是否与监护人同住
                        "isMedication":"1",//是否按时吃药
                        "isHarmbehavior":"1",//是否有危险行为
                        "createDate":"2017-01-18T10:12:46.000Z",//创建日期
                        "createUser":"admin",//创建人ID
                        "updateUser":null,//修改人ID
                        "updateDate":null,//修改时间
                        "RN":1}]
                }
                else {
                    var query = webReq.getQueryParam(req, {
                        departId: "",//所属单位代码
                        queryName: "",//查询数值，
                    });
                    query.departId=user.userDepartmentId;
                    var acc = new zszhUserAccess(null);
                    var filter={"id":query.departId};
                    async.series([
                        acc.open.bind(acc, false),
                        acc.getObject.bind(acc, filter),
                    ], function (err, userMsg, callback) {
                        acc.close(function () { });
                        if(err){
                            callback(err);
        }
   */
    /**
     * 输入参数:JSBId&offset&limit
     * description:查询回访记录
     */
    queryRevisit: function (req, res) {//完成可测
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                    offset: 0,
                    limit: 10
                });
                zszhService.queryRevisit(user,
                    query.JSBId,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /*
       {"success":1,
        "data":
        {
            "total":23,
                "rows":[
                    {
                        "id": "bb255b46-5363-482a-ac73-b27c5f619185", 回访记录主键
       "JSBId":"2b283338-66ff-4ad7-a288-9d3590c46eed", 精神病主键  外键
       "visitDate": "2016-12-12T09:40:01.000Z", 回访日期
       "visitPeople":"test",  回访人
       "isWithGuardian":"1",  是否和监护人同住
       "isMedication":"1",  是否按时服药
       "isHarmBehavior":"1", 是否存在危害行为
       "wfState":null,"RN": 1
                    },
                    { "id": "07277e2d-7c0c-48f0-a2ea-133e169364f7", "JSBId": "2b283338-66ff-4ad7-a288-9d3590c46eed", "visitDate": "2016-12-12T09:40:01.000Z", "visitPeople": "test", "isWithGuardian": "1", "isMedication": "1", "isHarmBehavior": "1", "wfState": null, "RN": 2 },
                    { "id":"670b32bb-670e-4bcb-834a-a978c0194ab5","JSBId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2016-12-12T09:40:01.000Z","visitPeople":"test","isWithGuardian":"1","isMedication":"1","isHarmBehavior":"1","wfState":null,"RN":3}
                    ]
                }
            }
       */
    //新增页面
    /**
    * 输入参数 departId=282402504704&queryName=苗&offset=0&limit=20
    * @description 新增 根据单位和搜索查询 信息来源："ZZ_PERSON"
    * @param {NSExpress.Request} req
    * @param {NSExpress.Response} res 
    * @示例地址  http://127.0.0.1:3005/zszh/listPeopleByNameAndCardNumber?queryName=  完成可测
    */
     listPeopleByNameAndCardNumber: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    queryName: "",//查询数值，
                });
                query.departId = user.userDepartmentId;
                var acc = new zszhUserAccess(null);
                var filter = { "id": query.departId+"" };
                async.series([
                    acc.open.bind(acc, false),
                    acc.getUser.bind(acc, filter),
                ], function (err, userMsg, callback) {
                    acc.close(function () { });
                    if (err) {
                        webRes.exportJson.bind(res, err);
                    }
                    else {
                        if (userMsg[1]==null){
                            webRes.exportJson.bind(res,"没有查询到相应的单位信息");
                        }
                        else {
                            zszhService.queryAddPeopleMsg(userMsg[1],
                                query.queryName,
                                webRes.exportJson.bind(null, res));
                        }
                    }
                });
            }
        });
    },
    /*
      {"success":1,
           "data":{
                   "id":"c80eb1fe-5d8f-4697-99a7-a11f4bd571c0",
                   "name":"郝苗",//姓名
                   "cardNum":"130602199009126363",//身份证号
                   "gId":"1130315133222912",//网格id
                   "rAddr":"高家墩新村15号2221",//现住地详址
                }
     } 
    */
    addPeopleThroughProcess: {//通过流程新增
        /** appPeopleThroughProcess
            * 输入参数  
            * @description  移除 ①新增人员记录②发起流程
            * @param {NSExpress.Request} req
            * @param {NSExpress.Response} res 
            */
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {//危险等级 管理等级  新增原因 诊断类型 人员现状 回访周期 
                    //有无肇事肇祸史  家庭经济状况  是否纳入低保 监护人  与当事人关系
                    //监护人联系方式 监护人身份证号码  监护人现住地门楼详址
                    var sch = webReq.getParam(req, {//新增主键在后面生成 
                        pId: "",//外键1
                        dangerRank:"",//危险等级
                        manageLevel:"",//管理等级
                        addReason: "",//新增原因1
                        attackType: "",//目前诊断类型1
                        peopleStatusQeo:"",//人员现状
                        visitCyc:"",//回访周期
                        isCTrouble:"",//有无肇事肇祸史
                        ecoSituatio: "",//家庭经济状况
                        isEfficiency: "",//是否纳入低保
                        relationship:"",//与当事人关系
                        guarderName: "",//监护人
                        guarderCardNum: "",//监护人身份证号码
                        guarderTel: "",//监护人联系方式
                        guarderAddr: "",//监护人现住详细地址
                        griderId:""//网格员姓名 存储userid

                    });
              //      var griderId = "a0f916e3-6f53-4dcb-b674-4c50d7882bbc";
              //      sch.griderId = griderId;//以后根据gridid去a4_sys_user查出来

                    zszhService.validate(sch, function (err) {
                        if (err) {
                            webRes.exportJson(res, err);
                        }
                        else {
                            sch.wfStatus = "新增中";//或者为疑似精神病人
                            var postData = { funMDataId: "", funMId: "494C9B29169A9BA4E05011AC02000A7C", busiData: "" }
                            var visitCyc = {
                                "gvisitCyc": sch.visitCyc, //回访周期
                                "pvisitCyc": sch.visitCyc,//回访周期外键
                                "dvisitCyc": sch.visitCyc,//回访人
                                "rgvisitCyc": sch.visitCyc,//回访周期
                                "rpvisitCyc": sch.visitCyc,//回访人
                                "rdvisitCyc": sch.visitCyc,//回访周期
                            }
                            delete sch["visitCyc"];
                            sch.id = unit.getUuid();
                            visitCyc.id = unit.getUuid();
                            visitCyc.zId = sch.id;
                            postData.funMDataId = sch.id;
                            zszhService.addPeopleThroughProcess(user,visitCyc,sch, postData, webRes.exportJson.bind(null, res))
                        }
                    });
                }
            });
        }
    },
    appPeopleDirectly: {//!!!完成可测
        /** 直接添加，不走流程
        * 输入参数  
        * @description  移除 ①新增人员记录②发起流程
        * @param {NSExpress.Request} req
        * @param {NSExpress.Response} res 
        */
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var sch = webReq.getParam(req, {//新增主键在后面生成 
                        pId: "",//外键
                        guarderName: "",//监护人
                        guarderCardNum: "",//监护人身份证号码
                        guarderTel: "",//监护人联系方式
                        guarderAddr: "",//监护人现住详细地址
                        addReason: "",//新增原因
                        attackType: "",//目前诊断类型
                        ecoSituatio: "",//家庭经济情况
                        isEfficiency: "",//是否纳入低保
                        isCTrouble: "",//有无肇祸历史
                        cTroubleCount: "",//肇事肇祸次数 
                        cTroubleDate: ""//上一次肇事肇祸时间
                    });
                    if (sch.cTroubleDate != "") {
                        sch.cTroubleDate = new Date(sch.cTroubleDate).Format("yyyy-MM-dd hh:mm:ss");
                    }
                    zszhService.validate(sch, function (err) {
                        if (err) {
                            webRes.exportJson(res, err);
                        }
                        else {
                            sch.id = unit.getUuid();
                            zszhService.appPeopleDirectly(user, sch, webRes.exportJson.bind(null, res))
                        }
                    });
                }
            });
        }
    },
    outPeople: {
        /**
         * 输入参数  
         * zId: "精神病主键",originalAddr: "原住址",finalAddr: "迁出后住址", moveOutReason: "迁出原因", remarks: "备注"
         * @description  迁出人员 ①新增迁出记录②人员状态：迁出中③发起流程
         * @param {NSExpress.Request} req
         * @param {NSExpress.Response} res 
         */
        post: function (req, res) {//流程里面六街口  直接对接
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var sch = webReq.getParam(req, {//读取后台生成的全部数据
                        JSBId: "",
                        finalAddr: "",  //    
                        moveOutReason: "", //     remarks: ""
                        userId:""
                    });
                    var acc = new zszhAccess(user);
                    var filter = { "id": sch.JSBId };
                    //查询用户信息
                    async.series([
                        acc.open.bind(acc, false),
                        acc.getObject.bind(acc, filter),
                    ], function (err, data) {
                        acc.close(function () { });
                        if (err) {
                            webRes.exportJson(res, err);
                        }
                        else {
                            if (data[1] == null) {
                                webRes.exportJson(res, "患者不存在，不可迁出");
                            }
                            else {
                                var moveOutHis = {
                                    zId: sch.JSBId,
                                    moveOutDate: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                                    moveOutPeople: user.userId,
                                    originalAddr: data[1].gridId,
                                    finalAddr: sch.finalAddr,  // moveOutReason:sch.moveOutReason, // remarks:sch.remarks, // wfState:"迁出中"  
                                    originalGrider: data[1].griderId,
                                    wfState:"迁出"
                                };
                                var flowTrack = {
                                    outGId: data[1].gridId,
                                    inGId: sch.finalAddr,
                                    flowDate: moveOutHis.moveOutDate,
                                    id: unit.getUuid(),
                                    pId: data[1].pId
                                }
                                moveOutHis.id = unit.getUuid();
                              //  var jsbState = { "id": sch.JSBId, griderId: "a0f916e3-6f53-4dcb-b674-4c50d7882bbc" }
                              var jsbState = { "id": sch.JSBId, griderId: sch.userId }
                                var personState = { id: data[1].pId, gId: sch.finalAddr }
                                zszhService.moveOutPeople(user, personState, jsbState, flowTrack, moveOutHis, webRes.exportJson.bind(null, res));
                            }
                        }
                    }
                    );
                }
            });
        }
    },
    //移除人员girderid为空
    removePeople: {
        /**1.新增移除记录 2.设置成无网格员 3.如果是超过管理范围设置成无监管 4.查询无网格员不要死亡状态
         * post参数 
         * @description 
         */
        post: function (req, res) {
            //outReason
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var sch = webReq.getParam(req, {
                        JSBId: "",
                        deleteReason: ""
                    });
                    var acc = new zszhAccess(user);
                    var filter = { "id": sch.JSBId };
                    //查询用户信息
                    async.series([
                        acc.open.bind(acc, false),
                        acc.getObject.bind(acc, filter),
                    ], function (err, data) {
                        acc.close(function () { });
                        if (err) {
                            webRes.exportJson(res, err);
                        }
                        else {
                            if (data[1] == null) {
                                webRes.exportJson(res, "患者不存在，不可移除");
                            }
                            else {
                                var removeHis = {
                                    zId: sch.JSBId,
                                    deleteDate: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                                    deletePeople: user.userDepartmentId,
                                    originalAddr: data[1].gridId,
                                    deleteReason: sch.deleteReason,
                                    wfState:"移除"
                                };
                                var jsbState = { "id": sch.JSBId, griderId: "" }
                                var flowPersonState = { "id": data[1].pId }//流动人员不知去向
                                if (sch.deleteReason == "死亡") {
                                    jsbState["peopleStatus"] = "死亡";
                                }
                                else if (sch.deleteReason == "超出管理范围") {
                                    flowPersonState["isSupervise"] = 0;
                                }
                                removeHis.id = unit.getUuid();
                                zszhService.deletePeople(user, jsbState, removeHis, flowPersonState, webRes.exportJson.bind(null, res));
                            }

                        }
                    });
                    // webRes.exportJson(res,null,null); 
                }
            });
        }
    },

    /**
    * 输入参数  departId=&queryName=(支持名字和身份证号查询)
    * @description 查询无网格员列表   
    * @param {NSExpress.Request} req
    * @param {NSExpress.Response} res 
    * @示例地址 http://127.0.0.1:3005/listPoepleWithoutManager?queryName=110602199109185343
    */
    /*
        {"success":1,
            "data":{
                "rows":[
                            {"name":"刘鑫",//姓名
                            "cardNum":"110602199109185343",//身份证号
                            "gender":"1",//性别
                            "domicile":null,//户籍地
                            "residence":"11",//现住地
                            "attackType":"01",//目前诊断类型
                            "dangerRank":"02",//危险等级
                            "isCTrouble":"0"//有无肇事肇祸历史
                            }
                        ],"total":1
                    }
        }
     */
    listPoepleWithoutManager: function (req, res) {//查询无网格员 
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    departId: "",//所属单位代码
                    queryName: "",//查询数值，
                    offset: 0,
                    limit: 10,
                });
                if (query.departId == null || query.departId == "") {
                    query.departId = user.userDepartmentId+"";
                }
                var acc = new zszhUserAccess(null);
                var filter = { "id": query.departId };
                //查询用户信息
                async.series([
                    acc.open.bind(acc, false),
                    acc.getObject.bind(acc, filter),
                ], function (err, userMsg) {
                    acc.close(function () { });
                    if (err) {
                        webRes.exportJson(res, err);
                    }
                    else {
                        if (userMsg[1] == null) {
                            webRes.exportJson(res, "用户信息不存在");
                        }
                        else {
                            zszhService.listPeopleWithoutManager(user,
                                userMsg[1],
                                query.queryName,
                                query.offset,
                                query.limit,
                                webRes.exportJson.bind(null, res));
                        }
                    }
                })
            }
        });
    },
  /*{
        "success": 1, "data": {
            "rows": [
                {
                    "name": "闵顺林", 姓名
                    "JSBId": "1ee95e17-16fa-444f-a8f9-d38115028bf7",精神病主键
                    "cardNum": "330522193912211034",身份证
                    "residence": null,现住地
                    "attackType": "3",诊断类型（域）
                    "dangerRank": "3",危险等级（域）
                    "isCTrouble": "0",是否肇事肇祸史
                    "RN": 1
                },], "total": 7
        }
    }*/
    /**
     * 输入参数：JSBId
     * description:新增回访记录信息表
     */
    addRevisitMsg: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",//精神病id
                    cigrole: ""
                });
                user.cigrole = query.cigrole;
                zszhService.addRevisitMsg(user,
                    query.JSBId,
                    webRes.exportJson.bind(null, res));
            }
        });
        /**
         * {
                "success": 1, "data":
                {
                    "id": "187aad17-203c-425f-a649-cdefe2689b66",//实有人口id
                    "cardNum": "230602199809184543",//身份证号码
                    "name": "陈梦",//姓名
                    "usedName": null,//曾用名
                    "gender": "1",//性别
                    "birthDate": "2016-11-02T10:40:47.000Z",//出生日期
                    "nation": "1",//,民族
                    "sPlace": "川步村",//服务处所
                    "phone": "2938172",//联系电话
                    "maritalStatus": "01",//婚姻状况
                    "bloodType": "A",//血型
                    "residence": "11",//现住地
                    "rAddr": "川步村",//现住地详细地址
                    "JSBId": "533d5fdc-522c-4730-8304-a47063cc41bd",//精神病id、
                    "dangerRank": "02",//危险等级
                    "manageLevel": 2,//管理等级
                    "ecoSituatio": "02",//家庭经济情况
                    "isEfficiency": "0",//是否纳入低保
                    "guarderCardNum": "110602199109115342",//监护人身份证号
                    "guarderName": "郝发",//监护人姓名
                    "guarderTel": "15521231221",//监护人电话
                    "guarderAddr": "长兴县龙山社区小李村43号",//监护人地址
                    "visitCyc": 5,//回访周期（频率）
                    "visitCycZid": "533d5fdc-522c-4730-8304-a47063cc41bd",
                    "visitPeople": "CIGADMIN"
                }
        }
         */
    },
    /** 
              * 输入参数  
              * JSBId 精神病主键
              * @description  管理等级和危险等级变更的信息展示页面
              * @param {NSExpress.Request} req
              * @param {NSExpress.Response} res 
              */
    listMessageForRevisitCycSetting: function (req, res) {//for 危险等级变更  管理等级边等页的查询
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: ""
                });
                zszhService.listMessageForLevelSetting(user,
                    query.JSBId,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /*
    示例：http://localhost:3003/zszh/listMessageForRevisitCycSetting?JSBId=533d5fdc-522c-4730-8304-a47063cc41bd
      输出结果：
     {"success":1,
        "data":{
                "id":"b345052b-6eba-42ae-938a-e952f1d080a6",//主键
                "cardNum":"110602199109185343",//身份证号码（居民身份证号码）
                "name":"刘鑫",//姓名
                "usedName":null,//曾用名
                "gender":"1",//性别
                "birthDate":"2016-11-02T10:40:47.000Z",//出生日期
                "nation":"1",//民族
                "nativePlace":"0",//籍贯
                "maritalStatus":"01",//婚姻状况
                "politicalStatus":"0",//政治面貌
                "education":"0",//学历
                "bloodType":"A",//血型
                "residence":"11",//现住地
                "sPlace":"渚山村",//服务处所
                "manageLevel":2,//管理等级
                "visitCyc":2,//回访周期
                "dangerRank":"02"//危险等级,
                "sAddr":"渚山村",//现住地详细地址
                "gridId":"1130315133222912",//所属单位代码
                "pID":"b345052b-6eba-42ae-938a-e952f1d080a6",
                "JSBId":"533d5fdc-522c-4730-8304-a47063cc41bd"
              }
    }
     */
    zszhAddRevisit: {
        /** 
         * 输入参数  
         * @description 回访callback 修改：zjs：人员状态  
         * @param {NSExpress.Request} req
         * @param {NSExpress.Response} res 
         */
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var sch = webReq.getParam(req, {//id后台生成
                        zId: "",
                        visitDate: new Date().Format("yyyy-MM-dd hh:mm:ss"),
                        visitPeople: user.userDepartmentId,
                        isWithManager: "",
                        isMedication: "",
                        isHarmBehavior: "",
                        remarks: ""
                    });
                    sch.id = unit.getUuid();
                    var jsbState = webReq.getParam(req, {
                        id: sch.zId,
                        //   PEOPLE_STATUS: "正常",
                        preVisitDate: sch.visitDate
                    });
                    // sch.zId=sch.JSBId;
                    //  delete sch["JSBId"];
                    zszhRevisitService.validate(sch, function (err) {
                        if (err) {
                            webRes.exportJson(res, err);
                        }
                        else {
                            sch.id = unit.getUuid();
                            zszhService.addRevisit(user, jsbState, sch, webRes.exportJson.bind(null, res));//修改zszhjsb表的字段变成迁出中
                        }
                    });
                }
            });
        }
    },
    /*{"success":1,"data":{"total":1,
    "rows":[{
        "id":"11",
        "zId":"533d5fdc-522c-4730-8304-a47063cc41bd",
        "adjustmentDate":"2017-01-04T11:51:55.000Z",//申请时间
        "adjustmentPeople":"admin",//申请人-姓名
        "originalLevel":"1",//变更前
        "finalLevel":"1",//变更后
        "adjustmentReason":"1",//申请变更原因
        "pId":"b345052b-6eba-42ae-938a-e952f1d080a6",
        "name":"刘鑫",//基本信息-姓名
        "cardNum":"110602199109185343",//公民身份号码（身份号码）
        "birthDate":"2016-11-02T10:40:47.000Z",//出生年月
        "gender":"1",//性别
        "usedName":null,
        "jsbId":"533d5fdc-522c-4730-8304-a47063cc41bd",
        "jsbP_id":"b345052b-6eba-42ae-938a-e952f1d080a6",
        "userInpostPostId":3198,
        "userInpostUserId":"ADMIN",
        "postInfoPostId":3198,
        "pName":"长兴管理员",//岗位
        "a4sysuserUserName":"admin",
        "a4sysuserUserId":"ADMIN",
        "RN":1}]}}
     */
    //查询审批详细
    //http://localhost:3003/zszh/changeAuditingList
    changeAuditingList: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    userId: user.userId,
                    funmodelName: "",
                    offset: 0,
                    limit: 10,
                });
                zszhChangeAuditingService.queryList(
                    query.userId,
                    query.funmodelName,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /*
       {"success":1,"data":{"total":23,"rows":[{
           "id":"07277e2d-7c0c-48f0-a2ea-133e169364f7",
           "zId":"2b283338-66ff-4ad7-a288-9d3590c46eed",
           "visitDate":"2016-12-12T09:40:01.000Z",//访问日期
           "visitPeople":"test",//访问人
           "visitCom":"test",
           "remarks":null,
           "isWithguardian":"1",
           "isMedication":"1",
           "isHarmbehavior":"1",
           "createDate":"2016-12-12T09:51:16.000Z",
           "RN":1},{"id":"670b32bb-670e-4bcb-834a-a978c0194ab5","zId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2016-12-12T09:40:01.000Z","visitPeople":"test","visitCom":"test","remarks":null,"isWithguardian":"1","isMedication":"1","isHarmbehavior":"1","createDate":"2016-12-12T09:47:43.000Z","RN":2},{"id":"bb255b46-5363-482a-ac73-b27c5f619185","zId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2016-12-12T09:40:01.000Z","visitPeople":"test","visitCom":"test","remarks":null,"isWithguardian":"1","isMedication":"1","isHarmbehavior":"1","createDate":"2016-12-12T09:46:48.000Z","RN":3},{"id":"f4f8d4a3-3f9f-45de-bbde-e240dc78d9e2","zId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2011-12-31T16:00:00.000Z","visitPeople":"12","visitCom":"12","remarks":"精神病患者","isWithguardian":"1","isMedication":"1","isHarmbehavior":"1","createDate":"2016-12-09T10:58:09.000Z","RN":4},{"id":"d5dfd02a-b459-406d-8a2c-3b9096217c3d","zId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2011-12-31T16:00:00.000Z","visitPeople":"12","visitCom":"12","remarks":"精神病患者","isWithguardian":"1","isMedication":"1","isHarmbehavior":"1","createDate":"2016-12-09T10:57:39.000Z","RN":5},{"id":"533d5fdc-522c-4730-8304-a47063cc41bd","zId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2001-10-31T16:00:00.000Z","visitPeople":"11","visitCom":"11","remarks":"3","isWithguardian":"1","isMedication":"1","isHarmbehavior":"1","createDate":"2016-12-04T06:23:15.000Z","RN":6},{"id":"f2560620-fb0c-43fe-96bf-c5058366c7ab","zId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2001-10-31T16:00:00.000Z","visitPeople":"杨","visitCom":"11","remarks":"3","isWithguardian":"1","isMedication":"1","isHarmbehavior":"1","createDate":"2016-12-04T06:21:47.000Z","RN":7},{"id":"26fe66ba-9cc2-40c4-82e3-df40c87220a8","zId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2016-12-01T08:41:38.000Z","visitPeople":"韩","visitCom":"1","remarks":"水电费水电费无人","isWithguardian":"1","isMedication":"1","isHarmbehavior":"1","createDate":"2016-12-01T08:41:38.000Z","RN":8},{"id":"cd6ab8f7-1524-42d8-85f7-98039ed67247","zId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2016-12-01T08:41:36.000Z","visitPeople":"沈","visitCom":"1","remarks":"为水电费","isWithguardian":"1","isMedication":"1","isHarmbehavior":"1","createDate":"2016-12-01T08:41:36.000Z","RN":9},{"id":"50e33476-eee4-43b6-9d26-f5734efdec03","zId":"2b283338-66ff-4ad7-a288-9d3590c46eed","visitDate":"2016-12-01T08:41:33.000Z","visitPeople":"蒋","visitCom":"1","remarks":"对景挂画","isWithguardian":"1","isMedication":"1","isHarmbehavior":"1","createDate":"2016-12-01T08:41:33.000Z","RN":10}]}}
    */
    //查询审批详细
    //http://localhost:3003/zszh/changeAuditingList
    changeAuditingListByJSBId: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: ""
                });
                zszhChangeAuditingService.queryByJSBId(
                    query.JSBId,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /*
    {"success":1,"data":
    {"id":"11",
    "zId":"26fe66ba-9cc2-40c4-82e3-df40c87220a8",  精神病id
    "adjustmentDate":"2017-01-04T11:51:55.000Z",   申请时间
    "adjustmentPeople":"admin",   申请人
    "originalLevel":"1",   原来等级
    "finalLevel":"1",      申请等级
    "adjustmentReason":"1", 申请原因
    "pId":"72a3c664-c1c5-45ee-9527-49aee8b7f97d",
    "cardNum":"220602199809187753",  身份证
    "name":"王萌萌",  姓名
    "usedName":null,"gender":"1",曾用名
    "birthDate":"2016-11-02T10:40:47.000Z",生日
    "nation":"1", 民族
    "maritalStatus":"01",婚姻状况
    "bloodType":"A",血型
    "residence":"11",现住地
    "sPlace":"涧塘村",服务处所
    "telPhone":"15521231221", 联系方式
    "sAddr":"涧塘村", 现住地详细地址
    "gridId":"1130315133222912",
    "manageLevel":1,  管理等级
    "dangerRank":"02", 危险等级
    "jsbId":"26fe66ba-9cc2-40c4-82e3-df40c87220a8",
    "jsbP_id":"72a3c664-c1c5-45ee-9527-49aee8b7f97d",
    "userInpostPostId":3198,
    "userInpostUserId":"ADMIN",
    "postInfoPostId":3198,
    "pName":"长兴管理员",  岗位
    "a4sysuserUserName":"admin",
    "a4sysuserUserId":"ADMIN",
    "a4departmentId":1130315133222912,
    "gridName":"交警大队" 所属网格
}}*/
    /** 
            * 输入参数  
            * JSBId 精神病主键
            * @description  管理等级和危险等级变更的信息展示页面
            * @param {NSExpress.Request} req
            * @param {NSExpress.Response} res 
            */
    listMessageForSettingManager: function (req, res) {//for 危险等级变更  管理等级边等页的查询
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: ""
                });
                zszhService.listMessageForSettingManager(user,
                    query.JSBId,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    /*
        示例：http://localhost:3003/zszh/listMessageForSettingManager?JSBId=533d5fdc-522c-4730-8304-a47063cc41bd
        返回数据：
        {"success":1,
            "data":{
                    "id":"b345052b-6eba-42ae-938a-e952f1d080a6",
                    "name":"刘鑫",//姓名
                    "cardNum":"110602199109185343",//身份证号码
                    "gender":"1",//性别
                    "domicile":null,//户籍地
                    "dAddr":"渚山村",//户籍地详细地址
                    "residence":"11",//现住地
                    "rAddr":"渚山村",//现住地详址
                    "JSBId":"533d5fdc-522c-4730-8304-a47063cc41bd",
                    "attackType":"01",//目前诊断类型
                    "dangerRank":"02",//危险等级
                    "isCTrouble":"0",//有无肇事肇祸历史
                    "cTroubleCount":5//肇事肇祸次数  
                   }
        }
     */
    setGriderDirectly: { //familyService inperoson 
        //逻辑：传入网格id和网格员id  通过网格id查找所属网格名称和所属地点
        /** setGrider  setGriderThroughProcess
         * 输入参数  
         * @description  设置网格员 ①修改网格员信息，人员状态②发起流程
         * @param {NSExpress.Request} req
         * @param {NSExpress.Response} res 
         */
        post: function (req, res) {
            userService.getCurUser(req, function (err, user) {
                if (err) {
                    webRes.exportJson(res, err);
                }
                else {
                    var sch = webReq.getParam(req, {
                        id: "",
                        pId:"",
                        griderId: "",
                        gridId: "",
                    });
                    var acc = new zszhUserAccess(null);
                    var filter = { "id": sch.gridId };
                    //查询用户信息
                    async.series([
                        acc.open.bind(acc, false),
                        acc.getObject.bind(acc, filter),
                    ], function (err, userMsg) {
                        acc.close(function () { });
                        if (err) {
                            webRes.exportJson(res, err);
                        }
                        else {
                            if (userMsg[1] == null) {
                                webRes.exportJson(res, "没有查询到对应的网格信息");
                            }
                            else {
                                sch.gridName = userMsg[1].departName;
                                sch.beloArea = (userMsg[1].displayName.split('/'))[0];
                                if (sch.gridId == null || sch.griderId == "") 
                                    webRes.exportJson(res,"未获取到网格信息，请重新设置");   
                                else {
                                    var personState = { id: data[1].pId, gId: sch.gridId }
                                    delete sch["gridId"];delete sch["pId"];
                                    zszhService.setGriderDirectly(user, personState,sch, webRes.exportJson.bind(null, res));//修改zszhjsb表的字段变成迁出中
                                }
                            }
                        }
                    });
                }
            });
        }
    },
    /**
     * 查询网格员信息：
     * 逻辑：查询历史网格员，查询现住地网格员，查询户籍地网格员
     */
    getHistoricalGrider: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                    offset: 0,
                    limit: 10,
                });
                zszhService.getHistoricalGrider(
                    user,
                    query.JSBId,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }

        });
    },
    /* {
       "success": 1, "data":
           {
               "rows": [
                   {
                       "JSBId": "533d5fdc-522c-4730-8304-a47063cc41bd",
                       "originalGrider": "3bf2ff18-b46e-452c-8be9-083be9d51036",
                       "originalAddr": "1130315133222912",
                       "originalAddrName": "交警大队",
                       "griderName": "李长林",
                       "gridPhone": "22122"
                   },
                   { 
                       "JSBId": "533d5fdc-522c-4730-8304-a47063cc41bd", 
                       "originalGrider": "96d0032f-facd-4e11-81c3-dc431059b478", 
                       "originalAddr": "1130315133222912", 
                       "originalAddrName": "交警大队",
                        "griderName": "李长林", 
                        "gridPhone": "22122" 
                   }, 
                   { 
                       "JSBId": "533d5fdc-522c-4730-8304-a47063cc41bd", 
                       "originalGrider": "d0238eda-cf4f-4a0d-8af1-583f9a134587", 
                       "originalAddr": "111", 
                       "originalAddrName": null,
                        "griderName": "李长林", 
                        "gridPhone": "22122" 
                   }
               ], "total": 3
           }
   }*/
    /*** 查询历史医疗信息*/
    MedicalCareInfo: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                    offset: 0,
                    limit: 10,
                });
                zszhService.MedicalCareInfo(
                    user,
                    query.JSBId,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }

        });
    },
    /**
     * 初次发病时间  目前诊断类型  治疗情况  治疗医院名称  实施住院治疗原因  接受康复训练结构名称
     * 表id{"success":1,"data":{
     * "total":1,"rows":
     * [{"id":"1",
     * "JSBId":"11",
     * "attackDate":"2017-03-10T02:37:53.000Z", 初次发病日期
     * "attackType":"1",目前诊断类型
     * "treatS":"1",目前诊断类型
     * "treatName":"1",治疗医院名称
     * "hosTreatS":"1",实施住院治疗原因
     * "recOrganName":"1","RN":1}]}}接受康复训练结构名称
     * 
     *  "attackDate": "t2.ATTACK_DATE",//初次发病日期
        "attackType": "t2.ATTACK_TYPE", //目前诊断类型
        "treatS": "t2.TREAT_S",//治疗情况
        "treatName": "t2.TREAT_NAME",//治疗医院名称
        "hosTreatS": "t2.HOS_TREAT_S",//实施住院治疗原因
        "recOrganName": "t2.REC_ORGAN_NAME",//接受康复训练结构名称
     */
    // getProcStatusByfunmdataID: function (req, res) {
    //     userService.getCurUser(req, function (err, user) {
    //         if (err) {
    //             webRes.exportJson(res, err);
    //         }
    //         else {
    //             var query = webReq.getQueryParam(req, {
    //                 funmdataID: ""
    //             });
    //             zszhService.getProcStatusByfunmdataID(
    //                 query.funmdataID,
    //                 webRes.exportJson.bind(null, res));
    //         }
    //     });
    // },
    getProcStatusByfunmdataID: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    funmdataID: ""
                });
                zszhService.getProcStatusByfunmdataID(
                    query.funmdataID,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
    getDeleteOutPeopleList: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    queryName: "",
                    offset: 0,
                    limit: 10
                });
                var acc = new zszhUserAccess(null);
                var filter = { "id": user.userDepartmentId+"" };
                //查询用户信息
                async.series([
                    acc.open.bind(acc, false),
                    acc.getUser.bind(acc, filter),
                ], function (err, userMsg) {
                    acc.close(function () { });
                    if (err) {
                        webRes.exportJson(res, err);
                    }
                    else {
                        if (userMsg[1] == null) {
                            webRes.exportJson(res, "没有查询到指定的部门信息");
                        }
                        else {
                            zszhService.getDeleteOutPeopleList(
                                user, userMsg[1], query.queryName, query.offset, query.limit,
                                webRes.exportJson.bind(null, res));
                        }
                    }
                });
            }
        });
    },
    
   /*{
        "success": 1,
        "data":
        {
            "rows":
            [
                {
                    "originalAddr": "1143543766712320",
                    "finalAddr": null,
                    "outDeleteDate": "2017-02-27 09:31:24",//移除时间
                    "wfState": null,
                    "inHistoryAddr": null,
                    "inHistoryDate": null,
                    "JSBId": "737f9685-9cf6-4ec7-9c5b-ea6d12f43375",
                    "dangerRank": "01",//危险等级
                    "manageLevel": 4, 管理等级
                    "peopleStatusQeo":"住院治疗",//人员现状
                    "isCTrouble": "1", 有无肇事肇祸史
                    "attackType":"02",诊断类型
                    "createDate":"2016-11-16 02:41:30",迁入时间
                    "peopleId":"3bf840a8-a535-405b-bd4d-04879bf66604",
                    "cardNum": "180602199809183452", 身份证
                    "name":"赵丹",姓名
                    "gender":"1",性别
                    "gridName":"大西门社区/紫金桥新村（第三网格）",所属网格
                    "finalAddrDartId":null,迁出网格
                    "finalAddrName":null,"RN": 1
                }
            ],
            "total": 30
        }
    }*/

    queryDonePro: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    limit: 10,
                    offset: 0
                });
                zszhService.queryDone(
                    user,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
     queryDone: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    limit: 10,
                    offset: 0
                });
                zszhService.queryDone(
                    user,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
   /*  {
         "success": 1, "data":
             {
                 "rows": [
                     {
                         "name": "毕秀兰", 姓名  身份证号
                         "cardNum": "330522195412181221", 身份证号
                         "a4sysuserUserName":"村管理员",申请人
                         "pName":"村综治办管理员", 申请人角色
                         "funmodelName":"肇事肇祸危险级别变更",申请项
                         "applicantTime":"2017-03-06 16:38:44",申请时间
                         "RN":1,
                         "funmdataID": "587fff76-4a1d-40f5-8290-1780f9ee73d5"主键
}
                     }*/
    queryUndoPro: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    limit: 10,
                    offset: 0
                });
                zszhService.queryUndoPro(
                    user,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }
        });
    },
  /* {
        "success": 1, "data": {
            "total": 96, "rows": [
                {
                    "sn": "170_25",   s_n码
                    "applicantTime": "2016-12-21 10:49:19",  //申请时间
                    "funmodelName": "肇事肇祸危险级别变更", //  申请项
                    "pName": "县领导",                 //申请人岗位
                    "a4sysuserUserName": "admin",//申请人
                    "name": "万顺英", //姓名
                    "cardNum": "330522194312031026",//身份证号
                    funmdataID:"",//标识id
                    "RN": 10,
                }
            ]
        }
    }*/
    /*
    {"success":1, "data":
    {
        "total":84, "rows":
        [
            {
                "funmdataID": "533d5fdc-522c-4730-8304-a47063cc41bd",
                "userId": "ADMIN", 
                "sn": "176_25",
                "applicantTime": "2016-12-22 14:19:05",//申请时间
                "originalLevel": "0",//变更前
                "finalLevel": "1",//变更后
                "adjustmentReason": "test",//申请变更原因
                "JSBId": "533d5fdc-522c-4730-8304-a47063cc41bd",
                "pId": "1fc56259-384e-447c-ba48-9e3ebc7bf3a7",
                "name": "李长林",   //姓名
                "cardNum": "330522196309011074",//公民身份证号
                "gender": "1",//性别
                "birthDate": "1963-09-01 00:00:00",//出生日期
                "pName": null,//岗位
                "a4sysuserUserName": "admin",//姓名
                "funmodelName": null,//申请项

            }
        ]
    }
}*/
    getDeleteOutPeopleById: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    JSBId: "",
                    offset: 0,
                    limit: 10
                });
                var acc = new zszhUserAccess(null);
                var filter = { "id": user.userDepartmentId };
                //查询用户信息
                async.series([
                    acc.open.bind(acc, false),
                    acc.getUser.bind(acc, filter),
                ], function (err, userMsg) {
                    acc.close(function () { });
                    if (err) {
                        webRes.exportJson(res, err);
                    }
                    else {
                        if (userMsg[1] == null) {
                            webRes.exportJson(res, "没有查询到指定的部门信息");
                        }
                        else {
                            zszhService.getDeleteOutPeopleById(
                                query.JSBId, user, userMsg[1], query.offset, query.limit,
                                webRes.exportJson.bind(null, res));
                        }
                    }
                });
            }
        });
    },
    getSJCK: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    offset: 0,
                    limit: 10,
                });
                zszhService.getSJCKQueryList(
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res));
            }

        });
    },
    /*
        事件处理详情页面
        参数:当事人ID
        示例地址：http://localhost:3005/zszh/getSJCKDetil?dsrId=QWEROO1214321OI31
        返回数据：
        {"success":1,
            "data":{
                    "baNum":"EQEOI1323O3I132O",//报案编号'
                    "tel":"234543211",//联系方式
                    "dsrCardnum":130123485901410990,//证件号码
                    "type":"扰乱治安",//事件类型
                    "dizhi":"公园",//事件地址
                    "gridName":"交警大队",//所属网格
                    "sfTime":"外出时",//事发时间
                    "reportTime":"2017-02-18 14:06:17",//上报时间
                    "baQd":"大众",//报案渠道
                    "reportName":"王某",//上报人
                    "sjms":"发生肢体冲突",//事件描述
                    "beizhu":"没有伤亡"//备注
                   }
        }
        
    */
    getSJCKDetil: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    dsrId: "",
                })
                zszhService.getSJCKDetilList(
                    query.dsrId,
                    webRes.exportJson.bind(null, res)
                )
            }
        })
    },
    /*
        获取事前处理图片接口
        示例接口 http://localhost:3005/zszh/querySQCLIMGByDsrId?dsrId=QWEROO1214321OI34
    */
    querySQCLIMGByDsrId: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    dsrId: ""
                });
                zszhService.queryImageByDsrId(user,
                    query.dsrId,
                    webRes.exportImageBySqclImg.bind(null, res)
                );
            }
        });
    },
    /*
       获取事后处理图片接口
       示例接口 http://localhost:3005/zszh/querySHCLIMGByDsrId?dsrId=QWEROO1214321OI34
   */
    querySHCLIMGByDsrId: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            }
            else {
                var query = webReq.getQueryParam(req, {
                    dsrId: ""
                });
                zszhService.queryImageByDsrId(user,
                    query.dsrId,
                    webRes.exportImageByShclImg.bind(null, res)
                );
            }
        });
    },
    //我的事件接口
    /*
        示例地址 http://localhost:3005/zszh/getMyEvents
        返回数据 {
                "success":1,
                "data":
                    {"total":3,
                     "rows":[
                             {"userId":"ADMIN",
                             "activityName":"开始",
                             "actoinName":"提交",
                             "content":"同意",//审批结果
                             "taskSdate":"2016-12-12 13:14:52",//审批时间
                             "approvehis_funmdataId":"354d9327-1244-43c4-8594-2a43712a081e",
                             "busiProc_funmdataId":"354d9327-1244-43c4-8594-2a43712a081e",
                             "busiProc_busiId":"43989E18C45014A9E05011AC0300027D",
                             "busiConfig_busiId":"43989E18C45014A9E05011AC0300027D",
                             "funmodelName":"肇事肇祸精神病回访",//申请项
                             "jsbId":"354d9327-1244-43c4-8594-2a43712a081e",
                             "jsb_pId":"5d846cc1-a977-47d6-b317-d1feee1e2e14",
                             "pId":"5d846cc1-a977-47d6-b317-d1feee1e2e14",
                             "name":"赵梦娇",//姓名
                             "cardNum":"110602199807183532",//身份证号
                             "RN":1
                            },
                            {"userId":"ADMIN","activityName":"开始","actoinName":"提交","content":"同意","taskSdate":"2016-12-21 10:53:03","approvehis_funmdataId":"50d952a8-81ec-4b21-8f0f-7c736fdf7041","busiProc_funmdataId":"50d952a8-81ec-4b21-8f0f-7c736fdf7041","busiProc_busiId":"43989E18C45014A9E05011AC0300027D","busiConfig_busiId":"43989E18C45014A9E05011AC0300027D","funmodelName":"肇事肇祸精神病回访","jsbId":"50d952a8-81ec-4b21-8f0f-7c736fdf7041","jsb_pId":"f96a5afb-2cbc-4d42-9f6c-36df454a219f","pId":"f96a5afb-2cbc-4d42-9f6c-36df454a219f","name":"孙莉","cardNum":"130602199809181321","RN":2},
                            {"userId":"ADMIN","activityName":"开始","actoinName":"提交","content":"拒绝","taskSdate":"2016-12-22 14:19:05","approvehis_funmdataId":"7c10f9b8-9d1f-4bf7-a53d-192baa2a340a","busiProc_funmdataId":"7c10f9b8-9d1f-4bf7-a53d-192baa2a340a","busiProc_busiId":"43989E18C45014A9E05011AC0300027D","busiConfig_busiId":"43989E18C45014A9E05011AC0300027D","funmodelName":"肇事肇祸精神病回访","jsbId":"7c10f9b8-9d1f-4bf7-a53d-192baa2a340a","jsb_pId":"2d39bbce-f60c-4801-a834-779c54bab7c3","pId":"2d39bbce-f60c-4801-a834-779c54bab7c3","name":"周武","cardNum":"600602199809181453","RN":3}
                            ]
                        }
                    }
    */
    getMyEvents: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            } else {
                var userId = user.userId
                var query = webReq.getQueryParam(req, {
                    offset: 0,
                    limit: 10,
                })
                zszhService.getMyEvents(
                    userId,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res)
                )
            }
        })
    },
    //根据身份证号查询事件列表接口
    queryCaseById:function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            } else {
                var query = webReq.getQueryParam(req, {
                    offset: 0,
                    limit: 10,
                    cardNum:""
                })
                zszhService.getCaseById(
                    query.cardNum,
                    query.offset,
                    query.limit,
                    webRes.exportJson.bind(null, res)
                )
            }
        })
    },
     /*{
        "success": 1,
        "data":
        {
            "total": 1, "row":
                [
                    {
                        "caseHappenDate": "2017-02-14 14:13:05",//事发时间
                        "caseType": "应急维稳事件类/事故灾难/安全事故",//时间地址
                        "caseAddress": "浙江省湖州市长兴县林荫路",//时间地址
                        "caseGrid": "雉城街道/北门社区/城北小区57-69幢（第三网格）",//所属网格
                        "caseNo": "YPT201702140009"//案件编号
                    }
                ]
        }
    }*/
    /**
     * 查询村子疑似精神病
     */
    querySuspectedJSBByGridName:function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            } else {
                var query = webReq.getQueryParam(req, {
                    offset: 0,
                    limit: 10
                });
                zszhService.zszhGetUser(user, function (err, data) {
                    if (err) {
                        webRes.exportJson(res, err);
                    }
                    else {
                        zszhService.querySuspectedJSByGridName(
                            data,
                            query.offset,
                            query.limit,
                            webRes.exportJson.bind(null, res)
                        )
                    }
                });
            }
        })
    },
       /*{
        "success": 1,
        "data":
        {
            "total": 1, "row":
                [
                    {
                        "idCard": "330522198510211085",//公民身份号码
                        "caseGrid": "雉城街道/北门社区/城北小区57-69幢（第三网格）",//事件网格
                        "name": "莫茂莉",//姓名
                        "caseReportDate": "2017-02-14 14:13:24",//上报时间（提交时间）
                        "caseNo": "YPT201702140009"//案件编号
                        "reportUserPost":"网格员"//提交人岗位
                    }
                ]
        }
    }*/

    /**
     * 查询回访周期
     */
      getVisitCyc: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            } else {
                var query = webReq.getQueryParam(req, {
                    JSBId:""
                })
                zszhService.getVisitCyc(
                    user,
                    query.JSBId,
                    webRes.exportJson.bind(null, res)
                )
            }
        })
    },
    //查询代办中等级变更的详细信息
    getUndoLevelProMsg: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            } else {
                var query = webReq.getQueryParam(req, {
                    levelId:""
                })
                zszhService.getUndoLevelProMsg(
                    user,
                    query.levelId,
                    webRes.exportJson.bind(null, res)
                )
            }
        })
    },
    /*{
        "success": 1, "data":
            {
                "name": "李淦祥",姓名
                "cardNum": "330522194111111038",身份证号码
                "rAddr": "塘东自然村63-2号",现住地详址
                "JSBId": "dacb353f-2dd5-40eb-a080-a5f2802be9d7",精神病id
                "dangerRank": "01",危险等级
                "manageLevel": 1,管理等级
                "originalLevel": "1",原始等级
                "finalLevel": "1",申请等级
                "adjustReason": "test",申请原因
                "adjustmentType": "01",等级修改类型
                "visitCyc": 10,回访周期
                "gridName": "北门社区/坛家桥片（第一网格）"所属网格
            }
    }*/
    //查询代办中等级变更的详细信息
    getUndoAddPeoProMsg: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            } else {
                var query = webReq.getQueryParam(req, {
                    JSBId:""
                })
                zszhService.getUndoAddPeoProMsg(
                    user,
                    query.JSBId,
                    webRes.exportJson.bind(null, res)
                )
            }
        })
    },
   /*{
        "success": 1, "data":
            {
                "name": "樊应贵",姓名
                "cardNum": "330522195407301054",身份证号码
                "rAddr": "高家墩自然村39-1号",现住地详址
                "JSBId": "2b283338-66ff-4ad7-a288-9d3590c46eed",精神病id
                "dangerRank": "03",危险等级  （域）
                "manageLevel": 2,管理等级  （域）
                "addReason": "01",新增原因  （域）
                "attackType": "02",目前诊断类型 （域）
                "peopleStatusQeo": "在家养病",人员现状
                "isCTrouble": "0",有无肇事肇祸历史
                "isEfficiency": "0",是否纳入低保
                "guarderName": "沈卫英",监护人姓名
                "guarderTel": "15521231221",监护人联系方式
                "relationship": null,监护人与当事人关系
                "guarderCardNum": "130602199009126363",监护人身份证号码
                "guarderAddr": "塘东自然村57号",监护人现住详细地址
                "visitCyc": 10,回访周期
                "gridName": "北门社区/坛家桥片（第一网格）"网格名称
            }
    }*/
     //查询代办中等级变更的详细信息
    getGriderMsg: function (req, res) {
        userService.getCurUser(req, function (err, user) {
            if (err) {
                webRes.exportJson(res, err);
            } else {
                var query = webReq.getQueryParam(req, {
                    gridId:""
                })
                zszhService.getGriderMsg(
                    user,
                    query.gridId,
                    webRes.exportJson.bind(null, res)
                )
            }
        })
    },
    /*{
        "success": 1, "data": [
            {
                "userId": "WANGGETEST",网格员id
                "userName": "网格员",   网格员姓名
                "tel": null,   网格员联系方式
                "departmentId": "1143509474082816"//网格id,
                "caseHappenDate":"2017-03-03 16:15:05"
            }
        ]
    }*/
};
module.exports = actions;