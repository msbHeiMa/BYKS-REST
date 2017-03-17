var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "pId":"P_ID",
            "cardNumber":"CARD_NUMBER",
            "cardOrg":"CARD_ORG",
            "cardStartDate":"CARD_START_DATE",
            "nocardReason":"NOCARD_REASON",
            "useArea":"USE_AREA",
            "useDescribe":"USE_DESCRIBE",
            "location":"LOCATION",
        };
    },
    getTable:function(){
        return "ZZ_LAND_USE";
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
        return "ZZ_LAND_USE inner join ZZ_PERSON on ZZ_LAND_USE.P_ID=ZZ_PERSON.ID";
    },
    getJoinPersonColumns:function(){
        return {
            "id":"ZZ_LAND_USE.ID",
            "pId":"ZZ_LAND_USE.P_ID",
            "cardNumber":"ZZ_LAND_USE.CARD_NUMBER",
            "cardOrg":"ZZ_LAND_USE.CARD_ORG",
            "cardStartDate":"ZZ_LAND_USE.CARD_START_DATE",
            "nocardReason":"ZZ_LAND_USE.NOCARD_REASON",
            "useArea":"ZZ_LAND_USE.USE_AREA",
            "useDescribe":"ZZ_LAND_USE.USE_DESCRIBE",
            "location":"ZZ_LAND_USE.LOCATION",
            "gId":"ZZ_PERSON.G_ID",
            "pName":"ZZ_PERSON.NAME",
            "pCardNum":"ZZ_PERSON.CARD_NUM",
            "pPhone":"ZZ_PERSON.PHONE",
            "pAddress":"ZZ_PERSON.R_ADDR",
        };
    }
},baseAccess.prototype);
module.exports = tableAccess;
