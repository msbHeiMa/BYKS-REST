/******************************************************************************
 *
 * NAME
 *   db.js
 *
 * DESCRIPTION
 * 数据库配置文件
 *
 *****************************************************************************/

var configs = {
        dbType: process.env.NODE_DB_TYPE || "oracledb",
        user : process.env.NODE_ORACLEDB_USER || "cigproxy",
        password : process.env.NODE_ORACLEDB_PASSWORD || "cigproxy",
        connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "localhost:1521/BENDI",
        //connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "10.0.75.1:1521/xe",
        //connectString : process.env.NODE_ORACLEDB_CONNECTIONSTRING || "222.46.11.118:14821/orcl",
}
module.exports = configs;