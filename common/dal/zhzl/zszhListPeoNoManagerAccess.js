var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
           "JSBId":"ZZ_ZSZHJSB.ID",
           "pId" :"ZZ_ZSZHJSB.P_ID", 
           "isDianosis" :"ZZ_ZSZHJSB.IS_DIAGNOSIS",  //是否确诊
           "dataSource" :"ZZ_ZSZHJSB.DATA_SOURCES",  //数据来源
           "dangerRank" :"ZZ_ZSZHJSB.DANGER_RANK",    //危险级别
           "gridName" :"ZZ_ZSZHJSB.GRID_NAME",
           "cardNum" :"ZZ_PERSON.CARD_NUM",  //身份证号
           "name" :"ZZ_PERSON.NAME",        //姓名
           "gender" :"ZZ_PERSON.GENDER",    //性别
           "birthDate" :"ZZ_PERSON.BIRTH_DATE",//出生日期
           "residence" :"ZZ_PERSON.RESIDENCE",//现居住地
           "id" :"ZZ_PERSON.ID",
           "gird" :"ZZ_PERSON.G_ID",
           "photoPath":"ZZ_PERSON.PHOTO_PATH",
        };
    },
    getTable:function(){
        return "(ZZ_ZSZHJSB INNER JOIN ZZ_PERSON ON ZZ_PERSON.ID=ZZ_ZSZHJSB.P_ID )";
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
    }
},baseAccess.prototype);
module.exports = tableAccess;