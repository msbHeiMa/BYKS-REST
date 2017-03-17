var webRes = require(ROOT_DIR+"/common/tools").webRes;
var webReq = require(ROOT_DIR+"/common/tools").webReq;

var menuService = require(ROOT_DIR+"/common/service/system/menuService");
var userService = require(ROOT_DIR+"/common/service/system/userService");
var domainService = require(ROOT_DIR+"/common/service/system/domainService");
var departService = require(ROOT_DIR+"/common/service/system/departService");

var actions = {
    /**
     * @description 获取用户菜单
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    getUserMenu:function(req,res){
        menuService.getUserMenu(req,function(err,data){
            if(err){
                webRes.exportJson(res,err);
            }
            else{
                webRes.exportJson(res,err,data);
            }
        });
    },
    /**
     * @description 获取当前用户
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    getCurUser:function(req,res){
        userService.getCurUser(req,webRes.exportJson.bind(null,res));
    },
    /**
     * @description 获取当前用户下的组织，通过pid获取下级组织，无pid，获取当前组织
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    queryUserDataDep:function(req,res){
        userService.getCurUser(req,function(err,user){
            if(err){
                webRes.exportJson(res,err);
            }
            else{
                var depId = user.userDepartmentId;
                departService.getUserDataDepartByParent(depId,req.query.pid,webRes.exportJson.bind(null,res));
            }
        })
    },
    queryAllDep:function(req,res){
        departService.getUserDataDepartByParent(null,req.query.pid,webRes.exportJson.bind(null,res));
    },
    /**
     * @description 获取域
     * @param {NSExpress.Request} req
     * @param {NSExpress.Response} res 
     */
    queryDomains:function(req,res){
        var domainNames = req.query.domainNames ? req.query.domainNames.split(",") : [];
        if(domainNames.length == 0){
            webRes.exportJson(res,null,{});
        }
        else{
            domainService.getDomainsByNames(domainNames,webRes.exportJson.bind(null,res));
        }
        /*
        webRes.exportJson(res,null,{
            "gender":[
                {"text":"男","value":"01"}
            ]
        })
        */
    }
};
module.exports = actions;