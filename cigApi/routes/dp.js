var webRes = require(ROOT_DIR + "/common/tools").webRes;
var webReq = require(ROOT_DIR + "/common/tools").webReq;
var dpService = require(ROOT_DIR + "/common/service/dp/dpService");
var actions = {
     /*
     新增接口9：
        表【GDP统计】 DP_GDPTJ
        参数：tjDate:"",
        返回字段【JSON类型】各镇GDP 亿元）
        示例地址 http://222.46.11.118:12080/cigApi/dp/getGDPByAllTown?tjDate=2016-03
        返回数据：
        {"success":1,
            "data":{
                    "长兴县":100.6936,//地区：GDP（亿元）
                    "雉城街道":20.13,
                    "夹浦镇 ":1.4916,
                    "古城街道  ":1.9725000000000001,
                    "煤山镇":1.8241,
                    "太湖街道":2.27
                   }
        }
     */
    getGDPByAllTown:function(req,res){
        var query = webReq.getQueryParam(req, {
            tjDate: "",
        });
        dpService.getGDPByAllTown(
            query.tjDate,
            webRes.exportJson.bind(null, res)
        );
    },
    
};
module.exports = actions;