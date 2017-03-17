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
            "allCount":"ALL_COUNT",
            "stgylArea":"STGYL_AREA",
            "splArea":"SPL_AREA",
            "tghlArea":"TGHL_AREA",
            "location":"LOCATION",
        };
    },
    getTable:function(){
        return "ZZ_FOREST_RIGHT";
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
        return "ZZ_FOREST_RIGHT inner join ZZ_PERSON on ZZ_FOREST_RIGHT.P_ID=ZZ_PERSON.ID";
    },
    getJoinPersonColumns:function(){
        return {
            "id":"ZZ_FOREST_RIGHT.ID",
            "pId":"ZZ_FOREST_RIGHT.P_ID",
            "cardNumber":"ZZ_FOREST_RIGHT.CARD_NUMBER",
            "allCount":"ZZ_FOREST_RIGHT.ALL_COUNT",
            "stgylArea":"ZZ_FOREST_RIGHT.STGYL_AREA",
            "splArea":"ZZ_FOREST_RIGHT.SPL_AREA",
            "tghlArea":"ZZ_FOREST_RIGHT.TGHL_AREA",
            "location":"ZZ_FOREST_RIGHT.LOCATION",
            "gId":"ZZ_PERSON.G_ID",
            "pName":"ZZ_PERSON.NAME",
            "pCardNum":"ZZ_PERSON.CARD_NUM",
            "pPhone":"ZZ_PERSON.PHONE",
            "pAddress":"ZZ_PERSON.R_ADDR",
        };
    }
},baseAccess.prototype);
module.exports = tableAccess;
