var cookie = require('cookie');
var async=require('async');
var globalSockets = null;
var userId = 1;
function getToken(socket) {
    if (socket.handshake.headers.cookie) {
        var curcookie = cookie.parse(socket.handshake.headers.cookie);
        if (curcookie['CIGToken'])
            var cigToken = curcookie['CIGToken'];
        else
            var cigToken = null;
    }
    return cigToken;
};

function getUserId(cigToken,callback) {
    var httpService = require(global.ROOT_DIR + "/common/service/baseRest/httpService");
    httpService.httpget(cigToken, callback);
};

module.exports = {
    getReceiverId: function(req) {
        var receiverId=new Array();
        for(var i=0;i<req.body.length;i++)
        {
            receiverId[i]=req.body[i].RECEIVERID;
        }
        return receiverId;
    },
    createSocket: function(sockets) {
      //  globalSockets = sockets;
        globalSockets = sockets
            .of('/restapiserver')
            .on('connection', function (socket) {
                var curToken = getToken(socket);
                async.autoInject({
                    "user_id": function (callback) {
                        if (curToken != null)
                            getUserId(curToken, callback);
                    }
                }, function (err, res) {
                    if (err) {
                        return;
                    }
                    else {
                        socket.join('user_' + res.user_id[0]);
                        console.log(res.user_id[0]);
                    }
                });
                socket.on('disconnect', function (id) {
                    console.log("disconnect");
                });
                socket.on('user_offline', function (id) {
                });
                return;
            });
    },
    sendNotification: function(receiverId) {
        for(var i=0;i<receiverId.length;i++)
        globalSockets.to("user_" + receiverId[i]).emit('notification', { hello: 'world' });
    }
    // getSenderId: function (req) {
    //     var curToken = getToken(socket);
    //     var senderId = getUserId(curToken, callback);
    // }

}






















/*
if(socket.handshake.headers.cookie){
        var curcookie=cookie.parse(socket.handshake.headers.cookie);
        var id=curcookie['PHPSESSID'];}
*/
/*
Array.prototype.indexOf = function(val) {
for (var i = 0; i < this.length; i++) {
if (this[i] == val) return i;
}
return -1;
};
Array.prototype.remove = function(val) {
var index = this.indexOf(val);
if (index > -1) {
this.splice(index, 1);
}
};
*/

   // io.sockets.emit('dataCount', { hello: 'world' });

  //    socket.on('disconnect', function (sockets) {
 //         socket.leave("user_"+getUserId());
  //      });



    //     socket.emit('dataCount', { hello: 'world' });
    //     socketsUserId[socketsNumber] = sockets.id;
    //     socketUser[socketsNumber]=sockets;
    //     console.log(socketsUserId);
    //     socketsNumber++;

    //     sockets.on('disconnect', function (sockets) {
    //     socketsNumber=socketsNumber-1;
    //     var tempSocketsUserId=[];
    //     var tempNmber=0;
    //     for(var i=0;i<socketsUserId.length;i++)
    //     {
    //         if(sockets.id!=socketsUserId[i])
    //         {
    //             tempSocketsUserId[tempNmber++]=socketsUserId[i];
    //         }
    //     }
    //     socketsUserId=tempSocketsUserId;
    //      console.log(socketsUserId);
    // });
/*
io = require('socket.io').listen(app), 
fs = require('fs'),
cookie=require('cookie');
request=require('request');
global.userlist={};
 
app.listen(8080);
//io.set('log level', 1);//将socket.io中的debug信息关闭

var content;
var socketUser = {};
var settings={};
settings.host='http://localhost/test/node/myapp/';
io.sockets.on('connection', function (socket) {
    if(socket.handshake.headers.cookie){
        var curcookie=cookie.parse(socket.handshake.headers.cookie);
        var id=curcookie['PHPSESSID'];
        request(settings.host+'getinfo.php?type=getinfo&sid='+id,function(err,res,body){
            if(!err&&res.statusCode==200){
                if(body){
                    body=eval('('+body+')');
                    var userid=body.ID;
                    var username=body.UserName;
                    var online=body.Online;
                    //将新用户存进socket用户列表中
                    userlist[id]=socket;
                 
                    socketUser[id] = {
                        'userid':userid,
                        'username':username
                    };
                    //更改上线状态
                    request(settings.host+'getinfo.php?type=online&sid='+id,function(err,res,body){})
         
                    //发送信息给新登录用户
                    socket.emit('system',{
                        'alluser':socketUser
                    });
         
                    //上线欢迎
                    socket.emit('open',{
                        'msg':'welcome!'
                    })
         
                    //下线推送通知  disconnect方法名不能修改
                    socket.on('disconnect',function(){
                        //更改用户不在线
                        socketUser[id]=null;
                        userlist[id]=null;
                        request(settings.host+'getinfo.php?type=unline&sid='+id,function(err,res,body){})
                        socket.broadcast.emit('broadcast',{
                            'msg':'noline',
                            'unlineid':userid,
                            'unlinename':username,
                            'type':1
                        });
                    })
         
                    //监听接收用户信息
                    socket.on('sendnews', function (data) {
                        if(data.touserid&&userlist[data.touserid]!=undefined){
                            var user=userlist[data.touserid];
                            data.fromusername=socketUser[data.fromuserid].username;
                            //将用户信息发送给指定用户
                            user.emit('receivenews',data);
                        }else{
                            socket.emit('receivenews',data);
                        }
                    });
     
                    //广播  推送已登录的用户
                    socket.broadcast.emit('broadcast',{
                        'userid':userid,
                        'username':username,
                        'type':2
                    });
                }else{
                    console.log('falseness connect'); 
                }            
            }
        })      
    }else{
        console.log('cookie not exist');
    }
});*/