//drop table ZZ_PERSON cascade constraints;
/*==============================================================*/
/* Table: ZZ_PERSON                                             */
/*==============================================================*/
/*create table ZZ_PERSON 
(
   ID                   VARCHAR2(36)         not null,
   CARD_NUM             VARCHAR2(18),
   NAME                 VARCHAR2(50),
   USED_NAME            VARCHAR2(50),
   GENDER               VARCHAR2(1),
   BIRTH_DATE           DATE,
   NATION               VARCHAR2(2),
   NATIVE_PLACE         VARCHAR2(6),
   MARITAL_STATUS       VARCHAR2(2),
   POLITICAL_STATUS     VARCHAR2(2),
   EDUCATION            VARCHAR2(2),
   HEIGHT               NUMBER(4),
   BLOOD_TYPE           VARCHAR2(2),
   REL_BELIEF           VARCHAR2(2),
   OCC_CATEGORY         VARCHAR2(5),
   OCCUPATION           VARCHAR2(30),
   SPECIALTY            VARCHAR2(2),
   S_PLACE              VARCHAR2(100),
   DOMICILE             VARCHAR2(6),
   D_ADDR               VARCHAR2(80),
   DEATH                VARCHAR2(1),
   PERSON_TYPE          VARCHAR2(1),
   GRID_NAME            VARCHAR2(30),
   G_ID                 VARCHAR2(36),
   RESIDENCE            VARCHAR2(6),
   R_ADDR               VARCHAR2(80),
   PHONE                VARCHAR2(20),
   TEL                  VARCHAR2(20),
   EMAIL                VARCHAR2(30),
   IS_LEGAL             VARCHAR2(1),
   IS_FLOW              VARCHAR2(1),
   IS_SUPERVISE         VARCHAR2(1),
   DATA_SOURCE          VARCHAR2(1),
   CREATE_DATE          date,
   CREATE_USER          varchar2(50),
   UPDATE_DATE          date,
   UPDATE_USER          varchar2(50),
   constraint PK_ZZ_PERSON primary key (ID)
);

comment on column ZZ_PERSON.GENDER is
'0：未知
1：男性
2：女性
9：未说明';
comment on column ZZ_PERSON.MARITAL_STATUS is
'10：未婚
20：已婚
21：初婚
22：再婚
23：复婚
30：丧偶
40：离婚
90：未说明';
*/
/**
 * 搜索 ：身份证号
显示：姓名 性别 身份证号 曾用名 出生日期 民族 籍贯  
婚姻状况 政治面貌  学历 血型 网格名称 网格id  是否死亡  
手机号码  户口类别  实有人口类型  
户籍地  户籍详细地址  现住地  现住地详细地址
 */

var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id": "ID",
            "name": "NAME",//姓名
            "cardNum": "CARD_NUM",//身份证号
            "gId":"to_char(G_ID)",//网格id
            "rAddr":"R_ADDR",//现住地详址
        };
    },
    getTable:function(){
        return 'ZZ_PERSON';
    },
    getPersons:function(filter,order,callback){
        var self = this;
        this.getPage(filter ,order,offset,limit,function (err, res) {
            if (err) {
                callback(err, null);
            }
            else {
                callback(null, res);
            }
        });
    }
},baseAccess.prototype);
module.exports = tableAccess;