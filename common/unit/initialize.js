/**
 * 存放对Object、Date、String、Function等原生类型的prototype的扩展，不输出其他方法，启动APP时引用一次即可
 * 例如，在里面实现Date.prototype.Format，其他地方直接使用，不要在文件里自己重复调用
 */
Date.prototype.Format = function(fmt){
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    return fmt;
};
Date.prototype.add = function (part, value) {  
    value *= 1;  
    if (isNaN(value)) {  
        value = 0;  
    }  
    switch (part) {  
        case "y":  
            this.setFullYear(this.getFullYear() + value);  
            break;  
        case "m":  
            this.setMonth(this.getMonth() + value);  
            break;  
        case "d":  
            this.setDate(this.getDate() + value);  
            break;  
        case "h":  
            this.setHours(this.getHours() + value);  
            break;  
        case "n":  
            this.setMinutes(this.getMinutes() + value);  
            break;  
        case "s":  
            this.setSeconds(this.getSeconds() + value);  
            break;  
        default:  
//var start = new Date();  
//start.add("d", -1); //昨天  
//start.add("m", -1); //上月  
    }  
} ;
Date.prototype.toJSON = function() {
     return this.Format("yyyy-MM-dd hh:mm:ss");
};
String.prototype.date = function(){
    return this.toString();
};
var commonUnit = {
    copy:function(obj){
        return JSON.parse(JSON.stringify(obj));
    },
    map : function(obj,callback){
        var res = {};
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                var element = obj[key];
                res[key] = callback(element);
            }
        }
        return res;
    },
    mixin : function(obj,extend){
        for (var key in extend) {
            if (extend.hasOwnProperty(key)) {
                obj[key] = extend[key];
            }
        }
        return obj;
    },
    getUuid:function () {//生成uid，作为插入数据库的主键
        var s = [];
        var hexDigits = "0123456789abcdef";
        for (var i = 0; i < 36; i++) {
            s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
        s[8] = s[13] = s[18] = s[23] = "-";
        var uuid = s.join("");
        return uuid;
    },
    inherits:function(newMembers,parentPrototype){
        newMembers._parentPrototype = parentPrototype;
        for (var key in parentPrototype) {
            if (parentPrototype.hasOwnProperty(key)
                && !newMembers.hasOwnProperty(key)) {
                newMembers[key] = parentPrototype[key];
            }
        }
        return newMembers;
    }
};
Object.defineProperty(global,"unit",{
    get: function(){
        return commonUnit;
    }
});

module.exports = {
    initDir:function(dir,rootDir){
        Object.defineProperty(global, "ROOT_DIR", {
            get: function(){
                return rootDir;
            }
        });
        Object.defineProperty(global, "APP_ROOT_DIR", {
            get: function(){
                return dir;
            }
        });
    }
};