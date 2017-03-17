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



var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"t1.ID",//主键
            "zId":"t1.Z_ID",//表ZZ_ZSZH_JSBId主键
            "visitDate":"t1.VISIT_DATE",//回访时间
            "visitPeople":"t1.VISIT_PEOPLE",//回访人员
            "visitCom":"t1.VISIT_COM",//回放结果
            "remarks":"t1.REMARKS",//备注
            //"isWithguardian":"ISWITHGUARDIAN",
            "isWithManager":"t1.ISWITHGUARDIAN",//是否与监护人同住ISWITHGUARDIAN
            "isMedication":"t1.ISMEDICATION",//是否按时吃药
            "isHarmbehavior":"t1.ISHARMBEHAVIOR",//是否有危险行为
            "JSBId":"t2.ID",
            "peopleStatusQeo":"t2.PEOPLE_STATUS_QEO"
        };
    },
    getTable:function(){
        return "ZZ_ZSZHJSB t2 INNER JOIN ZZ_ZSZH_VISITHIS t1 ON t2.ID=t1.Z_ID";
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