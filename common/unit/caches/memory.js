var base = require("./base");
var _cached={};
var _deadline={};
/**
 * 内存缓存
 */
function cacheClass(config){
    base.call(this,config);
}
cacheClass.prototype = unit.inherits({
    /**
     * @description 添加一个键值，如果存在则返回错误
     * @param {string} key
     * @param {Object} value
     * @param {Number} expires
     * @param {AsyncCallback} callback
     */
    add:function(key,value,expires,callback){
        var current = new Date().getTime();
        var realKey = this.getRealKey(key);
        if(_cached[realKey]&&current<_deadline[realKey]){
            callback(false);
        }else{
            _cached[realKey]=value;
            _deadline[realKey]=new Date().getTime()+expires*1000;
            callback(null);
        }
    },
    /**
     * @description 设置一个键值，没有则添加
     * @param {string} key
     * @param {Object} value
     * @param {Number} expires
     * @param {AsyncCallback} callback
     */
    set:function(key,value,expires,callback){
        var realKey = this.getRealKey(key);
        _cached[realKey]=value;
        _deadline[realKey]=new Date().getTime()+expires*1000;
        callback(null);
    },
    /**
     * @description 获取该键对应值，没有时返回false
     * @param {string} key
     * @param {AsyncCallback} callback
     */
    get:function(key,callback){
        var realKey = this.getRealKey(key);
        var current = new Date().getTime();
        if(_cached[realKey]&&current<_deadline[realKey]){
            callback(null,_cached[realKey]);
        }else{
            callback(false);
        }
    },
    /**
     * @description 移除一个键值，如果不存在则返回错误
     * @param {string} key
     * @param {AsyncCallback} callback
     */
    delete:function(key,callback){
        var realKey = this.getRealKey(key);
        var current = new Date().getTime();
        if(_cached[realKey]&&current<_deadline[realKey]){
            delete _cached[realKey];
            delete _deadline[realKey];
            callback(null);
        }else{
            callback(false);
        }
    },
},base.prototype);
module.exports = cacheClass;