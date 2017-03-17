/******************************************************************************
 *
 * NAME
 *   dataAccess.js
 *
 * DESCRIPTION
 * 处理数据库，默认数据库使用new dataAccess()，指定数据库使用new dataAccess(config)。
 *
 *****************************************************************************/
var defaultConfig = require("../config/db");
var crypto = require("../tools").crypto;
var curConnCount = 0;
/**
 * @description 数据库操作的构造函数
 * @param {Object} config 数据库链接配置，可以为空，为空时使用config/db里面的配置
 */
function dataAccess(config){
    if(!config){
        config = defaultConfig;
    }
    this.db = require(config.dbType);
    this.config = config;
}
var poolCache = {
    "poolName":{
        created:false,
        creating:false,
        callbacks:[]
    }
};//避免多次调用createPool导致报错
function getPool(poolName,createTask,getTask,callback){
    if(poolCache[poolName]){
        if(poolCache[poolName].created){
            getTask(callback);
        }
        else{
            poolCache[poolName].callbacks.push(callback);
        }
    }
    else{
        poolCache[poolName] = {
            created:false,
            callbacks:[callback]
        }
        createTask(function(err,pool){
            var callbacks = poolCache[poolName].callbacks;
            if(err){
                delete poolCache[poolName];
                callbacks.forEach(function(callback) {
                    callback(err);
                }, this);
            }
            else{
                process.on("exit",function(){
                    pool.close();
                });
                poolCache[poolName].created = true;
                callbacks.forEach(function(callback) {
                    getTask(callback);
                }, this);
            }
        });
    }
}

