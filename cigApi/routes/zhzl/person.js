var webRes = require(ROOT_DIR+"/common/tools").webRes;
var webReq = require(ROOT_DIR+"/common/tools").webReq;
var log = require(ROOT_DIR+"/common/tools").log;
var async = require(ROOT_DIR + "/common/tools").async;

var familyService = require(ROOT_DIR+"/common/service/zhzl/realPerson/familyService");

var actions = {
    /**
     * 输入参数dwdm,type,keyword,offset,limit,deptId
     * @description 查询户籍人口列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    familyPersons:function(req,res){
        var query = webReq.getQueryParam(req, {
            offset: 0,
            limit: 10,
            dwdm: null,
            type: "0",
            keyword: "",
            deptId:""
        });
        if(query.deptId==""){
            familyService.familyPersons(query.deptId,query,webRes.exportJson.bind(null,res));
        }else{
            webRes.exportJson(res,"deptId不能为空");
        }
        /*var rows = [{
                "id": "11111111", 
                "name": "张三", 
                "cardNum": "231312313123123", 
                "gender": "1",
                "phone": "12638928832",
                "isFlow": "0",
                "residence": "XX街222号301",
                "gridName": "XX街XX社区二网格",
                "updateDate": "",
                "createDate": ""
            },
            {
                "id": "222222", 
                "name": "李四", 
                "cardNum": "4423335321222", 
                "gender": "2",
                "phone": "",
                "isFlow": "0",
                "residence": "",
                "gridName": "",
                "updateDate": "",
                "createDate": ""
            }
        ];
        webRes.exportJson(res,null,{
                rows:rows,
                total:2
            });*/
    },
    /**
     * 输入参数id=12312113123
     * @description 人口获取标签页信息
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    personTabs:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.personTabs(query.id,webRes.exportJson.bind(null,res));
        }else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var detail = {
            "isHj": true,
            "isQsgx": true, 
            "isFlow": false, 
            "isCqfw": false, 
            "isCzfw": false,
            "isJzfw": true,
            "isCl": false
            };
        webRes.exportJson(res,null,detail);*/
    },
    /**
     * 输入参数id=12312113123
     * @description 获取人口基本信息
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    personBaseInfo:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.getPersonInfo(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var detail = {
            "id":"12312113123",
            "name":"张三",
            "cardNum":"2993832992929292338",
            "usedName":"",
            "gender":"男",
            "birthDate":"19282932",
            "nation":"1",
            "nativePlace":"3",
            "maritalStatus":"1",
            "politicalStatus":"2",
            "education":"3",
            "height":"170",
            "bloodType":"A",
            "relBelief":"2",
            "occCategory":"3",
            "occupation":"工人",
            "specialty":"无",
            "sPlace":"",
            "domicile":"浙江湖州",
            "dAddr":"长兴XX镇XX村XX号",
            "residence":"长兴",
            "rAddr":"长兴县XX街XX号",
            "death":"0",
            "gridName":"XX街XX社区二网格",
            "phone":"12739299002",
            "tel":"",
            "email":"",
            "isKeyPoint": "",
            "accreType": "",
            "idNum": "",
            "recordDate": "",
            "expDate": "",
            "placeType": "",
            "isOutCountry":"",
            "outGone":"",
            "outReasons":"",
            "reasonsDate":"",
            "outProvince":"",
            "outDetailAddress":"",
        };
        webRes.exportJson(res,null,detail);*/
    },
    /**
     * 输入参数id=12312113123
     * @description 户籍人口获取户籍信息
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    cyGetFamily:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.cyGetFamily(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var detail = {
            "hNum":"12",
            "name":"张三",
            "cardNum":"2993832992929292338",
            "hasPerson":"1",
            "isFive":"0",
            "isLow":"0",
            "isPool":"0",
            "residenceType":"农村户口",
            "rhyzbs":"0",
            "alines":"平安家庭",
            "members":[
                {
                    "id":"12312113123",
                    "name":"张三",
                    "gender":"男",
                    "birthDate":"19829322",
                    "relation":"户主"
                },
                {
                    "id":"33333333",
                    "name":"张四",
                    "gender":"男",
                    "birthDate":"19999322",
                    "relation":"子"
                }
            ]
        };
        webRes.exportJson(res,null,detail);*/
    },
    /**
     * 输入参数id=12312113123
     * @description 查询户主亲属关系列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    familyRelation:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.familyRelation(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var rows = [
            {
                "relation":"父",
                "name":"张二",
                "cardNum":"288392828282",
                "qsPId":"333333"
            },
            {
                "relation":"母",
                "name":"王五",
                "cardNum":"331212222222",
                "qsPId":"4444444"
            },
            {
                "relation":"子",
                "name":"张四",
                "cardNum":"452222312",
                "qsPId":"5323223"
            }
        ];
        webRes.exportJson(res,null,rows);*/
    },
    /**
     * 输入参数id=12312113123
     * @description 查询流动轨迹列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    flowTrack:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.flowTrack(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var rows = [
            {
                "flowDate":"20150122",
                "flowReason":"搬迁",
                "outflowAddress":"长兴县XX镇XX村220号",
                "inflowAddress":"长兴县XX社区XX街11号"
            }
        ];
        webRes.exportJson(res,null,rows);*/
    },
    /**
     * 输入参数id=12312113123
     * @description 查询产权房屋列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    cqHouse:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.cqHouse(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var rows = [
            {
                "id": "",
                "pId":"22222222222",
                "pName": "",
                "houseNumber":"31222212222",
                "address": "",
                "signType": "",
                "houseUse": "",
                "houseArea": "",
                "createDate":""
            }
        ];
        webRes.exportJson(res,null,rows);*/
    },
    /**
     * 输入参数id=12312113123
     * @description 查询承租房屋列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    czHouse:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.czHouse(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var rows = [
            {
                "id": "",
                "pId":"22222222222",
                "pName": "",
                "houseNumber":"31222212222",
                "address": "",
                "signType": "",
                "houseUse": "",
                "houseArea": "",
                "createDate":""
            }
        ];
        webRes.exportJson(res,null,rows);*/
    },
    /**
     * 输入参数id=12312113123
     * @description 查询居住房屋
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    jzHouse:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.jzHouse(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var detail = {
                "houseNumber":"31222212222",
                "address":"长兴县XX社区XX街11号",
                "houseUse":"居住",
                "houseStructure":"钢筋混凝土",
                "houseArea":"120",
                "houseType":"2",
                "isFireChannels":"1",
                "isSafetyChannel":"1",
                "pName":"李大",
                "pId":"55565456765432",
                "isSignGuarantee":"1",
                "limitPersons":"6",
                "realityPersons":"4",
                "houseFileNum":"1221",
                "managerTypes":"2",
                "rentalHouseProperty":"2",
                "rentalType":"",
                "roomNumber":"3",
                "rentalUse":"居住",
                "czName":"张三",
                "czId":"12312113123"
            }
        webRes.exportJson(res,null,detail);*/
    },
    /**
     * 输入参数id=12312113123
     * @description 查询车辆
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    car:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.car(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var rows = [
            {
                "id":"",
                "pId":"",
                "pName":"",
                "pCardNum":"",
                "carType":"小车",
                "carColor":"",
                "carNumber":"浙A212123",
                "brand":"牌",
                "nature":"日常出行",
            }
        ];
        webRes.exportJson(res,null,rows);*/
    },
    /**
     * 输入参数cardNum=338293002002002
     * @description 查询身份证号码查找特定户籍人口
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    queryFamilyPersons:function(req,res){
        var query = req.query;
        if(query.cardNum){
            familyService.queryPersons("familyPerson",query.cardNum,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"cardNum不能为空");
        }
        /*var rows = [
            {
                "id":"12312113123",
                "name":"张三",
                "cardNum":"338293002002002",
                "gridId":"",
                "gridName":"",
                "rAddr":"",
                "phone":""
            }
        ];
        webRes.exportJson(res,null,rows);*/
    },
    /**
     * 输入参数dwdm=2222&hNum=0&cardNum=&offset=0&limit=5
     * @description 查询户籍列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    familys:function(req,res){
        var query = webReq.getQueryParam(req, {
            offset: 0,
            limit: 10,
            deptId:""
        });
        var body = webReq.getParam(req, {
            keyword: "",
            dwdm: ""
        });
        query.keyword = body.keyword;
        query.dwdm = body.dwdm;
        if(query.deptId==""){
            familyService.familys(query.deptId,query,webRes.exportJson.bind(null,res));
        }else{
            webRes.exportJson(res,"deptId不能为空");
        }
        /*var rows = [
            {
                "id": "222222",
                "hNum": "3312122",
                "residenceType": "农村户口",
                "name": "张三",
                "phone": "12803839222",
                "alines": "平安家庭",
                "hasPerson": "否"
            },
            {
                "ID": "33333",
                "hNum": "12121212121",
                "residenceType": "农村户口",
                "name": "李四",
                "phone": "12930082829",
                "alines": "平安家庭",
                "hasPerson": "否"
            }
        ];
        webRes.exportJson(res, null, {
            rows: rows,
            total: 2
        });*/
    },
    /**
     * 输入参数id=21212121121
     * @description 户籍ID获取户籍信息
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    family:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.family(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var detail = {
            "id":"21212121121",
            "hNum":"12",
            "name":"张三",
            "cardNum":"2993832992929292338",
            "hasPerson":"1",
            "isFive":"0",
            "isLow":"0",
            "isPool":"0",
            "residenceType":"农村户口",
            "rhyzbs":"0",
            "alines":"平安家庭",
        };
        webRes.exportJson(res,null,detail);*/
    },
    /**
     * 输入参数dwdm=2222&name=0&cardNum=&offset=0&limit=5
     * @description 查询户主亲属关系列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    familyRelations: function (req, res) {
        var query = webReq.getQueryParam(req, {
            offset: 0,
            limit: 10,
            keyword: "",
            dwdm: "",
            deptId:""
        });
        if(query.deptId==""){
            familyService.familyRelations(query.deptId,query,webRes.exportJson.bind(null,res));     
        }else{
            webRes.exportJson(res,"deptId不能为空");
        }
        /*var rows = [
            {
                "id": "12312113123",
                "name": "张三",
                "cardNum": "234423111122",
                "phone": "13929302222",
                "relationCount": "2"
            }
        ];
        webRes.exportJson(res, null, {
            rows: rows,
            total: 1
        });*/
    },
    /**
     * 输入参数dwdm=2222&name=&cardNum=&offset=0&limit=5
     * @description 查询县外流入人口列表
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    flowPersons:function(req,res){
        var query = webReq.getQueryParam(req, {
            offset: 0,
            limit: 10,
            keyword: "",
            dwdm: "",
            deptId:""
        });
        if(query.deptId==""){
            familyService.flowPersons(query.deptId,query,webRes.exportJson.bind(null,res));
        }else{
            webRes.exportJson(res,"deptId不能为空");
        }
        
        /*var rows = [{
                "id": "11111111", 
                "name": "张三", 
                "cardNum": "231312313123123", 
                "gender": "1",
                "phone": "12638928832",
                "residence": "XX街222号301",
                "gridName": "XX街XX社区二网格",
                "updateDate": "",
                "createDate": ""
            },
            {
                "id": "222222", 
                "name": "李四", 
                "cardNum": "4423335321222", 
                "gender": "2",
                "phone": "",
                "residence": "",
                "gridName": "",
                "updateDate": "",
                "createDate": ""
            }
        ];
        webRes.exportJson(res,null,{
                rows:rows,
                total:2
            });*/
    },
    /**
     * 输入参数cardNum=338293002002002
     * @description 查询身份证号码查找特定县外流入人口
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    queryFlowPersons:function(req,res){
        var query = req.query;
        if(query.cardNum){
            familyService.queryPersons("flowPerson",query.cardNum,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var rows = [
            {
                "id":"12312113123",
                "name":"张三",
                "cardNum":"338293002002002",
                "gridId":"",
                "gridName":"",
                "rAddr":"",
                "phone":""
            }
        ];
        webRes.exportJson(res,null,rows);*/
    },
    /**
     * 输入参数cardNum=338293002002002
     * @description 查询身份证号码查找特定人口
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    queryPersons:function(req,res){
        var query = req.query;
        if(query.cardNum){
            familyService.queryPersons("all",query.cardNum,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var rows = [
            {
                "id":"12312113123",
                "name":"张三",
                "cardNum":"338293002002002"
            }
        ];
        webRes.exportJson(res,null,{
            rows:rows,
            total:1
        });*/
    },
    /**
     * 输入参数id=21212121121
     * @description 户籍ID获取户籍编辑页面展示信息
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res
     */
    getFamilyDetail:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.getFamilyDetail(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var detail = {
            "id":"21212121121",
            "pId":"",
            "name":"张三",
            "cardNum":"2993832992929292338",
            "phone":"",
            "hNum":"12",
            "hasPerson":"1",
            "isFive":"0",
            "isLow":"0",
            "isPool":"0",
            "residenceType":"农村户口",
            "rhyzbs":"0",
            "alines":"平安家庭",
            "familyMember":[{
                "id":"",
                "name":"",
                "cardNum":"",
                "relation":""
            }],
            "familyRelation":[{
                "id":"",
                "qsPId":"",//可为null,为null时，人员名称显示personName字段，身份证号码显示idNumber字段，不为null时，人员名称显示name字段，身份证号码显示cardNum字段
                "name":"",
                "personName":"",
                "cardNum":"",
                "idNumber":"",
                "relation":""
            }]
        };
        webRes.exportJson(res,null,detail);*/
    },
    personInfoStatistic:{
        /**
         * post参数 
            {
                queryType:"实有人口",
                query:{
                    dwdm:"",
                    personType:[],
                    gender:[],
                    age:[],
                    //houseType:[],
                    year:[]
                }
            }
         * @description 实有人口概述模块获取人口信息统计图数据
         */
        post:function(req,res){
            var query = webReq.getQueryParam(req, {
                deptId:""
            });
            var sch = webReq.getParam(req,{
                data:"",
            });
            if(sch.data!=""){
                sch.data = JSON.parse(sch.data.trim());
            }
            switch(sch.data["queryType"]){
                case "实有人口":
                    familyService.personInfoStatistic(sch.data.query,query.deptId,webRes.exportJson.bind(null,res));
                    break;
                default:
                webRes.exportJson(res,"queryType不能为空");
            }
            /*var rows = [
                {
                    "dept": "乡镇1", 
                    "hjrk": 123, 
                    "lrrk": 234
                }, 
                {
                    "dept": "乡镇2", 
                    "hjrk": 321, 
                    "lrrk": 432
                }
            ]
            webRes.exportJson(res,null,rows);*/
        }
    },
    personAgeStatistic:{
        /**
         * post参数 
            {
                queryType:"实有人口",
                query:{
                    dwbm:"",
                    personType:[],
                    gender:[],
                    age:[],
                    //houseType:[],
                    year:[]
                }
            }
         * @description 实有人口概述模块获取人口年龄统计图数据
         */
        post:function(req,res){
            var query = webReq.getQueryParam(req, {
                deptId:""
            });
            var sch = webReq.getParam(req,{
                data:"",
            });
            if(sch.data!=""){
                sch.data = JSON.parse(sch.data.trim());
            }
            switch(sch.data["queryType"]){
                case "实有人口":
                    familyService.personAgeStatistic(sch.data.query,query.deptId,webRes.exportJson.bind(null,res));
                    break;
                default:
                webRes.exportJson(res,"queryType不能为空");
            }
            /*var rows = [
                {
                    "name": "18岁以下", 
                    "value": 180
                }, 
                {
                    "name": "19-29岁", 
                    "value": 2900
                }
            ]
            webRes.exportJson(res,null,rows);*/
        }
    },
    personInfoPage:{
        /**
         * get参数 offset,limit
         * post参数 
            {
                queryType:"实有人口",
                query:{
                    dwbm:"",
                    keyword:"",(包含对姓名和身份证号码的模糊查询)
                    personType:[],
                    gender:[],
                    age:[],
                    //houseType:[],
                    year:[]
                },
            }
         * @description 实有人口概述模块获取人口统计列表
         */
        post:function(req,res){
            var query = webReq.getQueryParam(req,{
                limit:10,
                offset:0,
                deptId:""
            });
            var sch = webReq.getParam(req,{
                data:"",
            });
            if(sch.data!=""){
                sch.data = JSON.parse(sch.data.trim());
            }
            if(sch.data.query!=null){
                sch.data.query["keyword"]=sch.data.keyword;
            }
            switch(sch.data["queryType"]){
                case "实有人口":
                    familyService.personInfoPage(sch.data.query,query.offset,query.limit,query.deptId,webRes.exportJson.bind(null,res));
                    break;
                default:
                webRes.exportJson(res,"queryType不能为空");
            }
            /*var rows = [{
                    "id": "11111111", 
                    "name": "张三", 
                    "cardNum": "231312313123123", 
                    "gender": "1",
                    "phone": "12638928832",
                    "personType": "0",
                    "residence": "XX街222号301",
                    "gridName": "XX街XX社区二网格",
                    "updateDate": "",
                    "createDate": ""
                },
                {
                    "id": "222222", 
                    "name": "李四", 
                    "cardNum": "4423335321222", 
                    "gender": "2",
                    "phone": "",
                    "personType": "0",
                    "residence": "",
                    "gridName": "",
                    "updateDate": "",
                    "createDate": ""
                }
            ];
            webRes.exportJson(res,null,{
                    rows:rows,
                    total:2
                });
            }*/
        }
    },
    /**
     * 输入参数id=12312113123
     * @description 获取精神病人员信息
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    jsbPersonInfo:function(req,res){
        var query = req.query;
        if(query.id){
            familyService.jsbPersonInfo(query.id,webRes.exportJson.bind(null,res));
        }
        else{
            webRes.exportJson(res,"id不能为空");
        }
        /*var detail = {
            //人口基本信息
            "id": "", 
            "cardNum": "", 
            "name": "", 
            "usedName": "", 
            "gender": "", 
            "birthDate": "", 
            "nation": "", 
            "nativePlace": "", 
            "maritalStatus": "", 
            "bloodType": "", 
            "politicalStatus": "", 
            "education": "", 
            "relBelief": "", 
            "occCategory": "", 
            "occupation": "", 
            "sPlace": "", 
            "phone": "", 
            "domicile": "", 
            "dAddr": "", 
            "residence": "", 
            "rAddr": "", 
            "gridName":"网格地址",
            //精神病基础信息
            "JSBId": "精神病主键", 
            "dangerRank": "危险等级", 
            "manageLevel": "管理等级",
            "griderCyc":"网格员回访周期",
            //监护人信息
            "guarderCardNum": "监护人身份证", 
            "guarderName": "项目", 
            "guarderTel": "电话", 
            "guarderAddr": "地址", 
            "relationship": "关系",
            //村委会信息
            "villageCadresId": "", 
            "villageName": "", 
            "villagePhone": "", 
            //医生信息
            "doctorCyc":"医生回访周期",
            "dockorDepartmentName": "", 
            "dockorId": "", 
            "dockorName": "", 
            "dockorPhone": "", 
            //警察信息
            "policeCyc":"警察回访周期",
            "policeDepartmentName": "", 
            "policeId": "", 
            "policeName": "", 
            "policePhone": "", 
            //老版本肇事肇祸信息（应该已废弃）
            "isCTrouble": "", 
            "cTroubleCount": "", 
            "cTroubleDate": "", 
            //医疗信息
            "attackDate": "", 
            "attackType": "", 
            "treatS": "", 
            "treatName": "", 
            "hosTreatS": "", 
            "recOrganName": "", 
            //新版本肇事肇祸信息
            "zszhList": {
                "JSBId": "", 
                "zszhAddr": "", 
                "zszhCom": "", 
                "zszhDate": ""
            }
        }
        webRes.exportJson(res,null,detail);*/
    },
};
module.exports = actions;