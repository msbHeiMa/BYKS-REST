var webRes = require(ROOT_DIR + "/common/tools").webRes;
var webReq = require(ROOT_DIR + "/common/tools").webReq;
var byksService = require(ROOT_DIR + "/common/service/byks/byksService");
var actions = {
    //报名课程模块下面课程获取接口
    getAllCourse:function(req,res){  
        byksService.getAllCourse(
            webRes.exportJson.bind(null, res)
        );
    },
    //首页模块机器人发展历程数据接口
    getTuBiao: function (req, res) {
        var query = webReq.getQueryParam(req, {
            type:"",
        });
        byksService.getTuBiaoList(
            query.type,
            webRes.exportJson.bind(null, res));
    },
    //登陆注册界面 登陆接口
    login: {
        post: function (req, res) {
            var data = webReq.getParam(req, {
                userName: "",
                passWord: "",
            });
            byksService.login(data.userName,data.passWord,webRes.exportJson.bind(null, res));
        }
    },
    //上传头像
    changUserImage:{
        post: function (req, res) {
            var data = webReq.getParam(req, {
                userId: "",
                userImage: "",
            });
            byksService.changUserImage(data,webRes.exportJson.bind(null, res));
        }
    },
    //上传图片接口
    // postImages: function (req, res) {
    //     $file_path = '../../../uploads/';
	//     $file_up = $file_path.basename($_FILES['upload']['name']);
    // },
    //首页精彩内容展示接口
    getJCZS:function(req,res){
        byksService.getJCZSList(webRes.exportJson.bind(null, res));
    },
    //首页精彩内容详情信息
    getJCZSDetail:function(req,res){
        var query=webReq.getQueryParam(req,{
            id:"",
        })
        byksService.getJCZSDetail(query.id,webRes.exportJson.bind(null, res));
    },
    //首页热点推送接口
    getReDian:function(req,res){
        byksService.getReDianList(webRes.exportJson.bind(null, res));
    },
    //首页热点详情信息接口
    getReDianDetail:function(req,res){
        var query=webReq.getQueryParam(req,{
            id:"",
        })
        byksService.getReDianDetail(query.id,webRes.exportJson.bind(null, res));
    },
    //登陆注册界面 注册接口
    zhuce:{
        post:function(req,res){
             var data = webReq.getParam(req, {
                userName: "",
                passWord: "",
                userImage: "",
                userType:"",
            });
            byksService.zhuce(data.userName,data.passWord,data.userImage,data.userType,webRes.exportJson.bind(null, res));
      
        }
    },
    //作品展示页面 获取作品信息接口
    getAllZP:function(req,res){
        byksService.getAllZPList(webRes.exportJson.bind(null, res));
    },
    //作品展示页面 通过类型筛选作品接口
    getAllZPByType:function(req,res){
         var query=webReq.getQueryParam(req,{
            type:"",
        })
        byksService.getAllZPByType(query.type,webRes.exportJson.bind(null, res));
    },
    //作品详情页面 通过作品ID查到相应作品信息接口
    getZPById:function(req,res){
        var data=webReq.getQueryParam(req,{
            id:"",
        });
        byksService.getZPById(data.id,webRes.exportJson.bind(null, res));
    },
    //作品详情页面 通过作品ID查到对该作品的所有评论
    getPingLun:function(req,res){
        var query=webReq.getQueryParam(req,{
            id:"",
        })
        byksService.getPingLunById(query.id,webRes.exportJson.bind(null, res));
    },
    //作品详情页面 发表评论
    savePingLun:{
        post:function(req,res){
            var data=webReq.getParam(req,{
                 plrName:"",
                 plContant:"",
                 zpId:"",
            });
            byksService.savePingLun(data,webRes.exportJson.bind(null, res));
        }    
    },
    //作品展示页面 点赞功能
    getDianZan:{
        post:function(req,res){
            var data=webReq.getParam(req,{
                zpId:"",
                userId:"",
                // likeTime:"",
            });
            byksService.getDianZan(data,webRes.exportJson.bind(null, res));
        }
    },
    //上传作品页面
    upload:{
        post:function(req,res){
            var data=webReq.getParam(req,{
                id:"",
                utterer:"",
                worksName:"",
                worksType:"",
                likeTime:"",
                worksIntro:"",
                worksImages:"",
                status:"",
            });
            byksService.upload(data,webRes.exportJson.bind(null, res));
        }
    },
    //上传页面 将作品Id保存到我的管理数据库 报名课程页面 报名功能
    uploadByUser:function(req,res){
        var data=webReq.getParam(req,{
            id:"",
            userId:"",
            manageType:"",
            zpId:"",
            kcId:"",
        });
        byksService.uploadByUser(data,webRes.exportJson.bind(null, res));
    },
    //我的管理页面 上传作品报名关注课程接口
    getManagement:{
        post:function(req,res){
            var data=webReq.getParam(req,{
                userId:"",
                manageType:"",
            });
            byksService.getManagement(data,webRes.exportJson.bind(null, res));
        },
    },
    //我的管理页面 删除上传作品
    deleteZp:function(req,res){
        var query=webReq.getQueryParam(req,{
            zpId:"",
        })
        byksService.deleteZp(query.zpId,webRes.exportJson.bind(null, res));
    },
    //我的管理页面 报名的课程部分 取消报名功能
    quXiaoBaoMingKc:function(req,res){
        var query=webReq.getQueryParam(req,{
            id:"",
        })
        byksService.quXiaoBaoMingKc(query.id,webRes.exportJson.bind(null, res));
    },
    //我的管理页面 我的关注部分 报名课程
    baoMingKc:{
        post:function(req,res){
            var data=webReq.getParam(req,{
                id:"",
                kcId:"",
                manageType:"",
                userId:"',"
            });
            byksService.baoMingKc(data,webRes.exportJson.bind(null, res));
        }
    },
    //我的管理页面 我的关注部分 取消关注
    quXiaoGuanZhuKc:function(req,res){
        var query=webReq.getQueryParam(req,{
            id:"",
        })
        byksService.quXiaoGuanZhuKc(query.id,webRes.exportJson.bind(null, res));
    },
    //我的管理页面 报名课程部分 课程安排
    getKcDetailByKcId:function(req,res){
        var query=webReq.getQueryParam(req,{
            kcId:"",
        })
        byksService.getKcDetailByKcId(query.kcId,webRes.exportJson.bind(null, res));
    },
    //后台管理员操作 作品审核页面
    shenHeByStatus:{
        post:function(req,res){
            var data=webReq.getParam(req,{
                status:"",
            });
            byksService.shenHeByStatus(data,webRes.exportJson.bind(null, res));
        }
    },
    //后台管理员操作 作品审核页面 待办标签页通过功能
    shenHeTongGuo:{
        post:function(req,res){
            var data=webReq.getParam(req,{
               id:"",
               status:"",
               shr:"",
               shDate:"",
            });
            byksService.shenHeTongGuo(data,webRes.exportJson.bind(null, res));
        }
    },
    //后台管理员操作 作品审核页面 待办标签页未通过功能
    shenHeWeiTongGuo:{
        post:function(req,res){
            var data=webReq.getParam(req,{
                id:"",
                status:"",
                shr:"",
                shDate:"",
                wtgyy:"",
            });
            byksService.shenHeWeiTongGuo(data,webRes.exportJson.bind(null, res));
        }
    },
     //后台管理员操作 作品审核页面 通过标签页删除功能
    shenHeShanChu:{
        post:function(req,res){
            var data=webReq.getParam(req,{
                id:"",
                status:"",
            });
            byksService.shenHeShanChu(data,webRes.exportJson.bind(null, res));
        }
    },
     //后台管理员操作 发布课程页面 课程发布接口
    faBuShiPin:{
        post:function(req,res){
            var data=webReq.getParam(req,{
                id:"",
                courseName:"",
                crowd:"",
                keShi:"",
                kcImages:"",
            });
            byksService.faBuShiPin(data,webRes.exportJson.bind(null, res));
        }
    },
    //后台管理员操作 发布课程页面 删除课程接口
    faBuKeChengShanChu:function(req,res){
        var query=webReq.getQueryParam(req,{
            id:"",
        })
        byksService.faBuKeChengShanChu(query.id,webRes.exportJson.bind(null, res));
    },
    //后台管理员操作 课程报名情况页面 
    keChengBaoMingQingKuang:function(req,res){
        byksService.keChengBaoMingQingKuang(webRes.exportJson.bind(null, res));
    },
};
module.exports = actions;