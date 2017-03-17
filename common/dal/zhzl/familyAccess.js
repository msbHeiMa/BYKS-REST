var baseAccess = require("../baseAccess");
var da = require(ROOT_DIR+'/common/dal/dataAccess');
var personAccess = require(ROOT_DIR + "/common/dal/zhzl/personAccess");

function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "pId":"P_ID",
            "hNum":"H_NUM",
            "hasPerson":"HAS_PERSON",
            "isFive":"IS_FIVE",
            "isLow":"IS_LOW",
            "isPool":"IS_POOL",
            "alines":"ALINES",
            "residenceType":"RESIDENCE_TYPE",
            "rhyzbs":"RHYZBS",
            "gId":"G_ID",
        };
    },
    getTable:function(){
        return "ZZ_FAMILY";
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
        return "ZZ_FAMILY inner join ZZ_PERSON on ZZ_FAMILY.P_ID=ZZ_PERSON.ID";
    },
    getJoinPersonColumns:function(){
        return {
            "id":"ZZ_FAMILY.ID",
            "pId":"ZZ_FAMILY.P_ID",
            "hNum":"ZZ_FAMILY.H_NUM",
            "hasPerson":"ZZ_FAMILY.HAS_PERSON",
            "isFive":"ZZ_FAMILY.IS_FIVE",
            "isLow":"ZZ_FAMILY.IS_LOW",
            "isPool":"ZZ_FAMILY.IS_POOL",
            "alines":"ZZ_FAMILY.ALINES",
            "residenceType":"ZZ_FAMILY.RESIDENCE_TYPE",
            "rhyzbs":"ZZ_FAMILY.RHYZBS",
            "gId":"ZZ_FAMILY.G_ID",
            "name":"ZZ_PERSON.NAME",
            "cardNum":"ZZ_PERSON.CARD_NUM",
            "phone":"ZZ_PERSON.PHONE"
        };
    },
    getPageWithRelationNum:function(filter,order,offset,limit,callback){
        var self = this;
        this.getJoinPersonPages(filter,order,offset,limit,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillRelationNum(self.dal,res.rows,function(err,data){
                    if(data){
                        res.rows = data;
                    }
                    callback(err,res);
                });
            }
        });
    },
    _fillRelationNum:function(dal,rows,callback){
        if(rows.length == 0){
            callback(null,rows);
        }
        else{
            var whereSql = "where HZ_P_ID in ( "
            for(var i=0; i<rows.length;i++){
                whereSql+=(i==0?"":", ")+"'"+rows[0].pId+"'"+(i==rows.length-1?" )":"");
            }
            dal.execute("SELECT HZ_P_ID hzPId,COUNT(*) num FROM ZZ_FAMILY_RELATION "+whereSql+"  GROUP BY HZ_P_ID",{},{},function(err,data){
                if(data&& data.rows){
                    var cache={};
                    data["rows"].forEach(function(element) {
                        cache[element[0]] = element;
                    }, this);
                    rows.forEach(function(element) {
                        element["relationCount"] = cache[element.pId] && cache[element.pId][1];
                    }, this);
                }
                callback(err,rows);
            });
            
        }
    },
},baseAccess.prototype);
module.exports = tableAccess;
