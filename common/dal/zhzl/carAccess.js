var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "pId":"P_ID",
            "carType":"CAR_TYPE",
            "carNumber":"CAR_NUMBER",
            "isHouseholds":"IS_HOUSEHOLDS",
            "condition":"CONDITION",
            "brand":"BRAND",
            "purpose":"PURPOSE",
            "carColour":"CAR_COLOUR",
            "nature":"NATURE",
            "frameNumber":"FRAME_NUMBER",
            "engineNumber":"ENGINE_NUMBER",
            "signDate":"SIGN_DATE",
            "signOrg":"SIGN_ORG",
            "validityTerm":"VALIDITY_TERM",
            "firstSignDate":"FIRST_SIGN_DATE",
            "remark":"REMARK",
            "dataSource":"DATA_SOURCE"
        };
    },
    getTable:function(){
        return "ZZ_CAR";
    },
    /**
     * 获取关联表的分页查询
     */
    getJoinPersonPages:function(filter,order,offset,limit,callback){
        var columns = this.getJoinPersonColumns();
        var table = this.getJoinPerson();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order,columns);
        this.innerGetPage(offset,limit,table,fields,where,orderStr,callback);
    },
    /**
     * 获取关联查询的多行数据
     */
    getJoinPersonObjects:function(filter,order,callback){
        var columns = this.getJoinPersonColumns();
        var table = this.getJoinPerson();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order);
        this.innerGetObjects(table,fields,where,orderStr,callback);
    },
    /**
     * 获取关联查询的第一个结果，回掉返回该对象
     */
    getJoinPersonObject:function(filter,callback){
        var columns = this.getJoinPersonColumns();
        var table = this.getJoinPerson();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        this.innerGetObject(table,fields,where,callback);
    },
    getJoinPerson:function(){
        return "ZZ_CAR inner join ZZ_PERSON on ZZ_CAR.P_ID=ZZ_PERSON.ID";
    },
    getJoinPersonColumns:function(){
        return {
            "id":"ZZ_CAR.ID",
            "pId":"ZZ_CAR.P_ID",
            "carType":"ZZ_CAR.CAR_TYPE",
            "carNumber":"ZZ_CAR.CAR_NUMBER",
            "isHouseholds":"ZZ_CAR.IS_HOUSEHOLDS",
            "condition":"ZZ_CAR.CONDITION",
            "brand":"ZZ_CAR.BRAND",
            "purpose":"ZZ_CAR.PURPOSE",
            "carColour":"ZZ_CAR.CAR_COLOUR",
            "nature":"ZZ_CAR.NATURE",
            "frameNumber":"ZZ_CAR.FRAME_NUMBER",
            "engineNumber":"ZZ_CAR.ENGINE_NUMBER",
            "signDate":"ZZ_CAR.SIGN_DATE",
            "signOrg":"ZZ_CAR.SIGN_ORG",
            "validityTerm":"ZZ_CAR.VALIDITY_TERM",
            "firstSignDate":"ZZ_CAR.FIRST_SIGN_DATE",
            "remark":"ZZ_CAR.REMARK",
            "dataSource":"ZZ_CAR.DATA_SOURCE",
            "gId":"ZZ_PERSON.G_ID",
            "pName":"ZZ_PERSON.NAME",
            "pCardNum":"ZZ_PERSON.CARD_NUM",
            "pPhone":"ZZ_PERSON.PHONE",
            "pAddress":"ZZ_PERSON.R_ADDR",
        };
    },
},baseAccess.prototype);
module.exports = tableAccess;
