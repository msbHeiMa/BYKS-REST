var async = require(ROOT_DIR + "/common/tools").async;
//课程管理数据库 可增加 删除 编辑 查询
var getAllCourseAccess = require(ROOT_DIR + "/common/dal/byks/getAllCourseAccess");
//主页下方图表数据来源 图表数据库可 增加 删除 编辑  查询
var getTuBiaoAccess = require(ROOT_DIR + "/common/dal/byks/getTuBiaoAccess");
//用户表数据库 可 增加 删除 编辑  查询 
var loginAccess=require(ROOT_DIR + "/common/dal/byks/loginAccess");
//首页 精彩内容欣赏数据库（精彩内容展示）可 增加 删除 编辑  查询 
var getJCZSAccess=require(ROOT_DIR + "/common/dal/byks/getJCZSAccess");
//首页 热点信息数据库 可 增加 删除 编辑  查询 
var getReDianAccess=require(ROOT_DIR + "/common/dal/byks/getReDianAccess");
//作品管理表 可 增加 删除 编辑  查询 
var getAllZPListAccess=require(ROOT_DIR + "/common/dal/byks/getAllZPListAccess");
//评论表和用户表联合查询，定位到每位用户的所有评论（及每条评论的信息返回时都会带着相关用户信息）
var getPingLunByIdAccess=require(ROOT_DIR + "/common/dal/byks/getPingLunByIdAccess");
//评论表数据库 可 增加 删除 编辑  查询
var savePingLunAccess=require(ROOT_DIR + "/common/dal/byks/savePingLunAccess");
//点赞记录表 可 增加 删除 编辑  查询
var getDZJLAccess=require(ROOT_DIR + "/common/dal/byks/getDZJLAccess");
//我的管理，作品管理，课程管理三个表联合查询
var getManagentByZpAndKcAccess=require(ROOT_DIR + "/common/dal/byks/getManagentByZpAndKcAccess");
//我的管理数据库 可添加 删除 编辑 表内 查询数据
var getManagentAccess=require(ROOT_DIR + "/common/dal/byks/getManagentAccess");
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
     zhuce:function(userName,passWord,userImage,callback){
         var acc=new loginAccess(null);
         var ccfilter={userName:userName};
         var obj={
             id: unit.getUuid(),
             userName:userName,
             passWord:passWord,
             userImage:userImage,
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
                     data[1]=obj.id;
                     callback(err,data&&data[1])
                 })
             }else{
                 data[1]="用户已存在";
                 acc.close(function(){});
                 callback(err,data&&data[1])
             }
         })
     },
    //作品展示页面 获取作品信息接口
    getAllZPList:function(callback){
        var acc= new getAllZPListAccess(null);
        var filter={};
        async.series([
            acc.open.bind(acc,false),
            acc.getObjects.bind(acc,filter,["CREATE_DATE"])
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //作品展示页面 通过类型筛选作品接口
    getAllZPByType:function(type,callback){
        var acc= new getAllZPListAccess(null);
        var filter=(type=="全部类型"?{}:{worksType:type});
        async.series([
            acc.open.bind(acc,false),
            acc.getObjects.bind(acc,filter,["CREATE_DATE"])
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //作品详情页面 通过作品ID查到相应作品信息接口
    getZPById:function(id,callback){
        var acc =new getAllZPListAccess(null);
        var filter={id:id};
        async.series([
            acc.open.bind(acc,false),
            acc.getObject.bind(acc,filter)
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //作品详情页面 通过作品ID查到对该作品的所有评论
    getPingLunById:function(id,callback){
        var acc=new getPingLunByIdAccess(null);
        var filter={zpId:id};
        async.series([
            acc.open.bind(acc,false),
            acc.getObjects.bind(acc,filter,["BYKS_PLGL.CREATE_DATE desc"])
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //作品详情页面 发表评论
    savePingLun:function(data,callback){
        var acc= new savePingLunAccess(null);
        data.id=unit.getUuid();
        async.series([
            acc.open.bind(acc,false),
            acc.insert.bind(acc,data)
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //作品展示页面 点赞功能
    getDianZan:function(data,callback){
        var DZJL= new getDZJLAccess(null);
        var DIANZAN =new getAllZPListAccess(null); 
        //判断BYKS_DZJL库中是否有用户点赞信息的查询条件
        var isLikeed={zpId:data.zpId,userId:data.userId};
        //编辑BYKE_ZP中对应作品点赞次数的查询条件
        var filter={id:data.zpId};
        //如果BYKS_DZJL库中没有用户点赞信息时需要存入库中的各项参数
        var dianzan={
            id:unit.getUuid(),
            zpId:data.zpId,
            userId:data.userId,
        };
        async.series([
            DZJL.open.bind(DZJL,false),
            DIANZAN.open.bind(DIANZAN,false),
            DZJL.getObject.bind(DZJL,isLikeed),
            DIANZAN.getObject.bind(DIANZAN,filter)
        ],function(err,data){
            DZJL.close(function(){})
            //如果data[1]为null说明该用户没有对该作品点过赞
            if(data[2]==null){
                //编辑BYKE_ZP中对应作品点赞次数的变换后参数
                var bianjiLikeTime={likeTime:parseInt(data[3].likeTime)+1}
                async.series([
                    DIANZAN.open.bind(DIANZAN,false),
                    DZJL.open.bind(DZJL,false),
                    DIANZAN.update.bind(DIANZAN,bianjiLikeTime,filter),
                    DZJL.insert.bind(DZJL,dianzan),
                ],function(err,data){
                    DZJL.close(function(){});
                    DIANZAN.close(function(){})
                    data[1]={
                        zhuangtai:"可赞",
                        likeTime:bianjiLikeTime.likeTime,
                    };

                    callback(err,data&&data[1])
                })
            }else{
                data[1]="您已经赞过了";
                callback(err,data&&data[1])
            }
        })
    },
    //上传作品页面 上传操作
    upload:function(data,callback){
        var acc= new getAllZPListAccess(null);
        data.id=unit.getUuid();
        var id=data.id;
        async.series([
            acc.open.bind(acc,false),
            acc.insert.bind(acc,data)
        ],function(err,data){
            acc.close(function(){});
            data[1]={
                zpId:id,
            }
            callback(err,data&&data[1])
        })
    },
    //上传页面 将作品Id保存到我的管理数据库
    uploadByUser:function(data,callback){
        var acc= new getManagentAccess(null);
        data.id=unit.getUuid();
        async.series([
            acc.open.bind(acc,false),
            acc.insert.bind(acc,data)
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
     //我的管理页面 上传作品报名关注课程接口
    getManagement:function(data,callback){
        var acc=new getManagentByZpAndKcAccess(null)
        var filter={userId:data.userId,manageType:data.manageType};
        async.series([
            acc.open.bind(acc,false),
            acc.getObjects.bind(acc,filter,["BYKS_MYMANAGE.CREATE_DATE desc"])
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },  
}
module.exports = that;