/******************************************************************************
 *
 * NAME
 *   cache.js
 *
 * DESCRIPTION
 * 缓存
 * 
 * 使用时：
 * 
 * 默认配置的缓存
 * var cache = require("/common/tools").cache;
 * cache.set("1",{id:1,name:"缓存内容"},function (err,data) {});
 * cache.get("1",function (err,data) {
 * 
 * });
 * 
 * 指定配置的缓存
 * var cache1 = new cache.Cache({type:"memory"});
 * 
 *****************************************************************************/

var options = require("../config/options");
function cacheClass(config){
    if(config == null){
        config = unit.mixin({},options.cacheConfig);
    }
    var cacheType = config.type;
    delete config.type;
    cacheType = require(`./caches/${cacheType}`);
    this._cache = new cacheType(config);
}
["add","set","get","delete","cacheable","cacheTask"].forEach(function(method){
    cacheClass.prototype[method] = function(){
        return this._cache[method].apply(this._cache,arguments);
    }
});
var instance = new cacheClass();
module.exports = {
    /**
     * @description 添加一个键值，如果存在则返回错误
     * @param {string} key
     * @param {Object} value
     * @param {Number} expires
     * @param {AsyncCallback} callback
     */
    add:function(key,value,expires,callback){
        return instance.add.apply(instance,arguments);
    },
    /**
     * @description 设置一个键值，没有则添加
     * @param {string} key
     * @param {Object} value
     * @param {Number} expires
     * @param {AsyncCallback} callback
     */
    set:function(key,value,expires,callback){
        return instance.set.apply(instance,arguments);
    },
    /**
     * @description 获取该键对应值，没有时返回false
     * @param {string} key
     * @param {AsyncCallback} callback
     */
    get:function(key,callback){
        return instance.get.apply(instance,arguments);
    },
    /**
     * @description 移除一个键值，如果不存在则返回错误
     * @param {string} key
     * @param {AsyncCallback} callback
     */
    delete:function(key,callback){
        return instance.delete.apply(instance,arguments);
    },
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
        return instance.cacheable.apply(instance,arguments);
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
     * @param {AsyncTask} task 不允许带参数
     * @param {AsyncCallback} callback
     */
    cacheTask:function(key,expires,task,callback){
        return instance.cacheTask.apply(instance,arguments);
    },
    Cache:cacheClass
}