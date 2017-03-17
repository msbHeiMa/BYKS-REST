// /*==============================================================*/
// /* Table: ZZ_SCHOOL                                             */
// // /*==============================================================*/
// create table ZZ_ZSZH_VISITCYCADJUHIS 
// (
//    ID                   VARCHAR2(36)         not null,
//    Z_ID                 VARCHAR2(36)         not null,
//    ADJUSTMENT_DATE      DATE                 not null,
//    ADJUSTMENT_PEOPLE    VARCHAR2(50)         not null,
//    ORIGINAL_CYC         VARCHAR2(10)         not null,
//    FINAL_CYC            VARCHAR2(10)         not null,
//    ADJUSTMENT_REASON    VARCHAR2(100)        not null,
//    CREATE_USER          VARCHAR2(50)         not null,
//    CREATE_DATE          DATE                 not null,
//    UPDATE_USER          VARCHAR2(50),
//    UPDATE_DATE          DATE,
//    constraint PK_ZZ_ZSZH_VISITCYCADJUHIS primary key (ID)
// );

// comment on column ZZ_ZSZH_VISITCYCADJUHIS.CREATE_USER is
// '扩展';

// comment on column ZZ_ZSZH_VISITCYCADJUHIS.CREATE_DATE is
// '扩展';

// comment on column ZZ_ZSZH_VISITCYCADJUHIS.UPDATE_USER is
// '扩展';

// comment on column ZZ_ZSZH_VISITCYCADJUHIS.UPDATE_DATE is
// '扩展';
// '扩展';
// '编码见5.59';

var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "zId":"Z_ID",
            "adjustmentDate":"ADJUSTMENT_DATE",
            "adjustmentPeople":"ADJUSTMENT_PEOPLE",
            "originalCyc":"ORIGINAL_CYC",
            "finalCyc":"FINAL_CYC",
            "adjustReason":"ADJUSTMENT_REASON",
            "wfState":"WFSTATE"
        };
    },
    getTable:function(){
        return "ZZ_ZSZH_VISITCYCADJUHIS ";
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