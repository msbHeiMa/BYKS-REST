/******************************************************************************
 *
 * NAME
 *   log.js
 *
 * DESCRIPTION
 * 写日志类
 *****************************************************************************/
var that = {
    log:console.log,
    getTimeLogger:function(){
        return function(message,options){
            if(typeof(message) == "string"){
                message = new Date().Format("yyyy-MM-dd hh:mm:ss") + " " + message;
            }
            else{
                that.log(new Date().Format("yyyy-MM-dd hh:mm:ss"));
            }
            that.log.call(null,message,options);
        }
    }
};
module.exports = that;