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
    //上传图片接口
    // postImages: function (req, res) {
    //     $file_path = '../../../uploads/';
	//     $file_up = $file_path.basename($_FILES['upload']['name']);
    // },
    //首页精彩内容展示接口
    getJCZS:function(req,res){
        byksService.getJCZSList(webRes.exportJson.bind(null, res));
    },
    //首页热点推送接口
    getReDian:function(req,res){
        byksService.getReDianList(webRes.exportJson.bind(null, res));
    },
    //登陆注册界面 注册接口
    zhuce:{
        post:function(req,res){
             var data = webReq.getParam(req, {
                userName: "",
                passWord: "",
                userImage: "",
            });
            byksService.zhuce(data.userName,data.passWord,data.userImage,webRes.exportJson.bind(null, res));
      
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
            });
            byksService.upload(data,webRes.exportJson.bind(null, res));
        }
    }
    
};
module.exports = actions;