var baseAccess = require("../baseAccess");
var departmentAccess = require(ROOT_DIR + "/common/dal/system/departmentAccess");

function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "gId":"G_ID",
            "propertyType":"PROPERTY_TYPE",
            "cqrzjType":"CQRZJ_TYPE",
            "cqId":"CQ_ID",
            "ldzId":"LDZ_ID",
            "ldzProperty":"LDZ_PROPERTY",
            "place":"PLACE",
            "addressDetail":"ADDRESS_DETAIL",
            "addressRemark":"ADDRESS_REMARK",
            "houseUse":"HOUSE_USE",
            "houseStructure":"HOUSE_STRUCTURE",
            "area":"AREA",
            "towards":"TOWARDS",
            "buildYear":"BUILD_YEAR",
            "buildingType":"BUILDING_TYPE",
            "buildingNature":"BUILDING_NATURE",
            "upFloor":"UP_FLOOR",
            "downFloor":"DOWN_FLOOR",
            "familyCount":"FAMILY_COUNT",
            "isSingleRight":"IS_SINGLE_RIGHT",
            "elevator":"ELEVATOR",
            "isFireChannel":"IS_FIRE_CHANNEL",
            "isSafetyChannel":"IS_SAFETY_CHANNEL",
            "isUnsafe":"IS_UNSAFE",
            "wgName":"WG_NAME",
            "wgCardType":"WG_CARD_TYPE",
            "wgCardNumber":"WG_CARD_NUMBER",
            "wgPerson":"WG_PERSON",
            "wgContact":"WG_CONTACT",
            "ldpzType":"LDPZ_TYPE",
            "ldpzNumber":"LDPZ_NUMBER",
            "ldpzStartDate":"LDPZ_START_DATE",
            "ldpzEndDate":"LDPZ_END_DATE",
            "tdpzType":"TDPZ_TYPE",
            "tdpzNumber":"TDPZ_NUMBER",
            "tdpzStartDate":"TDPZ_START_DATE",
            "tdpzEndDate":"TDPZ_END_DATE",
            "dataSource":"DATA_SOURCE",
        };
    },
    getTable:function(){
        return "ZZ_BUILDING";
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
        return ` ZZ_BUILDING A LEFT JOIN ZZ_PERSON B ON A.CQ_ID = B.ID LEFT JOIN ZZ_PERSON C ON A.LDZ_ID = C.ID `;
    },
    getJoinColumns:function(){
        return {
            "id":"A.ID",
            "gId":"A.G_ID",
            "propertyType":"A.PROPERTY_TYPE",
            "cqrzjType":"A.CQRZJ_TYPE",
            "cqId":"A.CQ_ID",
            "ldzId":"A.LDZ_ID",
            "ldzProperty":"A.LDZ_PROPERTY",
            "address":"(A.PLACE||A.ADDRESS_DETAIL||A.ADDRESS_REMARK)",
            "place":"A.PLACE",
            "addressDetail":"A.ADDRESS_DETAIL",
            "addressRemark":"A.ADDRESS_REMARK",
            "houseUse":"A.HOUSE_USE",
            "houseStructure":"A.HOUSE_STRUCTURE",
            "area":"A.AREA",
            "towards":"A.TOWARDS",
            "buildYear":"A.BUILD_YEAR",
            "buildingType":"A.BUILDING_TYPE",
            "buildingNature":"A.BUILDING_NATURE",
            "upFloor":"A.UP_FLOOR",
            "downFloor":"A.DOWN_FLOOR",
            "familyCount":"A.FAMILY_COUNT",
            "isSingleRight":"A.IS_SINGLE_RIGHT",
            "elevator":"A.ELEVATOR",
            "isFireChannel":"A.IS_FIRE_CHANNEL",
            "isSafetyChannel":"A.IS_SAFETY_CHANNEL",
            "isUnsafe":"A.IS_UNSAFE",
            "wgName":"A.WG_NAME",
            "wgCardType":"A.WG_CARD_TYPE",
            "wgCardNumber":"A.WG_CARD_NUMBER",
            "wgPerson":"A.WG_PERSON",
            "wgContact":"A.WG_CONTACT",
            "ldpzType":"A.LDPZ_TYPE",
            "ldpzNumber":"A.LDPZ_NUMBER",
            "ldpzStartDate":"A.LDPZ_START_DATE",
            "ldpzEndDate":"A.LDPZ_END_DATE",
            "tdpzType":"A.TDPZ_TYPE",
            "tdpzNumber":"A.TDPZ_NUMBER",
            "tdpzStartDate":"A.TDPZ_START_DATE",
            "tdpzEndDate":"A.TDPZ_END_DATE",
            "dataSource":"A.DATA_SOURCE",
            "updateDate":"A.UPDATE_DATE",
            "createDate":"A.CREATE_DATE",
            "cqName":"B.NAME",
            "cqCardNum":"B.CARD_NUM",
            "cqPhone":"B.PHONE",
            "ldzName":"C.NAME",
            "ldzCardNum":"C.CARD_NUM",
            "ldzPhone":"C.PHONE",
        };
    },
},baseAccess.prototype);
module.exports = tableAccess;
