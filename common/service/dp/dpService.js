var async = require(ROOT_DIR + "/common/tools").async;
var dpGetWRYQYFLJSAccess = require(ROOT_DIR + "/common/dal/dp/dpGetWRYQYFLJSAccess");
var dpGetXFTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetXFTJAccess");
var dpGetAqiAccess = require(ROOT_DIR + "/common/dal/dp/dpGetAqiAccess");
var dpGetProjectSituationAccess = require(ROOT_DIR + "/common/dal/dp/dpGetProjectSituationAccess");
var dpGetLYYTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetLYYTJAccess");
var dpGetLYRSTJZSAccess = require(ROOT_DIR + "/common/dal/dp/dpGetLYRSTJZSAccess");
var dpGetJQMPTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJQMPTJAccess");
var dpGetJDSRTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJDSRTJAccess");
var dpGetJQSSMPTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJQSSMPTJAccess");
var dpGetJQSSRSTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJQSSRSTJAccess");
var dpGetLYXGCYSRTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetLYXGCYSRTJAccess");
var dpGetGLLCTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetGLLCTJAccess");
var dpGetHLLCTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetHLLCTJAccess");
var dpGetKYLTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetKYLTJAccess");
var dpGetHYTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetHYTJAccess");
var dpGetJCFQAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJCFQAccess");
var dpGetJCFSAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJCFSAccess");
var dpGetJCFQNewTimeJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJCFQNewTimeJAccess");
var dpGetJCFSNewTimeJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJCFSNewTimeJAccess");
var dpGetZYJJZBAccess = require(ROOT_DIR + "/common/dal/dp/dpGetZYJJZBAccess");
var dpGetNYHYCZAccess = require(ROOT_DIR + "/common/dal/dp/dpGetNYHYCZAccess");
var dpGetGMYSGYCZAccess = require(ROOT_DIR + "/common/dal/dp/dpGetGMYSGYCZAccess");
var dpGetGDPTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetGDPTJAccess");
var dpGetCZJRWZJMKZPTJAccess = require(ROOT_DIR + "/common/dal/dp/dpGetCZJRWZJMKZPTJAccess");
var dpGetSNWTLDQCZAccess = require(ROOT_DIR + "/common/dal/dp/dpGetSNWTLDQCZAccess");
var dpGetJJZSAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJJZSAccess");
var dpGetHYKYAccess = require(ROOT_DIR + "/common/dal/dp/dpGetHYKYAccess");
var dpGetJQSSRSSRLSAccess = require(ROOT_DIR + "/common/dal/dp/dpGetJQSSRSSRLSAccess");
var that = {
    //接口1
    getZYJJZBList: function (area, tjDate, callback) {
        var acc = new dpGetZYJJZBAccess(null);
        if (tjDate != "") {
            var filter = { area: area, tjDate: tjDate };
        } else {
            var filter = { tjDate: { type: "zyjj_max", vals: area }, area: area }
        }
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["TJ_DATE"])
        ], function (err, data) {
            acc.close(function () { })
            callback(err, data && data[1]);
        })
    },
    //接口2
    getNYHYCZList: function (area, tjDate, callback) {
        //var acc = new dpGetDataOfLastMonthAccess(null);
        var acc = new dpGetNYHYCZAccess(null);
        //var newDate= new dpGetJJMKNewDateAccess(null);
        if (tjDate != "") {
            var filter = { area: area, tjDate: tjDate };
        } else {
            var filter = { tjDate: { type: "ny_max", vals: area }, area: area };
        }
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["TJ_DATE"])
        ], function (err, data) {
            acc.close(function () { })
            callback(err, data && data[1])
        })
    },
    //接口3
    getGMYSGYCZList: function (area, tjDate, callback) {
        var acc = new dpGetGMYSGYCZAccess(null)
        if (tjDate != "") {
            var filter = { area: area, tjDate: tjDate };
        } else {
            var filter = { tjDate: { type: "gmys_max", vals: area }, area: area };
        }
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["TJ_DATE"])
        ], function (err, data) {
            acc.close(function () { })
            callback(err, data && data[1])
        })
    },
    //接口4
    getGDPTJList: function (area, tjDate, callback) {
        var acc = new dpGetGDPTJAccess(null)
        if (tjDate != "") {
            var filter = { area: area, tjDate: tjDate };
        } else {
            var filter = { tjDate: { type: "gdp_max", vals: area }, area: area };
        }
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["TJ_DATE"])
        ], function (err, data) {
            acc.close(function () { })
            callback(err, data && data[1])
        })
    },
    //接口5
    getFinanceList: function (area, tjDate, callback) {
        var acc = new dpGetCZJRWZJMKZPTJAccess(null);
        if (tjDate != "") {
            var filter = { area: area, tjDate: tjDate };
        } else {
            var filter = { tjDate: { type: "cjwk_max", vals: area }, area: area };
        }
        async.series([
            acc.open.bind(acc, false),
            acc.getObject.bind(acc, filter)
        ], function (err, data) {
            acc.close(function () { })
            var obj = {
                "area": data[1].area,
                "tjDate": data[1].tjDate,
                "czzsr": data[1].czzsr,
                "czzsrTqzzl": data[1].czzsrTqzzl,
                "dfczsr": data[1].dfczsr,
                "dfczsrTqzzl": data[1].dfczsrTqzzl,
            };
            data[1] = obj;
            callback(err, data && data[1])
        })
    },
    //接口6
    getBankingList: function (area, tjDate, callback) {
        var acc = new dpGetCZJRWZJMKZPTJAccess(null);
        if (tjDate != "") {
            var filter = { area: area, tjDate: tjDate };
        } else {
            var filter = { tjDate: { type: "cjwk_max", vals: area }, area: area };
        }
        async.series([
            acc.open.bind(acc, false),
            acc.getObject.bind(acc, filter)
        ], function (err, data) {
            acc.close(function () { })
            var obj = {
                "area": data[1].area,
                "tjDate": data[1].tjDate,
                "wbckye": data[1].wbckye,
                "wbckyeTqzzl": data[1].wbckyeTqzzl,
                "wbdkye": data[1].wbdkye,
                "wbdkyeTqzzl": data[1].wbdkyeTqzzl,
            };
            data[1] = obj;
            callback(err, data && data[1])
        })
    },
    //接口7
    getForeignTradeList: function (area, tjDate, callback) {
        var acc = new dpGetCZJRWZJMKZPTJAccess(null);
        if (tjDate != "") {
            var filter = { area: area, tjDate: tjDate };
        } else {
            var filter = { tjDate: { type: "cjwk_max", vals: area }, area: area };
        }
        async.series([
            acc.open.bind(acc, false),
            acc.getObject.bind(acc, filter)
        ], function (err, data) {
            acc.close(function () { })
            var obj = {
                "area": data[1].area,
                "tjDate": data[1].tjDate,
                "jckze": data[1].jckze,
                "jckzeTqzjl": data[1].jckzeTqzjl,
                "ckze": data[1].ckze,
                "ckzeTqzjl": data[1].ckzeTqzjl,
                "htwz": data[1].htwz,
                "htwzTqzjl": data[1].htwzTqzjl,
                "sywz": data[1].sywz,
                "sywzTqzjl": data[1].sywzTqzjl,
            };
            data[1] = obj;
            callback(err, data && data[1])
        })
    },
    //新增接口1
    getIncomeList: function (area, tjDate, callback) {
        var acc = new dpGetCZJRWZJMKZPTJAccess(null);
        if (tjDate != "") {
            var filter = { area: area, tjDate: tjDate };
        } else {
            var filter = { tjDate: { type: "cjwk_max", vals: area }, area: area };
        }
        async.series([
            acc.open.bind(acc, false),
            acc.getObject.bind(acc, filter)
        ], function (err, data) {
            acc.close(function () { })
            var obj = {
                "area": data[1].area,
                "tjDate": data[1].tjDate,
                "jmkzpsr": data[1].jmkzpsr,
                "jmkzpsrTqjzl": data[1].jmkzpsrTqjzl,
                "xcjmkzpsr": data[1].xcjmkzpsr,
                "xcjmkzpsrTqzjl": data[1].xcjmkzpsrTqzjl,
            };
            data[1] = obj;
            callback(err, data && data[1])
        })
    },
    //新增接口2
    getRankingList: function (tjDate, callback) {
        var snw = new dpGetSNWTLDQCZAccess(null);
        if (tjDate != "") {
            var snfilter = { tjDate: tjDate, sf: "浙江省" }//省内排名
            var swfilter = { tjDate: { type: "ranking_or", vals: tjDate } }//省外排名
        } else {
            var snfilter = { tjDate: { type: "snw_max" }, sf: "浙江省" }//省内排名
            var swfilter = { tjDate: { type: "snw_max" }, sf: { type: "snw_or", vals: ["浙江省", "长兴县"] }, tjDate: { type: "snw_max" } }//省外排名
        }
        async.series([
            snw.open.bind(snw, false),
            snw.getObjects.bind(snw, snfilter, ['CZ desc']),
            snw.getObjects.bind(snw, swfilter, ['CZ desc']),
        ], function (err, data) {
            snw.close(function () { });
            var N = 0;
            var W = 0;
            var SN = [];
            var SW = [];
            var snObj = {};
            var swObj = {};
            for (var x = 0; x < data[1].length; x++) {
                if (data[1][x].area == "长兴县") {
                    snObj.area = data[1][x].area;
                    snObj.tjDate = data[1][x].tjDate;
                    snObj.cz = data[1][x].cz;
                    snObj.sf = data[1][x].sf;
                    snObj.ranKing = x + 1;
                }
            }
            for (var y = 0; y < data[2].length; y++) {
                if (data[2][y].area == "长兴县") {
                    swObj.area = data[2][y].area;
                    swObj.tjDate = data[2][y].tjDate;
                    swObj.cz = data[2][y].cz;
                    swObj.sf = data[2][y].sf;
                    swObj.ranKing = y + 2;
                }
            }
            for (var i = 0; i < data[1].length; i++) {
                if (N < 5 && snObj.ranKing < 6) {
                    SN[N] = {
                        "area": data[1][i].area,
                        "sf": data[1][i].sf,
                        "tjDate": data[1][i].tjDate,
                        "cz": data[1][i].cz,
                        "ranKing": i + 1,
                    }
                } else if (N < 4 && snObj.ranKing > 5) {
                    SN[N] = {
                        "area": data[1][i].area,
                        "sf": data[1][i].sf,
                        "tjDate": data[1][i].tjDate,
                        "cz": data[1][i].cz,
                        "ranKing": i + 1,
                    }
                }
                N++;
            };
            for (var j = 0; j < data[2].length; j++) {
                if (W < 5 && swObj.ranKing < 6) {
                    SW[W] = {
                        "area": data[2][j].area,
                        "sf": data[2][j].sf,
                        "tjDate": data[2][j].tjDate,
                        "cz": data[2][j].cz,
                        "ranKing": j + 1,
                    }
                }
                else if (W < 4 && swObj.ranKing > 5) {
                    SW[W] = {
                        "area": data[2][j].area,
                        "sf": data[2][j].sf,
                        "tjDate": data[2][j].tjDate,
                        "cz": data[2][j].cz,
                        "ranKing": j + 1,
                    }
                }
                W++;
            };
            data = {};
            if (SN.length == 4) {
                SN[4] = snObj
                data.sn = SN;
            } else {
                data.sn = SN;
            }
            if (SW.length == 4) {
                SW[4] = swObj
                data.sw = SW;
            } else {
                data.sw = SW;
            }

            callback(err, data)
        })
    },
    //新增接口3
    getJJZSList: function (startDate, endDate, area, callback) {
        var acc = new dpGetJJZSAccess(null);
        var filter = { tjDate: { type: "between", vals: [startDate, endDate] }, zyArea: area };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["DP_ZYJJZB.TJ_DATE"])
        ], function (err, data) {
            acc.close(function () { });
            var obj = [];
            for (var i = 0; i < data[1].length; i++) {
                obj[i] = {
                    "tjDate": data[1][i].tjDate,
                    "zyArea": data[1][i].zyArea,
                    "zrk": data[1][i].zrk,
                    "gdzctz": data[1][i].gdzctz,
                    "csjmsr": data[1][i].csjmsr,
                    "xcjmsr": data[1][i].xcjmsr,
                    "gdp": data[1][i].gdp,
                    "gyzjz": data[1][i].gyzjz,
                }
            }
            data[1] = obj;
            callback(err, data && data[1])
        });
    },
    //新增接口4
    getAreaGdpList: function (tjDate, callback) {
        var acc = new dpGetGDPTJAccess(null)
        if (tjDate != "") {
            var filter = { tjDate: tjDate };
        } else {
            var filter = { tjDate: { type: "gdpnodq_max" } };
        }
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["TJ_DATE"])
        ], function (err, data) {
            acc.close(function () { })
            var obj = [];
            for (var i = 0; i < data[1].length; i++) {
                obj[i] = {
                    "gdp": data[1][i].gdp,
                    "area": data[1][i].area,
                    "tjDate": data[1][i].tjDate,
                }

            }
            data[1] = obj
            callback(err, data && data[1])
        })
    },
    //新增接口5
    getTownRanking: function (tjDate, area, callback) {
        var gdp = new dpGetGDPTJAccess(null);
        if (tjDate != "") {
            var zhenfilter = { tjDate: tjDate, area: { type: "!=", vals: "长兴县" } }//镇排名
        } else {
            var zhenfilter = { tjDate: { type: "gdpnocx_max", vals: "长兴县" }, area: { type: "!=", vals: "长兴县" } }//镇排名
        }
        async.series([
            gdp.open.bind(gdp, false),
            gdp.getObjects.bind(gdp, zhenfilter, ['GDP desc']),
        ], function (err, data) {
            gdp.close(function () { });
            var Q = 0;
            var ZQ = [];
            var obj = {};
            for (var i = 0; i < data[1].length; i++) {
                if (data[1][i].area == area) {
                    obj.area = data[1][i].area;
                    obj.tjDate = data[1][i].tjDate;
                    obj.gdp = data[1][i].gdp;
                    obj.ranKing = i + 1;
                }
            }
            for (var n = 0; n < data[1].length; n++) {
                if (Q < 5 && obj.ranKing < 6) {
                    ZQ[Q] = {
                        "area": data[1][n].area,
                        "tjDate": data[1][n].tjDate,
                        "gdp": data[1][n].gdp,
                        "ranKing": n + 1,
                    }
                } else if (Q < 4 && obj.ranKing > 5) {
                    ZQ[Q] = {
                        "area": data[1][n].area,
                        "tjDate": data[1][n].tjDate,
                        "gdp": data[1][n].gdp,
                        "ranKing": n + 1,
                    }
                }
                Q++;
            }
            data = {};
            if (ZQ.length == 4) {
                ZQ[4] = obj;
                data.zq = ZQ;
            } else {
                data.zq = ZQ;
            }

            callback(err, data)
        })
    },
    //新增接口9
    getGDPByAllTown:function(tjDate,callback){
        var gdp = new dpGetGDPTJAccess(null);
        var filter={tjDate:tjDate};
        async.series([
            gdp.open.bind(gdp,false),
            gdp.getObjects.bind(gdp,filter,["TJ_DATE"])
        ],function(err,data){
            gdp.close(function(){})
            var  obj={};
            for(var i=0;i<data[1].length;i++){
                var diqu=data[1][i].area;
                //obj.diqu=data[1][i].gdp
                // obj={ }
                obj[diqu]=data[1][i].gdp
              
            }
            data[1]=obj;
            callback(err,data&&data[1])
        })
    },
    //接口8
    getWRYQYFLJSLList: function (callback) {
        var acc = new dpGetWRYQYFLJSAccess(null);
        var filter = {};
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["CREATE_DATE"])
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1])
        });
    },
    //接口9
    getXFTJQueryList: function (ST, ET, callback) {
        var acc = new dpGetXFTJAccess(null);
        var filter = { xfDate: { type: "between", vals: [ST, ET] } };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["XF_DATE"])
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1])
        });
    },
    //接口10
    getJCDRSJByLastDayQueryList: function (startDate, endDate, callback) {
        var jcfq = new dpGetJCFQAccess(null);
        var jcfs = new dpGetJCFSAccess(null);
        var jcfqNewTime = new dpGetJCFQNewTimeJAccess(null);
        var jcfsNewTime = new dpGetJCFSNewTimeJAccess(null);
        if (startDate != "" && endDate != "") {
            var filter = { time: { type: "between", vals: [startDate, endDate] } };
            async.series([
                jcfq.open.bind(jcfq, false),
                jcfs.open.bind(jcfs, false),
                jcfq.getObjects.bind(jcfq, filter, ["DP_JCFQRSJ.TIME"]),
                jcfs.getObjects.bind(jcfs, filter, ["DP_JCFSRSJ.TIME"])
            ], function (err, data) {
                jcfs.close(function () { });
                jcfq.close(function () { });
                var fqpf = [];
                for (var i = 0; i < data[2].length; i++) {
                    fqpf[i] = {
                        "enterName": data[2][i].enterName,
                        "time": data[2][i].time,
                        "so2": data[2][i].so2,
                        "dyhw": data[2][i].dyhw,
                    }
                }
                var fspf = [];
                for (var j = 0; j < data[3].length; j++) {
                    fspf[j] = {
                        "enterName": data[3][j].enterName,
                        "time": data[3][j].time,
                        "cod": data[3][j].cod,
                        "ad": data[3][j].ad,
                    }
                }
                data[1] = [];
                data[1].push(fqpf);
                data[1].push(fspf);
                callback(err, data && data[1])
            });
        } else {
            var filter = {}
            async.series([
                jcfqNewTime.open.bind(jcfqNewTime, false),
                jcfsNewTime.open.bind(jcfsNewTime, false),
                jcfqNewTime.getObject.bind(jcfqNewTime, filter),
                jcfsNewTime.getObject.bind(jcfsNewTime, filter)
            ], function (err, data) {
                jcfqNewTime.close(function () { });
                jcfsNewTime.close(function () { });
                var jcfqTime = data[2].jcfqNewTime;
                var jcfsTime = data[3].jcfsNewTime;
                var jcfqfilter = { time: jcfqTime };
                var jcfsfilter = { time: jcfsTime };
                async.series([
                    jcfq.open.bind(jcfq, false),
                    jcfs.open.bind(jcfs, false),
                    jcfq.getObjects.bind(jcfq, jcfqfilter, ["DP_JCFQRSJ.TIME"]),
                    jcfs.getObjects.bind(jcfs, jcfsfilter, ["DP_JCFSRSJ.TIME"])
                ], function (err, data) {
                    jcfs.close(function () { });
                    jcfq.close(function () { });
                    var fqpf = [];
                    for (var i = 0; i < data[2].length; i++) {
                        fqpf[i] = {
                            "enterName": data[2][i].enterName,
                            "time": data[2][i].time,
                            "so2": data[2][i].so2,
                            "dyhw": data[2][i].dyhw,
                        }
                    }
                    var fspf = [];
                    for (var j = 0; j < data[3].length; j++) {
                        fspf[j] = {
                            "enterName": data[3][j].enterName,
                            "time": data[3][j].time,
                            "cod": data[3][j].cod,
                            "ad": data[3][j].ad,
                        }
                    }
                    data[1] = [];
                    data[1].push(fqpf);
                    data[1].push(fspf);
                    callback(err, data && data[1])
                });
            })
        }


    },
    //接口11
    getAqiNowQueryList: function (jcDate, callback) {
        var acc = new dpGetAqiAccess(null);
        var filter = { jcDate: { type: "todate", vals: jcDate } };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["JC_DATE"])
        ], function (err, data) {
            acc.close(function () { });
            var obj = [];
            for (var i = 0; i < data[1].length; i++) {
                obj[i] = {
                    "aqi": data[1][i].aqi,
                    "pfkBm": data[1][i].pfkBm,
                    "pm2_5": data[1][i].pm2_5,
                }
            }
            data[1] = obj;
            callback(err, data && data[1])
        });
    },
    //接口12
    getAqiBeforeList: function (startDate, endDate, callback) {
        var acc = new dpGetAqiAccess(null);
        var filter = { jcDate: { type: "between", vals: [startDate, endDate] } };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["JC_DATE"])
        ], function (err, data) {
            acc.close(function () { });
            var obj = [];
            for (var i = 0; i < data[1].length; i++) {
                obj[i] = {
                    "aqi": data[1][i].aqi,
                    "jcDate": data[1][i].jcDate,
                }
            }
            data[1] = obj;
            callback(err, data && data[1])
        });
    },
    //接口13
    getJCDRSJNewQueryList: function (callback) {
        var jcfq = new dpGetJCFQAccess(null);
        var jcfs = new dpGetJCFSAccess(null);
        var jcfqNewTime = new dpGetJCFQNewTimeJAccess(null);
        var jcfsNewTime = new dpGetJCFSNewTimeJAccess(null);
        var filter = {};
        async.series([
            jcfqNewTime.open.bind(jcfqNewTime, false),
            jcfsNewTime.open.bind(jcfsNewTime, false),
            jcfqNewTime.getObject.bind(jcfqNewTime, filter),
            jcfsNewTime.getObject.bind(jcfsNewTime, filter)
        ], function (err, data) {
            jcfqNewTime.close(function () { });
            jcfsNewTime.close(function () { });
            var jcfqTime = data[2].jcfqNewTime;
            var jcfsTime = data[3].jcfsNewTime;
            var jcfqfilter = { time: jcfqTime };
            var jcfsfilter = { time: jcfsTime };
            async.series([
                jcfq.open.bind(jcfq, false),
                jcfs.open.bind(jcfs, false),
                jcfq.getObjects.bind(jcfq, jcfqfilter, ["SO2 DESC"]),
                jcfq.getObjects.bind(jcfq, jcfqfilter, ["DYHW DESC"]),
                jcfs.getObjects.bind(jcfs, jcfsfilter, ["COD DESC"]),
                jcfs.getObjects.bind(jcfs, jcfsfilter, ["AD DESC"])
            ], function (err, data) {
                jcfs.close(function () { });
                jcfq.close(function () { });
                var S = 0;
                var D = 0;
                var C = 0;
                var A = 0;
                var SO2 = [];
                var DYHW = [];
                var COD = [];
                var AD = [];
                for (var i = 0; i < data[2].length; i++) {
                    if (S < 5) {
                        SO2[S] = {
                            "enterName": data[2][i].enterName,
                            "time": data[2][i].time,
                        }
                    }
                    S++;
                };
                for (var j = 0; j < data[3].length; j++) {
                    if (D < 5) {
                        DYHW[D] = {
                            "enterName": data[3][j].enterName,
                            "time": data[3][j].time,
                        }
                    }
                    D++;
                };
                for (var m = 0; m < data[4].length; m++) {
                    if (C < 5) {
                        COD[C] = {
                            "enterName": data[4][m].enterName,
                            "time": data[4][m].time,
                        }
                    }
                    C++
                };
                for (var n = 0; n < data[5].length; n++) {
                    if (A < 5) {
                        AD[A] = {
                            "enterName": data[5][n].enterName,
                            "time": data[5][n].time,
                        }
                    }
                    A++
                }
                data = {}
                data.SO2 = SO2;
                data.DYHW = DYHW;
                data.COD = COD;
                data.AD = AD;
                callback(err, data)
            });
        });
    },
    //接口14
    getProjectSituationQueryList: function (callback) {
        var acc = new dpGetProjectSituationAccess(null);
        var filter = {};
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["PROJ_JD"])
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1])
        });
    },
    //接口15
    getLYYTJList: function (year, callback) {
        var acc = new dpGetLYYTJAccess(null);
        var filter = { year: year };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["YEAR"])
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1])
        });
    },
    //接口16
    getLYRSTJZSList: function (endDate, startDate, callback) {
        var acc = new dpGetLYRSTJZSAccess(null);
        var filter = { time: { type: "between", vals: [startDate, endDate] } };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["TIME"])
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1])
        });
    },
    //接口17
    getJQMPTJList: function (queryName, offset, limit, callback) {
        var acc = new dpGetJQMPTJAccess(null);
        var filter = { year: { type: "<=", vals: queryName } };
        async.series([
            acc.open.bind(acc, false),
            acc.getPage.bind(acc, filter, ["YEAR desc"], offset, limit)
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1]);
        });
    },
    //接口18
    getJDSRTJList: function (year, callback) {
        var acc = new dpGetJDSRTJAccess(null);
        var filter = { year: year };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["YEAR"])
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1]);
        });
    },
    //接口19
    getJQSSMPTJList: function (time, callback) {
        var acc = new dpGetJQSSMPTJAccess(null);
        var filter = { time: { type: "todate", vals: time } };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["TIME"])
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1]);
        });
    },
    //接口20
    getJQSSRSTJList: function (time, callback) {
        var acc = new dpGetJQSSRSTJAccess(null);
        var filter = { time: { type: "todate", vals: time } };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["TIME"])
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1]);
        });
    },
    //接口21
    getLYXGCYSRTJList: function (endDate, startDate, callback) {
        var acc = new dpGetLYXGCYSRTJAccess(null);
        var filter = { time: { type: "between", vals: [startDate, endDate] } };
        async.series([
            acc.open.bind(acc, false),
            acc.getObjects.bind(acc, filter, ["TIME"])
        ], function (err, data) {
            acc.close(function () { });
            callback(err, data && data[1]);
        });
    },
    //新增接口7
    getJQSSRSSRList: function (callback) {
        var acc = new dpGetJQSSRSSRLSAccess(null);
        var FHZ = {};
        var ZXFHZ={};
        var date = new Date();
        var hour=date.getHours(); 
        //var hour = 8;
        var minutes=date.getMinutes();
        //var minutes =   2;
        if (hour >= 8 && hour < 18) {
            var filter = {};
            var filterDelete = { id: 1 }
            async.series([
                acc.open.bind(acc, false),
                acc.getObject.bind(acc, filter),
                acc.delete.bind(acc, filterDelete),
            ], function (err, data) {
                acc.close(function () { });
                FHZ.RS = {
                    "id": data[1].id,
                    "skcwhjq": data[1].skcwhjq,
                    "skcwhjqrs": parseInt(data[1].skcwhjqrs) + parseInt(Math.random() * (7) - 3) + 20,
                    "hyc": data[1].hyc,
                    "hycrs": parseInt(data[1].hycrs) + parseInt(Math.random() * (9) - 4) + 25,
                    "csg": data[1].csg,
                    "csgrs": parseInt(data[1].csgrs) + parseInt(Math.random() * (2) - 1) + 2,
                    "gcy": data[1].gcy,
                    "gcyrs": parseInt(data[1].gcyrs) + 2,
                    "xsh": data[1].xsh,
                    "xshrs": parseInt(data[1].xshrs) + parseInt(Math.random() * (2) - 1) + 2,
                    "ty": data[1].ty,
                    "tyrs": parseInt(data[1].tyrs) + 1,
                    "jnhc": data[1].jnhc,
                    "jnhcrs": parseInt(data[1].jnhcrs) + parseInt(Math.random() > 0.5 ? 0 : 1),
                    "jdz": data[1].jdz,
                    "jdzrs": parseInt(data[1].jdzrs) + parseInt(Math.random() > 0.5 ? 0 : 1),
                    "yze": data[1].yze,
                    "yzers": parseInt(data[1].yzers) + parseInt(Math.random() > 0.5 ? 0 : 1),
                    "cwd": data[1].cwd,
                    "cwdrs": parseInt(data[1].cwdrs) + parseInt(Math.random() > 0.5 ? 0 : 1),
                };
                FHZ.MPSR = {
                    "skcwhjqmpsr": FHZ.RS.skcwhjqrs * 80,
                    "hycmpsr": FHZ.RS.hycrs * 100,
                    "csgmpsr": FHZ.RS.csgrs * 80,
                    "gcympsr": FHZ.RS.gcyrs * 80,
                    "xshmpsr": FHZ.RS.xshrs * 120,
                    "tympsr": FHZ.RS.tyrs * 100,
                    "jnhcmpsr": FHZ.RS.jnhcrs * 48,
                    "jdzmpsr": FHZ.RS.jdzrs * 72,
                    "yzempsr": FHZ.RS.yzers * 80,
                    "cwdmpsr": FHZ.RS.cwdrs * 50,
                };
                ZXFHZ.RS = {                  
                    "水口茶文化景区":data[1].skcwhjqrs,
                    "海洋城": data[1].hycrs,
                    "城山沟": data[1].csgrs,
                    "贡茶院": data[1].gcyrs,
                    "仙山湖": data[1].xshrs,
                    "图影": data[1].tyrs,
                    "江南红村": data[1].jnhcrs,
                    "金钉子": data[1].jdzrs,
                    "扬子鳄": data[1].yzers,
                    "陈武帝": data[1].cwdrs,
                }
                ZXFHZ.MPSR = {
                    "水口茶文化景区": data[1].skcwhjqrs * 80,
                    "海洋城":data[1].hycrs * 100,
                    "城山沟":data[1].csgrs * 80,
                    "贡茶院":data[1].gcyrs * 80,
                    "仙山湖":data[1].xshrs * 120,
                    "图影":data[1].tyrs * 100,
                    "江南红村":data[1].jnhcrs * 48,
                    "金钉子":data[1].jdzrs * 72,
                    "扬子鳄":data[1].yzers * 80,
                    "陈武帝":data[1].cwdrs * 50,
                }
                var newObj = FHZ.RS;
                async.series([
                    acc.open.bind(acc, false),
                    acc.insert.bind(acc, newObj)
                ], function (err, data) {
                    acc.close(function () { })
                    callback(err, ZXFHZ)
                })
            })
        } else if (hour >= 18 && hour <= 24) {
            var filter = {};
            async.series([
                acc.open.bind(acc, false),
                acc.getObject.bind(acc, filter)
            ], function (err, data) {
                ZXFHZ.RS = {                  
                    "水口茶文化景区":data[1].skcwhjqrs,
                    "海洋城": data[1].hycrs,
                    "城山沟": data[1].csgrs,
                    "贡茶院": data[1].gcyrs,
                    "仙山湖": data[1].xshrs,
                    "图影": data[1].tyrs,
                    "江南红村": data[1].jnhcrs,
                    "金钉子": data[1].jdzrs,
                    "扬子鳄": data[1].yzers,
                    "陈武帝": data[1].cwdrs,
                }
                ZXFHZ.MPSR = {
                    "水口茶文化景区": data[1].skcwhjqrs * 80,
                    "海洋城":data[1].hycrs * 100,
                    "城山沟":data[1].csgrs * 80,
                    "贡茶院":data[1].gcyrs * 80,
                    "仙山湖":data[1].xshrs * 120,
                    "图影":data[1].tyrs * 100,
                    "江南红村":data[1].jnhcrs * 48,
                    "金钉子":data[1].jdzrs * 72,
                    "扬子鳄":data[1].yzers * 80,
                    "陈武帝":data[1].cwdrs * 50,
                }
                callback(err,ZXFHZ);
            })
        } else if (hour == 0 && (minutes >= 0 && minutes <= 1)) {
            var filterDelete = { id: 1 }
            var filter = {};
            var newObj = {
                "id": "1",
                "skcwhjq": "水口茶文化景区",
                "skcwhjqrs": 0,
                "hyc": "海洋城",
                "hycrs": 0,
                "csg": "城山沟",
                "csgrs": 0,
                "gcy": "贡茶院",
                "gcyrs": 0,
                "xsh": "仙山湖",
                "xshrs": 0,
                "ty": "图影",
                "tyrs": 0,
                "jnhc": "江南红村",
                "jnhcrs": 0,
                "jdz": "金钉子",
                "jdzrs": 0,
                "yze": "扬子鳄",
                "yzers": 0,
                "cwd": "陈武帝",
                "cwdrs": 0,
            };
            async.series([
                acc.open.bind(acc, false),
                acc.delete.bind(acc, filterDelete),
                acc.insert.bind(acc, newObj),
                acc.getObject.bind(acc, filter),
            ], function (err, data) {
                acc.close(function () { });
                ZXFHZ.RS = {                  
                    "水口茶文化景区":data[3].skcwhjqrs,
                    "海洋城": data[3].hycrs,
                    "城山沟": data[3].csgrs,
                    "贡茶院": data[3].gcyrs,
                    "仙山湖": data[3].xshrs,
                    "图影": data[3].tyrs,
                    "江南红村": data[3].jnhcrs,
                    "金钉子": data[3].jdzrs,
                    "扬子鳄": data[3].yzers,
                    "陈武帝": data[3].cwdrs,
                }
                ZXFHZ.MPSR = {
                    "水口茶文化景区": data[3].skcwhjqrs * 80,
                    "海洋城":data[3].hycrs * 100,
                    "城山沟":data[3].csgrs * 80,
                    "贡茶院":data[3].gcyrs * 80,
                    "仙山湖":data[3].xshrs * 120,
                    "图影":data[3].tyrs * 100,
                    "江南红村":data[3].jnhcrs * 48,
                    "金钉子":data[3].jdzrs * 72,
                    "扬子鳄":data[3].yzers * 80,
                    "陈武帝":data[3].cwdrs * 50,
                }
                callback(err, ZXFHZ);
            });

        } else if (hour < 8 || (hour == 0 && minutes > 1)) {
            function fanhui(err) {
                FHZ.RS = {
                    "水口茶文化景区": 0,
                    "海洋城": 0,
                    "城山沟": 0,
                    "贡茶院": 0,
                    "仙山湖": 0,
                    "图影": 0,
                    "江南红村": 0,
                    "金钉子": 0,
                    "扬子鳄": 0,
                    "陈武帝": 0,
                }
                FHZ.MPSR = {
                    "水口茶文化景区": 0,
                    "海洋城": 0,
                    "城山沟": 0,
                    "贡茶院": 0,
                    "仙山湖": 0,
                    "图影": 0,
                    "江南红村": 0,
                    "金钉子": 0,
                    "扬子鳄": 0,
                    "陈武帝": 0,
                }
                callback(err,FHZ)
            }
            fanhui();

        }
    },
    //新增接口8
    getLYXGCYSRZSList: function (year,callback) {
        function fanhui(err){
            year==""?year="2016":year=year;
            var obj=[];
            for(var i=1;i<13;i++){
                var PJZ=0;
                year=="2016"?PJZ=13.5:(year=="2015"?PJZ=9.3:(year=="2014"?PJZ=7.75:PJZ=0))
                var CZ=0;
                i==1?CZ=PJZ*0.75:(i==2?CZ=PJZ*0.9:(i==3?CZ=PJZ*1.2:(i==4?CZ=PJZ*1.3:(i==5?CZ=PJZ*1.1:(i==6?CZ=PJZ*1.05:(i==7?CZ=PJZ*0.9:(i==8?CZ=PJZ*0.85:(i==9?CZ=PJZ*1.2:(i==10?CZ=PJZ*1.3:(i==11?CZ=PJZ*0.9:CZ=PJZ*0.65))))))))))
                var jd={
                    "hymc":"酒店",
                    "sr":parseInt((CZ*0.51)*10000),
                    "month":i,
                };
                var cy={
                    "hymc":"餐饮",
                    "sr":parseInt((CZ*0.25)*10000),
                    "month":i,
                }
                var xsp={
                    "hymc":"小商品",
                    "sr":parseInt((CZ*0.12)*10000),
                    "month":i,
                }
               var  jt={
                    "hymc":"交通",
                    "sr":parseInt((CZ*0.1)*10000),
                    "month":i,
                }
                obj.push(jd);
                obj.push(cy);
                obj.push(xsp);
                obj.push(jt);
            }
            callback(err,obj)
        }
        fanhui();
    },
    //接口22
    getGLLCTJList: function (queryName, offset, limit, callback) {
        var acc = new dpGetGLLCTJAccess(null);
        var filter = { year: { type: "<=", vals: queryName } };
        async.series([
            acc.open.bind(acc, false),
            acc.getPage.bind(acc, filter, ["YEAR desc"], offset, limit)
        ], function (err, data) {
            acc.close(function () { });
            data[1].total = 3;
            callback(err, data && data[1]);
        });
    },
    //接口23
    getHLLCTJList: function (queryName, offset, limit, callback) {
        var acc = new dpGetHLLCTJAccess(null);
        var filter = { year: { type: "<=", vals: queryName } };
        async.series([
            acc.open.bind(acc, false),
            acc.getPage.bind(acc, filter, ["YEAR desc"], offset, limit)
        ], function (err, data) {
            acc.close(function () { });
            data[1].total = 3;
            callback(err, data && data[1]);
        });
    },
    //接口24
    getKYLTJList: function (queryName, offset, limit, callback) {
        var acc = new dpGetKYLTJAccess(null);
        var filter = { year: { type: "<=", vals: queryName } };
        async.series([
            acc.open.bind(acc, false),
            acc.getPage.bind(acc, filter, ["YEAR desc"], offset, limit)
        ], function (err, data) {
            acc.close(function () { });
            data[1].total = 3;
            callback(err, data && data[1]);
        });
    },
    //接口25
    getHYTJList: function (queryName, offset, limit, callback) {
        var acc = new dpGetHYTJAccess(null);
        var filter = { year: { type: "<=", vals: queryName } };
        async.series([
            acc.open.bind(acc, false),
            acc.getPage.bind(acc, filter, ["YEAR desc"], offset, limit)
        ], function (err, data) {
            acc.close(function () { });
            data[1].total = 3;
            callback(err, data && data[1]);
        });
    },
    //新增接口6
    getHYKYList: function (year, callback) {
        var acc = new dpGetHYKYAccess(null);
        var filter = { hyYear: year };
        async.series([
            acc.open.bind(acc, false),
            acc.getObject.bind(acc, filter)
        ], function (err, data) {
            acc.close(function () { });
            var obj = {
                "year": data[1].hyYear,
                "hyl": data[1].slhyl + data[1].glhyl,
                "hyTumover": data[1].hyTumover,
                "kyl": data[1].kyl,
                "kyTumover": data[1].kyTumover,
            }
            data[1] = obj;
            callback(err, data && data[1]);
        });
    },

}
module.exports = that;