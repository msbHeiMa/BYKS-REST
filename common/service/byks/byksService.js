var async = require(ROOT_DIR + "/common/tools").async;
var getAllCourseAccess = require(ROOT_DIR + "/common/dal/byks/getAllCourseAccess");
var getTuBiaoAccess = require(ROOT_DIR + "/common/dal/byks/getTuBiaoAccess");
var that = {
    getAllCourse:function(callback){
        var acc = new getAllCourseAccess(null);
        var filter={};
        async.series([
            acc.open.bind(acc,false),
            acc.getObjects.bind(acc,filter,["CREATE_DATE"])
        ],function(err,data){
            acc.close(function(){})
            callback(err,data&&data[1])
        })
    },
    getTuBiaoList:function(type,callback){
        var acc= new getTuBiaoAccess(null);
        var filter={type:type};
        async.series([
            acc.open.bind(acc,false),
            acc.getObjects.bind(acc,filter,["value"])
        ],function(err,data){
            acc.close(function(){});
            for(var i=0;i<data[1].length;i++){
                delete data[1][i].type;
            }
            callback(err,data&&data[1])
        })
    },

}
module.exports = that;