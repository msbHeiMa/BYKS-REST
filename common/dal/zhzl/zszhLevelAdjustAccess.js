/*
create table ZZ_ZSZH_LEVELADJUSHIS 
(
   ID                   VARCHAR2(36)         not null,
   Z_ID                 VARCHAR2(36)         not null,
   ADJUSTMENT_DATE      DATE                 not null,
   ADJUSTMENT_PEOPLE    VARCHAR2(50)         not null,
   ORIGINAL_LEVEL       VARCHAR2(10)         not null,
   FINAL_LEVEL          VARCHAR2(10)         not null,
   ADJUSTMENT_TYPE      VARCHAR2(10)         not null,
   ADJUSTMENT_REASON    VARCHAR2(100),
   CREATE_USER          VARCHAR2(50)         not null,
   CREATE_DATE          DATE                 not null,
   UPDATE_USER          VARCHAR2(50),
   UPDATE_DATE          DATE,
   constraint PK_ZZ_ZSZH_LEVELADJUSHIS primary key (ID)
);
*/

var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "zId":"Z_ID",
            "adjustmentDate":"ADJUSTMENT_DATE",
            "adjustmentPeople":"ADJUSTMENT_PEOPLE",
            "originalLevel":"ORIGINAL_LEVEL",
            "finalLevel":"FINAL_LEVEL",
            "adjustmentType":"ADJUSTMENT_TYPE",
            "adjustReason":"ADJUSTMENT_REASON",
            "wfState":"WFSTATE"
        };
    },
    getTable:function(){
        return "ZZ_ZSZH_LEVELADJUSHIS";
    },
     getJoinJSBPerson: function () {
        return `ZZ_ZSZH_LEVELADJUSHIS inner join ZZ_ZSZHJSB on ZZ_ZSZH_LEVELADJUSHIS.Z_ID=ZZ_ZSZHJSB.ID
                inner join ZZ_PERSON on ZZ_ZSZHJSB.P_ID=ZZ_PERSON.ID
                left join ZZ_ZSZH_VISITCYC on ZZ_ZSZHJSB.ID=ZZ_ZSZH_VISITCYC.Z_ID
                left join A4_SYS_DEPARTMENT on ZZ_PERSON.G_ID = A4_SYS_DEPARTMENT.DEPARTMENTID`;
    },
    getJoinAddPersonColumns: function () {
        return {
            "name": "ZZ_PERSON.NAME",//姓名    1
            "cardNum": "ZZ_PERSON.CARD_NUM",//身份证号码   1
            "rAddr": "ZZ_PERSON.R_ADDR",//现住地详址

            "JSBId": "ZZ_ZSZHJSB.ID",//精神病id
            "dangerRank": "ZZ_ZSZHJSB.DANGER_RANK",//危险等级
            "manageLevel": "ZZ_ZSZHJSB.MANAGE_LEVEL",//管理等级

            "levelId":"ZZ_ZSZH_LEVELADJUSHIS.ID",
            "originalLevel": "ZZ_ZSZH_LEVELADJUSHIS.ORIGINAL_LEVEL",//原始等级
            "finalLevel": "ZZ_ZSZH_LEVELADJUSHIS.FINAL_LEVEL",//申请等级
            "adjustReason": "ZZ_ZSZH_LEVELADJUSHIS.ADJUSTMENT_REASON",//申请原因
            "adjustmentType":"ADJUSTMENT_TYPE",//申请类型

            "visitCyc": "ZZ_ZSZH_VISITCYC.G_VISITCYC", //回访周期

            "gridName":"A4_SYS_DEPARTMENT.DISPLAYNAME"//网格名称
        };
    },
    getJoinObject: function (filter,callback) {
        var columns = this.getJoinAddPersonColumns();
        var table = this.getJoinJSBPerson();
        var where = this.buildWhere(filter, columns);
        var fields = this.buildSelectFields(columns);
        this.innerGetObject(table, fields, where, callback);
    },
},baseAccess.prototype);
module.exports = tableAccess;