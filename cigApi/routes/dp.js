var webRes = require(ROOT_DIR + "/common/tools").webRes;
var webReq = require(ROOT_DIR + "/common/tools").webReq;
var dpService = require(ROOT_DIR + "/common/service/dp/dpService");
var cigScreenMaintenanceService = require(ROOT_DIR + "/common/service/dp/cigScreenMaintenanceService");
var actions = {
    /*
        接口1：
        数据来源：表【重要经济指标】DP_ZYJJZB
        参数：area:""地区，tjDate:""查询日期 格式 2017-02 
        备注: area参数必须传入 tjDate参数不传 以相应地区下数据库中最新时间为准
        返回字段【JSON类型】： 用电量、社会消费品零售总额、固定资产投资、万元GDP能耗、研究与试验经费支出 各自当月累计量  各自同期增减比
        示例地址：http://222.46.11.118:12080/cigApi/dp/getZYJJZB?area=长兴县&tjDate=
        返回数据：
        {"success":1,
            "data":[
                    {"id":"1",
                     "area":"长兴县",//地区
                     "tjDate":"2017-03",//统计日期
                     "zrk":32513,//总人口
                     "ydl":132,//用电量(亿千瓦时)
                     "ydlTqzjl":32.4,//用电量同期增减率
                     "shxfplsze":4234,//社会消费品零售总额(亿元)
                     "shxfplszeTqzjl":2.6,//社会消费品零售总额同期增减率
                     "gdzctz":134,//固定资产投资(亿元)
                     "gdzctzTqzjl":1.6,//固定资产投资同期增减率
                     "wygdpnh":3242,//万元GDP能耗(吨标准煤/万元)
                     "wygdpnhTqzjl":23.6,//万元GDP能耗同期增减率
                     "yjysyjfzc":7635,//研究与试验经费支出(亿元)
                     "yjysyjfzcTqzjl":63.6//研究与试验经费支出同期增减率
                    }
                   ]
         }
    */
    getZYJJZB: function (req, res) {
        var query = webReq.getQueryParam(req, {
            "area":"",
            "tjDate":"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getZYJJZBList(
            query.area,
            query.tjDate,
            webRes.exportJson.bind(null, res));
    },

    /*
        接口2：
        数据来源：表【农业行业产值】DP_NYHYCZ
        参数：area:"",地区；tjDate:"",想要查询的时间
        备注: area参数必须传入 tjDate参数不传 以相应地区下数据库中最新时间为准
        返回字段【JSON类型】：合计、农业、林业、牧业、渔业、农林牧服务业 各业的产值 各业的增长率
        示例地址：http://222.46.11.118:12080/cigApi/dp/getNYHYCZ?area=长兴县&tjDate=
        返回数据：
        {"success":1,
         "data":[
                 {"id":"1",
                  "area":"长兴县",//地区
                  "tjDate":"2017-03",//统计日期
                  "total":324,//合计(亿元)
                  "totalZzl":23.3,//合计增长率
                  "ny":231,//农业（亿元）
                  "nyZzl":34.5,//农业增长率
                  "ly":4326,//林业（亿元）
                  "lyZzl":343.4,//林业增长率
                  "my":234,//牧业(亿元)
                  "myZzl":43.5,//牧业增长率
                  "fishery":4326,//渔业(亿元)
                  "fisheryZzl":32.6,//渔业增长率
                  "nlmyfwy":34265,//农林目渔服务业（亿元）
                  "nlmyfwfZzl":24.7//农林目渔服务业增长率
                 }
                ]
         }
    */
    getNYHYCZ: function (req, res) {
        var query = webReq.getQueryParam(req, {
            area: "",
            tjDate: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getNYHYCZList(
            query.area,
            query.tjDate,
            webRes.exportJson.bind(null, res));
    },

    /*
       接口3：
       数据来源：表【规模以上工业产值】DP_GMYSGYCZ
       参数：area:"",地区；tjDate:"",想要查询的时间
       返回字段【JSON类型】：规上工业总产值、大中型工业企业、小型工业企业、新产品产值、工业销售产值 各产值和增长率
       示例：http://222.46.11.118:12080/cigApi/dp/getGMYSGYCZ?area=雉城街道&tjDate=2017-04
       返回数据：
      {"success":1,
        "data":[
                {"id":"5",
                 "area":"镇1",//地区
                 "tjDate":"2017-04",//统计日期
                 "gsgyzcz":3214,//规上工业总产值（亿元）
                 "gsgyzczZjl":3.5,//规上工业总产值增减率
                 "dzxgyqy":1234,//大中型工业企业(亿元)
                 "dzxgyqyZjl":32.5,//大中型工业企业增减率
                 "xxgyqy":1324.6,//小型工业企业(亿元)
                 "xxgyqyZjl":24.6,//小型工业企业增减率
                 "xcpcz":1234,//新产品产值(亿元)
                 "xcpczZjl":12.5,//新产品产值增减率
                 "gyxscz":1234,//工业销售产值(亿元)
                 "gyxsczZjl":21.6//工业销售产值增减率
                }
               ]
     }
    */
    getGMYSGYCZ: function (req, res) {
        var query = webReq.getQueryParam(req, {
            area:"",
            tjDate:"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getGMYSGYCZList(
            query.area,
            query.tjDate,
            webRes.exportJson.bind(null, res));
    },
    /*
      接口4：
      数据来源：表【GDP统计】DP_GDPTJ
      参数：area:"",地区；tjDate:"",想要查询的时间
      返回字段【JSON类型】：GDP、一产、二产、三产、战略新兴产业 各产值 各增长率
      示例：http://222.46.11.118:12080/cigApi/dp/getGDPTJ?area=雉城街道&tjDate=
      返回数据：
      {"success":1,
        "data":[
                {
                 "id":"4",//ID
                 "area":"镇1",//地区
                 "tjDate":"2017-04",//统计日期
                 "gdp":1324132,//GDP（亿元）
                 "gdpTqzzl":0,//GDP同期增长率
                 "dycy":1234,//第一产业(亿元)
                 "dycyTqzzl":12.5,//第一产业同期增长率
                 "dycyZb":0,//第一产业占比
                 "decy":12345123,//第二产业（亿元）
                 "decyTqzzl":11.4,//第二产业同期增长率
                 "decyZb":12.5,//第二产业占比
                 "dscy":1324,//第三产业（亿元）
                 "dscyTqzzl":12.6,//第三产业同期增长率
                 "dscyZb":12.9,//第三产业占比
                 "zlxxcy":3214,//战略新兴产业（亿元）
                 "zlxxcyTqzzl":43.3,//战略新兴产业同期增长率
                 "zlxxcyZb":32.6//战略新兴产业占比
                }
               ]
     }
    */
    getGDPTJ:function(req,res){
        var query = webReq.getQueryParam(req, {
            area:"",
            tjDate:"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getGDPTJList(
            query.area,
            query.tjDate,
            webRes.exportJson.bind(null, res));
    },
    /*
      接口5：
      数据来源：表【财政金融外资居民可支配统计】DP_CZJRWZJMKZPTJ
      参数：area:"",地区；tjDate:"",想要查询的时间
      返回字段【JSON类型】：财政总收入、地方财政收入 财政总收入同期增长率、地方财政收入同期增长率
      示例地址：http://222.46.11.118:12080/cigApi/dp/getFinance?area=长兴县&tjDate=2016-03
      返回数据：
      {"success":1,
        "data":
            {
             "area":"长兴县",//地区
             "tjDate":"2017-03",//统计日期
             "czzsr":3214,//财政总收入（亿元）
             "czzsrTqzzl":2.4,//财政总收入同期增长率
             "dfczsr":123321,//地方财政收入(亿元)
             "dfczsrTqzzl":21.5//地方财政收入同期增长率
            }
      }
   */
    getFinance: function (req, res) {
        var query = webReq.getQueryParam(req, {
            area:"",
            tjDate:"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getFinanceList(
            query.area,
            query.tjDate,
            webRes.exportJson.bind(null, res));
    },
    /*
      接口6：
      数据来源：表【财政金融外资居民可支配统计】DP_CZJRWZJMKZPTJ
      参数：area:"",地区；tjDate:"",想要查询的时间
      返回字段【JSON类型】：金融机构本外币存款余额、金融机构本外币贷款余额 金融机构本外币存款余额同期增长率 金融机构本外币贷款余额同期增长率
      示例地址：http://222.46.11.118:12080/cigApi/dp/getBanking?area=长兴县&tjDate=
      返回数据：
      {"success":1,
        "data":
              {
               "area":"长兴县",//地区
               "tjDate":"2017-03",//统计日期
               "wbckye":2134,//金融机构本外币存款余额
               "wbckyeTqzzl":24.6,//金融机构本外币存款余额同期增长率
               "wbdkye":2536,//金融机构本外币贷款余额(千万元)
               "wbdkyeTqzzl":2.3//金融机构本外币贷款余额同期增长率
              }
      }
   */
    getBanking: function (req, res) {
        var query = webReq.getQueryParam(req, {
            area:"",
            tjDate:"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getBankingList(
            query.area,
            query.tjDate,
            webRes.exportJson.bind(null, res));
    },
    /*
      接口7：
      数据来源：表【财政金融外资居民可支配统计】DP_CZJRWZJMKZPTJ
      参数：area:"",地区；tjDate:"",想要查询的时间
      返回字段【JSON类型】：进出口总额、出口总额、合同外资、实用外资 各自增长率
      本月止累计
      增长比
      示例地址：http://222.46.11.118:12080/cigApi/dp/getForeignTrade?area=长兴县&tjDate=
      返回数据：
      {"success":1,
        "data":{
                "area":"长兴县",//地区
                "tjDate":"2017-03",//统计日期
                "jckze":2345,//进出口总额(万美元)
                "jckzeTqzjl":32.6,//进出口总额同期增减率
                "ckze":2356,//出口总额(万美元)
                "ckzeTqzjl":3.7,//出口总额同期增减率
                "htwz":2346,//合同外资(万美元)
                "htwzTqzjl":32.7,//合同外资同期增减率
                "sywz":23452,//实用外资(万美元)
                "sywzTqzjl":24.6//实用外资同期增减率
               }
      }
   */
    getForeignTrade: function (req, res) {
        var query = webReq.getQueryParam(req, {
            area:"",
            tjDate:"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getForeignTradeList(
            query.area,
            query.tjDate,
            webRes.exportJson.bind(null, res));
    },
     /*
        新增接口1：
        数据来源：表【财政金融外资居民可支配统计】DP_CZJRWZJMKZPTJ
        参数：area:"",地区；tjDate:"",想要查询的时间
        返回字段【JSON类型】：城市军民可支配收入、乡村居民可支配收入 城市军民可支配收入同期增减率 乡村居民可支配收入同期增减率
        示例地址：http://222.46.11.118:12080/cigApi/dp/getIncome?area=长兴县&tjDate=2016-02
        返回数据
           {"success":1,
             "data":{
                     "area":"长兴县",//地区
                     "tjDate":"2017-02",//统计日期
                     "jmkzpsr":2345,//城市军民可支配收入(元)
                     "jmkzpsrTqjzl":23.6,//城市军民可支配收入同期增减率
                     "xcjmkzpsr":2345,//乡村居民可支配收入(元)
                     "xcjmkzpsrTqzjl":23.6//乡村居民可支配收入同期增减率
                    }
           }
        */
    getIncome:function(req,res){
        var query = webReq.getQueryParam(req, {
            area:"",
            tjDate:"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getIncomeList(
            query.area,
            query.tjDate,
            webRes.exportJson.bind(null, res));
    },
    /*
        新增接口2：
        表【GDP统计】DP_GDPTJ
        参数：tjDate:"",统计时间
        返回字段【JSON类型】长兴县：省内同类地区排名前五个、省外同类地区排名前五个的各地区名称及产值（亿元）
        示例地址 http://222.46.11.118:12080/cigApi/dp/getRanking?tjDate=2016-12
        返回数值
        {"success":1,
            "data":{"sn":[//省内同类地区排名前五个
                          {"area":"同类地区16",//地区名称
                           "sf":"浙江省",//省份
                           "tjDate":"2017-03",//统计日期
                           "cz":9436343,//产值（亿元）
                           "ranKing":1//排名
                           },
                           {"area":"同类地区14","sf":"浙江省","tjDate":"2017-03","cz":623242,"ranKing":2},
                           {"area":"同类地区4","sf":"浙江省","tjDate":"2017-03","cz":97647,"ranKing":3},
                           {"area":"同类地区13","sf":"浙江省","tjDate":"2017-03","cz":65236,"ranKing":4},
                           {"area":"长兴县","tjDate":"2017-03","cz":24,"sf":"浙江省","ranKing":17}
                         ],
                    "sw":[//省外同类地区排名前五个
                          {"area":"同类地区22",//地区名称
                           "sf":"河南省",//省份
                           "tjDate":"2017-03",//统计日期
                           "cz":8436343,//产值（亿元）
                           "ranKing":1//排名
                          },
                          {"area":"同类地区27","sf":"河北省","tjDate":"2017-03","cz":7436343,"ranKing":2},
                          {"area":"同类地区30","sf":"河北省","tjDate":"2017-03","cz":5436343,"ranKing":3},
                          {"area":"同类地区17","sf":"江苏省","tjDate":"2017-03","cz":2341233,"ranKing":4},
                          {"area":"长兴县","tjDate":"2017-03","cz":24,"sf":"浙江省","ranKing":16}
                         ]
                    }
          }

    */
    getRanking:function(req,res){
        var query = webReq.getQueryParam(req, {
            tjDate: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getRankingList(
            query.tjDate,
            webRes.exportJson.bind(null, res)
        ); 
    },
    /*
        新增接口3：
        数据来源：表【重要经济指标表】 DP_ZYJJZB【财政金融外资居民可支配统计】DP_CZJRWZJMKZPTJ 表【GDP统计表】 DP_GDPTJ【规模以上工业产值】DP_GMYSGYCZ
        参数：startDate:"",开始查询时间
             endDate:"",截至查询时间
             area:"",查询地区
        返回字段【JSON类型】：
        当前月度
        单位名称
        固定资产投资同期增减比
        示例地址 http://222.46.11.118:12080/cigApi/dp/getJJZS?startDate=2016-01&endDate=2016-10&area=长兴县
        返回数值
        {"success":1,
            "data":[
                    {"tjDate":"2017-01",//统计日期
                     "zyArea":"长兴县",//地区
                     "zrk":32513,//总人口（万人）
                     "gdzctz":134,//固定资产投资总额（亿元）
                     "csjmsr":2345,//城市居民收入（元）
                     "xcjmsr":2345,//乡村居民收入（元）
                     "gdp":6829,//GDP(亿元)
                     "gyzjz":1234//工业增加值（亿元）
                    },
                    {"tjDate":"2017-02","zyArea":"长兴县","zrk":32513,"gdzctz":134,"csjmsr":2345,"xcjmsr":2345,"gdp":4434,"gyzjz":1234},
                    {"tjDate":"2017-03","zyArea":"长兴县","zrk":32513,"gdzctz":134,"csjmsr":2345,"xcjmsr":2345,"gdp":6954,"gyzjz":1234}
                   ]
        }

    */
    getJJZS:function(req,res){
        var query = webReq.getQueryParam(req, {
            startDate: "",
            endDate: "",
            area:"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getJJZSList(
            query.startDate,
            query.endDate,
            query.area,
            webRes.exportJson.bind(null, res)
        ); 
    },
    /*
      新增接口4
      数据来源 表【GDP统计】DP_GDPTJ
      参数 tjDate:"",查询时间
      返回字段【JSON类型】地区名称 GDP产值（亿元）统计日期
      示例地址：http://222.46.11.118:12080/cigApi/dp/getAreaGdp?tjDate=
      返回数据：
      {"success":1,"data":[
          {"gdp":134132,//GDP产值（亿元）
           "area":"镇1",//地区名称
           "tjDate":"2017-05"//统计日期
          },
          {"gdp":6432,"area":"镇28","tjDate":"2017-05"},{"gdp":134132,"area":"镇1","tjDate":"2017-05"},{"gdp":324132,"area":"镇2","tjDate":"2017-05"},{"gdp":134132,"area":"镇2","tjDate":"2017-05"},{"gdp":32432,"area":"镇2","tjDate":"2017-05"},{"gdp":6565,"area":"镇3","tjDate":"2017-05"},{"gdp":4132,"area":"镇4","tjDate":"2017-05"},{"gdp":1322,"area":"镇5","tjDate":"2017-05"},{"gdp":4132,"area":"镇6","tjDate":"2017-05"},{"gdp":134132,"area":"镇7","tjDate":"2017-05"},{"gdp":24132,"area":"镇8","tjDate":"2017-05"},{"gdp":132,"area":"镇9","tjDate":"2017-05"},{"gdp":2,"area":"镇10","tjDate":"2017-05"},{"gdp":32,"area":"镇11","tjDate":"2017-05"},{"gdp":13289,"area":"镇12","tjDate":"2017-05"},{"gdp":84132,"area":"镇13","tjDate":"2017-05"},{"gdp":456,"area":"镇14","tjDate":"2017-05"},{"gdp":42623,"area":"镇15","tjDate":"2017-05"},{"gdp":23652,"area":"镇16","tjDate":"2017-05"},{"gdp":346532,"area":"镇17","tjDate":"2017-05"},{"gdp":45234,"area":"镇18","tjDate":"2017-05"},{"gdp":4363,"area":"镇19","tjDate":"2017-05"},{"gdp":34763,"area":"镇20","tjDate":"2017-05"},{"gdp":974564,"area":"镇21","tjDate":"2017-05"},{"gdp":34652,"area":"镇22","tjDate":"2017-05"},{"gdp":65732,"area":"镇23","tjDate":"2017-05"},{"gdp":432,"area":"镇24","tjDate":"2017-05"},{"gdp":65372,"area":"镇25","tjDate":"2017-05"},{"gdp":4576132,"area":"镇26","tjDate":"2017-05"},{"gdp":4532,"area":"镇27","tjDate":"2017-05"},{"gdp":32432,"area":"镇2","tjDate":"2017-05"}]
      }
    */
     getAreaGdp:function(req,res){
        var query = webReq.getQueryParam(req, {
           tjDate:"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getAreaGdpList(
            query.tjDate,
            webRes.exportJson.bind(null, res)
        ); 
     },
     /*
     新增接口5：
        表【GDP统计】 DP_GDPTJ
        参数：tjDate:"",统计时间 area:"",
        返回字段【JSON类型】GDP产值排名 前5个地区名称及产值（亿元）
        示例地址 http://222.46.11.118:12080/cigApi/dp/getTownRanking?tjDate=2016-03&area=雉城街道
        返回数据：
        {"success":1,
            "data":{
                    "zq":[
                         {"area":"镇26",//地区名称
                          "tjDate":"2017-05",//统计日期
                          "gdp":4576132,//GDP产值（亿元）
                          "ranKing":1//排名
                         },
                         {"area":"镇21","tjDate":"2017-05","gdp":974564,"ranKing":2},
                         {"area":"镇17","tjDate":"2017-05","gdp":346532,"ranKing":3},
                         {"area":"镇2","tjDate":"2017-05","gdp":324132,"ranKing":4},
                         {"area":"镇3","tjDate":"2017-05","gdp":6565,"ranKing":21}
                         ]
                    }
        }
     */
    getTownRanking:function(req,res){
        var query = webReq.getQueryParam(req, {
            tjDate: "",
            area:"",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getTownRanking(
            query.tjDate,
            query.area,
            webRes.exportJson.bind(null, res)
        ); 
    },
     /*
     新增接口9：
        表【GDP统计】 DP_GDPTJ
        参数：tjDate:"",
        返回字段【JSON类型】各镇GDP 亿元）
        示例地址 http://222.46.11.118:12080/cigApi/dp/getGDPByAllTown?tjDate=2016-03
        返回数据：
        {"success":1,
            "data":{
                    "长兴县":100.6936,//地区：GDP（亿元）
                    "雉城街道":20.13,
                    "夹浦镇 ":1.4916,
                    "古城街道  ":1.9725000000000001,
                    "煤山镇":1.8241,
                    "太湖街道":2.27
                   }
        }
     */
    getGDPByAllTown:function(req,res){
        var query = webReq.getQueryParam(req, {
            tjDate: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getGDPByAllTown(
            query.tjDate,
            webRes.exportJson.bind(null, res)
        );
    },
    /*
      接口8：
      数据来源：表【污染源企业分类及数量】DP_WYYQY
      参数：无
      返回字段【JSON类型】： 企业总数 污染源企业类型
      污染源企业数量
      污染源企业达标率
      示例地址： http://222.46.11.118:12080/cigApi/dp/getWRYQYFLJSL
      返回数据
      {"success":1,
       "data":[
               {
                   "id":"1",//ID
                   "wyyqyLx":"废水企业",//污染源企业类型
                   "wyyqyCount":123,//污染源企业数量
                   "wyyqyDbl":0//污染源企业达标率
               },
               {"id":"2","wyyqyLx":"废气企业","wyyqyCount":2144,"wyyqyDbl":0},
               {"id":"3","wyyqyLx":"固废企业","wyyqyCount":3215,"wyyqyDbl":0}
              ]
      }
   */
    getWRYQYFLJSL: function (req, res) {
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getWRYQYFLJSLList(
            webRes.exportJson.bind(null, res));
    },
    /*
       接口9：
       数据来源：表【信访统计】DP_XFTJ
       参数：信访时间段
       返回字段【JSON类型】： 辖区  投诉数量
       传入参数：startTime:"",//开始时间 例如startTime:"2016-02-10"需为yyyy-mm-dd形式
                endTime:"",//结束时间 例如sendTime:"2017-02-10"需为yyyy-mm-dd形式
       示例地址：http://222.46.11.118:12080/cigApi/dp/getXFTJ?startTime=2016-02-10&endTime=2017-02-10
       返回数据 （返回传入 开始时间 到 结束时间 直接的数据）
       {"success":1,
        "data":[
               {"id":"1",
                "xfDate":"2016-01-01",//监测日期
                "xfXq":"和平分局",//辖区
                "xfCount":4//投诉数量
               },
               {"id":"2","xfDate":"2016-01-02","xfXq":"夹浦所","xfCount":5},
               {"id":"3","xfDate":"2016-01-03","xfXq":"李家巷所","xfCount":17},
               {"id":"4","xfDate":"2016-01-04","xfXq":"煤山分局","xfCount":7},
               {"id":"5","xfDate":"2016-01-05","xfXq":"泗安分局","xfCount":14},
               {"id":"6","xfDate":"2016-01-06","xfXq":"雉城所","xfCount":24},
               {"id":"7","xfDate":"2016-02-01","xfXq":"和平分局","xfCount":1},
               {"id":"8","xfDate":"2016-02-01","xfXq":"夹浦所","xfCount":3},
               {"id":"9","xfDate":"2016-02-01","xfXq":"李家巷所","xfCount":11},
               {"id":"10","xfDate":"2016-02-01","xfXq":"煤山分局","xfCount":2}
               ]
        }
   */
    getXFTJ: function (req, res) {
        var query = webReq.getQueryParam(req, {
            startTime: "",
            endTime: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getXFTJQueryList(
            query.startTime,
            query.endTime,
            webRes.exportJson.bind(null, res));
    },
    /*
    接口10：
    数据来源：表【重点监测废水企业日数据】，【重点监测废气企业日数据】
    参数  起始时间，结束时间 如果不传默认查取最新数据 
         startDate:"",想查询的开始时间 格式 yyyy-mm-dd 例如 startDate:"2017-02-02"
         endDate:"",想查询的截至时间 格式 yyyy-mm-dd 例如 endDate:"2017-02-10"
                       
    返回字段【JSON类型】： 二氧化硫（mg/m³）、氮氧化物（mg/m³）、COD（mg/L）、氨氮（mg/L）各自的监测时间
    //企业id对应的企业只有废气排放的情况
    示例地址 http://222.46.11.118:12080/cigApi/dp/getJCDRSJByLastDay?startDate=2017-02-26 00&endDate=2017-02-26 02
            http://222.46.11.118:12080/cigApi/dp/getJCDRSJByLastDay?startDate=&endDate=
       返回数据
       {"success":1,"data":[
           [
               {"enterName":"长兴旗滨玻璃有限公司",//企业名称
                "time":"2017-02-26 23",//监测时间
                "so2":229,//二氧化硫（mg/m³）
                "dyhw":417//氮氧化物（mg/m³）
               },
               {"enterName":"湖州槐坎南方水泥有限公司","time":"2017-02-26 23","so2":9,"dyhw":267},
               {"enterName":"湖州煤山南方水泥有限公司","time":"2017-02-26 23","so2":74,"dyhw":210},
               {"enterName":"浙江长广（集团）有限责任公司生物质发电分公司","time":"2017-02-26 23","so2":2,"dyhw":56},
               {"enterName":"华能国际电力股份有限公司长兴电厂","time":"2017-02-26 23","so2":1,"dyhw":24},
               {"enterName":"长兴南方水泥有限公司","time":"2017-02-26 23","so2":12,"dyhw":343},
               {"enterName":"浙江浙能长兴发电有限公司","time":"2017-02-26 23","so2":15,"dyhw":27},
               {"enterName":"湖州小浦南方水泥有限公司","time":"2017-02-26 23","so2":0,"dyhw":309},
               {"enterName":"湖州南方水泥有限公司","time":"2017-02-26 23","so2":10,"dyhw":266},
               {"enterName":"长兴新城环保有限公司","time":"2017-02-26 23","so2":51,"dyhw":191}
           ],
           [   
               {"enterName":"长兴兴长污水处理有限公司",//企业名称
                "time":"2017-02-26 23",//监测时间
                "cod":22,//COD（mg/L）
                "ad":0//氨氮（mg/L）
               },
               {"enterName":"长兴宏峰纺织印染有限公司","time":"2017-02-26 23","cod":179,"ad":0},
               {"enterName":"长兴林盛水质净化有限公司","time":"2017-02-26 23","cod":43,"ad":0},
               {"enterName":"长兴县夹浦污水处理有限公司","time":"2017-02-26 23","cod":43,"ad":0},
               {"enterName":"长兴新源污水处理厂","time":"2017-02-26 23","cod":33,"ad":0},
               {"enterName":"长兴永平水务有限公司","time":"2017-02-26 23","cod":41,"ad":1},
               {"enterName":"长兴李家巷新世纪污水处理有限公司","time":"2017-02-26 23","cod":44,"ad":0},
               {"enterName":"长兴新天地污水处理厂","time":"2017-02-26 23","cod":43,"ad":0},
               {"enterName":"长兴昂为环境生态工程有限公司","time":"2017-02-26 23","cod":45,"ad":1}
           ]
         ]
       }
   */
    getJCDRSJByLastDay: function (req, res) {
            var query = webReq.getQueryParam(req, {
                startDate:"",
                endDate:"",
            });
        
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getJCDRSJByLastDayQueryList(
            query.startDate,
            query.endDate,
            webRes.exportJson.bind(null, res));
    },
    /*
       接口11：
       数据来源：表【AQI】
       说明：本接口返回的数据为当天时间对应的数据如果没有查到很可能是表里没有当天相关数据
       参数：当天时间
       返回字段【JSON类型】： AQI 空气质量等级  PM2.5
       示例地址 http://222.46.11.118:12080/cigApi/dp/getAqiNow
       返回数据： 
       {"success":1,
        "data":[
                {"aqi":1,//AQI
                 "pfkBm":"优",//空气质量等级  
                 "pm2_5":"1"//PM2.5
                }
               ]
       }
   */
    getAqiNow: function (req, res) {
        var date = new Date;
        var nowyear = date.getFullYear();
        var nowmonth = date.getMonth() + 1;
        if (nowmonth < 10) {
            nowmonth = "0" + nowmonth
        }
        var nowday = date.getDate();
        if (nowday < 10) {
            nowday = "0" + nowday
        }
        var query = webReq.getQueryParam(req, {
            jcDate: `${nowyear}-${nowmonth}-${nowday}`,
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getAqiNowQueryList(
            query.jcDate,
            webRes.exportJson.bind(null, res));
    },
    /*
       接口12：
       数据来源：表【AQI】
       说明：可传入参数  endDate:"",想查询的截至时间 格式 yyyy-mm-dd 例如 endDate:"2017-02-10"
                       startDate:"",想查询的开始时间 格式 yyyy-mm-dd 例如 startDate:"2017-02-02"
                       例如以上例子那么 "2017-02-02"到"2017-02-10"之间的数据将被查出并返回
            如果不传入参数：默认读取当天时间往前7天的数据
       参数：默认读取当天时间往前7天的数据
       返回字段【JSON类型】： AQI 监测时间
       示例地址 http://222.46.11.118:12080/cigApi/dp/getAqiBefore
       返回数据 ：
       {"success":1,
           "data":[
                   {
                    "aqii":12321,//AQI
                    "jcDate":"2017-02-04T16:00:00.000Z"//监测时间
                   },
                   {"aqii":56457,"jcDate":"2017-02-05T16:00:00.000Z"},
                   {"aqii":34534,"jcDate":"2017-02-06T16:00:00.000Z"},
                   {"aqii":23523,"jcDate":"2017-02-07T16:00:00.000Z"},
                   {"aqii":43254,"jcDate":"2017-02-08T16:00:00.000Z"},
                   {"aqii":2343,"jcDate":"2017-02-09T16:00:00.000Z"},
                   {"aqii":235,"jcDate":"2017-02-10T16:00:00.000Z"}
                  ]
       }
   */
    getAqiBefore: function (req, res) {
        var num = req.url.indexOf("?");
        if (num != -1) {
            var query = webReq.getQueryParam(req, {
                endDate: "",
                startDate: "",
            });
        } else {
            var date = new Date;
            var nowyear = date.getFullYear();
            var nowmonthcopy=nowmonth;
            var nowmonth = date.getMonth() + 1;
            var nowmonthcopy=nowmonth;
            var nowday = date.getDate() - 1;
            if (nowday < 10) {
                nowday = "0" + nowday
            }
            //获取7天前日期
            var beforeday = date.getDate() - 7;
            if(beforeday<0){
                nowmonth=nowmonth-1;
                if(nowmonth==2 && (nowyear % 4 == 0) && (nowyear % 100 != 0 || nowyear % 400 == 0)){
                    beforeday=beforeday+29;
                }else if(nowmonth==1 || nowmonth==3 || nowmonth==5 || nowmonth==7 || nowmonth==8 || nowmonth==10 || nowmonth==12){
                    beforeday=beforeday+31;
                }else if(nowmonth==4 || nowmonth==6 || nowmonth==9 || nowmonth==11){
                    beforeday=beforeday+30;
                }else{
                    beforeday=beforeday+28;
                }
            }else if (beforeday < 10) {
                beforeday = "0" + beforeday
            }
            if (nowmonth < 10) {
                nowmonth = "0" + nowmonth
            }
            if (nowmonthcopy < 10) {
                nowmonthcopy = "0" + nowmonthcopy
            }
            var query = webReq.getQueryParam(req, {
                endDate: `${nowyear}-${nowmonthcopy}-${nowday}`,
                startDate: `${nowyear}-${nowmonth}-${beforeday}`,
            });
        }
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getAqiBeforeList(
            query.startDate,
            query.endDate,
            webRes.exportJson.bind(null, res));
    },
    /*
       接口13：表【重点监测废水企业日数据】DP_JCFSRSJ，【重点监测废气企业日数据】DP_JCFQRSJ
       数据来源：表【监测点日数据】DP_JCDRSJ
       参数：默认读取最新时间的数据
       返回字段【JSON类型】： 根据二氧化硫（mg/m³）、氮氧化物（mg/m³）、COD（mg/L）、氨氮（mg/L）排放量排名前5企业ID
       示例地址 http://222.46.11.118:12080/cigApi/dp/getDataMonitoringByNow
       返回数据
       {"success":1,"data":{
       "SO2":[{"enterName":"长兴旗滨玻璃有限公司","time":"2017-02-26 23"},{"enterName":"湖州煤山南方水泥有限公司","time":"2017-02-26 23"},{"enterName":"长兴新城环保有限公司","time":"2017-02-26 23"},{"enterName":"浙江浙能长兴发电有限公司","time":"2017-02-26 23"},{"enterName":"长兴南方水泥有限公司","time":"2017-02-26 23"}],//二氧化硫（mg/m³）
       "DYHW":[{"enterName":"长兴旗滨玻璃有限公司","time":"2017-02-26 23"},{"enterName":"长兴南方水泥有限公司","time":"2017-02-26 23"},{"enterName":"湖州小浦南方水泥有限公司","time":"2017-02-26 23"},{"enterName":"湖州槐坎南方水泥有限公司","time":"2017-02-26 23"},{"enterName":"湖州南方水泥有限公司","time":"2017-02-26 23"}],//氮氧化物（mg/m³）
       "COD":[{"enterName":"长兴宏峰纺织印染有限公司","time":"2017-02-26 23"},{"enterName":"长兴昂为环境生态工程有限公司","time":"2017-02-26 23"},{"enterName":"长兴李家巷新世纪污水处理有限公司","time":"2017-02-26 23"},{"enterName":"长兴林盛水质净化有限公司","time":"2017-02-26 23"},{"enterName":"长兴县夹浦污水处理有限公司","time":"2017-02-26 23"}],//COD（mg/L）
       "AD":[{"enterName":"长兴昂为环境生态工程有限公司","time":"2017-02-26 23"},{"enterName":"长兴永平水务有限公司","time":"2017-02-26 23"},{"enterName":"长兴林盛水质净化有限公司","time":"2017-02-26 23"},{"enterName":"长兴县夹浦污水处理有限公司","time":"2017-02-26 23"},{"enterName":"长兴新源污水处理厂","time":"2017-02-26 23"}]}}//氨氮（mg/L）

   */
    getDataMonitoringByNow: function (req, res) {
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getJCDRSJNewQueryList(
            //query.jcDate,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口14：
        数据来源：表【五水共治项目情况】DP_WSGZ
        参数：无
        返回字段【JSON类型】： 项目名称  项目进度
        示例地址http://222.46.11.118:12080/cigApi/dp/getProjectSituation
        返回数据 ：
        {"success":1,
            "data":[
                    {
                     "projName":"项目1",//项目名称
                     "projJd":1.55//项目进度
                    },
                    {"projName":"项目2","projJd":2.5},
                    {"projName":"项目3","projJd":3.5},
                    {"projName":"项目4","projJd":4.55}
                   ]
        }
    */
    getProjectSituation: function (req, res) {
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getProjectSituationQueryList(
            webRes.exportJson.bind(null, res));
    },
    /*
        接口15：
        数据来源：表【旅游业统计】DP_LYYTJ
        参数：年度 year:""; 例如year:"2017"
        返回字段【JSON类型】： 年度 总收入（万元）  总人数
        示例地址 http://222.46.11.118:12080/cigApi/dp/getLYYTJ?year=2017
        返回数据
        {"success":1,
            "data":[
                    {"id":"1",
                     "year":2017,
                     "zsr":1232134,
                     "zrs":1233253}
                   ]
        }

    */
    getLYYTJ: function (req, res) {
        var query = webReq.getQueryParam(req, {
            year: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getLYYTJList(
            query.year,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口16：
        数据来源：表【旅游人数统计及走势】DP_LYRSTJZS
        参数：endDate:"",想查询的截至时间 格式 yyyy-mm-dd 例如 endDate:"2017-02-10"
             startDate:"",想查询的开始时间 格式 yyyy-mm-dd 例如 startDate:"2017-02-02"
        返回字段【JSON类型】： 时间  人数 相比变化率
        示例地址http://222.46.11.118:12080/cigApi/dp/getLYRSTJZS?startDate=2016-07-01&endDate=2017-02-01
        返回数据
        {"success":1,
            "data":[
                    {"id":"7",
                     "time":"2016-07-01 10:12:19",//时间
                     "rs":1426143,//人数
                     "xbbhl":20.12//相比变化率
                    },
                    {"id":"6","time":"2016-08-01 10:12:19","rs":376375,"xbbhl":20.12},
                    {"id":"5","time":"2016-09-01 10:12:19","rs":35733,"xbbhl":20.12},
                    {"id":"4","time":"2016-10-01 10:12:19","rs":976986,"xbbhl":20.12},
                    {"id":"3","time":"2016-11-01 10:12:19","rs":243545,"xbbhl":20.12},
                    {"id":"2","time":"2016-12-01 10:12:19","rs":1234432,"xbbhl":20.12},
                    {"id":"1","time":"2017-02-01 10:12:19","rs":2354252,"xbbhl":20.12}
                   ]
       }

    */
    getLYRSTJZS: function (req, res) {
        var query = webReq.getQueryParam(req, {
            endDate: "",
            startDate: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getLYRSTJZSList(
            query.endDate,
            query.startDate,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口17：
        数据来源：表【景区门票统计】DP_JQMPTJ
        参数：默认查取当前年份前三年
        返回字段【JSON类型】： 年度 门票收入 
        示例地址 http://222.46.11.118:12080/cigApi/dp/getJQMPTJ
        返回数据
        {"success":1,
            "data":{
                "rows":[
                        {"id":"1",//ID
                         "year":2016,//年度
                         "mpsr":132235,//门票收入
                         "RN":1
                        },
                        {"id":"2","year":2015,"mpsr":835644,"RN":2},
                        {"id":"3","year":2014,"mpsr":795334,"RN":3}
                       ],"total":3
                    }
        }

    */
    getJQMPTJ: function (req, res) {
        var date = new Date;
        var nowyear = date.getFullYear() - 1;
        var query = webReq.getQueryParam(req, {
            year: `${nowyear}`,
            offset: 0,
            limit: 3,
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getJQMPTJList(
            query.year,
            query.offset,
            query.limit,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口18：
        数据来源：表【景点收入统计】DP_JDSRTJ
        参数：年度
        返回字段【JSON类型】： 年度 景点名称  总收入 
        示例地址 http://222.46.11.118:12080/cigApi/dp/getJDSRTJ?year=2016
        返回数据
        {"success":1,
            "data":[
                    {"id":"1",//ID
                     "year":2016,//年度
                     "jdmc":"景点1",//景点名称
                     "zsr":132252总收入(单位 万元) 
                    }
                   ]
        }
    */
    getJDSRTJ: function (req, res) {
        var query = webReq.getQueryParam(req, {
            year: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getJDSRTJList(
            query.year,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口19：
        数据来源：表【景区实时门票统计】DP_JQSSMPTJ
        参数：默认最新时间（精确到天）
        返回字段【JSON类型】： 时间 景区名称  收入
        示例地址 http://222.46.11.118:12080/cigApi/dp/getJQSSMPTJ
        返回数据 
        {"success":1,
            "data":[
                    {"id":"1",//ID
                     "time":"2017-02-14T07:09:55.000Z",//时间
                     "jqmc":"景区1",//景区名称 
                     "sr":124321//收入（万元）
                    }
                   ]
        }

    */
    getJQSSMPTJ: function (req, res) {
        var date = new Date;
        var nowyear = date.getFullYear();
        var nowmonth = date.getMonth() + 1;
        if (nowmonth < 10) {
            nowmonth = "0" + nowmonth
        }
        var nowday = date.getDate();
        if (nowday < 10) {
            nowday = "0" + nowday
        }
        var query = webReq.getQueryParam(req, {
            time: `${nowyear}-${nowmonth}-${nowday}`,
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getJQSSMPTJList(
            query.time,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口20：
        数据来源：表【景区实时人数统计】DP_JQSSRSTJ
        参数：默认最新时间（精确到天）
        返回字段【JSON类型】： 时间 景区名称  人数
        示例地址 http://222.46.11.118:12080/cigApi/dp/getJQSSRSTJ
        返回数据
        {"success":1,
            "data":[
                    {"id":"1",//ID
                     "time":"2017-02-14T07:09:55.000Z",//时间
                     "jqmc":"景区1",//景区名称
                     "sr":769451//人数
                    }
                   ]
        }

    */
    getJQSSRSTJ: function (req, res) {
        var date = new Date;
        var nowyear = date.getFullYear();
        var nowmonth = date.getMonth() + 1;
        if (nowmonth < 10) {
            nowmonth = "0" + nowmonth
        }
        var nowday = date.getDate();
        if (nowday < 10) {
            nowday = "0" + nowday
        }
        var query = webReq.getQueryParam(req, {
            time: `${nowyear}-${nowmonth}-${nowday}`,
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getJQSSRSTJList(
            query.time,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口21：
        数据来源：表【旅游相关产业收入统计】DP_LYXGCYSRTJ
        参数：endDate:"",想查询的截至时间 格式 yyyy-mm-dd 例如 endDate:"2017-02-01"
             startDate:"",想查询的开始时间 格式 yyyy-mm-dd 例如 startDate:"2017-04-01"
        返回字段【JSON类型】： 时间 行业 收入
        示例地址 http://222.46.11.118:12080/cigApi/dp/getLYXGCYSRTJ?startDate=2017-02-01&endDate=2017-04-01
        返回数据
        {"success":1,
            "data":[
                    {"id":"1",
                     "time":"2017-02-01 18:24:04",
                     "hy":"酒店",
                     "sr":1243214
                    },
                    {"id":"2","time":"2017-02-01 18:24:04","hy":"酒店","sr":1243214},
                    {"id":"3","time":"2017-02-01 18:24:04","hy":"酒店","sr":1243214},
                    {"id":"6","time":"2017-02-01 18:24:04","hy":"餐饮","sr":1243214},
                    {"id":"7","time":"2017-02-01 18:24:04","hy":"餐饮","sr":1243214},
                    {"id":"8","time":"2017-02-01 18:24:04","hy":"餐饮","sr":1243214},
                    {"id":"4","time":"2017-03-01 18:24:04","hy":"酒店","sr":1243214},
                    {"id":"9","time":"2017-03-01 18:24:04","hy":"餐饮","sr":1243214},
                    {"id":"10","time":"2017-04-01 18:24:04","hy":"餐饮","sr":1243214},
                    {"id":"5","time":"2017-04-01 18:24:04","hy":"酒店","sr":1243214}
                   ]
        }

    */
    getLYXGCYSRTJ: function (req, res) {
        var query = webReq.getQueryParam(req, {
            endDate: "",
            startDate: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getLYXGCYSRTJList(
            query.endDate,
            query.startDate,
            webRes.exportJson.bind(null, res)
        );
    },
     /*
     新增接口7
     参数：无
     数据来源 表【景区实时人数收入临时表】 DP_JQSSRSSRLSB
     示例地址：http://222.46.11.118:12080/cigApi/dp/getJQSSRSSR
     返回数据：
     {"success":1,
      "data":{
              "RS"://各景区人数（个）
                 {
                  "水口茶文化景区":4785,
                  "海洋城":5925,
                  "城山沟":466,
                  "贡茶院":466,
                  "仙山湖":466,
                  "图影":233,
                  "江南红村":103,
                  "金钉子":124,
                  "扬子鳄":120,
                  "陈武帝":123
                 },
               "MPSR"://各景区门票收入（元）
                 {
                  "水口茶文化景区":382800,
                  "海洋城":592500,
                  "城山沟":37280,
                  "贡茶院":37280,
                  "仙山湖":55920,
                  "图影":23300,
                  "江南红村":4944,
                  "金钉子":8928,
                  "扬子鳄":9600,
                  "陈武帝":6150
                 }
             }
     }
    */
    getJQSSRSSR:function(req,res){
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getJQSSRSSRList(
            webRes.exportJson.bind(null, res)
        );
    },
    /*
     新增接口8
     参数：无   
     示例地址：http://222.46.11.118:12080/cigApi/dp/getLYXGCYSRZS?year=2016
     返回数据：      
     {"success":1,
      "data":[
              {
               "hymc":"酒店",//相关产业行业名称
               "sr":51637,//收入
               "month":1//月份
              },{"hymc":"餐饮","sr":25312,"month":1},{"hymc":"小商品","sr":12149,"month":1},{"hymc":"交通","sr":10125,"month":1},{"hymc":"酒店","sr":61965,"month":2},{"hymc":"餐饮","sr":30375,"month":2},{"hymc":"小商品","sr":14580,"month":2},{"hymc":"交通","sr":12150,"month":2},{"hymc":"酒店","sr":82620,"month":3},{"hymc":"餐饮","sr":40500,"month":3},{"hymc":"小商品","sr":19440,"month":3},{"hymc":"交通","sr":16200,"month":3},{"hymc":"酒店","sr":89505,"month":4},{"hymc":"餐饮","sr":43875,"month":4},{"hymc":"小商品","sr":21060,"month":4},{"hymc":"交通","sr":17550,"month":4},{"hymc":"酒店","sr":75735,"month":5},{"hymc":"餐饮","sr":37125,"month":5},{"hymc":"小商品","sr":17820,"month":5},{"hymc":"交通","sr":14850,"month":5},{"hymc":"酒店","sr":72292,"month":6},{"hymc":"餐饮","sr":35437,"month":6},{"hymc":"小商品","sr":17010,"month":6},{"hymc":"交通","sr":14175,"month":6},{"hymc":"酒店","sr":61965,"month":7},{"hymc":"餐饮","sr":30375,"month":7},{"hymc":"小商品","sr":14580,"month":7},{"hymc":"交通","sr":12150,"month":7},{"hymc":"酒店","sr":58522,"month":8},{"hymc":"餐饮","sr":28687,"month":8},{"hymc":"小商品","sr":13770,"month":8},{"hymc":"交通","sr":11475,"month":8},{"hymc":"酒店","sr":82620,"month":9},{"hymc":"餐饮","sr":40500,"month":9},{"hymc":"小商品","sr":19440,"month":9},{"hymc":"交通","sr":16200,"month":9},{"hymc":"酒店","sr":89505,"month":10},{"hymc":"餐饮","sr":43875,"month":10},{"hymc":"小商品","sr":21060,"month":10},{"hymc":"交通","sr":17550,"month":10},{"hymc":"酒店","sr":61965,"month":11},{"hymc":"餐饮","sr":30375,"month":11},{"hymc":"小商品","sr":14580,"month":11},{"hymc":"交通","sr":12150,"month":11},{"hymc":"酒店","sr":44752,"month":12},{"hymc":"餐饮","sr":21937,"month":12},{"hymc":"小商品","sr":10530,"month":12},{"hymc":"交通","sr":8775,"month":12}
             ]
     }
    */
    getLYXGCYSRZS:function(req,res){
        var query = webReq.getQueryParam(req, {
            year: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getLYXGCYSRZSList(
            query.year,
            webRes.exportJson.bind(null, res)
        );
    },
    /*
        接口22：
        数据来源：表【公路里程统计】DP_GLLCTJ
        参数：年份（默认读取前三年的数据）
        返回字段【JSON类型】： 年度 公路里程  同比增长率 （公路里程增长率）
        示例地址http://222.46.11.118:12080/cigApi/dp/getGLLCTJ
        返回数据
        {"success":1,
            "data":{"total":3,
                    "rows":[
                            {"id":"1",
                             "year":2016,
                             "gllc":32143,
                             "tbzzl":23.12,
                             "RN":1
                            },
                            {"id":"2","year":2015,"gllc":84764,"tbzzl":33.12,"RN":2},
                            {"id":"3","year":2014,"gllc":95654,"tbzzl":23.330000000000002,
                            "RN":3}
                           ]
                    }
        }

    */
    getGLLCTJ: function (req, res) {
        var date = new Date;
        var nowyear = date.getFullYear() - 1;
        var query = webReq.getQueryParam(req, {
            year: `${nowyear}`,
            offset: 0,
            limit: 3,
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getGLLCTJList(
            query.year,
            query.offset,
            query.limit,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口23：
        数据来源：表【航路里程统计】DP_HLLCTJ
        参数：年份（默认读取前三年的数据）
        返回字段【JSON类型】： 年度 航路里程 同比增长率（公路里程增长率 ）
        示例地址 http://222.46.11.118:12080/cigApi/dp/getHLLCTJ
        返回数据
        {"success":1,
            "data":{"total":3,
                    "rows":[
                            {"id":"1",
                             "year":2016,
                             "hllc":7453234,
                             "tbzzl":23.12,
                             "RN":1
                            },
                            {"id":"2","year":2015,"hllc":23452,"tbzzl":33.12,"RN":2},
                            {"id":"3","year":2014,"hllc":7243234,"tbzzl":23.330000000000002,"RN":3}
                           ]
                    }
        }

    */
    getHLLCTJ: function (req, res) {
        var date = new Date;
        var nowyear = date.getFullYear() - 1;
        var query = webReq.getQueryParam(req, {
            year: `${nowyear}`,
            offset: 0,
            limit: 3,
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getHLLCTJList(
            query.year,
            query.offset,
            query.limit,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口24：
        数据来源：表【客运量统计】DP_KYLTJ
        参数：年度（默认读取前三年的数据）
        返回字段【JSON类型】： 年度 客运量  同比增长率 客运周转量s
        示例地址 http://222.46.11.118:12080/cigApi/dp/getKYLTJ
        返回数据
        {"success":1,
           "data":{"total":3,
                  "rows":
                   [{"id":"6",
                    "year":2015,//年度
                    "kyl":807,//客运量
                    "kyTumover":43245,//客运周转量(万人)
                    "tbzzl":-15.1,//同比增长率
                    "RN":1
                    },
                    {"id":"5","year":2014,"kyl":950,"kyTumover":43245,"tbzzl":-15.7,"RN":2},
                    {"id":"4","year":2013,"kyl":1236,"kyTumover":43245,"tbzzl":-16.4,"RN":3}
                   ]}
        }

    */
    getKYLTJ: function (req, res) {
        var date = new Date;
        var nowyear = date.getFullYear() - 1;
        var query = webReq.getQueryParam(req, {
            year: `${nowyear}`,
            offset: 0,
            limit: 3,
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getKYLTJList(
            query.year,
            query.offset,
            query.limit,
            webRes.exportJson.bind(null, res));
    },
    /*
        接口25：
        数据来源：表【货运统计】DP_HYTJ
        参数：年份（默认读取前三年的数据）
        返回字段【JSON类型】： 年度 水路货运量 公路货运量  货运增长率 货运周转量(万吨)
        示例地址:http://222.46.11.118:12080/cigApi/dp/getHYTJ
        返回数据
        {"success":1,
          "data":{"total":3,
                 "rows":
                 [
                     {"id":"6",
                     "year":2015,//年度
                     "slhyl":2556,//水路货运量
                     "glhyl":2691,//公路货运量
                     "hyTumover":423,//货运周转量(万吨)
                     "hyzzl":null,//货运增长率
                     "RN":1
                      },
                      {"id":"5","year":2014,"slhyl":2576,"glhyl":2290,"hyTumover":423,"hyzzl":null,"RN":2},
                      {"id":"4","year":2013,"slhyl":4059,"glhyl":2357,"hyTumover":423,"hyzzl":null,"RN":3}
                 ]
                 }
        }

    */
    getHYTJ: function (req, res) {
        var date = new Date;
        var nowyear = date.getFullYear() - 1;
        var query = webReq.getQueryParam(req, {
            year: `${nowyear}`,
            offset: 0,
            limit: 3,
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getHYTJList(
            query.year,
            query.offset,
            query.limit,
            webRes.exportJson.bind(null, res));
    },
     /*
     新增接口6：
        表【客运量统计】DP_KYLTJ 表【货运统计】DP_HYTJ
        参数：year:"",要查询的年份
        返回字段【JSON类型】客运量（万人）客运周转量（万人） 货运量（万吨） 货运周转量（万吨）
        示例地址 http://222.46.11.118:12080/cigApi/dp/getHYKY?year=2015
        返回数据：
        {"success":1,
            "data":{
                    "year":2015,//年份
                    "hyl":5247,//货运量（万吨）
                    "hyTumover":62,//货运周转量（万吨）
                    "kyl":807,//客运量（万人）
                    "kyTumover":29775//客运周转量（万人）
                   }
        }
     */
    getHYKY:function(req,res){
        var query = webReq.getQueryParam(req, {
            year: "",
        });
        //跨域
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        dpService.getHYKYList(
            query.year,
            webRes.exportJson.bind(null, res));
    },
   
    /**
     * cig运维数据
     */
    /*
  CIG 数据量
  */
    getCIGAggregatedData: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.queryMaintenanceList(webRes.exportJson.bind(null, res));
    },

    /* {
         "success": 1,
         "data":
           {
             "aggregateData": 44367563,//聚合数据
             "onlineUser": 7864,//在线用户
             "accessToAuthority": 30,//接入委办局
             "accessToApplications": 150,//接入应用系统
             "twoDimensional": 198,//二维
             "threeDimensional": 435,//三维
             "poiNotePoint": 54589,//poi注记点
             "sufaceComponents": 5459,//地表部件
             "population": 642064,//人口
             "legalPerson": 55260,//法人
             "documents": 2335,//证件
             "addressPlace": 4589,//地名地址
             "videoSurveillance": 180,//视频数据
             "sensingData": 893276,//传感数据
             "monitoringData": 33606643,//监测数据
             "corporateInfor": 4298,//企业信息
             "liveliHoodInfo": 12279,//民生信息
             "camera": 4232,//摄像头
             "sensor": 712232,//传感器
             "waterResourcesInfo": 76385419,//水利信息
             "travelInfo": 1472232,//交通信息
             "meteorologicalInfo": 33488724,//气象信息
         }
     }*/
    getCIGPortalData: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.getCIGPortalData(webRes.exportJson.bind(null, res));
    },
    /*{
         "success": 1,
         "data":
           {
             "aggregateData": 44367563,//聚合数据
             "accessToAuthority": 30,//接入委办局
             "wfOfficeNum":"121"// 流程覆盖单位
             "wfServiceNum":"121"//流程服务访问总数
         }
     }*/
    /**
     * 三维沙盘查询
     */
    getDataCardList: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.queryDataCardList(webRes.exportJson.bind(null, res));
    },
    /* 
  {//每次返回四条数据，四条数据从16条数据中抽取
        "success": 1, "data":
            {
                "total": 4,
                "rows": [
                    {
                        "id": "c4432e75-d2bb-429b-a539-a7d9f03ecd02",
                        "fromDepartment": "公安局",   //发送单位
                        "toDepartment": "CIG数据中心", //接收单位
                        "receiveDate": "2017-01-11T18:53:35.000Z",//发送时间
                        "title": "人口信息",//消息标题
                         "dataNum": 1000,//数据量
                    },
                    {
                        "id": "b3a645a5-3a8a-4b4e-ac05-e2ee52fe11f8",
                        "fromDepartment": "农业局",
                        "toDepartment": "CIG数据中心",
                        "receiveDate": "2017-01-14T18:23:35.000Z",
                        "title": "食品溯源信息", "dataNum": 1000, 
                    },
                    { "id": "0099218d-11ac-4feb-a474-22906b442e59", "fromDepartment": "行政服务中心", "toDepartment": "CIG数据中心", "receiveDate": "2017-01-14T22:13:15.000Z", "title": "招投标信息", "dataNum": 1000,},
                    { "id": "7b383ce5-5433-4485-a868-5e0638f3fd71", "fromDepartment": "商务局", "toDepartment": "CIG数据中心", "receiveDate": "2017-01-14T20:23:35.000Z", "title": "对外贸易经营者备案登记信息", "dataNum": 1000, }
                ]
            }
    }
    */
    /**
     * 集群服务器运行状态
     */
    getClusterStatus: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.queryClusterStatusList(webRes.exportJson.bind(null, res));
    },
    /*
    {
        "success": 1,
        "data":
        {
            "rows": [
                {
                    "id": "6d09ca92-1f11-47f5-8f63-c2bac4dbfc01",
                    "malfunction": 8,//故障
                    "normal": 120,//正常
                    "checking": 11,//检查
                    "usedDisk": 188,//已用磁盘空间
                    "remainingDisk": 1100,//剩余磁盘空间
                    "RN": 1
                }], "total": 1
        }
    }*/
    /**
     * 安全事件统计 
     */
    getSecurityEventRanking: function (req, res) {
        var query = webReq.getQueryParam(req, {
            offset: 0,
            limit: 10
        });
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.querySecurityEventList(
            query.offset,
            query.limit,
            webRes.exportJson.bind(null, res));
    },
    /*{"success":1,
     "data":
         {
             "rows": [
                 {
                     "id": "c04ab0ff-0fca-44ba-afc1-09bfb412ea0f",
                     "ipAddress": "192.168.150.241",//ip地址
                     "eventNum": 1445,//安全事件数量
                      "RN": 1
                 },//事件次数（次）
                 { "id": "3c7669b5-341c-4821-ba89-1802158d7b95", "ipAddress": "192.168.150.16", "eventNum": 413, "RN": 2 }, 
                 { "id": "a26a296a-fc73-4a59-91b8-5e1b72bb31c9", "ipAddress": "192.168.150.134", "eventNum": 0, "RN": 3 },
                  { "id": "ca3d03ef-9a93-4a5e-9e1a-62ef8ae43d05", "ipAddress": "42.41.70.171", "eventNum": 0, "RN": 4 }, 
                 { "id": "739857b9-82ff-4e0f-abb4-0d63323cc5f8", "ipAddress": "7.7.7.7", "eventNum": 0, "RN": 5 }, 
                 { "id": "cea7b53b-e9e2-4f38-9968-fd52803f571e", "ipAddress": "180.140.45.45", "eventNum": 0, "RN": 6 }, 
                 { "id": "2cd7bd0a-805b-4e0b-8c34-89596d6894aa", "ipAddress": "34.55.22.132", "eventNum": 0, "RN": 7 }, 
                 { "id": "a450008f-4eec-4209-818d-22f7696f9acc", "ipAddress": "128.30.3.6", "eventNum": 0, "RN": 8 }], "total": 8
         }
     }*/
    //docker容器起停耗时
    getDockerTime: function (req, res) {
        var query = webReq.getQueryParam(req, {
            offset: 0,
            limit: 6
        });
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.queryDockerTimeList(
            query.offset,
            query.limit,
            webRes.exportJson.bind(null, res));
    },
    /* {
      "success":1,
          "data":
      {
          "rows":
          [
              {
                  "statisticsDate": "03:00",//统计时间
                  "startTime": 0.32,//启动耗时（秒）
                  "stopTime": 1.3//停止耗时（秒）
              },
              { "statisticsDate": "04:00", "startTime": 0.31, "stopTime": 0.54 },
              { "statisticsDate": "05:00", "startTime": 0.29, "stopTime": 0.32 },
              { "statisticsDate": "06:00", "startTime": 0.28, "stopTime": 0.21 },
              { "statisticsDate": "07:00", "startTime": 0.36, "stopTime": 0.22 },
              { "statisticsDate": "08:00", "startTime": 0.32, "stopTime": 0.25 }
          ],
              "total":6,
                  "title":"Docker容器启停耗时"
      }
  }*/
    //docker容器内存消耗
    getDockerMem: function (req, res) {
        var query = webReq.getQueryParam(req, {
            flag: ""
        });
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
            cigScreenMaintenanceService.queryDockerMemList(
                query.flag,
                webRes.exportJson.bind(null, res));
    },
/*第一次数据
    {
        "success": 1, "data": {//共三个集群节点，每个节点历史数据为五分钟，数据间隔15秒刷新一次
            "title": "Docker内存消耗", 
            "totalNode":"3",//集群节点数目
            "rows": [
                {
                    "nodeName": "10.21.198.126",
                    "historicalData": [
                        { "id": "ddae9ca1-3ded-4957-8b0f-6cce93318d1e", 
                          "statisticsDate": "2017-03-08 13:27:07", 
                           "usedMem": 22, 
                           "totalMem": 256, 
                           "nodeName": "10.21.198.126", 
                           "nodeId": "1",
                            "RN": 1 },
                        { "id": "4944f32f-48a3-42a1-88ae-18e383b3d39d", "statisticsDate": "2017-03-08 13:27:22", 
                          "usedMem": 24, "totalMem": 256, "nodeName": "10.21.198.126", "nodeId": "1", "RN": 2 }
                    ],
                    "total": 20
                },
                {
                    "nodeName": "10.21.198.127",
                    "historicalData": [
                        { "id": "ddae9ca1-3ded-4957-8b0f-6cce93318daa", "statisticsDate": "2017-03-08 13:27:07", 
                          "usedMem": 22, "totalMem": 256, "nodeName": "10.21.198.127", "nodeId": "2", "RN": 1 },
                        { "id": "4944f32f-48a3-42a1-88ae-18e383b3d3bb", "statisticsDate": "2017-03-08 13:27:22", 
                          "usedMem": 24, "totalMem": 256, "nodeName": "10.21.198.127", "nodeId": "2", "RN": 2 },
                    ], "total": 20
                },
                {
                    "nodeName": "10.21.198.128", "historicalData": [
                        { "id": "ddae9ca1-3ded-4957-8b0f-6cce93318dvv", "statisticsDate": "2017-03-08 13:27:07", 
                          "usedMem": 22, "totalMem": 256, "nodeName": "10.21.198.128", "nodeId": "3", "RN": 1 },
                        { "id": "4944f32f-48a3-42a1-88ae-18e383b3d3rt", "statisticsDate": "2017-03-08 13:27:22", 
                          "usedMem": 24, "totalMem": 256, "nodeName": "10.21.198.128", "nodeId": "3", "RN": 2 },], "total": 20
                }]
        }
    }
*/
    getSystemConnetion: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.querySystemConnectionList(
            webRes.exportJson.bind(null, res));
    },
    /*
 {"success":1, "data":
   {
       "rows":[
           {
               "officeName": "安监局", "system": [
                   { "systemName": "重大危险源动态监管系统" },
                   { "systemName": "企业安全生产监管系统" },
                   { "systemName": "安全生产行政执法系统" }]
           },
           {
               "name": "长兴县信息中心", "system": [
                   { "systemName": "政府信息公开平台" },
                   { "systemName": "行政权力运行系统" }]
           },
           {
               "name": "公安局", "system": [
                   { "systemName": "人口库" },
                   { "systemName": "应急指挥系统" }]
           },
           {
               "name": "公积金管理中心", "system": [
                   { "systemName": "湖州市住房公积金管理系统" }]
           },
           {
               "name": "国土资源局", "system": [
                   { "systemName": "农村土地整治监测系统" },
                   { "systemName": "地籍信息管理系统" }]
           },
           {
               "name": "环境保护局", "system": [
                   { "systemName": "浙江省饮用水自动监测系统" },
                   { "systemName": "环境智能监测与预警系统" }]
           },
           {
               "name": "农业局", "system": [
                   { "systemName": "食品溯源系统" }]
           },
           {
               "name": "气象局", "system": [
                   { "systemName": "长兴气象信息发布系统" }]
           },
           {
               "name": "商务局", "system": [
                   { "systemName": "长兴县商贸运行监测直报系统" },
                   { "systemName": "外经贸发展专项资金网络管理系统" }]
           },
           {
               "name": "市监局", "system": [
                   { "systemName": "药品安全监管平台" },
                   { "systemName": "食品经营许可管理系统" },
                   { "systemName": "药品经营许可管理系统" }]
           },
           {
               "name": "水利局", "system": [
                   { "systemName": "长兴县水库洪水预报调度系统" }]
           },
           {
               "name": "卫计局", "system": [
                   { "systemName": "长兴县区域电子病历数据共享平台" }]
           },
           {
               "name": "消防大队", "system": [
                   { "systemName": "灭火救援业务管理系统" }]
           },
           {
               "name": "行政服务中心", "system": [
                   { "systemName": "电子招投标系统" },
                   { "systemName": "行政审批管理系统" }]
           },
           {
               "name": "住房和城乡建设局", "system": [
                   { "systemName": "数字长兴地理信息公共平台" },
                   { "systemName": "长兴县地下管线信息管理系统" },
                   { "systemName": "长兴县商品房预（销）售及合同备案信息管理系统" }]
           }],
           "total":15,
           "title":"委办局和系统信息",
           "汇聚系统":"CIG"
   }
}*/
 /**
     * 三维沙盘查询
     */
    getDataCardListRealDate: function (req, res) {
           res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.queryDataCardListRealDate(webRes.exportJson.bind(null, res));
    },
 /*{"success":1,
    "data":
    {
        "rows":
        [
            { "fromDepartment": "气象局", "receiveDate": "2017-01-19", "dataNum": 1000 },
            { "fromDepartment": "住房公积金管理中心", "receiveDate": "2017-01-18", "dataNum": 1000 },
            { "fromDepartment": "环境保护局", "receiveDate": "2017-01-18", "dataNum": 1000 },
            { "fromDepartment": "水利局", "receiveDate": "2017-01-16", "dataNum": 1000 },
            { "fromDepartment": "行政服务中心", "receiveDate": "2017-01-15", "dataNum": 1000 },
            { "fromDepartment": "市场监管局", "receiveDate": "2017-01-15", "dataNum": 1000 },
            { "fromDepartment": "长兴县信息中心", "receiveDate": "2017-01-15", "dataNum": 1000 },
            { "fromDepartment": "商务局", "receiveDate": "2017-01-15", "dataNum": 1000 },
            { "fromDepartment": "住房和城乡建设局", "receiveDate": "2017-01-15", "dataNum": 1000 },
            { "fromDepartment": "安监局", "receiveDate": "2017-01-15", "dataNum": 1000 }
        ],
            "total":10
    }
}*/
     getNetworkTraffic: function (req, res) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
            res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By", 'CIG');
            var query = webReq.getQueryParam(req, {
                flag:""
            });
        cigScreenMaintenanceService.getNetworkTraffic(query.flag,webRes.exportJson.bind(null, res));
    },
    /*
    {"success":1,
    "data":
    {
        "title":"节点网络流量",
            "rows":
        [
            {
                "nodeName": "10.21.198.128",
                "historicalData":
                [
                    {
                        "flowIn": 102,//流入流量
                        "flowOut": 106,//流出流量
                        "nodeId": "3",//节点编号
                        "nodeName": "10.21.198.128",//节点名称
                        "nCardId": "1",//对应节点的网卡编号
                        "nCardName": "eth0",//网卡名称
                        "RN": 1,//序号
                        "statisticsDate": "2017-03-08 14:41:19"//统计时间
                    },
                    { "flowIn": 115, "flowOut": 115, "nodeId": "3", "nodeName": "10.21.198.128", "nCardId": "1", 
                       "nCardName": "eth0", "RN": 2, "statisticsDate": "2017-03-08 14:41:49" },
                ], "total": 10
            },
            {
                "nodeName": "10.21.198.127",
                "historicalData":
                [
                    { "flowIn": 107, "flowOut": 107, "nodeId": "2", "nodeName": "10.21.198.127", "nCardId": "1", 
                      "nCardName": "eth0", "RN": 1, "statisticsDate": "2017-03-08 14:41:19" },
                    { "flowIn": 112, "flowOut": 121, "nodeId": "2", "nodeName": "10.21.198.127", "nCardId": "1", 
                      "nCardName": "eth0", "RN": 2, "statisticsDate": "2017-03-08 14:41:49" },
                ], "total": 10
            },
            {
                "nodeName": "10.21.198.126",
                "historicalData": [
                    { "flowIn": 105, "flowOut": 115, "nodeId": "1", "nodeName": "10.21.198.126", "nCardId": "1", 
                      "nCardName": "eth0", "RN": 1, "statisticsDate": "2017-03-08 14:41:19" },
                    { "flowIn": 112, "flowOut": 114, "nodeId": "1", "nodeName": "10.21.198.126", "nCardId": "1", 
                      "nCardName": "eth0", "RN": 2, "statisticsDate": "2017-03-08 14:41:49" },
                ], "total": 10
            }
        ]
    }
}*/   
    getOffice: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.getOffice(
            webRes.exportJson.bind(null, res));
    },
  /*  {
    "success":1, "data":
    [
        { "id": "d1801aa1-3c26-478a-8f83-f8bf74c63ced", 
          "officeId": 1,   //委办局编号
          "officeName": "住房公积金管理中心" },//委办局名称
        { "id": "cc03fb52-bdd1-4c19-b231-9e3fd36bf7cf", "officeId": 2, "officeName": "气象局" },
        { "id": "c1a8a548-8442-442e-ba96-44bf323af6fa", "officeId": 3, "officeName": "数字城管指挥中心" },
        { "id": "1f36c096-f42a-4661-ad53-6679758cc21a", "officeId": 4, "officeName": "宣传部" }
    ]
}*/
      getSystem: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.getSystem(
            webRes.exportJson.bind(null, res));
    },
 /*   {"success":1, "data":
    [
        { 
        "systemId": 1, //系统编号
        "systemName": "湖州市住房公积金管理系统" //系统名称
             },
        { "systemId": 2, "systemName": "景区线上线下一体化电子门票智能管理系统" },
        {  "systemId": 3, "systemName": "长兴气象网站" },
        {  "systemId": 4, "systemName": "一键式气象信息发布系统" },
        { "systemId": 5, "systemName": "长兴数字化城市管理系统平台" },
        { "systemId": 6, "systemName": "邦富互联网舆情采集系统" },
    ]
}*/
    getSite: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.getCloudMsg(
            0,
            webRes.exportJson.bind(null, res));
    },
    /*{
        "success": 1, "data":
            {
                "total": 9,//总计
                "unit": "个",//单位
                "title": "站点数量",//标题
                "rows": [
                    { "siteRN": "1",//编号
                      "siteNum": 2, //数量
                      "curStaticTime": "2017-03-02"//统计时间 
                    },
                    { "siteRN": "2", "siteNum": 3, "curStaticTime": "2017-03-03" },
                    { "siteRN": "3", "siteNum": 3, "curStaticTime": "2017-03-04" },
                    { "siteRN": "4", "siteNum": 3, "curStaticTime": "2017-03-05" },
                    { "siteRN": "5", "siteNum": 3, "curStaticTime": "2017-03-06" },
                    { "siteRN": "6", "siteNum": 3, "curStaticTime": "2017-03-07" },
                    { "siteRN": "7", "siteNum": 3, "curStaticTime": "2017-03-08" },
                    { "siteRN": "8", "siteNum": 3, "curStaticTime": "2017-03-09" },
                    { "siteRN": "9", "siteNum": 3, "curStaticTime": "2017-03-10" }
                ]
            }
    }*/
    getVisit: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.getCloudMsg(
            1,
            webRes.exportJson.bind(null, res));
    },
    /*{
        "success": 1,
        "data":
        {
            "total": 7,//总计
            "unit": "次",//单位
            "title": "站点访问量统计",//标题
            "rows":
            [
                { "visitRN": "1", //编号
                "visitNum": 10000, //访问量
                "curStaticTime": "2017-03-04" },//统计时间
                { "visitRN": "2", "visitNum": 11000, "curStaticTime": "2017-03-05" },
                { "visitRN": "3", "visitNum": 15000, "curStaticTime": "2017-03-06" },
                { "visitRN": "4", "visitNum": 2000, "curStaticTime": "2017-03-07" },
                { "visitRN": "5", "visitNum": 11221, "curStaticTime": "2017-03-08" },
                { "visitRN": "6", "visitNum": 17100, "curStaticTime": "2017-03-09" },
                { "visitRN": "7", "visitNum": 6500, "curStaticTime": "2017-03-10" }
            ]
        }
    }*/
    getThings: function (req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
        res.header("X-Powered-By", 'CIG');
        cigScreenMaintenanceService.getCloudMsg(
            2,
            webRes.exportJson.bind(null, res));
    },
/*
    {
        "success": 1,
        "data":
        {
            "total": 11,//总计
            "unit": "次",//单位
            "title": "事物量统计",//标题
            "rows":
            [
                { "thingsRN": "1",//编号
                 "thingsNum": 2000, //事件量
                 "curStaticTime": "2017-02-28" },//统计时间
                { "thingsRN": "10", "thingsNum": 7000, "curStaticTime": "2017-03-01" },
                { "thingsRN": "11", "thingsNum": 2000, "curStaticTime": "2017-03-02" },
                { "thingsRN": "2", "thingsNum": 10000, "curStaticTime": "2017-03-03" },
                { "thingsRN": "3", "thingsNum": 8000, "curStaticTime": "2017-03-04" },
                { "thingsRN": "4", "thingsNum": 11000, "curStaticTime": "2017-03-05" },
                { "thingsRN": "5", "thingsNum": 12000, "curStaticTime": "2017-03-06" },
                { "thingsRN": "6", "thingsNum": 15000, "curStaticTime": "2017-03-07" },
                { "thingsRN": "7", "thingsNum": 2000, "curStaticTime": "2017-03-08" },
                { "thingsRN": "8", "thingsNum": 12500, "curStaticTime": "2017-03-09" },
                { "thingsRN": "9", "thingsNum": 18000, "curStaticTime": "2017-03-10" }
            ]
        }
    }*/
};
module.exports = actions;