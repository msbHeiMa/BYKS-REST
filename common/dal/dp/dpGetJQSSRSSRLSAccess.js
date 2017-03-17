/*
Table: DP_JQSSRSSRLSB                                      
create table DP_JQSSRSSRLSB 
(
   ID                   VARCHAR(36),
   SKCWHJQ              VARCHAR2(50),
   SKCWHJQRS            NUMBER(8),
   HYC                  VARCHAR2(50),
   HYCRS                NUMBER(8),
   CSG                  VARCHAR2(50),
   CSGRS                NUMBER(8),
   GCY                  VARCHAR2(50),
   GCYRS                NUMBER(8),
   XSH                  VARCHAR2(50),
   XSHRS                NUMBER(8),
   TY                   VARCHAR2(50),
   TYRS                 NUMBER(8),
   JNHC                 VARCHAR2(50),
   JNHCRS               NUMBER(8),
   JDZ                  VARCHAR2(50),
   JDZRS                NUMBER(8),
   YZE                  VARCHAR2(50),
   YZERS                NUMBER(8),
   CWD                  VARCHAR2(50),
   CWDRS                NUMBER(8)
);

*/
var baseAccess = require("../baseAccess");
function tableAccess(operater, dal) {
    baseAccess.apply(this, [operater, dal]);
}

tableAccess.prototype = unit.inherits({
    getColumns: function () {
        return {
             "id":"ID",
             "skcwhjq":"SKCWHJQ",
             "skcwhjqrs":"SKCWHJQRS",
             "hyc":"HYC",
             "hycrs":"HYCRS",
             "csg":"CSG",
             "csgrs":"CSGRS",
             "gcy":"GCY",
             "gcyrs":"GCYRS",
             "xsh":"XSH",
             "xshrs":"XSHRS",
             "ty":"TY",
             "tyrs":"TYRS",
             "jnhc":"JNHC",
             "jnhcrs":"JNHCRS",
             "jdz":"JDZ",
             "jdzrs":"JDZRS",
             "yze":"YZE",
             "yzers":"YZERS",
             "cwd":"CWD",
             "cwdrs":"CWDRS",
        };
    },
    getTable: function () {
        return "DP_JQSSRSSRLSB";
    },
    
}, baseAccess.prototype);
module.exports = tableAccess;
