var options = require(ROOT_DIR+"/common/config/options");
var http = require('http');
var charset = require("charset");
var iconv = require("iconv-lite");
module.exports = {
    httpget: function (GetTokenInfo, call) {
        var bodyChunk = [];
        var bodySize = 0;
        http.get(options.tokenservice+"/webservice/tokenservice.asmx/GetTokenInfo?token=" + GetTokenInfo, function (res) {
            var bodyChunk = [];
            var bodySize = 0;
            res.on('data', (chunk) => {
                bodyChunk.push(chunk);
                bodySize += chunk.length;
            });
            res.on('end', () => {
                var buffer = new Buffer(bodySize), pos = 0;
                for (var i = 0, l = bodyChunk.length; i < l; i++) {
                    bodyChunk[i].copy(buffer, pos);
                    pos += bodyChunk[i].length;
                }
                var cs = charset(res.headers, buffer);
                var str = iconv.decode(buffer, cs).toString();
                var indexlevel=str.indexOf("\"DLEVEL\"");
                var a = str.split("\"");
                var indexUser = a.indexOf("YHMC");
                var indexSSDWBS=a.indexOf("SSDWBS");
                if (indexUser == -1||indexSSDWBS==-1) {
                    call("没有获取到相应用户");
                }
                var ssdwb=a[indexSSDWBS+1].split(":");
                ssdwb=ssdwb[1].split(",");
                var d_level=str[indexlevel+9];
                 call(null, a[indexUser + 2],ssdwb[0],d_level); 
            })
        }).on('error', function (e) {
            call(e.message);
        })
    },
}