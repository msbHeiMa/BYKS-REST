var webRes = require(ROOT_DIR + "/common/tools").webRes;
var webReq = require(ROOT_DIR + "/common/tools").webReq;
var byksService = require(ROOT_DIR + "/common/service/byks/byksService");
var actions = {
    getAllCourse:function(req,res){  
        byksService.getAllCourse(
            webRes.exportJson.bind(null, res)
        );
    },
    getTuBiao: function (req, res) {
        var query = webReq.getQueryParam(req, {
            type:"",
        });
        byksService.getTuBiaoList(
            query.type,
            webRes.exportJson.bind(null, res));
    },
    
};
module.exports = actions;