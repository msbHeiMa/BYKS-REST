var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "pId":"P_ID",
            "accreType":"ACCRE_TYPE",
            "idNum":"ID_NUM",
            "recordDate":"RECORD_DATE",
            "expDate":"EXP_DATE",
            "placeType":"PLACE_TYPE",
            "isKeyPoint":"IS_KEY_POINT",
            "isOutCountry":"IS_OUT_COUNTRY",
            "outGone":"OUT_GONE",
            "outReasons":"OUT_REASONS",
            "reasonsDate":"REASONS_DATE",
            "outProvince":"OUT_PROVINCE",
            "outDetailAddress":"OUT_DETAIL_ADDRESS",
        };
    },
    getTable:function(){
        return "ZZ_FLOW_PERSON";
    }
},baseAccess.prototype);
module.exports = tableAccess;
