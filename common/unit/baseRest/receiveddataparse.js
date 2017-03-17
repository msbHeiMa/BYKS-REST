/******************************************************************************
 * NAME
 *   parseReceivedData.js
 * 
 * DESCRIPTION
 * Get and parse URL and body, 
 * extract tablename ,param, and the incoming json array in the url and body
 *
 *****************************************************************************/
//idName:主键 id：多主键  paramName：参数名，例如search  paramValue：参数数值
//paramlength：传入参数个数  table：表名 

/*******************************************************************************/
module.exports = {
    parseUrl: function (req) {     
        var urlhost =req.url.split("?");
        var url1=urlhost[0].split("/");
        var url=url1.shift();
        var urlData = url1;
        if(urlData[urlData.length-1]==""){
            urlData.pop();
        }
        var urlIndex = 0;
        var param = [];
        var urlResult = {
            idName: [],
            id: [],
            urlDataLength: 0,
            table: "",
            idNameLength: 0,
            idLength: 0
        };
        urlResult.urlDataLength = urlData.length;
        for (var i = 0; i < urlData.length; i++) {
            if (urlData[i] == "tables" || urlData[i] == "schemastable" || urlData[i] == "view" || urlData[i] == "addschemas"|| urlData[i] == "schemasdomain"||urlData[i] =="socketmessage"||urlData[i] =="tablesrownum"||urlData[i] =="tableuserrows"||urlData[i] =="tablesuserrownum"||urlData[i] =="zztables")
                urlIndex = i + 1;
        }
        if (urlData.length == 4) {
            urlResult.id.push(urlData[3]);
            urlResult.idLength += 1;
        }
        if (urlData.length > 4) {
            var urlKeyLength = urlData.length - 3;
            for (var i = 0; i < urlKeyLength; i = i + 2) {
                urlResult.idName.push(urlData[i + 3]);
                urlResult.id.push(urlData[i + 4]);
                urlResult.idLength += 1;
                urlResult.idNameLength += 1;
            }
        }
        urlResult.table = urlData[urlIndex];
        return urlResult;
    },
    //inDataLength:json数组个数， inDataWidth:数据库字段个数  ， column:字段名  columnindex：字段名下标
    parseBody: function (req) {
        var inDataLength = req.body.length;
        var inDataWidth = 0;
        var column = [];
        var columnIndex = 0;
        var http_body = {
            inDataLength: 0,
            inDataWidth: 0,
            column: [],
            dataColumn: []
        };
        for (var key in req.body[0]) {
            column[columnIndex] = key;
            columnIndex += 1;
        }
        inDataWidth = columnIndex;
        var dataColumn = new Array();
        for (var i = 0; i < inDataWidth; i++) {
            dataColumn[i] = new Array();
            for (var j = 0; j < inDataLength; j++) {
                dataColumn[i][j] = 0;
            }
        }
        for (var i = 0; i < inDataWidth; i++) {
            for (var j = 0; j < inDataLength; j++) {
                dataColumn[i][j] = req.body[j][column[i]];
            }
        }
        http_body.inDataLength = inDataLength;
        http_body.inDataWidth = inDataWidth;
        for (var i = 0; i < inDataWidth; i++) {
            http_body.column.push(column[i]);
        }
        for (var i = 0; i < inDataLength; i++) {
            for (var j = 0; j < inDataWidth; j++) {
                http_body.dataColumn.push(dataColumn[j][i]);
            }
        }
        return http_body;
    },
    parseschemas: function (req) {
        var body = req.body;
        var tableName = req.body.Table;
        var primaryKey = req.body.PrimaryKey;
        var specialKey = req.body.SpecialKey;
        var fieldCount = 0;
        for (var i in req.body.Fields) {
            fieldCount++;
        }
        var fieldsType = new Array();
        var fieldsName = new Array();
        var fieldLen = new Array();
        var nullable = new Array();
        var defaulta = new Array();
        var tempcount = 0;
        for (var nameField in req.body.Fields) {
            fieldsName[tempcount] = req.body.Fields[nameField].NAME;
            fieldsType[tempcount] = req.body.Fields[nameField].TYPE;
            fieldLen[tempcount] = req.body.Fields[nameField].FIELDLEN;
            nullable[tempcount] = req.body.Fields[nameField].NULLABLE;
            defaulta[tempcount] = req.body.Fields[nameField].DEFAULT;
            tempcount++;
        }
        // var fieldsName = new Array();
        // var tempcount = 0;
        // for (var name in req.body.Fields) {
        //     fieldsName[tempcount] = name;
        //     tempcount++;
        // }
        // tempcount = 0;
        // var fieldsType = new Array();
        // for (var nameField in req.body.Fields) {
        //     fieldsType[tempcount] = req.body.Fields[nameField].TYPE;
        //     tempcount++;
        // }
        // var fieldLen = new Array();
        // tempcount = 0;
        // for (var nameFie in req.body.Fields) {
        //     fieldLen[tempcount] = req.body.Fields[nameField].FIELDLEN;
        //     tempcount++;
        // }
        // var nullable = new Array();
        // tempcount = 0;
        // for (var nameFie in req.body.Fields) {
        //     nullable[tempcount] = req.body.Fields[nameField].NULLABLE;
        //     tempcount++;
        // }
        // var defaulta = new Array();
        // tempcount = 0;
        // for (var nameFie in req.body.Fields) {
        //     defaulta[tempcount] = req.body.Fields[nameField].DEFAULT;
        //     tempcount++;
        // }
        var resultjson = [];
        resultjson.push(fieldsName);
        resultjson.push(fieldsType);
        resultjson.push(fieldLen);
        resultjson.push(tableName);
        resultjson.push(primaryKey);
        resultjson.push(specialKey);
        resultjson.push(nullable);
        resultjson.push(defaulta);
        return resultjson;
    },
    parseUrlsontable: function (req) {
        var urlhost =req.url.split("?");
        var url1=urlhost[0].split("/");
        var url=url1.shift();
        var urlData = url1;
        var urlIndex = 0;
        var param = [];
        var urlResult = {
            tableName: '',
            specialKeyValue: '',
            urlDataLength: 0,
            fieldNameArray: [],
            fieldValueArray: [],
            fieldNameLength: 0,
            fieldValueLength: 0
        };
        urlResult.urlDataLength = urlData.length;
        if (urlData.length == 4) {
            urlResult.tableName = urlData[2];
            urlResult.specialKeyValue = urlData[3];
        }
        if (urlData.length == 5) {
            urlResult.tableName = urlData[2];
            urlResult.specialKeyValue = urlData[3];
            urlResult.fieldValueArray.push(urlData[4]);
            urlResult.fieldValueLength += 1;
        }
        if (urlData.length > 5 && !(urlData.length % 2)) {
            urlResult.tableName = urlData[2];
            urlResult.specialKeyValue = urlData[3];
            var urlKeyLength = urlData.length - 4;
            for (var i = 0; i < urlKeyLength; i = i + 2) {
                urlResult.fieldNameArray.push(urlData[i + 4]);
                urlResult.fieldValueArray.push(urlData[i + 5]);
                urlResult.fieldNameLength += 1;
                urlResult.fieldValueLength += 1;
            }
        }
        return urlResult;
    }
};





