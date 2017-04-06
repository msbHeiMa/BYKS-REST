var async = require(ROOT_DIR + "/common/tools").async;
var getAllCourseAccess = require(ROOT_DIR + "/common/dal/byks/getAllCourseAccess");
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

}
module.exports = that;