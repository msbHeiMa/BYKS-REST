var uuidGet = require(global.ROOT_DIR + "/common/tools").uuidGet;
var async = require(global.ROOT_DIR + '/common/tools').async;
var da = require(global.ROOT_DIR +"/common/dal/dataAccess");

function getTableSch(dal, tableName, callback) {
    var querySchemas = "SELECT * FROM CIGPROXY.TABLESCH WHERE NAME='" + tableName + "'";
    dal.queryObject(querySchemas, {}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result == null) {
                callback("The table does not exist!!!");
            } else {
                var tableValue = { table: result["TABLENAME"], priId: result["ID"], creator: result["CREATOR"], primyKey: result["PRIMYKEY"] };
                return callback(null, tableValue);
            }
        }
    });
}

function getTableCreateDate(dal, tableValue, callback) {
    var splitWords = tableValue.table.split(".");
    var querySchemas = "select  to_char(created, 'yyyy-mm-dd hh24:mi:ss') from dba_objects where object_name = '" + splitWords[1] + "'";
    dal.queryScale(querySchemas, {}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result == null) {
                callback("The table does not exist!!!");
            } else {
                return callback(null, result);
            }
        }
    });
}

function getTableCols(dal, tableValue, callback) {
    var splitWords = tableValue.table.split(".");
    var queryString = "SELECT table_name as tableName, column_name as columnName, data_type as dataType,nullable as nullable,DATA_LENGTH FROM all_tab_cols WHERE owner = '" + splitWords[0] + "' and table_name = " + "'" + splitWords[1] + "'";
    dal.queryRows(queryString, {}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length == 0) {
                return callback("The table does not exist!!!");
            }
            else {
                return callback(null, result);
            }
        }
    });
}

function insertTableFiled(dal, tableValue, column, createDate, callback) {
    var tableName = tableValue.table;
    var alterLength = column.length;
    var queryFinal = "INSERT ALL ";
    var uuid=[];
    for (var i = 0; i < alterLength; i++) {
        var tempQuery = " (";
         uuid[i]=uuidGet.getUuid();
        tempQuery += "'" + uuid[i] + "',";
        tempQuery += "'" + tableName + "',";
        for (var j = 1; j < 5; j++) {
            tempQuery += (column[i][j] == "" || column[i][j] == '') ? "''," : "'" + column[i][j] + "',";
        }
        tempQuery += "(select sysdate from dual), ";
        tempQuery += "'" + tableValue.creator + "', ";
        tempQuery += "to_date('" + createDate + "','yyyy-mm-dd hh24:mi:ss') ) ";
        queryFinal += "INTO CIGPROXY.TABLEFIELD (FIELDID,TABLENAME,NAME,TYPE,NULLABLE,FIELDLEN,UPDATEDATE,CREATOR,CREATEDATE) VALUES " + tempQuery;
    }
    tableValue["uuid"]=uuid;
    queryFinal += "SELECT 1 FROM DUAL";
    dal.execute(queryFinal, {}, { autoCommit: true }, function (err, result) {
        if (err) {
            callback(err);
        } else {
            return callback(null, tableValue);
        }
    });
}

function selectcolumntype(dal, tableValue, callback) {
    var splitWords = tableValue.table.split(".");
    var queryString = "SELECT table_name, column_name, data_type FROM all_tab_cols WHERE owner = '" + splitWords[0] + "' and table_name = " + "'" + splitWords[1] + "'";
    dal.queryRows(queryString, {}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length == 0) {
                callback("The table does not exist!!!");
            }
            else {
                var columntypes = {};
                for (var i = 0; i < result.length; i++) {
                    columntypes[result[i][1]] = result[i][2];
                }
                callback(null, columntypes);
            }
        }
    });
}
function selectDomains(dal, params, tableValue, columntypes, callback) {
    var table = tableValue.table;
    var whereSql = buildQuerySql(params, tableValue, columntypes);
    var param = params.param;
    var sort = param.sort || "DOMAINNAME";
    var order = param.order || 'asc';
    var offset = param.offset || 0;
    var limit = param.limit || 20;
    limit = parseInt(offset) + parseInt(limit);
    var queryString = "SELECT * FROM " + table + " where 1=1 " + whereSql + " ORDER BY " + sort + " " + order;
    var queryFinal = "select t2.* from (select t1.*,rownum rn from (" + queryString + ")"
        + "t1 where rownum <=" + limit + ")" + "t2 where rn >" + offset;
    dal.execute(queryFinal, {}, {}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            var selectRowsFin = new Array();
            for (var j = 0; j < result.rows.length; j++) {
                selectRowsFin[j] = {};
                for (var i = 0; i < result.metaData.length; i++) {
                    if (columntypes[result.metaData[i].name] == "DATE") {
                        selectRowsFin[j][result.metaData[i].name] = new Date(result.rows[j][i]).Format("yyyy-MM-dd");
                    } else {
                        selectRowsFin[j][result.metaData[i].name] = result.rows[j][i];
                    }

                }
            }
            return callback(null, selectRowsFin);
        }
    });
}

function selectCount(dal, params, tableValue, columntypes, callback) {
    var table = tableValue.table;
    var whereSql = buildQuerySql(params, tableValue, columntypes);
    var queryNumber = "SELECT COUNT(*) as total FROM " + table + " where 1=1 " + whereSql;
    dal.queryScale(queryNumber, {}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result == null) {
                callback("query count err!!!");
            } else {
                callback(null, result);
            }
        }
    });
}