dataAccess.prototype = {
    /**
     * @description 打开数据库链接
     * @param {boolean} trans 是否启用事务
     * @param {AsyncCallback} callback
     */
    open:function(trans,callback){
        var self = this;
        var openStack = new Error().stack;
        if(this._isOpen){
            if(this._autoCommit == !trans){
                setImmediate(function(){
                    callback(null,null);
                });
            }
            else{
                this.close(this.open.bind(this,trans));
            }
        }
        else{
            this._openTime = new Date();
            this._autoCommit = !trans;
            var poolName = "node_" + crypto.md5(JSON.stringify(this.config));
            var getPoolTask = function(callback){
                var pool = null;
                try{
                    pool = self.db.getPool(poolName);
                    callback(null,pool);
                }
                catch(e){
                    callback(e);
                }
            };
            var createPoolTask = function(callback){
                var config = unit.mixin({
                    poolAlias:poolName,
                    poolPingInterval:10,
                    poolMax:20,
                },self.config);
                self.db.createPool(config,callback);
            };
            getPool(poolName,createPoolTask,getPoolTask,function(err,pool){
                if(err){
                    callback(err);
                }
                else{
                    pool.getConnection(initConnection.bind(self));
                }
            })
        }
        function initConnection(err,conn){
            self._conn = conn;
            if(err){
                callback(err,null);
            }
            else{
                // curConnCount++;
                // console.log("active conn count:"+curConnCount+`,${self._conn.listenerCount()}/${self._conn.getMaxListeners()}`);
                self._isOpen = true;
                var defaultDateFormatSQL = "alter session set nls_date_format='yyyy-mm-dd hh24:mi:ss'";
                self.executeNonQuery(defaultDateFormatSQL,{},{},callback);

                self._timeout = setTimeout(self._checkIsOpen.bind(self,openStack),1000*60);
            }
        };
    },
    _checkIsOpen:function(stack){
        console.log(`${new Date()}:this stack will not close the db:${stack}`);
    },
    /**
     * @description 关闭数据库链接
     * @param {AsyncCallback} callback
     */
    close:function(callback){
        this._isOpen = false;
        if(this._conn){
            if(this._timeout)clearTimeout(this._timeout);
            this._conn.close(function(){
                callback();
                curConnCount--;
                // console.log("active conn count:"+curConnCount);
            });
            this._conn = null;
        }
        else{
            setImmediate(function(){
                callback(new Error("conn为空"));
            })
        }
    },
    /**
     * @description 如果开启了事务，操作结束后需要使用该方法提交事务
     * @param {AsyncCallback} callback
     */
    commit:function(callback){
        this._conn.commit(callback);
    },
    /**
     * @description 如果开启了事务，使用该方法回滚事务
     * @param {AsyncCallback} callback
     */
    rollback:function(callback){
        this._conn.rollback(callback);
    },
    /**
     * @description 执行SQL
     * @param {String} sql 待执行的SQL文件
     * @param {Object} params sql中用到的参数
     * @param {Object} options 执行时的配置项
     * @param {AsyncCallback} callback
     */
    execute:function(sql,params,options,callback){
        if(options){
            if(typeof options.autoCommit == "undefined"){
                options.autoCommit = this._autoCommit;
            }
        }
        else{
            options = { autoCommit:this._autoCommit };
        }
        // console.log("active conn count:"+curConnCount+`,${this._conn.listenerCount()}/${this._conn.getMaxListeners()}`);
        var self = this;
        this._conn.execute(sql,params,options,function(err,res){
            if(err){
                console.log("执行SQL出错");
                console.log(err);
                console.log(sql);
                console.log(params);
                console.log(options);
                // console.log("active conn count:"+curConnCount+`,${self._conn.listenerCount()}/${self._conn.getMaxListeners()}`);
            }
            callback(err,res);
        });
    },
    /**
     * @description 执行SQL，并在callback中返回rows，结构为[["1","名称"],["1","名称"]]
     * @param {String} sql 待执行的SQL文件
     * @param {Object} params sql中用到的参数
     * @param {Object} options 执行时的配置项
     * @param {AsyncCallback} callback
     */
    queryRows:function(sql,params,options,callback){
        if(arguments.length == 3){
            callback = options;
            options = {};
        }
        options.outFormat = this.db.ARRAY;
        this.execute(sql,params,options,this._callbackRows.bind(this,callback));
    },
    /**
     * @description 执行SQL，并在callback中返回objects，结构为[{id:"1",name:"名称"},{id:"1",name:"名称"}]
     * @param {String} sql 待执行的SQL文件
     * @param {Object} params sql中用到的参数
     * @param {Object} options 执行时的配置项
     * @param {AsyncCallback} callback
     */
    queryObjects:function(sql,params,options,callback){
        if(arguments.length == 3){
            callback = options;
            options = {};
        }
        options.outFormat = this.db.OBJECT;
        this.execute(sql,params,options,this._callbackRows.bind(this,callback));
    },
    _callbackRows:function(callback,err,res){
        if(res && res.rows){
            res = res.rows;
        }
        callback(err,res);
    },
    /**
     * @description 执行SQL，并在callback中返回第一行的object，结构为{id:"1",name:"名称"}
     * @param {String} sql 待执行的SQL文件
     * @param {Object} params sql中用到的参数
     * @param {AsyncCallback} callback
     */
    queryObject:function(sql,params,callback){
        this.execute(sql,params,{outFormat:this.db.OBJECT,maxRows:1},this._callbackObject.bind(this,callback));
    },
    _callbackObject:function(callback,err,res){
        if(res && res.rows){
            res = res.rows.length == 0 ? null : res.rows[0];
        }
        callback(err,res);
    },
    /**
     * @description 执行SQL，并在callback中返回第一行的第一列，为空则是null
     * @param {String} sql 待执行的SQL文件
     * @param {Object} params sql中用到的参数
     * @param {AsyncCallback} callback
     */
    queryScale:function(sql,params,callback){
        this.execute(sql,params,{outFormat:this.db.ARRAY,maxRows:1},this._callbackScale.bind(this,callback));
    },
    
    _callbackScale:function(callback,err,res){
        if(res && res.rows){
            res = res.rows.length == 0 ? null : res.rows[0];
            if(res){
                if(res[0]){
                    res = res[0];
                }
                else{
                    res = null;
                }
            }
        }
        else{
            res = null;
        }
        callback(err,res);
    },
    /**
     * @description 执行SQL，并在callback中返回受影响的行数
     * @param {String} sql 待执行的SQL文件
     * @param {Object} params sql中用到的参数
     * @param {AsyncCallback} callback
     */
    executeNonQuery:function(sql,params,options,callback){
        this.execute(sql,params,{},this._callbackNonQuery.bind(this,callback));
    },
    _callbackNonQuery:function(callback,err,res){
        callback(err,res ? res.rowsAffected : null);
    }
};

module.exports = {
    dataAccess:dataAccess
    // daInstance:new dataAccess()
};