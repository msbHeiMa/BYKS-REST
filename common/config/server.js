var env = 'dev';
var configs = {
    "dev":{
        "baseRest":{
            "host":"dev-rest.cig.com",
            "port":"80",
        },
        "zhzlBackend":{
            "host":"dev-zhzl.cig.com",
            "port":"80",
        }
    }
};
module.exports = configs[env] || configs.dev;