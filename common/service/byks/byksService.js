var async = require(ROOT_DIR + "/common/tools").async;
var getAllCourseAccess = require(ROOT_DIR + "/common/dal/byks/getAllCourseAccess");
var getTuBiaoAccess = require(ROOT_DIR + "/common/dal/byks/getTuBiaoAccess");
var loginAccess=require(ROOT_DIR + "/common/dal/byks/loginAccess");
var getJCZSAccess=require(ROOT_DIR + "/common/dal/byks/getJCZSAccess");
var getReDianAccess=require(ROOT_DIR + "/common/dal/byks/getReDianAccess");
var that = {
    //报名课程模块下面课程获取接口
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
    //首页模块机器人发展历程数据接口
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
    //登陆注册界面 登陆接口
     login:function(userName,passWord,callback){
         var acc=new loginAccess(null);
         var filter={userName:userName,passWord:passWord};
         async.series([
             acc.open.bind(acc,false),
             acc.getObject.bind(acc,filter)
         ],function(err,data){
             acc.close(function(){})
             callback(err,data&&data[1])
         })
     },
     //首页精彩内容展示接口
     getJCZSList:function(callback){
         var acc=new getJCZSAccess(null);
         var filter={};
         async.series([
             acc.open.bind(acc,false),
             acc.getObjects.bind(acc,filter,["CREATE_DATE"])
         ],function(err,data){
             acc.close(function(){})
             callback(err,data&&data[1])
         })
     },
     //首页热点推送接口
     getReDianList:function(callback){
         var acc=new getReDianAccess(null);
         var filter={};
         async.series([
             acc.open.bind(acc,false),
             acc.getObjects.bind(acc,filter,["CREATE_DATE"])
         ],function(err,data){
             acc.close(function(){});
             callback(err,data&&data[1])
         })
     },
     //登陆注册界面 注册接口
     zhuce:function(userName,passWord,callback){
         var acc=new loginAccess(null);
         var ccfilter={userName:userName};
         var obj={
             id: unit.getUuid(),
             userName:userName,
             passWord:passWord,
         }
         async.series([
             acc.open.bind(acc,false),
             acc.getObject.bind(acc,ccfilter)
         ],function(err,data){
             if(data[1]==null){
                 async.series([
                     acc.insert.bind(acc,obj)
                 ],function(err,data){
                     acc.close(function(){});
                     callback(err,data&&data[1])
                 })
             }else{
                 data[1]="用户已存在";
                 acc.close(function(){});
                 callback(err,data&&data[1])
             }
         })
     },
}
module.exports = that;