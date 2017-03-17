// CREATE TABLE "ZZ_PROBLEM_COMMENT" 
//    (	
//     "ID" VARCHAR2(36) NOT NULL ENABLE, 
// 	"COMMENT_TYPE" VARCHAR2(2), 
// 	"PROBLEM_ID" VARCHAR2(36), 
// 	"COMMENT_ID" VARCHAR2(36), 
// 	"COMMENT_CONTENT" VARCHAR2(200) NOT NULL ENABLE, 
// 	"COMMENT_DATE" DATE NOT NULL ENABLE, 
// 	"WEIXIN_OPEN_ID" VARCHAR2(50) NOT NULL ENABLE, 
// 	"WEIXIN_NICK_NAME" VARCHAR2(50), 
// 	"USER_ID" VARCHAR2(50), 
// 	"USER_NAME" VARCHAR2(50), 
// 	"CREATE_USER" VARCHAR2(50), 
// 	"CREATE_DATE" DATE, 
// 	"UPDATE_USER" VARCHAR2(50), 
// 	"UPDATE_DATE" DATE, 
// 	 CONSTRAINT "PK_ZZ_PROBLEM_COMMENT" PRIMARY KEY ("ID")
//    ) 
// CREATE UNIQUE INDEX "CIGPROXY"."PK_ZZ_PROBLEM_COMMENT" ON "CIGPROXY"."ZZ_PROBLEM_COMMENT" ("ID") 
//   PCTFREE 10 INITRANS 2 MAXTRANS 255 NOCOMPRESS LOGGING
//   TABLESPACE "CIGPROXY_DATA"

var baseAccess = require('../baseAccess');
function tableAccess (operater, dal) {
  baseAccess.apply(this, [operater, dal])
}
tableAccess.prototype = unit.inherits({
  getColumns: function () {
    return {
      'id': 'ID',
      'commentType': 'COMMENT_TYPE',
      'problemId': 'PROBLEM_ID',
      'commentId': 'COMMENT_ID',
      'commentContent': 'COMMENT_CONTENT',
      'commentDate': 'COMMENT_DATE',
      'weixinOpenId': 'WEIXIN_OPEN_ID',
      'weixinNickName': 'WEIXIN_NICK_NAME',
      'userId': 'USER_ID',
      'userName': 'USER_NAME',
    }
  },
  getTable: function () {
    return 'ZZ_PROBLEM_COMMENT'
  },
  _fillWeixinInfo:function(rows,callback){
      var weixinUserAccess = require("./weixinUserAccess");
      var weixinUserAcc = new weixinUserAccess(this.operater,this.dal);
      if(rows.length == 0){
          callback(null,rows);
      }
      else{
          var filter = {
              openId:rows.map(function(comment){return comment.weixinOpenId}).filter(function(openid){return !openid})
          };
          weixinUserAcc.getObjects(filter,null,function(err,data){
              if(data){
                  var cache={};
                  data.forEach(function(element) {
                      cache[element.openId] = element;
                  }, this);
                  rows.forEach(function(element) {
                      var openId = element.weixinOpenId;
                      delete element["weixinOpenId"];
                      element["weixinNickName"] = cache[openId] && cache[openId].nickName;
                      element["weixinHeadImgUrl"] = cache[openId] && cache[openId].headImgUrl;
                  }, this);
              }
              callback(err,rows);
          });
      }
  },
  getPageWithWeixinInfo:function(filter,order,offset,limit,callback){
    var that = this;
    this.getPage(filter,order,offset,limit,function(err,data){
      if(err)callback(err);
      else{
        that._fillWeixinInfo(data.rows,function(err,res){
          if(!err){
            data.rows = res;
          }
          callback(err,data);
        });
      }
    });
  }
}, baseAccess.prototype);
module.exports = tableAccess;
