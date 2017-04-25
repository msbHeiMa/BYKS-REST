/******************************************************************************
 *
 * NAME
 *   baseAccess.js
 *
 * DESCRIPTION
 * 处理数据库中的某一个表。
 * 
 * 继承该类重写 getHasBase4Column、getColumns、getTable 方法，得到对该表操作的类
 * 
 * 继承示例如下：
 * var testAccess = unit.inherits({
 *      getHasBase4Column:function(){
 *          return false;
 *      },
 *      getColumns:function(){
 *          return {
 *              id:"ID",
 *              testName:"TEST_NAME"
 *          };
 *      },
 *      getTable:function(){
 *          return "ZZ_TEST";
 *      }
 * });
 * 
 * 使用示例如下
 * var dal = new dataAccess();
 * var testAcc = new testAccess(curUser,dal);
 * dal.open(false,function(){
 *      testAcc.getPage({id:1},{testName:"desc"},0,10,function(){
 *      });
 *      testAcc.getObjects({id:1},{testName:"desc"},function(){
 *      });
 *      testAcc.getObject({testName:{type:'like',vals:'%哈哈%'}}},function(){
 *      });
 *      testAcc.insert({id:1,testName:"123"},function(){
 *      });
 *      testAcc.update({id:1},{testName:"123"},function(){
 *      });
 *      testAcc.delete({id:1},function(){
 *      });
 * });
 * 
 * filter 规范见 buildWhere
 * order 规范见 buildOrder
 *
 *****************************************************************************/
var dataAccess = require("./dataAccess").dataAccess;
var async = require(ROOT_DIR + "/common/tools").async;


/**
 * @description 数据库操作的构造函数
 * @param {ZZUser} operater 当前登陆的后台用户，可以为null
 * @param {Object} dal 当前使用的数据库链接，为空则为默认值new dataAccess()
 */
