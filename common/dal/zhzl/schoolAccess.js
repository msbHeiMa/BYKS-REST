// /*==============================================================*/
// /* Table: ZZ_SCHOOL                                             */
// /*==============================================================*/
// create table ZZ_SCHOOL  (
//    ID                   varchar2(36)                    not null,
//    SCHOOL_NAME          varchar2(200),
//    SAFETY_MANAGER       varchar2(200),
//    SAFETY_CONTACT       varchar2(100),
//    A_ID                 varchar2(36),
//    SAFETY_RANGE         numeric(4,0),
//    SCHOOL_TYPE          varchar2(2),
//    D_ID                 varchar2(36),
//    STUDENT_NUM          numeric(6,0),
//    PRINCIPAL_NAME       varchar2(200),
//    PRINCIPAL_CONTACT    varchar2(100),
//    SAFETY_PERSON_NUM    numeric(6,0),
//    CREATE_DATE          datetime,
//    CREATE_USER          varchar2(50),
//    UPDATE_DATE          datetime,
//    UPDATE_USER          varchar2(50),
//    constraint PK_ZZ_SCHOOL primary key (ID)
// );

// comment on column ZZ_SCHOOL.SCHOOL_TYPE is
// '编码见5.59';

var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "schoolName":"SCHOOL_NAME",
            "safetyManager":"SAFETY_MANAGER",
            "safetyContact":"SAFETY_CONTACT",
            "aId":"A_ID",
            "safetyRange":"SAFETY_RANGE",
            "schoolType":"SCHOOL_TYPE",
            "dId":"D_ID",
            "studentNum":"STUDENT_NUM",
            "principalName":"PRINCIPAL_NAME",
            "principalContact":"PRINCIPAL_CONTACT",
            "safetyPersonNum":"SAFETY_PERSON_NUM",
        };
    },
    getTable:function(){
        return "ZZ_SCHOOL";
    },
    _fillAreaName:function(rows,callback){
        var areaAccess = require("./areaAccess");
        var areaAcc = new areaAccess(this.operater,this.dal);
        if(rows.length == 0){
            callback(null,rows);
        }
        else{
            var filter = {
                id:rows.map(function(sch){return sch.aId})
            };
            areaAcc.getObjects(filter,null,function(err,data){
                if(data){
                    var cache={};
                    data.forEach(function(element) {
                        cache[element.id] = element;
                    }, this);
                    rows.forEach(function(element) {
                        element["areaName"] = cache[element.aId] && cache[element.aId].areaName;
                    }, this);
                }
                callback(err,rows);
            });
        }
    },
    getObjectWithAreaName:function(filter,callback){
        var self = this;
        this.getObject(filter,function(err,res){
            if(err || !res)callback(err,null);
            else{
                self._fillAreaName([res],function(err,data){
                    callback(err,data&&data[0]);
                });
            }
        });
    },
    getObjectsWithAreaName:function(filter,order,callback){
        var self = this;
        this.getObjects(filter,order,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillAreaName(res,callback);
            }
        });
    },
    getPageWithAreaName:function(filter,order,offset,limit,callback){
        var self = this;
        this.getPage(filter,order,offset,limit,function(err,res){
            if(err)callback(err,null);
            else{
                self._fillAreaName(res.rows,function(err,data){
                    if(data){
                        res.rows = data;
                    }
                    callback(err,res);
                });
            }
        });
    }
},baseAccess.prototype);
module.exports = tableAccess;