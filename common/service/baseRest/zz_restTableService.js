var async = require('../tools').async;
var da = require("../dal/dataAccess");
var restMethodParam = require("../unit/restMethodParam");


function getSchParams(dal, tableName, callback) {
    var querySchemas = "SELECT * FROM CIGPROXY.TABLESCH WHERE name='" + tableName + "'";
    dal.queryRows(querySchemas, {}, function (err, result) {
        if (err) {
            callback(err);
        } else {
            if (result.length == 0) {
              callback("The table is not exist!!!");
            }
            if (result.length != 0) {
                callback(null, [result[0][2], result[0][3], result[0][10],result[0][4],result[0][9]]);
            }
        }
    }
    );
}
function getColumntype(dal, tableParams, callback) {//tableParams[0]:"CIGPROXY.APP"表名 [1]:"APPID"主键 [2]:null视图  [3]:error
        var selectcolumntype = {};
        var splitWords = tableParams[0].split(".");
        var owner = splitWords[0];
        var tableName = splitWords[1];
        var viewConfig_table=tableParams[4].split("/");
        var viewConfig_field=[];
        var viewTables=[];
        for(var i=0;i<viewConfig_table.length;i++){
            viewConfig_field[i]=viewConfig_table[i].split(":");
            viewTables[i]=viewConfig_field[i][0];
        }
        var viewConfig_fieldName=[];
        for(var i=0;i<viewConfig_table.length;i++){
            viewConfig_fieldName[i]=viewConfig_field[i][1].split(";");
        }
        var queryType="SELECT table_name,column_name,data_type FROM all_tab_cols WHERE";
        var queryString="";
        var view_string=[];
        var columnString=new Array(viewTables.length);
        for(var i=0;i<viewTables.length;i++){
            columnString[i]="";
                if(viewConfig_fieldName[i][0]=="*"){
                    view_string[i]="(table_name='"+viewTables[i]+"')";
                }
                else{
                    for(var j=0;j<viewConfig_fieldName[i].length;j++){
                             columnString[i]+="COLUMN_NAME='"+viewConfig_fieldName[i][j]+"'";
                             if(j<viewConfig_fieldName[i].length-1){
                                 columnString[i]+=" OR ";
                             }
                    }
                    view_string[i]="(table_name='"+viewTables[i]+"' AND("+columnString[i]+" ))";
                }
                queryString+=view_string[i];
                if(i<viewTables.length-1){
                    queryString+=" OR ";
                }
        }
       var queryType ="SELECT table_name,column_name,data_type FROM all_tab_cols WHERE"+queryString;
//        var queryType="SELECT table_name,column_name,data_type FROM all_tab_cols WHERE table_name = 'NODE'  or ( table_name = 'APP' AND COLUMN_NAME='NAME')";
//      var queryType = "SELECT table_name, column_name, data_type FROM all_tab_cols WHERE owner = '" + owner + "' and table_name = " + "'" + tableName + "'";
        dal.queryRows(queryType, {}, function (err, result) {
            if (err) {
                callback(err);
            } else {
                if(result.length == 0){
                    callback("The table column type is not exist!!!");
                }
                else{
                for (var i = 0; i < result.length; i++) {
                    selectcolumntype[result[i][1]] = result[i][2];
                }
                callback(null, selectcolumntype);}
            }
        });
    }
function getCount(dal, queryString, callback) {
        dal.queryRows(queryString[0], {}, function (err, result) {
            if (err) {
                queryString[2] = err.message;
                callback(err, queryString[2]);
            } else {
                callback(null, result[0][0]);
            }
        });
};
function getRows(dal,columntype, queryString, callback) {
        var dataColumnType =columntype;
        dal.queryObjects(queryString[1], {}, function (err, result) {
            if (err) {
                return callback(err);
            } else {        
                callback(null, result);
            }
        });
};
function modifyRows(dal, queryString, errString,callback) {
        dal.queryObjects(queryString, {}, function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                if (result.rowsAffected == 0) {
                    callback(errString);
                }
                else {
                    callback(null,result.rowsAffected);
                }
            }
        });
};

function getTableField(dal,queryTableField,callback) {
 //   var queryTableField = "SELECT * FROM CIGPROXY.TABLEFIELD WHERE TABLENAME= " + "'" + tableName + "'";
    dal.queryObjects(queryTableField, {}, function (err, result) {
         if (err) {
            callback(err);
        } else {
          return callback(null,result);
        }
    });
}
function getAllObjects(dal,queryString,callback){
    dal.queryObjects(queryString,{},function (err, result) {
            if (err) {
                return callback(err);
            } else {
                if(result.length==0){result=null;}
                callback(null,result);
            }
        });
    }

