var async = require(ROOT_DIR + "/common/tools").async;
var dpGetGDPTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetGDPTJAccess");
var that = {
    //新增接口9
    getGDPByAllTown:function(tjDate,callback){
        var gdp = new dpGetGDPTJAccess(null);
        var filter={tjDate:tjDate};
        async.series([
            gdp.open.bind(gdp,false),
            gdp.getObjects.bind(gdp,filter,["TJ_DATE"])
        ],function(err,data){
            gdp.close(function(){})
            var  obj={};
            for(var i=0;i<data[1].length;i++){
                var diqu=data[1][i].area;
                //obj.diqu=data[1][i].gdp
                // obj={ }
                obj[diqu]=data[1][i].gdp
              
            }
            data[1]=obj;
            callback(err,data&&data[1])
        })
    },

}
module.exports = that;