function buildQuerySql(params, tableValue, columntypes){
    var idNameLength = params.idNameLength;
    var idLength = params.idLength;
    var receiveIdName = params.idName;
    var idValue = params.id;
    var param = params.param;
    var offset = param.offset || 0,
        limit = param.limit || 20,
        search = param.search || '',
        name = param.sort,
        order = param.order || 'asc',
        sort = '';
    var table = tableValue.table;
    var priId = tableValue.primyKey;
    sort = param.sort || "DOMAINNAME";
    var idName = receiveIdName[0] || priId;
    limit = parseInt(offset) + parseInt(limit);
    var whereSql = "";
    if (search != "") {
        whereSql += " and " + idName + " like '%" + search + "%'";
    }
    if (idNameLength == 1 && idLength == 1) {
        whereSql += " and" + idName + "=" + (columntypes[idName] == "VARCHAR2" ? "'" + idValue[0] + "'" : idValue[0]);
    }
    if (idNameLength == 0 && idLength == 1) {
        whereSql += " and DOMAINNAME=" + (columntypes[priId] == "VARCHAR2" ? "'" + idValue[0] + "'" : idValue[0]);
    }
    if (idNameLength > 1 && idLength > 1) {
        for (var i = 0; i < idNameLength; i++) {
            whereSql += " and " + receiveIdName[i] + "=" + (columntypes[receiveIdName[i]] == "VARCHAR2" ? "'" + idValue[i] + "'" : idValue[i]);
        }
    }
    return whereSql;
}

function seletFIELDID(dal,tableValue,callback){
    var sql="SELECT FIELDID FROM TABLEFIELD WHERE TABLENAME='"+tableValue.table+"'";
         dal.queryRows(sql, {}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result == null) {
                callback("query fieldid err!!!");
            } else {
                callback(null, result);
            }
        }
    });
}
function insertFORMBS(dal,tableName,insertTableFiled,callback){
    var alterLength = (insertTableFiled.uuid).length,
            alterWidth = 1,
            alterName = "FIELDID",
            dataColumn = insertTableFiled.uuid;
        var insertColumn = "";
        for (var i = 0; i < alterWidth; i++) {
            if (i != alterWidth - 1)
                insertColumn += alterName + ","
            if (i == alterWidth - 1)
                insertColumn += alterName + ")";
        }
        var queryFinal = "INSERT ALL ";
        var tempQuery1 = new Array();
        var tempQuery2 = new Array();
        for (var i = 0; i < alterLength; i++) {
            tempQuery1[i] = " ('"+dataColumn[i]+"')";
        }
        for (var i = 0; i < alterLength; i++)
        { tempQuery2[i] = "INTO " + tableName + " (" + insertColumn + " VALUES " + tempQuery1[i]; }
        var tempQuery3 = '';
        for (var i = 0; i < alterLength; i++) {
            tempQuery3 += tempQuery2[i];
        }
        queryFinal = queryFinal + tempQuery3 + "SELECT 1 FROM DUAL";
        dal.execute(queryFinal, {}, { autoCommit: true }, function (err, result) {
            if (err) {
                callback(err);
            } else {
                return callback(null, result);
            }
        });

}
module.exports = {
    insertSchemas: function (params, callback) {
        var dal = da.daInstance;
        async.series([
            dal.open.bind(dal, false),
            function (callback) {
                async.autoInject({
                    "getTableSch": getTableSch.bind(null, dal, params.table),
                    "getTableCreateDate": function (getTableSch, callback) {
                        getTableCreateDate(dal, getTableSch, callback);
                    },
                    "getTableCols": function (getTableSch, callback) {
                        getTableCols(dal, getTableSch, callback);
                    },
                    "insertTableFiled": function (getTableSch, getTableCols, getTableCreateDate, callback) {
                        insertTableFiled(dal, getTableSch, getTableCols, getTableCreateDate, callback)
                    },
                    "insertFORM":function(insertTableFiled,callback){
                        insertFORMBS(dal,"FORMFIELD",insertTableFiled,callback);
                    },
                    "insertBS":function(insertTableFiled,callback){
                        insertFORMBS(dal,"BSTABLEFIELD",insertTableFiled,callback);
                    },
                    "seletFIELDID":function(insertBS,insertFORM,getTableSch,insertTableFiled,callback){
                        seletFIELDID(dal,getTableSch,callback);
                    }
                }, callback);
            }
        ],
            function (err, res) {
                dal.close(function () { });
                callback(err, res && res[1]);
            });
    },
    selectdomain: function (params, callback) {
        var dal = da.daInstance;
        async.series([
            dal.open.bind(dal, false),
            function (callback) {
                async.autoInject({
                    "getTableSch": getTableSch.bind(null, dal, params.table),
                    "selectcolumntype": function (getTableSch, callback) {
                        selectcolumntype(dal, getTableSch, callback);
                    },
                    "selectDomains": function (getTableSch, selectcolumntype, callback) {
                        selectDomains(dal, params, getTableSch, selectcolumntype, callback);
                    },
                    "selectCount": function (getTableSch, selectcolumntype, callback) {
                        selectCount(dal, params, getTableSch, selectcolumntype, callback);
                    }
                }, callback);
            }
        ],
            function (err, res) {
                dal.close(function () { });
                if (err) {
                    callback(err, res);
                } else {
                    var domains = res[1]["selectDomains"];
                    var total = res[1]["selectCount"];
                    var rows = {};
                    for (var i = 0; i < domains.length; i++) {
                        if (rows[domains[i]["DOMAINNAME"]] == null) {
                            rows[domains[i]["DOMAINNAME"]] = [];
                        }
                        var newDomain = {};
                        //rows[domains[i]["DOMAINNAME"]].push(domains[i]);
                        rows[domains[i]["DOMAINNAME"]].push({ "DOMAINNAME": domains[i]["DOMAINNAME"], "KEY": domains[i]["KEY"], "VALUE": domains[i]["VALUE"] });
                    }
                    callback(err, { "total": total, "rows": rows });
                }
            });
    }
}
