var crypto = require("../crypto");
/**
 * memcahe缓存
 */
function cacheClass(config){
    this.keyPrefix = config.keyPrefix || "def_";
    this.defaultExpire = config.defaultExpire || 600;
}
cacheClass.prototype = {
    /**
     * @description 将一个任务包装成一个缓存任务，任务执行时：如果缓存有值，返回缓存值；如果没有，运行任务，并将值缓存起来
     * function getAllSchools(callback){
     * }
     * var getAllSchoolsWrap = cache.cacheable("all_schools",600,getAllSchools);
     * getAllSchoolsWrap(function(err,data){
     * });
     * 
     * function getSchool(id,callback){
     * }
     * var getSchoolWrap = cache.cacheable("school_data"+id,600,getSchool);
     * getSchoolWrap(id,function(err,data)){
     * });
     * @param {string} key
     * @param {Number} expires
     * @param {AsyncTask} task 允许带参数
     * @returns {AsyncTask}
     */
    cacheable:function(key,expires,task){
        if (typeof task !== 'function') {
            throw new Error("Invalid arguments for cache.cacheable");
        }
        var _self = this;
        function apply(func, thisArg, args) {
            return func.call(thisArg, args);
        }
        var initialParams = function (fn) {
            return function() {
                var index = -1,
                    array = Array(arguments.lengt);
                while (++index < arguments.length) {
                    array[index] = arguments[index];
                }
                return apply(function (args) {
                    var callback = args.pop();
                    _self.get(key,function(err,result){
                        if(err!=null){
                            fn.call(this, args, callback);
                        }else{
                            callback(null,result);
                        }
                    });
                }, this, array);
            };
        };
        return initialParams(function (args, callback) {
            var cb = function (err) {
                if(err){
                    callback.apply(null, arguments);
                }else{
                    var result = arguments[arguments.length-1];
                    var _args = arguments;
                    _self.set(key,result,expires,function(err,data){
                        if(err){
                            callback(err);
                        }else{
                            callback.apply(null, _args);
                        }
                    });
                }
            }
            task.apply(null, args.concat([cb]));
        });
    },
    /**
     * @description 执行一个任务：如果缓存有值，返回缓存值；如果没有，运行任务，并将值缓存起来
     * function getAllSchools(callback){
     * }
     * function getSchool(id,callback){
     * }
     * 
     * cache.cacheTask("all_schools",600,getAllSchools,function(err,data){
     * });
     * cache.cacheTask("school_data"+id,600,getSchool.bind(null,id),function(err,data){
     * });
     * @param {string} key
     * @param {Number} expires
     * @param {AsyncTask} task 
     * @param {AsyncCallback} callback
     */
    cacheTask:function(key,expires,task,callback){
        var _self = this;
        _self.get(key,function(err,result){
            if(err!=null){
                task.apply(null, [function (err) {
                    if(err){
                        callback.apply(null, arguments);
                    }else{
                        var result = arguments[arguments.length-1];
                        var _args = arguments;
                        _self.set(key,result,expires,function(err,data){
                            if(err){
                                callback(err);
                            }else{
                                callback.apply(null, _args);
                            }
                        });
                    }
                }]);
            }else{
                callback(null,result);
            }
        });
    },
    /**
     * @description 将key的值补充前缀后MD5处理成realkey
     * getRealKey(key);
     * @param {string} key
     * @param {Number} expires
     * @param {AsyncCallback} task
     * @param {AsyncCallback} callback
     */
    getRealKey:function(key){
        return crypto.md5(this.keyPrefix+key);
    }
};
module.exports = cacheClass;