/*==============================================================*/
/* Table: ZZ_ZSZHJSB                                            */
/*==============================================================*/
var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "gridName": "WGMC",
            "griderName": "WGYXM",
            "griderTel":"WGYLXFS",
            "forthName":"XZMC",
            "fifthName":"XZQMC"
        };
    },
     getTable:function(){
        return "ZZ_GRID";
    },
    getGrid:function(filter,order,offset,limit,callback){
        var self = this;
        this.getPage(filter,order,offset,limit,function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    }
},baseAccess.prototype);
module.exports = tableAccess;