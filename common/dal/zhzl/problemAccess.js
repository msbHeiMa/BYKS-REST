// CREATE TABLE "ZZ_PROBLEM" 
//    (	"ID" VARCHAR2(36) NOT NULL ENABLE, 
// 	"PROBLEM_DES" VARCHAR2(200) NOT NULL ENABLE, 
// 	"HAPPEN_DATE" DATE NOT NULL ENABLE, 
// 	"HAPPEN_PLACE" VARCHAR2(100) NOT NULL ENABLE, 
// 	"LONGITUDE" NUMBER(10,7), 
// 	"LATITUDE" NUMBER(10,7), 
// 	"GRID_ID" VARCHAR2(36), 
// 	"PROBLEM_CATEGORY" VARCHAR2(2) NOT NULL ENABLE, 
// 	"WEIXIN_OPEN_ID" VARCHAR2(50), 
// 	"WEIXIN_NICK_NAME" VARCHAR2(50) NOT NULL ENABLE, 
// 	"IS_LIKED" VARCHAR2(2), 
// 	"LIKE_NUM" NUMBER(8,0), 
// 	"REPLY_NUM" NUMBER(8,0), 
// 	"EVALUATE" NUMBER(8,0), 
// 	"COMMENT_NUM" NUMBER(8,0), 
// 	"STATUS" VARCHAR2(2), 
// 	"IS_OPEN" VARCHAR2(2) NOT NULL ENABLE, 
// 	"IS_RECOMMEND" VARCHAR2(2) NOT NULL ENABLE, 
// 	"TIMES" NUMBER(8,0) NOT NULL ENABLE, 
// 	"ANONYMOUS" VARCHAR2(2), 
// 	"EVENT_ID" VARCHAR2(36) NOT NULL ENABLE, 
// 	"DEL_FLAG" VARCHAR2(2), 
// 	"CREATE_USER" VARCHAR2(50) NOT NULL ENABLE, 
// 	"CREATE_DATE" DATE NOT NULL ENABLE, 
// 	"UPDATE_USER" VARCHAR2(50), 
// 	"UPDATE_DATE" DATE, 
// 	 CONSTRAINT "PK_ZZ_PROBLEM" PRIMARY KEY ("ID")
//    ) ;

// CREATE UNIQUE INDEX "CIGPROXY"."PK_ZZ_PROBLEM" ON "CIGPROXY"."ZZ_PROBLEM" ("ID") 
//   PCTFREE 10 INITRANS 2 MAXTRANS 255 NOCOMPRESS LOGGING
//   TABLESPACE "CIGPROXY_DATA";

var baseAccess = require('../baseAccess');
function tableAccess (operater, dal) {
  baseAccess.apply(this, [operater, dal])
}
tableAccess.prototype = unit.inherits({
  getColumns: function () {
    return {
      'id': 'ID',
      'problemDes': 'PROBLEM_DES',
      'happenDate': 'HAPPEN_DATE',
      'happenPlace': 'HAPPEN_PLACE',
      'longitude': 'LONGITUDE',
      'latitude': 'LATITUDE',
      'gridId': 'GRID_ID',
      'problemCategory': 'PROBLEM_CATEGORY',
      'weixinOpenId': 'WEIXIN_OPEN_ID',
      'weixinNickName': 'WEIXIN_NICK_NAME',
      'isLiked': 'IS_LIKED',
      'likeNum': 'LIKE_NUM',
      'replyNum': 'REPLY_NUM',
      'evaluate': 'EVALUATE',
      'commentNum': 'COMMENT_NUM',
      'status': 'STATUS',
      'isOpen': 'IS_OPEN',
      'isRecommend': 'IS_RECOMMEND',
      'times': 'TIMES',
      'anonymous': 'ANONYMOUS',
      'eventId': 'EVENT_ID',
      'delFlag': 'DEL_FLAG',
    }
  },
  getTable: function () {
    return 'ZZ_PROBLEM'
  },
  increaseCommentCount:function(id,value,callback){
    if(!id){
      throw new Error("ID不能为空");
    }
    var filter = {id:id};
    this.increaseColumn(filter,"commentNum",parseFloat(value),callback);
  },
  increaseLikeCount:function(id,value,callback){
    if(!id){
      throw new Error("ID不能为空");
    }
    var filter = {id:id};
    this.increaseColumn(filter,"likeNum",parseFloat(value),callback);
  },
}, baseAccess.prototype);
module.exports = tableAccess;
