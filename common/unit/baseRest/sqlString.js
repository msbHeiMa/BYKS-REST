/******************************************************************************
*
* NAME
*   restMehtodParam.js
*
* DESCRIPTION
* rest基本表查询的初始化参数。
*****************************************************************************/
var parseReceivedData = require('./receiveddataparse');
module.exports = {
    getQueryString: function (user, searchField, params, queryParam, columntype, callback) {
        var idNameLength = params.receiveUrl.idNameLength,
            idLength = params.receiveUrl.idLength,
            receiveIdName = params.receiveUrl.idName,
            idValue = params.receiveUrl.id,
            offset = params.urlparam.offset || 0,
            limit = params.urlparam.limit || 20,
            search = params.urlparam.search || '',
            order = params.urlparam.order || 'asc',
            table = queryParam[0],
            priId = queryParam[1],
            view = queryParam[2],
            searchID = params.urlparam.searchField || priId,
            sort = params.urlparam.sort || priId;
        if (view != null) {
            table = view;
        }
        var levelmaxvalue=0;;
        switch(user[2]){
            case "1":levelmaxvalue=2181843386368;
            case "2":levelmaxvalue=2198889037824;
            case "3":levelmaxvalue=2199023124480;
            case "4":levelmaxvalue=2199023254528;
            case "5":levelmaxvalue=2199023255551;
        }
        selectcolumntype = columntype;
        var idName = receiveIdName[0] || priId;
        for (var i = 0; i < receiveIdName.length; i++) {
            for (var key in selectcolumntype) {
                if (key == receiveIdName[i]) {
                    if (selectcolumntype[key] == "VARCHAR2") {
                        idValue[i] = "'" + idValue[i] + "'";
                    }
                }
            }
        }
        if (idNameLength == 0 && idLength == 1) {
            for (var key in selectcolumntype) {
                if (key == priId) {
                    if (selectcolumntype[key] == "VARCHAR2") {
                        idValue[0] = "'" + idValue[0] + "'";
                    }
                }
            }
        }
        //查询语句拼接
        var queryString = "SELECT * FROM " + table;
        var queryNumber = "SELECT COUNT(*) as total FROM " + table;
        if(search!=""){
            if(searchField==null){
                search="";
            }
        }
        if (search != "") {
            var searchString = "";
            for (var i = 0; i < searchField.length - 1; i++) {
                searchString += searchField[i].NAME + " like '%" + search + "%' OR ";
            }
            searchString += searchField[searchField.length - 1].NAME + " like '% " + search + "%'";
            queryString += " where " + searchString;
            queryNumber += " where " + searchString;
            if (idNameLength == 1 && idLength == 1) {
                queryString += " and" + idName + "=" + idValue[0];
                queryNumber += " and" + idName + "=" + idValue[0];
            }
            ////////////////////////////           /////////////////////////////////////////////
            if (idNameLength == 0 && idLength == 1) {
                queryString += " and" + priId + "=" + idValue[0];
                queryNumber += " and" + priId + "=" + idValue[0];
            }
            if (idNameLength > 1 && idLength > 1) {
                for (var i = 0; i < idNameLength; i++) {
                    queryString += " and " + receiveIdName[i] + "=" + idValue[i];
                    queryNumber += " and " + receiveIdName[i] + "=" + idValue[i];
                }
            }
        }
        if (search == "") {
            //搜索字符拼接
            if (idNameLength == 1 && idLength == 1) {
                queryString += " WHERE " + idName + "=" + idValue[0];
                queryNumber += " WHERE " + idName + "=" + idValue[0];
            }
            if (idNameLength == 0 && idLength == 1) {
                queryString += " WHERE " + priId + "=" + idValue[0];
                queryNumber += " WHERE " + priId + "=" + idValue[0];
            }
            if (idNameLength > 1 && idLength > 1) {
                queryString += " WHERE ";
                queryNumber += " WHERE ";
                for (var i = 0; i < idNameLength; i++) {
                    if (i != idNameLength - 1) {
                        queryString += receiveIdName[i] + "=" + idValue[i] + " and ";
                        queryNumber += receiveIdName[i] + "=" + idValue[i] + " and ";
                    }
                    if (i == idNameLength - 1) {
                        queryString += receiveIdName[i] + "=" + idValue[i];
                        queryNumber += receiveIdName[i] + "=" + idValue[i];
                    }
                }
            }
        }
        if (params.receiveUrl.urlDataLength > 3) {
            queryNumber = queryNumber + " AND bitand(" + levelmaxvalue + ",SSDWBM)=" + user[1];
        }
        if(params.receiveUrl.urlDataLength == 3){
            queryNumber = queryNumber + " WHERE bitand("+levelmaxvalue+",SSDWBM)=" + user[1];
        }
        // 查询语句格式
        //select t2.* from (select t1.*, rownum rn from (select * from tb_courseinfo order by rownum desc )t1 where rownum <= 150 )t2 where rn >100    
        limit = parseInt(offset) + parseInt(limit);
        queryString += " ORDER BY " + sort + " " + order;
        var queryFinal = "select t2.* from (select t1.*,rownum rn from (" + queryString + ")"
            + "t1 where rownum <=" + limit + ")" + "t2 where rn >" + offset + " AND bitand("+levelmaxvalue+",SSDWBM)=" + user[1];
        callback(null, [queryNumber, queryFinal]);
    },
    deleteQueryString: function (params, tableParams, callback) {
        var deleteIdValue = params.receiveUrl.id[0] || 0,
            table = params.receiveUrl.table,
            deleteLength = params.receiveBody.inDataLength || 0,  //传入的修改的组数
            deleteWidth = params.receiveBody.inDataWidth || 0,  //等于1 ，就是一个id数值
            deleteName = params.receiveBody.column,//传入列明
            deleteData = params.receiveBody.dataColumn,
            deleteID = params.receiveBody.column[0],
            queryString = "";
        table = tableParams[0];
        var idName = tableParams[1];
        if (deleteLength > 0) {
            queryString = "DELETE FROM " + table + " WHERE " + deleteID + " in ";
            var queryRow = "(";
            for (var i = 0; i < deleteLength; i++) {
                if (i != deleteLength - 1)
                    queryRow += "'" + deleteData[i] + "',";
                if (i == deleteLength - 1)
                    queryRow += "'" + deleteData[i] + "')";
            }
            queryString += queryRow;
        }
        if (deleteLength == 0) {
            queryString = "DELETE FROM " + table + " WHERE " + idName + " =" + "'" + deleteIdValue + "'";
        }
        callback(null, queryString);
    },
    insertQueryString: function (user, params, queryParam, columntype, callback) {
        var alterLength = params.receiveBody.inDataLength,
            alterWidth = params.receiveBody.inDataWidth,
            alterName = params.receiveBody.column,
            alterData = params.receiveBody.dataColumn,
            dataColumn = alterData;
        var tableName = queryParam[0];
        var selectcolumntype = columntype;
        var insertColumn = "";
        for (var i = 0; i < alterWidth; i++) {
            if (i != alterWidth - 1)
                insertColumn += alterName[i] + ","
            if (i == alterWidth - 1)
                insertColumn += alterName[i] + ")";
        }
        var queryFinal = "INSERT ALL ";
        var tempQuery1 = new Array();
        var tempQuery2 = new Array();
        var userModSql_Params = new Array();
        for (var i = 0; i < alterLength; i++) {
            for (var j = 0; j < alterWidth-1; j++) {
                userModSql_Params[j] = dataColumn[j][i];
                if (userModSql_Params[j + 1] == "" || userModSql_Params[j + 1] == '')
                { userModSql_Params[j + 1] = "''"; }
            }
            //字符类型处理
            for (var P = 0; P < alterName.length; P++) {
                for (var key in selectcolumntype) {
                    if (key == alterName[P]) {
                        if (selectcolumntype[key] == "VARCHAR2") {
                            if (userModSql_Params[P + 1] != "''")
                                userModSql_Params[P + 1] = "'" + userModSql_Params[P + 1] + "'";
                        }
                        if (selectcolumntype[key] == "DATE") {
                            if (userModSql_Params[P + 1] != "''")
                                if (userModSql_Params[P + 1] != "(select sysdate from dual)")
                                    userModSql_Params[P + 1] = "to_date(" + userModSql_Params[P + 1] + ",'yyyy-mm-dd hh24:mi:ss')";
                        }
                    }
                }
            }
            tempQuery1[i] == '';
            tempQuery1[i] = " (";
            for (var k = 0; k < alterWidth; k++) {
                if (k != alterWidth - 1)
                    tempQuery1[i] += userModSql_Params[k] + ","
                if (k == alterWidth - 1)
                    tempQuery1[i] += userModSql_Params[k] + ") ";
            }
        }
        for (var i = 0; i < alterLength; i++)
        { tempQuery2[i] = "INTO " + tableName + " (" + insertColumn + " VALUES " + tempQuery1[i]; }
        var tempQuery3 = '';
        for (var i = 0; i < alterLength; i++) {
            tempQuery3 += tempQuery2[i];
        }
        queryFinal = queryFinal + tempQuery3 + "SELECT 1 FROM DUAL";
        callback(null, queryFinal);
    },
    updateQueryString: function (params, queryParam, columntype, callback) {
        var alterLength = params.receiveBody.inDataLength, //传入的修改的组数
            alterWidth = params.receiveBody.inDataWidth,    //传入的修改的表结构，表的列长度
            alterName = params.receiveBody.column,//传入列明
            dataColumn = params.receiveBody.dataColumn,
            selectcolumntype = columntype;
        var table = queryParam[0],
            idName = queryParam[1],
            queryString = "UPDATE " + table + " SET ",
            alterColumn = [],
            alterrow = new Array();
        for (var i = 0; i < alterWidth; i++) {
            alterrow[i] = new Array();
            for (var j = 0; j < alterLength; j++) {
                alterrow[i][j] = 0;
            }
        }
        for (var P = 0; P < alterName.length - 1; P++) {
            for (var key in selectcolumntype) {
                if (key == alterName[P]) {
                    if (selectcolumntype[key] == "VARCHAR2") {
                        for (var k = 0; k < alterLength; k++)
                            dataColumn[P][k] = "'" + dataColumn[P][k] + "'";
                    }
                    if (selectcolumntype[key] == "DATE") {
                        for (var n = 0; n < alterLength; n++)
                            if (dataColumn[P][n] != "(select sysdate from dual)")
                                dataColumn[P][n] = "to_date('" + dataColumn[P][n] + "','yyyy-mm-dd hh24:mi:ss')";
                    }
                }
            }
        }
        for (var i = 0; i < alterWidth-1; i++) {
            alterColumn[i] = alterName[i + 1] + "= CASE " + idName;
            for (var j = 0; j < alterLength; j++) {
                alterrow[i][j] = "WHEN " + dataColumn[0][j] + " THEN " + dataColumn[i + 1][j];
            }
        }
        var alterCC = "";
        var alterstr = "";
        var alterstr1 = "";
        for (var i = 0; i < alterWidth-1; i++) {
            alterstr = alterColumn[i];
            alterCC += alterstr;
            for (var j = 0; j < alterLength; j++) {
                alterstr1 = alterrow[i][j];
                alterCC += " " + alterstr1 + " ";
            }
            if (i != alterWidth - 2)
                alterCC += "END, ";
            if (i == alterWidth - 2)
                alterCC += "END ";
        }
        var alterDD = " WHERE " + idName + " IN (";

        for (var i = 0; i < alterLength; i++) {
            if (i != alterLength - 1)
                alterDD += dataColumn[0][i] + ","
            if (i == alterLength - 1)
                alterDD += dataColumn[0][i] + ")";
        }
        queryString = queryString + alterCC + alterDD;
        callback(null, queryString);
    },
    getSonQueryString: function (user, searchField, params, queryParam, columntype, callback) {
        var specialkeyValue = params.receiveUrl.specialKeyValue,
            receiveIdName = params.receiveUrl.fieldNameArray,
            idValue = params.receiveUrl.fieldValueArray,
            idNameLength = params.receiveUrl.fieldNameLength,
            idLength = params.receiveUrl.fieldValueLength,
            offset = params.urlparam.offset || 0,
            limit = params.urlparam.limit || 20,
            search = params.urlparam.search || '',
            order = params.urlparam.order || 'asc',
            table = queryParam[0],
            priId = queryParam[1],
            specialID = queryParam[3],
            sort = params.urlparam.sort || priId,//排序字段
            selectcolumntype = columntype,
            searchID = params.urlparam.searchField || priId,
            idName = receiveIdName[0] || priId;
        var levelmaxvalue = 0;;
        switch (user[2]) {
            case "1": levelmaxvalue = 2181843386368;
            case "2": levelmaxvalue = 2198889037824;
            case "3": levelmaxvalue = 2199023124480;
            case "4": levelmaxvalue = 2199023254528;
            case "5": levelmaxvalue = 2199023255551;
        }
        for (var i = 0; i < receiveIdName.length; i++) {
            for (var key in selectcolumntype) {
                if (key == receiveIdName[i]) {
                    if (selectcolumntype[key] == "VARCHAR2") {
                        idValue[i] = "'" + idValue[i] + "'";
                    }
                }
            }
        }
        if (idNameLength == 0 && idLength == 1) {
            for (var key in selectcolumntype) {
                if (key == priId) {
                    if (selectcolumntype[key] == "VARCHAR2") {
                        idValue[0] = "'" + idValue[0] + "'";
                    }
                }
            }
        }
        var queryString = "SELECT * FROM " + "(SELECT * FROM " + table + " WHERE " + specialID + "='" + specialkeyValue + "') ";
        var queryNumber = "SELECT COUNT(*) as total FROM " + "(SELECT * FROM " + table + " WHERE " + specialID + "='" + specialkeyValue + "') ";
        if(search!=""){
            if(searchField==null){
                search="";
            }
        }
        if (search != "") {
            var searchString = "";
            for (var i = 0; i < searchField.length - 1; i++) {
                searchString += searchField[i].NAME + " like '%" + search + "%' OR ";
            }
            searchString += searchField[searchField.length - 1].NAME + " like '% " + search + "%'";
            queryString += " where " + searchString;
            queryNumber += " where " + searchString;
            if (idNameLength == 1 && idLength == 1) {
                queryString += " and" + idName + "=" + idValue[0];
                queryNumber += " and" + idName + "=" + idValue[0];
            }
            if (idNameLength == 0 && idLength == 1) {
                queryString += " and" + priId + "=" + idValue[0];
                queryNumber += " and" + priId + "=" + idValue[0];
            }
            if (idNameLength > 1 && idLength > 1) {
                for (var i = 0; i < idNameLength; i++) {
                    queryString += " and " + receiveIdName[i] + "=" + idValue[i];
                    queryNumber += " and " + receiveIdName[i] + "=" + idValue[i];
                }
            }
        }
        if (search == "") {
            if (idNameLength == 1 && idLength == 1) {
                queryString += " WHERE " + idName + "=" + idValue[0];
                queryNumber += " WHERE " + idName + "=" + idValue[0];
            }
            if (idNameLength == 0 && idLength == 1) {
                queryString += " WHERE " + priId + "=" + idValue[0];
                queryNumber += " WHERE " + priId + "=" + idValue[0];
            }
            if (idNameLength > 1 && idLength > 1) {
                queryString += " WHERE ";
                queryNumber += " WHERE ";
                for (var i = 0; i < idNameLength; i++) {
                    if (i != idNameLength - 1) {
                        queryString += receiveIdName[i] + "=" + idValue[i] + " and ";
                        queryNumber += receiveIdName[i] + "=" + idValue[i] + " and ";
                    }
                    if (i == idNameLength - 1) {
                        queryString += receiveIdName[i] + "=" + idValue[i];
                        queryNumber += receiveIdName[i] + "=" + idValue[i];
                    }
                }
            }
        }
        queryNumber = queryNumber + " WHERE bitand("+levelmaxvalue+",SSDWBM)=" + user[1];
        //select t2.* from (select t1.*, rownum rn from (select * from tb_courseinfo order by rownum desc )t1 where rownum <= 150 )t2 where rn >100    
        limit = parseInt(offset) + parseInt(limit);
        queryString += " ORDER BY " + sort + " " + order;
        var queryFinal = "select t2.* from (select t1.*,rownum rn from (" + queryString + ")"
            + "t1 where rownum <=" + limit + ")" + "t2 where rn >" + offset + " AND bitand("+levelmaxvalue+",SSDWBM)=" + user[1];
        callback(null, [queryNumber, queryFinal]);
    },
    deleteSonQueryString: function (params, queryParam, callback) {
        var deleteLength = params.receiveBody.inDataLength || 0,  //传入的修改的组数
            deleteData = params.receiveBody.dataColumn,
            deleteOne = params.receiveUrl.fieldValueArray[0],
            queryString = "",
            table = queryParam[0],
            idName = queryParam[1],
            deleteName = params.receiveBody.column[0] || idName;//传入列明;
        if (deleteLength > 0) {
            queryString = "DELETE FROM " + table + " WHERE " + deleteName + " in ";
            var queryRow = "(";
            for (var i = 0; i < deleteLength; i++) {
                if (i != deleteLength - 1)
                    queryRow += "'" + deleteData[i] + "',";
                if (i == deleteLength - 1)
                    queryRow += "'" + deleteData[i] + "')";
            }
            queryString += queryRow;
        }
        if (deleteLength == 0) {
            queryString = "DELETE FROM " + table + " WHERE " + idName + " =" + "'" + deleteOne + "'";
        }
        callback(null, queryString);
    },
    getSearchField: function (tableParams) {
        var viewConfig_table = tableParams[4].split("/");
        var viewConfig_field = [];
        var viewTables = [];
        for (var i = 0; i < viewConfig_table.length; i++) {
            viewConfig_field[i] = viewConfig_table[i].split(":");
            viewTables[i] = viewConfig_field[i][0];
        }
        var viewConfig_fieldName = [];
        for (var i = 0; i < viewConfig_table.length; i++) {
            viewConfig_fieldName[i] = viewConfig_field[i][1].split(";");
        }
        var queryType = "SELECT t2.NAME,T2.TABLENAME FROM BSTABLEFIELD t1, TABLEFIELD t2 WHERE t1.FIELDID = t2.FIELDID AND (";
        var queryString = "";
        var view_string = [];
        var columnString = new Array(viewTables.length);
        for (var i = 0; i < viewTables.length; i++) {
            columnString[i] = "";
            if (viewConfig_fieldName[i][0] == "*") {
                view_string[i] = "(t2.TABLENAME = 'CIGPROXY." + viewTables[i] + "')";
            }
            else {
                for (var j = 0; j < viewConfig_fieldName[i].length; j++) {
                    columnString[i] += "t2.NAME='" + viewConfig_fieldName[i][j] + "'";
                    if (j < viewConfig_fieldName[i].length - 1) {
                        columnString[i] += " OR ";
                    }
                }
                view_string[i] = "(t2.TABLENAME='CIGPROXY." + viewTables[i] + "' AND(" + columnString[i] + " ))";
            }
            queryString += view_string[i];
            if (i < viewTables.length - 1) {
                queryString += " OR ";
            }
        }
        var queryType = queryType + queryString + ") AND t1.SEARCHABLE = '1'";
        // var sql="SELECT t2.NAME FROM BSTABLEFIELD t1,TABLEFIELD t2 WHERE t1.FIELDID = t2.FIELDID AND t2.TABLENAME = '"+queryParam[0]+"' AND t1.SEARCHABLE='1'";
        return queryType;
    }
};