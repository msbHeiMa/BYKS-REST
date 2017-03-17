var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
            "id": "ID",
            "field1": "EVENT_NAME",
            "field2": "EVENT_DES",
            "field3": "HAPPEN_DATE",
        };
    },
    getTable: function () {
        return "table1";
    },
    /**
     * 获取关联表的分页查询
     */
    getJoinT1Pages:function(filter,order,offset,limit,callback){
        var columns = this.getJoinT1Columns();
        var table = this.getJoinT1Table();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order,columns);
        this.innerGetPage(offset,limit,table,fields,where,orderStr,callback);
    },
    /**
     * 获取关联查询的多行数据
     */
    getJoinT1Objects:function(filter,order,callback){
        var columns = this.getJoinT1Columns();
        var table = this.getJoinT1Table();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order);
        this.innerGetObjects(table,fields,where,orderStr,callback);
    },
    /**
     * 获取关联查询的第一个结果，回掉返回该对象
     */
    getJoinT1Object:function(filter,callback){
        var columns = this.getJoinT1Columns();
        var table = this.getJoinT1Table();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        this.innerGetObject(table,fields,where,callback);
    },
    getJoinT1Table:function(){
        return "table1 inner join join1 on table1.id1=join1.id2";
    },
    getJoinT1Columns:function(){
        return {
            "id": "ID",
            "field1": "table1.field1",
            "field2": "table1.field2",
            "field3": "table1.field3",
            "t_field1": "join1.field1",
            "t_field2": "join1.field2",
            "t_field3": "join1.field3",
        };
    }
}, baseAccess.prototype);
module.exports = tableAccess;