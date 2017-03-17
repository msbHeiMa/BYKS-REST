var base = require("./base");
var memcached = require("memcached");
/**
 * memcahe缓存
 */
function cacheClass(config){
    base.call(this,config);
    this.mem = new memcached(config.url);
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
        this.mem.add(this.getRealKey(key), value, expires, function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        });
    },
    /**
     * @description 设置一个键值，没有则添加
     * @param {string} key
     * @param {Object} value
     * @param {Number} expires
     * @param {AsyncCallback} callback
     */
    set:function(key,value,expires,callback){
        this.mem.set(this.getRealKey(key), value, expires, function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        });
    },
    /**
     * @description 获取该键对应值，没有时返回false
     * @param {string} key
     * @param {AsyncCallback} callback
     */
    get:function(key,callback){
        this.mem.get(this.getRealKey(key), function(err,result){
            if(err){
                callback(err);
            }else if(result == null){
                callback(false);
            }else{
                callback(null,result);
            }
        });
    },
    /**
     * @description 移除一个键值，如果不存在则返回错误
     * @param {string} key
     * @param {AsyncCallback} callback
     */
    delete:function(key,callback){
        this.mem.del(this.getRealKey(key), function(err,result){
            if(err){
                callback(err);
            }else{
                callback(null);
            }
        });
    },
},base.prototype);
module.exports = cacheClass;