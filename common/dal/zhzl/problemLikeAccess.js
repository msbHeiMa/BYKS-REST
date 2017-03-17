// CREATE TABLE "ZZ_PROBLEM_LIKE" 
//    (	"ID" VARCHAR2(36) NOT NULL ENABLE, 
// 	"PROBLEM_ID" VARCHAR2(36), 
// 	"WEIXIN_OPEN_ID" VARCHAR2(50) NOT NULL ENABLE, 
// 	"WEIXIN_NICK_NAME" VARCHAR2(50), 
// 	"CREATE_USER" VARCHAR2(50) NOT NULL ENABLE, 
// 	"CREATE_DATE" DATE NOT NULL ENABLE, 
// 	"UPDATE_USER" VARCHAR2(50), 
// 	"UPDATE_DATE" DATE, 
// 	 CONSTRAINT "PK_ZZ_PROBLEM_LIKE" PRIMARY KEY ("ID")
//    ) ;

// CREATE UNIQUE INDEX "CIGPROXY"."PK_ZZ_PROBLEM_LIKE" ON "CIGPROXY"."ZZ_PROBLEM_LIKE" ("ID") 
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
      'problemId': 'PROBLEM_ID',
      'weixinOpenId': 'WEIXIN_OPEN_ID',
      'weixinNickName': 'WEIXIN_NICK_NAME',
    }
  },
  getTable: function () {
    return 'ZZ_PROBLEM_LIKE'
  }
}, baseAccess.prototype);
module.exports = tableAccess;