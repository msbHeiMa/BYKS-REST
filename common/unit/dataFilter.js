/******************************************************************************
 *
 * NAME
 *   dataFilter.js
 *
 * DESCRIPTION
 * service中结果字段过滤
 *****************************************************************************/
module.exports = {
    dataFilter:function (data,filter) {
        function mapFilter(map,filter){
            var result = {};
            for(var i=0;i<filter.length;i++){
                result[filter[i]] = map[filter[i]];
            }
            return result;
        }
        if(!Array.isArray(data)){
            return mapFilter(data,filter);
        }else{
            var result = [];
            for(var i=0;i<data.length;i++){
                result[i] = mapFilter(data[i],filter);
            }
            return result;
        }
    }
};