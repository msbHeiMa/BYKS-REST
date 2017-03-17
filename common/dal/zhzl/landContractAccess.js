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
            "cbhtNumber":"CBHT_NUMBER",
            "jzNumber":"JZ_NUMBER",
            "placeName":"PLACE_NAME",
            "landType":"LAND_TYPE",
            "cbhtArea":"CBHT_AREA",
            "jyqzArea":"JYQZ_AREA",
            "area":"AREA",
            "location":"LOCATION",
        };
    },
    getTable:function(){
        return "ZZ_LAND_CONTRACT";
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
        return "ZZ_LAND_CONTRACT inner join ZZ_PERSON on ZZ_LAND_CONTRACT.P_ID=ZZ_PERSON.ID";
    },
    getJoinPersonColumns:function(){
        return {
            "id":"ZZ_LAND_CONTRACT.ID",
            "pId":"ZZ_LAND_CONTRACT.P_ID",
            "cardNumber":"ZZ_LAND_CONTRACT.CARD_NUMBER",
            "cbhtNumber":"ZZ_LAND_CONTRACT.CBHT_NUMBER",
            "jzNumber":"ZZ_LAND_CONTRACT.JZ_NUMBER",
            "placeName":"ZZ_LAND_CONTRACT.PLACE_NAME",
            "landType":"ZZ_LAND_CONTRACT.LAND_TYPE",
            "cbhtArea":"ZZ_LAND_CONTRACT.CBHT_AREA",
            "jyqzArea":"ZZ_LAND_CONTRACT.JYQZ_AREA",
            "area":"ZZ_LAND_CONTRACT.AREA",
            "location":"ZZ_LAND_CONTRACT.LOCATION",
            "gId":"ZZ_PERSON.G_ID",
            "pName":"ZZ_PERSON.NAME",
            "pCardNum":"ZZ_PERSON.CARD_NUM",
            "pPhone":"ZZ_PERSON.PHONE",
            "pAddress":"ZZ_PERSON.R_ADDR",
        };
    },
},baseAccess.prototype);
module.exports = tableAccess;
