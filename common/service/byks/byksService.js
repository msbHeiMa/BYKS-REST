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
//我的管理数据库 可添加 删除 编辑 增加 查询数据
var getManagentAccess=require(ROOT_DIR + "/common/dal/byks/getManagentAccess");
//课程详情数据库 可添加 删除 编辑 增加 查询数据
var getKcDetailAccess=require(ROOT_DIR + "/common/dal/byks/getKcDetailAccess");
//精彩内容产品详细信息数据库 可添加 删除 编辑 增加 查询数据
var getJCZSDetailAccess=require(ROOT_DIR + "/common/dal/byks/getJCZSDetailAccess");
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
     //上传头像
     changUserImage:function(data,callback){
         var acc=new loginAccess(null);
         var filter={id:data.userId};
         var obj={
             userImage:data.userImage,
         }
         async.series([
             acc.open.bind(acc,false),
             acc.update.bind(acc,obj,filter)
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
     //首页精彩内容详情信息
     getJCZSDetail:function(id,callback){
         var acc= new getJCZSDetailAccess(null);
         var filter={jcnrId:id};
         async.series([
             acc.open.bind(acc,false),
             acc.getObject.bind(acc,filter),
         ],function(err,data){
             acc.close(function(){});
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
     //首页热点详情信息接口
     getReDianDetail:function(id,callback){
         var acc= new getReDianAccess(null);
         var filter={id:id}
         async.series([
             acc.open.bind(acc,false),
             acc.getObject.bind(acc,filter)
         ],function(err,data){
             acc.close(function(){});
             callback(err,data&&data[1])
         })
     },
     //登陆注册界面 注册接口
     zhuce:function(userName,passWord,userImage,userType,callback){
         var acc=new loginAccess(null);
         var ccfilter={userName:userName};
         var obj={
             id: unit.getUuid(),
             userName:userName,
             passWord:passWord,
             userImage:userImage,
             userType:userType,
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
        var filter={status:"通过"};
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
        var filter=(type=="全部类型"?{status:"通过"}:{worksType:type,status:"通过"});
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
        data.status="待办";
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
    uploadByUser:function(obj,callback){
        var acc= new getManagentAccess(null);
        obj.id=unit.getUuid();
        var manageType=obj.manageType;
        var filter={userId:obj.userId,manageType:obj.manageType,kcId:obj.kcId};
        if(obj.manageType!="上传"){
             async.series([
                acc.open.bind(acc,false),
                acc.getObject.bind(acc,filter)
            ],function(err,data){
                acc.close(function(){});
                if(data[1]!=null){
                    data[1]={
                        back:"您以"+manageType+"此课程",
                    }
                    callback(err,data&&data[1])
                }else{
                    async.series([
                        acc.open.bind(acc,false),
                        acc.insert.bind(acc,obj)
                    ],function(err,data){
                        acc.close(function(){});
                        data[1]={
                         back:manageType+"成功",
                        }
                        callback(err,data&&data[1])
                    })
                }
                
            })
        }else{
            async.series([
                acc.open.bind(acc,false),
                acc.insert.bind(acc,obj)
            ],function(err,data){
                acc.close(function(){});
                callback(err,data&&data[1])
            })
        }
        
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
    //我的管理页面 删除上传作品
    deleteZp:function(zpId,callback){
        //我的管理数据库
        var mg= new  getManagentAccess(null);
        //作品管理数据库
        var zp= new  getAllZPListAccess(null);
        //我的管理数据库删除条件
        var mgfilter={zpId:zpId};
        //作品管理数据库删除条件
        var zpfilter={id:zpId};
        async.series([
            mg.open.bind(mg,false),
            zp.open.bind(zp,false),
            mg.delete.bind(mg,mgfilter),
            zp.delete.bind(zp,zpfilter),
        ],function(err,data){
            mg.close(function(){});
            zp.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //我的管理页面 报名的课程部分 取消报名功能
    quXiaoBaoMingKc:function(id,callback){
        var acc = new getManagentAccess(null);
        var filter={id:id}
        async.series([
            acc.open.bind(acc,false),
            acc.delete.bind(acc,filter),
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //我的管理页面 我的关注部分 报名课程
    baoMingKc:function(obj,callback){
        var acc=new getManagentAccess(null);
        var filter={userId:obj.userId,kcId:obj.kcId,manageType:"报名"};
        async.series([
            acc.open.bind(acc,false),
            acc.getObject.bind(acc,filter)
        ],function(err,data){
            acc.close(function(){});
            var obj2={
                id:unit.getUuid(),
                userId:obj.userId,
                kcId:obj.kcId,
                manageType:"报名",
            }
            if(data[1]==null){
                async.series([
                    acc.open.bind(acc,false),
                    acc.insert.bind(acc,obj2)
                ],function(err,data){
                    acc.close(function(){});
                    data[1]={
                        back:"报名成功",
                    }
                    callback(err,data&&data[1])
                })
            }else if(data[1]!=null){
                data[1]={
                    back:"您已报名该课程"
                }
                callback(err,data&&data[1])
            }
        })
    },
    //我的管理页面 我的关注部分 取消关注
    quXiaoGuanZhuKc:function(id,callback){
        var acc = new getManagentAccess(null);
        var faliter={id:id};
        async.series([
            acc.open.bind(acc,false),
            acc.delete.bind(acc,faliter)
        ],function(err,data){
            acc.close(function(){})
            callback(err,data&&data[1])
        })
    },
    //我的管理页面 报名课程部分 课程安排
    getKcDetailByKcId:function(kcId,callback){
        var acc =new getKcDetailAccess(null);
        var filter={kcId:kcId}
        async.series([
            acc.open.bind(acc,false),
            acc.getObject.bind(acc,filter),
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //后台管理员操作  作品审核页面
    shenHeByStatus:function(data,callback){
        var acc=new getAllZPListAccess(null);
        var filter={status:data.status}
        async.series([
            acc.open.bind(acc,false),
            acc.getObjects.bind(acc,filter,["CREATE_DATE desc"]),
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
   //后台管理员操作 作品审核页面 待办标签页通过功能
    shenHeTongGuo:function(obj,callback){
        var acc=new getAllZPListAccess(null);
        var filter={id:obj.id}
        delete obj["id"];
        obj.shDate=new Date().Format("yyyy-MM-dd hh:mm:ss");
        async.series([
            acc.open.bind(acc,false),
            acc.update.bind(acc,obj,filter)
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //后台管理员操作 作品审核页面 待办标签页未通过功能
    shenHeWeiTongGuo:function(obj,callback){
        var acc=new getAllZPListAccess(null);
        var filter={id:obj.id}
        delete obj["id"];
        obj.shDate=new Date().Format("yyyy-MM-dd hh:mm:ss");
        async.series([
            acc.open.bind(acc,false),
            acc.update.bind(acc,obj,filter)
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
     //后台管理员操作 作品审核页面 通过标签页删除功能
    shenHeShanChu:function(obj,callback){
        var acc=new getAllZPListAccess(null);
        var filter={id:obj.id}
        delete obj["id"];
        async.series([
            acc.open.bind(acc,false),
            acc.update.bind(acc,obj,filter)
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
     //后台管理员操作 发布课程页面 课程发布接口
    faBuShiPin:function(obj,callback){
        var acc=new getAllCourseAccess(null);
        obj.id=unit.getUuid();
        async.series([
            acc.open.bind(acc,false),
            acc.insert.bind(acc,obj)
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
    //后台管理员操作 发布课程页面 删除课程接口
    faBuKeChengShanChu:function(id,callback){
        var acc=new getAllCourseAccess(null);
        var filter={id:id}
        async.series([
            acc.open.bind(acc,false),
            acc.delete.bind(acc,filter)
        ],function(err,data){
            acc.close(function(){});
            callback(err,data&&data[1])
        })
    },
}
module.exports = that;