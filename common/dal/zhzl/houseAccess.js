var baseAccess = require("../baseAccess");
var departmentAccess = require(ROOT_DIR + "/common/dal/system/departmentAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "bId":"B_ID",
            "unit":"UNIT",
            "floor":"FLOOR",
            "houseNumber":"HOUSE_NUMBER",
            "propertyType":"PROPERTY_TYPE",
            "cqrzjType":"CQRZJ_TYPE",
            "cqId":"CQ_ID",
            "houseLayout":"HOUSE_LAYOUT",
            "houseArea":"HOUSE_AREA",
            "houseType":"HOUSE_TYPE",
            "houseSource":"HOUSE_SOURCE",
            "houseUse":"HOUSE_USE",
            "fwpzType":"FWPZ_TYPE",
            "fwpzNumber":"FWPZ_NUMBER",
            "fwpzStartDate":"FWPZ_START_DATE",
            "fwpzEndDate":"FWPZ_END_DATE",
            "tdpzType":"TDPZ_TYPE",
            "tdpzNumber":"TDPZ_NUMBER",
            "tdpzStartDate":"TDPZ_START_DATE",
            "tdpzEndDate":"TDPZ_END_DATE",
            "dataSource":"DATA_SOURCE",
        };
    },
    getTable:function(){
        return "ZZ_HOUSE";
    },
    _fillGridName:function(rows,callback){
        var dal = new departmentAccess(this.operater,this.dal);
        if(rows.length == 0){
            callback(null,rows);
        }
        else{
            var filter = {
                departmentId:rows.map(function(sch){return sch.gId})
            };
            dal.getObjects(filter,null,function(err,data){
                if(data){
                    var cache={};
                    data.forEach(function(element) {
                        cache[element.departmentId] = element;
                    }, this);
                    rows.forEach(function(element) {
                        element["gridName"] = cache[element.gId] && cache[element.gId].displayName;
                    }, this);
                }
                callback(err,rows);
            });
        }
    },
    getObjectWithGridName:function(filter,callback){
        var self = this;
        this.getJoinObject(filter,function(err,res){
            if(err || !res)callback(err,null);
            else{
                self._fillGridName([res],function(err,data){
                    callback(err,data&&data[0]);
                });
            }
        });
    },
    getObjectsWithGridName:function(filter,order,callback){
        var self = this;
        this.getJoinObjects(filter,order,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillGridName(res,callback);
            }
        });
    },
    getPageWithGridName:function(filter,order,offset,limit,callback){
        var self = this;
        this.getJoinPages(filter,order,offset,limit,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillGridName(res.rows,function(err,data){
                    if(data){
                        res.rows = data;
                    }
                    callback(err,res);
                });
            }
        });
    },
    /**
     * 获取关联表的分页查询
     */
    getJoinPages:function(filter,order,offset,limit,callback){
        var columns = this.getJoinColumns();
        var table = this.getJoin();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order,columns);
        this.innerGetPage(offset,limit,table,fields,where,orderStr,callback);
    },
    /**
     * 获取关联查询的多行数据
     */
    getJoinObjects:function(filter,order,callback){
        var columns = this.getJoinColumns();
        var table = this.getJoin();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        var orderStr = this.buildOrder(order);
        this.innerGetObjects(table,fields,where,orderStr,callback);
    },
    /**
     * 获取关联查询的第一个结果，回掉返回该对象
     */
    getJoinObject:function(filter,callback){
        var columns = this.getJoinColumns();
        var table = this.getJoin();
        var where = this.buildWhere(filter,columns);
        var fields = this.buildSelectFields(columns);
        this.innerGetObject(table,fields,where,callback);
    },
    getJoin:function(){
        return ` (SELECT ZZ_HOUSE.ID,ZZ_HOUSE.B_ID,ZZ_HOUSE.UNIT,ZZ_HOUSE.FLOOR,ZZ_HOUSE.HOUSE_NUMBER,ZZ_HOUSE.HOUSE_LAYOUT,
        ZZ_HOUSE.HOUSE_AREA,ZZ_HOUSE.HOUSE_SOURCE,ZZ_HOUSE.DATA_SOURCE,ZZ_HOUSE.CREATE_DATE,ZZ_HOUSE.UPDATE_DATE,
        ZZ_BUILDING.IS_SINGLE_RIGHT,ZZ_BUILDING.G_ID,ZZ_BUILDING.PLACE,ZZ_BUILDING.ADDRESS_DETAIL,ZZ_BUILDING.ADDRESS_REMARK,
        (ZZ_BUILDING.PLACE||ZZ_BUILDING.ADDRESS_DETAIL||ZZ_BUILDING.ADDRESS_REMARK) AS ADDRESS,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.PROPERTY_TYPE ELSE ZZ_HOUSE.PROPERTY_TYPE END) AS PROPERTY_TYPE,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.CQRZJ_TYPE ELSE ZZ_HOUSE.CQRZJ_TYPE END) AS CQRZJ_TYPE,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.CQ_ID ELSE ZZ_HOUSE.CQ_ID END) AS CQ_ID,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.BUILDING_TYPE ELSE ZZ_HOUSE.HOUSE_TYPE END) AS HOUSE_TYPE,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.HOUSE_USE ELSE ZZ_HOUSE.HOUSE_USE END) AS HOUSE_USE,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.LDPZ_TYPE ELSE ZZ_HOUSE.FWPZ_TYPE END) AS FWPZ_TYPE,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.LDPZ_NUMBER ELSE ZZ_HOUSE.FWPZ_NUMBER END) AS FWPZ_NUMBER,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.LDPZ_START_DATE ELSE ZZ_HOUSE.FWPZ_START_DATE END) AS FWPZ_START_DATE,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.LDPZ_END_DATE ELSE ZZ_HOUSE.FWPZ_END_DATE END) AS FWPZ_END_DATE,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.TDPZ_TYPE ELSE ZZ_HOUSE.TDPZ_TYPE END) AS TDPZ_TYPE,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.TDPZ_NUMBER ELSE ZZ_HOUSE.TDPZ_NUMBER END) AS TDPZ_NUMBER,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.TDPZ_START_DATE ELSE ZZ_HOUSE.TDPZ_START_DATE END) AS TDPZ_START_DATE,
        (CASE WHEN ZZ_BUILDING.IS_SINGLE_RIGHT = '1' THEN ZZ_BUILDING.TDPZ_END_DATE ELSE ZZ_HOUSE.TDPZ_END_DATE END) AS TDPZ_END_DATE 
        FROM ZZ_HOUSE inner join ZZ_BUILDING on ZZ_HOUSE.B_ID = ZZ_BUILDING.ID ) A inner join ZZ_PERSON ON A.CQ_ID = ZZ_PERSON.ID `;
    },
    getJoinColumns:function(){
        return {
            "id":"A.ID",
            "bId":"A.B_ID",
            "unit":"A.UNIT",
            "floor":"A.FLOOR",
            "houseNumber":"A.HOUSE_NUMBER",
            "propertyType":"A.PROPERTY_TYPE",
            "cqrzjType":"A.CQRZJ_TYPE",
            "cqId":"A.CQ_ID",
            "houseLayout":"A.HOUSE_LAYOUT",
            "houseArea":"A.HOUSE_AREA",
            "houseType":"A.HOUSE_TYPE",
            "houseSource":"A.HOUSE_SOURCE",
            "houseUse":"A.HOUSE_USE",
            "fwpzType":"A.FWPZ_TYPE",
            "fwpzNumber":"A.FWPZ_NUMBER",
            "fwpzStartDate":"A.FWPZ_START_DATE",
            "fwpzEndDate":"A.FWPZ_END_DATE",
            "tdpzType":"A.TDPZ_TYPE",
            "tdpzNumber":"A.TDPZ_NUMBER",
            "tdpzStartDate":"A.TDPZ_START_DATE",
            "tdpzEndDate":"A.TDPZ_END_DATE",
            "dataSource":"A.DATA_SOURCE",
            "gId":"A.G_ID",
            "address":"A.ADDRESS",
            "place":"A.PLACE",
            "addressDetail":"A.ADDRESS_DETAIL",
            "addressRemark":"A.ADDRESS_REMARK",
            "cqName":"ZZ_PERSON.NAME",
            "cqCardNum":"ZZ_PERSON.CARD_NUM",
            "cqPhone":"ZZ_PERSON.PHONE",
            "createDate":"A.CREATE_DATE",
            "updateDate":"A.UPDATE_DATE",
            "isSingleRight":"A.IS_SINGLE_RIGHT"
        };
    },
},baseAccess.prototype);
module.exports = tableAccess;
