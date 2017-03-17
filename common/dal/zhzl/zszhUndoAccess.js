var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
//姓名  身份证号 出生年月 性别  申请项 变更前 变更后 申请变更原因  岗位 姓名 申请时间 审核结果
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            //WF_TASKTODO;t1 WF_APPROVEHIS;t2 WF_BUSI_CONFIG;t3 A4_SYS_USERINPOST;t4 A4_SYS_POSTINFO;t5 SELECT * FROM A4_SYS_USER;t6
            "funmdataID": "t1.FUNMDATA_ID",
            "userId": "t1.USER_ID",
            "sn": "t1.SN",
            "funModleId":"t1.FUNM_ID",
            "applicantDataId": "t2.FUNMDATA_ID", //申请人数据id  "开始"
            "applicantId": "t2.USER_ID",//申请人id
            "applicantTime": "t2.TASK_SDATE",//申请时间
            "activity": "t2.ACTIVITY_NAME",
            "funmodelName": "t3.FUNMODEL_NAME",//申请事项
            "pName": "t5.P_NAME",//申请人-岗位
            "a4sysuserUserName": "t6.USERNAME",//申请人姓名
        };
    },
    getTable: function () {//1.查询审批开始项：即为申请人2.查询审批模板3.查询申请人4.查询申请人岗位5.查询申请人姓名
        return `WF_TASKTODO t1 LEFT JOIN WF_APPROVEHIS t2 ON t1.FUNMDATA_ID=t2.FUNMDATA_ID
                inner JOIN WF_BUSI_CONFIG t3  ON t3.FUNMODEL_ID=t1.FUNM_ID
                inner JOIN A4_SYS_USERINPOST t4 ON t4.USERID=t2.USER_ID
                inner JOIN A4_SYS_POSTINFO t5 ON t5.POSTID=t4.POSTID
                inner JOIN A4_SYS_USER t6 ON t6.USERID=t2.USER_ID
                `
    },
    getJoinJSB: function () {
        return "ZZ_ZSZHJSB inner join ZZ_PERSON on ZZ_ZSZHJSB.P_ID=ZZ_PERSON.ID";
    },
    getJoinAddJSBColumns: function () {
        return {
            "JSBId_add": "ZZ_ZSZHJSB.ID",//精神病id
            "pId": "ZZ_ZSZHJSB.P_ID",//人口id,
            "name": "ZZ_PERSON.NAME",//姓名    1
            "cardNum": "ZZ_PERSON.CARD_NUM",//身份证号码   1
            "gender": "ZZ_PERSON.GENDER",//性别   1
            "birthDate": "ZZ_PERSON.BIRTH_DATE",//出生日期  1
        };
    },
    getJoinLeveAdjust() {
        return `ZZ_ZSZH_LEVELADJUSHIS inner join ZZ_ZSZHJSB on ZZ_ZSZHJSB.ID=ZZ_ZSZH_LEVELADJUSHIS.Z_ID
                   inner join ZZ_PERSON on ZZ_ZSZHJSB.P_ID=ZZ_PERSON.ID`;
    },
    getJoinLeveAdjustColumns: function () {
        return {
            "levelAdjustId": "ZZ_ZSZH_LEVELADJUSHIS.ID",
            "JSBId_level": "ZZ_ZSZH_LEVELADJUSHIS.Z_ID",
            "originalLevel": "ZZ_ZSZH_LEVELADJUSHIS.ORIGINAL_LEVEL",//变更前等级
            "finalLevel": "ZZ_ZSZH_LEVELADJUSHIS.FINAL_LEVEL",//变更后等级
            "adjustmentReason": "ZZ_ZSZH_LEVELADJUSHIS.ADJUSTMENT_REASON",//变更原因

            "name": "ZZ_PERSON.NAME",//姓名    1
            "cardNum": "ZZ_PERSON.CARD_NUM",//身份证号码   1
            "gender": "ZZ_PERSON.GENDER",//性别   1
            "birthDate": "ZZ_PERSON.BIRTH_DATE",//出生日期  1
        };
    },
    getJoinAddJSBObjects: function (filter, order, callback) {
        var columns = this.getJoinAddJSBColumns();
        var table = this.getJoinJSB();
        var where = this.buildWhere(filter, columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order);
        this.innerGetObjects(table, fields, where, orderStr, callback);
    },
    getJoinLevelAdjustObjects: function (filter, order, callback) {
        var columns = this.getJoinLeveAdjustColumns();
        var table = this.getJoinLeveAdjust();
        var where = this.buildWhere(filter, columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order);
        this.innerGetObjects(table, fields, where, orderStr, callback);
    }
}, baseAccess.prototype);
module.exports = tableAccess;