function baseAccess(operater, dal) {
    this.operater = operater;
    if (dal == null) {
        dal = new dataAccess();
    }
    this.dal = dal;
}
baseAccess.prototype = {
    /**
     * @description 是否包括基础4个字段 CREATE_DATE CREATE_USER UPDATE_DATE UPDATE_USER，由继承类实现，默认为true
     */
    getHasBase4Column: function () {
        return true;
    },
    /**
     * @description 返回包含哪些列，如果返回的是对象，key为别名，value为数据库字段名，由继承类实现
     */
    getColumns: function () {
        return "*";
    },
    /**
     * @description 返回当前操作的表名，由继承类实现
     */
    getTable: function () {
        return "";
    },
    /**
     * @description 设置getObjects是否受maxRow限制 ，为false时表示不限制，默认为限制
     * @param {boolean} limit 为false时表示不限制，默认为限制
     */
    setRowLimit: function (limit) {
        this._limitRow = limit;
    },
    /**
     * @description 打开引用的dal
     * @param {boolean} trans 是否打开事务
     * @param {AsyncCallback} callback
     */
    open: function (trans, callback) {
        this.dal.open(trans, callback);
    },
    /**
     * @description 提交引用的dal
     * @param {AsyncCallback} callback
     */
    commit: function (callback) {
        this.dal.commit(callback);
    },
    /**
     * @description 回滚引用的dal
     * @param {AsyncCallback} callback
     */
    rollback: function (callback) {
        this.dal.rollback(callback);
    },
    /**
     * @description 关闭引用的dal
     * @param {AsyncCallback} callback
     */
    close: function (callback) {
        this.dal.close(callback);
    },
    /**
     * @description 获取分页查询的结果，回掉返回{rows:[],total:10}
     * @param {Object} filter
     * @param {Array|String|Object} order
     * @param {String|Number} offset
     * @param {String|Number} limit
     * @param {AsyncCallback} callback
     */
    getPage: function (filter, order, offset, limit, callback) {
        var where = this.buildWhere(filter);
        var table = this.getTable();
        var fields = this.buildSelectFields();
        var orderStr = this.buildOrder(order);
        this.innerGetPage(offset, limit, table, fields, where, orderStr, callback);
    },
    innerGetPage: function (offset, limit, table, fields, where, orderStr, callback) {
        var maxRowNum = offset + limit;
        var countSql = `select count(1) from ${table} ${where.part}`;
        var pageSql = `select t2.* from (
            select t1.*,rownum rn from (
                select ${fields} from ${table} ${where.part} ${orderStr}
            )   t1 where rownum <= ${maxRowNum}
        ) t2 where rn > ${offset}`;
        var options = { maxRows: (parseInt(limit) || 500) };
        async.auto({
            rows: this.dal.queryObjects.bind(this.dal, pageSql, where.params, options),
            total: this.dal.queryScale.bind(this.dal, countSql, where.params)
        }, function (err, res) {
            if (res) {
                res.total = res.total || 0;
            }
            callback(err, res);
        });
    },
    getObjects: function (filter, order, callback) {
        var where = this.buildWhere(filter);
        var table = this.getTable();
        var fields = this.buildSelectFields();
        var orderStr = this.buildOrder(order);
        this.innerGetObjects(table, fields, where, orderStr, callback);
    },
    innerGetObjects: function (table, fields, where, orderStr, callback) {
        var sql = `select ${fields} from ${table} ${where.part} ${orderStr}`;
        var options = { maxRows: (this._limitRow === false ? 10000 : 500) };
        this.dal.queryObjects(sql, where.params, options, callback);
    },
    /**
     * @description 获取查询的第一个结果，回掉返回该对象
     * @param {Object} filter
     * @param {Array|String|Object} order
     * @param {AsyncCallback} callback
     */
    getObject: function (filter, callback) {
        var where = this.buildWhere(filter);
        var table = this.getTable();
        var fields = this.buildSelectFields();
        this.innerGetObject(table, fields, where, callback);
    },
    innerGetObject: function (table, fields, where, callback) {
        var sql = `select ${fields} from ${table} ${where.part}`;
        this.dal.queryObject(sql, where.params, callback);
    },
    /**
     * @description 更新行记录
     * @param {Object} attrs 需要更新的属性
     * @param {Object} filter
     * @param {AsyncCallback} callback
     */
    update: function (attrs, filter, callback) {
        if (this.getHasBase4Column()) {
            attrs = this._mixinUpdateFields(attrs);
        }
        var where = this.buildWhere(filter);
        var table = this.getTable();
        var attrUpdate = this.buildAttrUpdate(attrs);
        var sql = `update ${table} set ${attrUpdate.part} ${where.part}`;
        this.dal.executeNonQuery(sql, unit.mixin(where.params, attrUpdate.params), {}, callback);
    },
    _mixinUpdateFields: function (attrs) {
        if (!attrs["UPDATE_DATE"]) {
            attrs["UPDATE_DATE"] = new Date().Format("yyyy-MM-dd hh:mm:ss");
        }
        if (!attrs["UPDATE_USER"]) {
            attrs["UPDATE_USER"] = this.operater ? this.operater.userName : "系统";
        }
        return attrs;
    },
    /**
     * @description 新增行记录
     * @param {Object} obj 插入数据的所有属性
     * @param {AsyncCallback} callback
     */
    insert: function (obj, callback) {
        if (this.getHasBase4Column()) {
            obj = this._mixinInsertFields(obj);
        }
        var table = this.getTable();
        var insert = this.buildInsert(obj);
        var sql = `insert into ${table} (${insert.fieldPart}) values (${insert.valuePart})`;
        this.dal.executeNonQuery(sql, insert.params, {}, callback);
    },
    buildInsert: function (obj, columns) {
        if (!columns) {
            columns = this.getColumns();
        }
        if (typeof (columns) == "string") {
            columns = {};
        }
        else if (typeof (columns) == "object") {
        }
        else {
            throw new Error("不支持的列类型");
        }
        var fieldParts = [];
        var valParts = [];
        var params = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var val = obj[key];
                var col = columns[key] ? columns[key] : key;
                fieldParts.push(`${col}`);
                valParts.push(`:in_${key}`);
                params[`in_${key}`] = typeof (val) == "undefined" ? null : val;
            }
        }
        return {
            fieldPart: fieldParts.join(','),
            valuePart: valParts.join(','),
            params: params
        };
    },
    _mixinInsertFields: function (obj) {
        if (!obj["CREATE_DATE"]) {
            obj["CREATE_DATE"] = new Date().Format("yyyy-MM-dd hh:mm:ss");
        }
        // if (!obj["CREATE_USER"]) {
        //     obj["CREATE_USER"] = this.operater ? this.operater.userName : "系统";
        // }
        return obj;
    },
    delete: function (filter, callback) {
        var where = this.buildWhere(filter);
        var table = this.getTable();
        var sql = `delete from ${table} ${where.part}`;
        this.dal.executeNonQuery(sql, where.params, {}, callback);
    },
    /**
     * @description 获取已经掉通配符的like参数  例如要查询名称中包含%的记录，filter应为{ name:{type:"like",vals:"%"+acc.replaceLikeWildcards("%")+"%"} }
     * @param {String} str like参数
     * @returns {String}
     */
    replaceLikeWildcards: function (str) {
        //将like的值里面的 % _ [ ] ! 转译
        "\\\\ % _ \\[ \\] !".split(" ").forEach(function (element) {
            str = str.replace(new RegExp(element, 'g'), "\\" + element);
        }, this);
        return str;
    },
    _innerBuildWhereParts: function (type, column, key, depth, vals) {
        type = type.toLowerCase();
        var params = {};
        var part = "";
        switch (type) {
            case "null":
            case "not null":
                part = `${column} is ${type}`;
                break;
            case "like":
            case "not like":
                part = `${column} ${type} :wh_p_${key}_${depth} escape '\\'`;
                params[`wh_p_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals;
                break;
            case "bitand":
                part = `bitand (:wh_p1_${key}_${depth},${column})= :wh_p2_${key}_${depth} `;
                params[`wh_p1_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[0];
                params[`wh_p2_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[1];
                break;
            case "upper_bitand":
                part = `bitand (:wh_p1_${key}_${depth},A4_SYS_DEPARTMENTLEVEL.maxnumber)= ${column} `;
                params[`wh_p1_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[0];
                break;
            case "<>":
            case "!=":
                part = `${column} ${type} :wh_p_${key}_${depth}`;
                params[`wh_p_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals;
                break;
             case "or":
                part = `${column}=:wh_p1_${key}_${depth} ${type} ${column}=:wh_p2_${key}_${depth}`;
                params[`wh_p1_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[0];
                params[`wh_p2_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[1];
                break;
            //判断小于某个值的
            case "<=":
                part = `${column} ${type} :wh_p_${depth}`;
                params[`wh_p_${depth}`] = typeof (vals) == "undefined" ? null : vals;
                break;
            //判断介于两个日期之间
            case "between":
                part = `${column}  ${type} :wh_p1_${key}_${depth} AND :wh_p2_${key}_${depth}`;
                params[`wh_p1_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[0];
                params[`wh_p2_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[1];
                break;
            //判断介于两个数值之间
            case "bt_sz":
                part = `${column} BETWEEN :wh_p1_${key}_${depth} AND :wh_p2_${key}_${depth}`;
                params[`wh_p1_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[0];
                params[`wh_p2_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[1];
                break;
            //将时间戳变为yyyy-mm-dd格式进行判断(精确到天)
            case "todate":
                part = `TO_CHAR (TO_DATE (${column}),'yyyy-mm-dd') = :wh_p_${key}_${depth}`;
                params[`wh_p_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals;
                break;
            //将时间戳变为yyyy-mm-dd HH24格式进行判断(精确到小时 24小时制)
            case "todate_HH":
                part = `TO_CHAR (TO_DATE (${column}),'yyyy-mm-dd HH24') = :wh_p_${key}_${depth}`;
                params[`wh_p_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals;
                break;
            //查询数据中某个值最大的一条数据  
            case "ny_max":
                part = `${column}= (select MAX(${column}) from DP_NYHYCZ where AREA = :wh_p1)`;
                params[`wh_p1`] = typeof (vals) == "undefined" ? null : vals;
                break;
            case "zyjj_max":
                part = `${column}= (select MAX(${column}) from DP_ZYJJZB where AREA = :wh_p1)`;
                params[`wh_p1`] = typeof (vals) == "undefined" ? null : vals;
                break;
            case "gmys_max":
                part = `${column}= (select MAX(${column}) from DP_GMYSGYCZ where AREA = :wh_p1)`;
                params[`wh_p1`] = typeof (vals) == "undefined" ? null : vals;
                break;
            case "gdp_max":
                part = `${column}= (select MAX(${column}) from DP_GDPTJ where AREA = :wh_p1)`;
                params[`wh_p1`] = typeof (vals) == "undefined" ? null : vals;
                break;
            case "gdpnocx_max":
                part = `${column}= (select MAX(${column}) from DP_GDPTJ where AREA != :wh_p1)`;
                params[`wh_p1`] = typeof (vals) == "undefined" ? null : vals;
                break;
            case "gdpnodq_max":
                part = `${column}= (select MAX(${column}) from DP_GDPTJ)`;
                break;
            case "cjwk_max":
                part = `${column}= (select MAX(${column}) from DP_CZJRWZJMKZPTJ where AREA = :wh_p1)`;
                params[`wh_p1`] = typeof (vals) == "undefined" ? null : vals;
                break;
            case "snw_max":
                part = `${column}= (select MAX(${column}) from DP_SNWTLDQCZ)`;
                break;
            case "ranking_or":
                part = `${column} =:wh_p1_${key}_${depth} AND SF != '浙江省' OR AREA = '长兴县' AND ${column}= :wh_p1_${key}_${depth} `;
                params[`wh_p1_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals;
                break;
            case "snw_or":
                part = ` ${column} != :wh_p1_${key}_${depth} OR AREA = :wh_p2_${key}_${depth} `;
                params[`wh_p1_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[0];
                params[`wh_p2_${key}_${depth}`] = typeof (vals) == "undefined" ? null : vals[1];
                break;
            case "in":
            case "not in":
                if (!Array.isArray(vals)) {
                    vals = [vals];
                }
                if (vals.length == 0) {
                    var transType = type == "in" ? "null" : "not null";
                    part = `${column} is ${transType}`;
                }
                else {
                    var tmpParts = vals.map(function (val, index) {
                        params[`wh_p_${key}_${depth}_${index}`] = typeof (val) == "undefined" ? null : val;
                        return `:wh_p_${key}_${depth}_${index}`;
                    }, this);
                    var tmpPartsStr = tmpParts.join(",");
                    part = `${column} ${type} (${tmpPartsStr})`;
                }
                break;

            default:
                part = type;
                for (var key1 in vals) {
                    if (vals.hasOwnProperty(key1)) {
                        var val = vals[key1];
                        params[key1] = val;
                    }
                }
                break;
        }
        return {
            part: part,
            params: params
        }
    },
    _innerBuildWhere: function (filter, depth, columns) {
        var whereParts = [];
        var partStr = "";
        var partParams = {};
        depth = depth || 0;
        if (!columns) {
            columns = this.getColumns();
        }
        if (typeof (columns) == "string") {
            columns = {};
        }
        else if (typeof (columns) == "object") {
        }
        else {
            throw new Error("不支持的列类型");
        }
        for (var key in filter) {
            if (filter.hasOwnProperty(key)) {
                var element = filter[key];
                if (key.toLowerCase() == "and"
                    || key.toLowerCase() == "or") {
                    var sub = this._innerBuildWhere(element, depth + 1, columns);
                    if (sub.parts.length) {
                        partParams = unit.mixin(partParams, sub.params);
                        whereParts.push("(" + sub.parts.join(` ${key} `) + ")");
                    }
                }
                else if (key.toLowerCase() == "not") {
                    var sub = this._innerBuildWhere(element, depth + 1, columns);
                    if (sub.parts.length) {
                        partParams = unit.mixin(partParams, sub.params);
                        whereParts.push("not (" + sub.parts.join(` and `) + ")");
                    }
                }
                else {
                    var eleType = typeof element;
                    var column = columns[key] ? columns[key] : key;
                    key = key.replace('.', '_');//如果column中没有filter需要的字段，替换filter中TABLENAME.COLUMN

                    switch (eleType) {
                        case "string":
                        case "number":
                        case "undefined":
                            partParams[`wh_${key}_${depth}`] = typeof (element) == "undefined" ? null : element;
                            whereParts.push(`${column} = :wh_${key}_${depth}`);
                            break;
                        case "object":
                            var sub1 = {};
                            if (Array.isArray(element)) {
                                sub1 = this._innerBuildWhereParts("in", column, key, depth, element);
                            }
                            else {
                                var type = element.type;
                                var vals = element.vals;
                                sub1 = this._innerBuildWhereParts(type, column, key, depth, vals);
                            }
                            partParams = unit.mixin(partParams, sub1.params);
                            whereParts.push(sub1.part);
                            break;
                        default:
                            break;
                    }
                }
            }
        }
        return {
            parts: whereParts,
            params: partParams
        };
    },
    /**
     * @description 将传入对象转换为where条件
     * 
     * 例如 filter:{
     *  "column1":"a",
     *  "or":{
     *      "column2":1,
     *      "column3":[1,2,3],
     *      "and":{
     *          "column4":{
     *              "type":"not like",
     *              "vals":"%a%"
     *          },
     *          "column5":{
     *              "type":"not in",
     *              "vals":[3,4,5]
     *          }
     *      },
     *      "not":{
     *          "column6":10,
     *          "column7":1,
     *      }
     *  }
     * }
     * 将转换为 where column1='a' and (
     *  column2 = 1
     *  or column3 in (1,2,3)
     *  or (
     *      column4 not like '%a%'
     *      and column5 not in (3,4,5)
     *  )
     *  or not (
     *      column6 = 10
     *      and column7 = 1
     *  )
     * )
     */
    buildWhere: function (filter, columns) {
        var res = this._innerBuildWhere(filter, 0, columns);
        if (res.parts.length) {
            res.part = "where " + res.parts.join(" and ");
        }
        else {
            res.part = "";
        }
        return res;
    },
    /**
     * 例如 
     * order1 = [
     *  "CREATE_DATE desc",
     *  "CREATE_USER asc"
     * ]
     * order2 = [
     *  {"CREATE_DATE":"desc"},
     *  {"CREATE_USER":"asc"}
     * ]
     * order2 = [
     *  {"CREATE_DATE":"desc"},
     *  {"CREATE_USER":"asc"}
     * ]
     * order3 = [
     *  {"CREATE_DATE":false},
     *  {"CREATE_USER":true}
     * ]
     * order4 = "CREATE_DATE desc,CREATE_USER asc"
     * 四种类型都会转换为 order by CREATE_DATE desc,CREATE_USER asc
     */
    buildOrder: function (order) {
        if (order) {
            var orderType = Array.isArray(order) ? "array" : typeof order;
            switch (orderType) {
                case "array":
                    var parts = order.map(this._innerBuildOrder.bind(this));
                    return parts.length == 0 ? "" : ("order by " + parts.join(","));
                default:
                    var part = this._innerBuildOrder(order);
                    return !part ? "" : ("order by " + part);
            }
        }
        else {
            return "";
        }
    },
    _innerBuildOrder: function (orderItem) {
        var columns = this.getColumns();
        if (typeof (columns) == "string") {
            columns = {};
        }
        else if (typeof (columns) == "object") {
        }
        else {
            throw new Error("不支持的列类型");
        }
        var orderType = typeof orderItem;
        switch (orderType) {
            case "object":
                for (var key in orderItem) {
                    if (orderItem.hasOwnProperty(key)) {
                        var col = columns[key] ? columns[key] : key;
                        var orderType = orderItem[key];
                        orderType = (orderType == "desc" || orderType === false) ? "desc" : "asc";
                        return `${col} ${orderType}`;
                    }
                }
                return "";
            default:
                break;
        }
        return orderItem.toString();
    },
    buildSelectFields: function (columns) {
        if (!columns) {
            columns = this.getColumns();
        }
        if (typeof (columns) == "string") {
            return columns;
        }
        else if (typeof (columns) == "object") {
            var colStrs = [];
            for (var key in columns) {
                if (columns.hasOwnProperty(key)) {
                    colStrs.push(`${columns[key]} as "${key}"`);
                }
            }
            return colStrs.join(",");
        }
        else {
            throw new Error("不支持的列类型");
        }
    },
    buildAttrUpdate: function (attrs, columns) {
        if (!columns) {
            columns = this.getColumns();
        }
        if (typeof (columns) == "string") {
            columns = {};
        }
        else if (typeof (columns) == "object") {
        }
        else {
            throw new Error("不支持的列类型");
        }
        var attrSetParts = [];
        var attrParams = {};
        for (var key in attrs) {
            if (attrs.hasOwnProperty(key)) {
                var val = attrs[key];
                var col = columns[key] ? columns[key] : key;
                attrSetParts.push(`${col} = :up_${key}`);
                attrParams[`up_${key}`] = typeof (val) == "undefined" ? null : val;
            }
        }
        return {
            part: attrSetParts.join(","),
            params: attrParams
        }
    },
    /**
     * @description 对某一列进行增加或减少操作，相当于 update table set a = a+1  这类操作避免并发时更新值不正确
     * @param {Object} filter 
     * @param {String} column 要更新的列，可以是别名
     * @param {Number} value 要增加的数量，如果要减少，传入负值
     * @param {AsyncCallback} callback 
     */
    increaseColumn: function (filter, column, value, callback) {
        var columns = this.getColumns();
        if (typeof (columns) == "string") {
            columns = {};
        }
        else if (typeof (columns) == "object") {
        }
        else {
            throw new Error("不支持的列类型");
        }
        var col = columns[column] ? columns[column] : column;
        var where = this.buildWhere(filter);
        var table = this.getTable();
        var sql = `update ${table} set ${col} = ${col} + :up_value ${where.part}`;
        this.dal.executeNonQuery(sql, unit.mixin({ "up_value": value }, where.params), {}, callback);
    }
};
module.exports = baseAccess;
