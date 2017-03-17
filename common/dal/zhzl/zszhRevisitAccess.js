// /*==============================================================*/
// /* Table: ZZ_SCHOOL                                             */
// // /*==============================================================*/
// create table ZZ_ZSZH_VISITHIS 
// (
//    ID                   VARCHAR2(36)         not null,
//    Z_ID                 VARCHAR2(36)         not null,
//    VISIT_DATE           DATE                 not null,
//    VISIT_PEOPLE         VARCHAR2(50)         not null,
//    VISIT_COM            VARCHAR2(100)        not null,
//    REMARKS              VARCHAR2(500),
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_ZZ_ZSZH_VISITHIS primary key (ID)
// );

// // comment on column ZZ_ZSZH_VISITHIS.CREATE_USER is
// '扩展';

// comment on column ZZ_ZSZH_VISITHIS.CREATE_DATE is
// '扩展';

// comment on column ZZ_ZSZH_VISITHIS.UPDATE_USER is
// '扩展';

// comment on column ZZ_ZSZH_VISITHIS.UPDATE_DATE is
// '扩展';
// '编码见5.59';

var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",//主键
            "zId":"Z_ID",//表ZZ_ZSZH_JSBId主键
            "visitDate":"VISIT_DATE",//回访时间
            "visitPeople":"VISIT_PEOPLE",//回访人员
            "visitCom":"VISIT_COM",//回放结果
            "remarks":"REMARKS",//备注
            //"isWithguardian":"ISWITHGUARDIAN",
            "isWithManager":"ISWITHGUARDIAN",//是否与监护人同住ISWITHGUARDIAN
            "isMedication":"ISMEDICATION",//是否按时吃药
            "isHarmbehavior":"ISHARMBEHAVIOR",//是否有危险行为
            "createDate":"CREATE_DATE",//创建日期
            "createUser":"CREATE_USER",
            "updateUser":"UPDATE_USER",
            "updateDate":"UPDATE_DATE",
        };
    },
    getTable:function(){
        return "ZZ_ZSZH_VISITHIS";
    },
    getPageWithUserId: function (filter, order, offset, limit, callback) {
        var self = this;
        this.getPage(filter, order, offset, limit, function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    },
    getPageWithZId: function (filter, order, offset, limit, callback) {
        var self = this;
        this.getPage(filter, order, offset, limit, function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    },
},baseAccess.prototype);
module.exports = tableAccess;