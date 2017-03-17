var configs = {
    tokenservice: process.env.TOKEN_SERVICE || "http://222.46.11.118:14380/CIGService",
    geoServerHost: process.env.GEO_SERVER_HOST || '222.46.11.118',
    geoServerPort: process.env.GEO_SERVER_PORT || 14380,

    geoSearchFeaturePath: "/cigservice/rest/services/{layerid}/searchFeatures",
    geoBufferFeaturePath: "/cigservice/rest/services/{layerid}/bufferFeatures",
    geoAddFeaturePath: "/cigservice/rest/services/{layerid}/addFeatures",
    geoDeleteFeaturePath: "/cigservice/rest/services/{layerid}/deleteFeatures",
    geoUpdateFeaturePath: "/cigservice/rest/services/{layerid}/updateFeatures",
    workFlowService: {
        restApiUrlBaseForWF: "http://10.21.198.120/zhzlApi/",//流程回调REST服务地址
        wfServiceHost: "10.21.198.155",//流程服务地址
        wfServicePort: "890",//流程服务端口    
        wfServiceBase: "/wfservice/rest/",//流程服务路径
    },
    videoServicceForDengHong: {
        host: "10.21.197.45",//内网地址：http://10.21.197.45:8080 外网地址：http://client.zjcx1.cn:8081/
        port: "8080",//服务端口
        hostOut: "client.zjcx1.cn",//内网地址：http://10.21.197.45:8080 外网地址：http://client.zjcx1.cn:8081/
        portOut: "8081",//服务端口
        getAccessTokenPath: "/third/v1/token/getAccessToken",//获取token服务路径
        zbUrlPath: "/third/v1/camera/flash/live",//直播地址
        accessKey: "5c02cae4-032",
        mobile: "15101031962",
        accessSecret: "Oubm7sTYGEk1yoEjArKD"
    },
    cacheConfig: {
        type: process.env.CACHE_CONFIG_TYPE || "memcache",//memory
        url: process.env.CACHE_CONFIG_URL || "localhost:11211",
        keyPrefix: process.env.CACHE_CONFIG_KEY || "zz_",
        defaultExpire: process.env.CACHE_CONFIG_EXPIRE || 6000//
    },
    tmpPath: process.env.TMP_PATH || "F:/uploadFile/temp",
    getImageUrl: "/zhzlbackend/common/getImages",
    feiQiCaseQuery: {
        queryCaseFromFeqi_host: "219.131.197.178",
        queryCaseFromFeqi_port: "9905",
        queryCaseFromFeqi_base: "/jars/case/idCardQuery/"
    },
    modelId:{
        zszh_addPeople:"494C9B29169A9BA4E05011AC02000A7C",
        zszh_setManageLevel:"494E315CB465B78FE05011AC02000B21",
        zszh_setDangerRank:"494E315CB465B78FE05011AC02000B20"
    }

}
module.exports = configs;