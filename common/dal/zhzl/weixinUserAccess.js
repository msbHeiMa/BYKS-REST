// CREATE TABLE "ZZ_WEIXIN_USER" 
//    (	"ID" VARCHAR2(36) NOT NULL ENABLE, 
// 	"OPEN_ID" VARCHAR2(50), 
// 	"NICK_NAME" VARCHAR2(50), 
// 	"SEX" VARCHAR2(2), 
// 	"HEAD_IMG_URL" VARCHAR2(200), 
// 	"COUNTRY" VARCHAR2(50), 
// 	"PROVINCE" VARCHAR2(50), 
// 	"CITY" VARCHAR2(50), 
// 	"LANGUAGE" VARCHAR2(50), 
// 	"SUBSCRIBE" VARCHAR2(2), 
// 	"SUBSCRIBE_TIME" DATE, 
// 	"UNIONID" VARCHAR2(50), 
// 	"REMARK" VARCHAR2(220), 
// 	"GROUPID" VARCHAR2(50), 
// 	"CREATE_USER" VARCHAR2(50), 
// 	"CREATE_DATE" DATE, 
// 	"UPDATE_USER" VARCHAR2(50), 
// 	"UPDATE_DATE" DATE, 
// 	 CONSTRAINT "PK_ZZ_WEIXIN_USER" PRIMARY KEY ("ID")
//    );

// CREATE UNIQUE INDEX "CIGPROXY"."PK_ZZ_WEIXIN_USER" ON "CIGPROXY"."ZZ_WEIXIN_USER" ("ID") 
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
      'openId': 'OPEN_ID',
      'nickName': 'NICK_NAME',
      'sex': 'SEX',
      'headImgUrl': 'HEAD_IMG_URL',
      'country': 'COUNTRY',
      'province': 'PROVINCE',
      'city': 'CITY',
      'language': 'LANGUAGE',
      'subscribe': 'SUBSCRIBE',
      'subscribeTime': 'SUBSCRIBE_TIME',
      'unionid': 'UNIONID',
      'remark': 'REMARK',
      'groupid': 'GROUPID',
    }
  },
  getTable: function () {
    return 'ZZ_WEIXIN_USER'
  }
}, baseAccess.prototype);
module.exports = tableAccess;