function insertAddData(user,params,queryParam){
    var receiveBody=params.receiveBody;
    receiveBody.inDataWidth+=3;
    var getUuid = require(global.ROOT_DIR + '/common/unit/uuidGet');
    var insertId=[];
    var departmentId=[];
    var data=[];
        for (var i = 0; i < receiveBody.inDataLength; i++) {
            insertId[i] = getUuid.getUuid();
            insertId[i]="'"+ insertId[i]+"'";
            departmentId[i]=user[1];
            data[i]="(select sysdate from dual)";
        }
    var column=[];
    column[0]=queryParam[1];
    for(var i=0;i<receiveBody.inDataWidth-3;i++){
        column.push(receiveBody.column[i]);
    }
    column.push("CREATE_USER");
    column.push("CREATE_DATE");
    var inIndex = 0;
    var dataColumn=[];
    var insertData=[];
            for (var j = 0; j < receiveBody.inDataWidth-3; j++) {
                dataColumn[j]=[];
    }
    for (var i = 0; i < receiveBody.inDataLength; i++) {
            for (var j = 0; j < receiveBody.inDataWidth-3; j++) {
                dataColumn[j][i] = params.receiveBody.dataColumn[inIndex];
                inIndex = inIndex + 1;
            }
        }
    insertData.push(insertId);
    for(var i=0;i<receiveBody.inDataWidth-3;i++){
        insertData.push(dataColumn[i]);
    }
    insertData.push(departmentId);
    insertData.push(data);
    params.receiveBody.column=column;
    params.receiveBody.dataColumn=insertData;
    return ;
}
function insertViewAddData(user,params,queryParam){
    var receiveBody=params.receiveBody;
    receiveBody.inDataWidth+=2;
    var departmentId=[];
    var data=[];
        for (var i = 0; i < receiveBody.inDataLength; i++) {
            departmentId[i]=user[1];
            data[i]="(select sysdate from dual)";
        }
    var column=[];
    for(var i=0;i<receiveBody.inDataWidth-2;i++){
        column.push(receiveBody.column[i]);
    }
    column.push("CREATE_USER");
    column.push("CREATE_DATE");
    var inIndex = 0;
    var dataColumn=[];
    var insertData=[];
            for (var j = 0; j < receiveBody.inDataWidth-2; j++) {
                dataColumn[j]=[];
    }
    for (var i = 0; i < receiveBody.inDataLength; i++) {
            for (var j = 0; j < receiveBody.inDataWidth-2; j++) {
                dataColumn[j][i] = params.receiveBody.dataColumn[inIndex];
                inIndex = inIndex + 1;
            }
        }
    for(var i=0;i<receiveBody.inDataWidth-2;i++){
        insertData.push(dataColumn[i]);
    }
    insertData.push(departmentId);
    insertData.push(data);
    params.receiveBody.column=column;
    params.receiveBody.dataColumn=insertData;
    return ;
}
function updadaAddData(user,params,queryParam){
   var receiveBody=params.receiveBody;
    receiveBody.inDataWidth+=2;
    var departmentId=[];
    var data=[];
        for (var i = 0; i < receiveBody.inDataLength; i++) {
            departmentId[i]=user[1];
            data[i]="(select sysdate from dual)";
        }
    var column=[];
    for(var i=0;i<receiveBody.inDataWidth-2;i++){
        column.push(receiveBody.column[i]);
    }
    column.push("UPDATE_USER");
    column.push("UPDATE_DATE");
    var inIndex = 0;
    var dataColumn=[];
    var insertData=[];
            for (var j = 0; j < receiveBody.inDataWidth-2; j++) {
                dataColumn[j]=[];
    }
    for (var i = 0; i < receiveBody.inDataLength; i++) {
            for (var j = 0; j < receiveBody.inDataWidth-2; j++) {
                dataColumn[j][i] = params.receiveBody.dataColumn[inIndex];
                inIndex = inIndex + 1;
            }
        }
    for(var i=0;i<receiveBody.inDataWidth-2;i++){
        insertData.push(dataColumn[i]);
    }
    insertData.push(departmentId);
    insertData.push(data);
    params.receiveBody.column=column;
    params.receiveBody.dataColumn=insertData;
    return ;
}
module.exports = {
    restGetRows: function (params, callback) {
        var dal = new da.dataAccess();
        async.autoInject({
            "open": function (callback) {
                dal.open(false, callback);
            },  //打开数据库
            "queryParam": function (open, callback) {
                getSchParams(dal, params.receiveUrl.table, callback);      //查询参数，tablename、prikey、specialkey、view    
            },
            "columntype": function (queryParam, callback) {   //查询表格参数类型，用作类型判断，格式输出使用
                getColumntype(dal, queryParam, callback);
            },
            "user": function (columntype, callback) {
                var httpService = require(global.ROOT_DIR + "/common/service/baseRest/httpService");
                httpService.httpget(params.cookies.CIGToken, callback);
            },
            "searchField": function (queryParam, callback) {
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                var sql = queryString.getSearchField(queryParam, callback);
                getAllObjects(dal, sql, callback);
            },
            "queryString": function (user,searchField, queryParam, columntype, callback) {//合成sql语句
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                queryString.getQueryString(user,searchField, params, queryParam, columntype, callback);
            },
            "columns": function (columntype, queryString, callback) {
                getRows(dal, columntype, queryString, callback);
            },
            "readrowsformater": function (columns, columntype, callback) {
                readrowsformater(columns, columntype, callback);
            },
            "count": function (queryString, callback) {
                getCount(dal, queryString, callback);
            },
        }, function (err, res) {
            dal.close(function () { callback(err, ["get", res.columns, res.count]); });
        });

    },
    restDeleteRows: function (params, callback) {
        var dal = new da.dataAccess();
        async.autoInject({
            "open": function (callback) {
                dal.open(false, callback);
            },
            "queryParam": function (open, callback) {
                getSchParams(dal, params.receiveUrl.table, callback);
            },
            "queryString": function (queryParam, callback) {
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                queryString.deleteQueryString(params, queryParam, callback);
            },
            "columns": function (queryString, callback) {
                modifyRows(dal, queryString, "The rows have not been deleted ,please check whether the rowsid is exist ", callback);
            },

        }, function (err, res) {
            dal.close(function () { callback(err, ["delete", res.columns]); });

        });
    },
    restInsertRows: function (params, callback) {
        var dal = new da.dataAccess();
        async.autoInject({
            "open": function (callback) {
                dal.open(false, callback);
            },
            "queryParam": function (open, callback) {
                getSchParams(dal, params.receiveUrl.table, callback);
            },
            "columntype": function (queryParam, callback) {   //查询表格参数类型，用作类型判断，格式输出使用
                getColumntype(dal, queryParam, callback);
            },
            "user": function (columntype, callback) {
                var httpService = require(global.ROOT_DIR + "/common/service/baseRest/httpService");
                httpService.httpget(params.cookies.CIGToken, callback);
            },
            "queryString": function (user,queryParam, columntype, callback) {
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                insertAddData(user,params,queryParam);
                queryString.insertQueryString(user,params, queryParam, columntype, callback);
            },
            "columns": function (queryString, callback) {
                modifyRows(dal, queryString, "insertion failure", callback);
            },
        }, function (err, res) {
            dal.close(function () { callback(err, ["insert", res.columns]); });
        });
    },
    restInsertViewRows: function (params, callback) {
        var dal = new da.dataAccess();
        async.autoInject({
            "open": function (callback) {
                dal.open(false, callback);
            },
            "queryParam": function (open, callback) {
                getSchParams(dal, params.receiveUrl.table, callback);
            },
            "columntype": function (queryParam, callback) {   //查询表格参数类型，用作类型判断，格式输出使用
                getColumntype(dal, queryParam, callback);
            },
            "user": function (columntype, callback) {
                var httpService = require(global.ROOT_DIR + "/common/service/baseRest/httpService");
                httpService.httpget(params.cookies.CIGToken, callback);
            },
            "queryString": function (user,queryParam, columntype, callback) {
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                insertViewAddData(user,params,queryParam);
                queryString.insertQueryString(user,params, queryParam, columntype, callback);
            },
            "columns": function (queryString, callback) {
                modifyRows(dal, queryString, "insertion failure", callback);
            },
        }, function (err, res) {
            dal.close(function () { callback(err, ["insert", res.columns]); });
        });
    },
    restUpdateRows: function (params, callback) {
        var dal = new da.dataAccess();
        async.autoInject({
            "open": function (callback) {
                dal.open(false, callback);
            },
            "queryParam": function (open, callback) {
                getSchParams(dal, params.receiveUrl.table, callback);
            },
            "columntype": function (queryParam, callback) {   //查询表格参数类型，用作类型判断，格式输出使用
                getColumntype(dal, queryParam, callback);
            },
            "user": function (columntype, callback) {
                var httpService = require(global.ROOT_DIR + "/common/service/baseRest/httpService");
                httpService.httpget(params.cookies.CIGToken, callback);
            },
            "queryString": function (user,queryParam, columntype, callback) {
                updadaAddData(user,params,queryParam);
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                queryString.updateQueryString(params, queryParam, columntype, callback);
            },
            "columns": function (queryString, callback) {
                modifyRows(dal, queryString, "update failure ", callback);
            },
        }, function (err, res) {
            dal.close(function () { callback(err, ["update", res.columns]); });

        });
    },
    restSonGetRows: function (params, callback) {
        var dal = new da.dataAccess();
        async.autoInject({
            "open": function (callback) {
                dal.open(false, callback);
            },  //打开数据库
            "queryParam": function (open, callback) {
                getSchParams(dal, params.receiveUrl.tableName, callback);      //查询参数，tablename、prikey、specialkey、view    
            },
            "columntype": function (queryParam, callback) {   //查询表格参数类型，用作类型判断，格式输出使用
                getColumntype(dal, queryParam, callback);
            },
            "user": function (columntype, callback) {
                var httpService = require(global.ROOT_DIR + "/common/service/baseRest/httpService");
                httpService.httpget(params.cookies.CIGToken, callback);
            },
            "searchField": function (queryParam, callback) {
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                var sql = queryString.getSearchField(queryParam, callback);
                getAllObjects(dal, sql, callback);
            },
            "queryString": function (user,searchField,queryParam, columntype, callback) {//合成sql语句
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                queryString.getSonQueryString(user,searchField,params, queryParam, columntype, callback);
            },
            "columns": function (columntype, queryString, callback) {
                getRows(dal, columntype, queryString, callback);
            },
            "count": function (queryString, callback) {
                getCount(dal, queryString, callback);
            },
        }, function (err, res) {
            dal.close(function () { callback(err, ["get", res.columns, res.count]); });

        });
    },
    restSonDeleteRows: function (params, callback) {
        var dal = new da.dataAccess();
        async.autoInject({
            "open": function (callback) {
                dal.open(false, callback);
            },  //打开数据库
            "queryParam": function (open, callback) {
                getSchParams(dal, params.receiveUrl.tableName, callback);
            },
            "queryString": function (queryParam, callback) {
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                queryString.deleteSonQueryString(params, queryParam, callback);
            },
            "columns": function (queryString, callback) {
                modifyRows(dal, queryString, "The rows have not been deleted ,please check whether the rowsid is exist ", callback);
            },

        }, function (err, res) {
            dal.close(function () { callback(err, ["delete", res.columns]); });

        });
    },
    restGetRowsNumber: function (params, callback) {
        var dal = new da.dataAccess();
        async.autoInject({
            "open": function (callback) {
                dal.open(false, callback);
            },  //打开数据库
            "queryParam": function (open, callback) {
                getSchParams(dal, params.receiveUrl.table, callback);      //查询参数，tablename、prikey、specialkey、view    
            },
            "columntype": function (queryParam, callback) {   //查询表格参数类型，用作类型判断，格式输出使用
                getColumntype(dal, queryParam, callback);
            },
            "user": function (columntype, callback) {
                var httpService = require(global.ROOT_DIR + "/common/service/baseRest/httpService");
                httpService.httpget(params.cookies.CIGToken, callback);
            },
            "searchField": function (queryParam, callback) {
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                var sql = queryString.getSearchField(queryParam, callback);
                getAllObjects(dal, sql, callback);
            },
            "queryString": function (user,searchField, queryParam, columntype, callback) {//合成sql语句
                var queryString = require(global.ROOT_DIR + "/common/unit/sqlString");
                queryString.getQueryString(user,searchField, params, queryParam, columntype, callback);
            },
            "count": function (queryString, callback) {
                getCount(dal, queryString, callback);
            },
        }, function (err, res) {
            dal.close(function () { callback(err, ["get", res.columns, res.count]); });

        });

    }
}

function readrowsformater(result,columntype,callback) {
    var selectRowsFin = result;
    var dataColumnType=columntype;
    //若查询DATE类型，则格式化
    for (var i = 0; i < selectRowsFin.length; i++) {
        for (var rowsKey in selectRowsFin[i])/////将
            for (var key in dataColumnType) {
                if (key == rowsKey) {
                    if (dataColumnType[key] == "DATE") {
                        if (selectRowsFin[i][rowsKey] != null)   ////拓展rowkey，加上if判断if(rowkey==category)
                            selectRowsFin[i][rowsKey] = new Date(selectRowsFin[i][rowsKey]).Format("yyyy-MM-dd hh:mm:ss");
                        else {
                            if (rowsKey == "READDATE") { selectRowsFin[i][rowsKey] = "未读" }
                        }
                    }
                }
            }
    }
    callback(null,selectRowsFin);
}