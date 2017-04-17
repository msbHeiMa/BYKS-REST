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
    //登陆接口
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

    
};
module.exports = actions;