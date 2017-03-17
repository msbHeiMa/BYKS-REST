// /*==============================================================*/
// /* Table: ZZ_AREA                                               */
// /*==============================================================*/
// create table ZZ_AREA  (
//    ID                   varchar2(36)                    not null,
//    AREA_NAME            varchar2(200),
//    AREA_DESC            varchar2(500),
//    PARENT_ID            varchar(36),
//    LEVEL_TYPE           varchar(2),
//    AREA_ORDER           numeric(3,0),
//    CREATE_DATE          datetime,
//    CREATE_USER          varchar2(50),
//    UPDATE_DATE          datetime,
//    UPDATE_USER          varchar2(50),
//    constraint PK_ZZ_AREA primary key (ID)
// );

var baseAccess = require("../baseAccess");
function tableAccess(operater,dal){
    baseAccess.apply(this,[operater,dal]);
}
tableAccess.prototype = unit.inherits({
    getColumns:function(){
        return {
            "id":"ID",
            "areaName":"AREA_NAME",
            "areaDesc":"AREA_DESC",
            "parentId":"PARENT_ID",
            "levelType":"LEVEL_TYPE",
            "areaOrder":"AREA_ORDER",
        };
    },
    getTable:function(){
        return "ZZ_AREA";
    },
    getInitAreas:function(){
        var cxx = {
            id :unit.getUuid(),
            areaName:"长兴县",
            areaOrder:1,
        };
        var items = cxAreas.split("\n");
        var depth = 0;
        var areas = [cxx];
        var parentIds = [cxx.id];
        var orders = [1,1,1,1,1,1,1,1,1];
        items.forEach(function(item,index){
            if(!item.trim()){
                return;
            }
            var padUnit = "    ";
            var levelPad = padUnit;
            var curDepth = 0;
            while(item.indexOf(levelPad) === 0){
                curDepth += 1;
                levelPad += padUnit;
            }
            var area = {
                id:unit.getUuid(),
                areaName:item.trim(),
                parentId:parentIds[curDepth],
                areaOrder:orders[curDepth]
            };
            parentIds[curDepth+1] = area.id;
            orders[curDepth] = orders[curDepth]+1;
            orders.forEach(function(val,index){
                if(index > curDepth){
                    orders[index] = 1;
                }
            },this);
            areas.push(area);
        });
        return areas;
    }
},baseAccess.prototype);
module.exports = tableAccess;

var cxAreas = `
龙山街道
    川步村
    渚山村
    后洋村
    涧塘村
    龙山社区
    齐北社区
    双拥社区
    体育场社区
    新湖居委会
    西峰坝居委会
    高山岭居委会
    玄坛庙居委会
洪桥镇
    陈桥村
    洪桥村
    金星村
    南阳村
    太湖村
    亭子桥村
    潼桥村
    弁山村
    陈家埭村
    东王村
    古龙村
    排田漾村
    万仕桥
    橡树下村
    中道村
李家巷镇
    李家巷村
    刘家渡村
    青草坞村
    沈湾村
    西坝村
    许家浜村
    章浜村
画溪街道
    柏家浜居民区
    竹元村居民区
    明门居民区
    南石桥村
    三星斗居民区
    徐家浜村
    曹家桥村
    包桥村
    白莲桥村
    姚家桥村
    长桥村
    三新村
    大斗村
    新庄村
    白阜村
夹浦镇
    北川村
    滨湖村
    丁新村
    父子岭村
    环沉村
    夹浦村
    太平桥
    陶家湾村
    吴城村
    喜鹊斗
    香山村
    月明村
    长平村
水口乡
    顾渚村
    后坟村
    徽州庄村
    江排村
    金山村
    龙山村
    水口村
    徐旺村
泗安镇
    白莲村
    初康村
    东村村
    二界岭村
    凤凰村
    管埭村
    黄巢村
    罗家地村
    毛家村
    钱庄村
    庆丰村
    三里亭村
    上泗安村
    师姑岗村
    双联村
    塔上村
    太平村
    五丰村
    五里渡村
    禧祉村
    仙山村
    新丰村
    兴隆村
    杨湾村
    玉泉村
    云峰村
    皂山村
    长潮村
    长丰村
    长中村
    赵村村
虹星桥镇
    河桥村
    西南村
    龙从村
    谭家村
    毕家村
    郑家村
    午山村
    罗家村
    观音村
    港口村
    厚全村
    宋高村
    刘井村
    里塘村
    白水村
    周村村
    后羊村
和平镇
    便民桥村
    琛碛村
    城山村
    狄家㘰村
    东山村
    独山村
    方家庄村
    和平村
    横涧村
    横山村
    红山村
    回车岭村
    马家边村
    毛家店村
    南宗村
    勤劳社区
    三矿村
    沙埠村
    施家村
    石泉村
    滩龙桥村
    王村村
    韦山村
    吴村村
    吴山村
    小溪口村
    新港村
    长城村
    长岗村
    周坞山村
    庄里村
林城镇
    上狮村
    北汤村
    午山岗村
    向阳村
    周吴岕村
    塘南村
    大云寺村
    天平桥村
    太傅村
    姚洪斗村
    新华村
    新星村
    方山窑村
    桥南村
    永丰村
    泥斗村
    畎桥村
    石英村
    连心村
    阳光村
吕山乡
    斗门村
    吕虹村
    吕山村
    南杨村
    胥仓村
    雁陶村
    杨吴村
    龙溪村
    金村村
煤山镇
    白岘村
    白岘居委会
    祠山村
    东川村
    东风村
    访贤村
    和岕口村
    槐坎居民委员
    金钉子社区
    金和嘉园
    礼岕村
    六都村
    罗岕村
    煤山村
    南街社区
    抛渎岗村
    平丰村
    三洲山村
    尚儒村
    十月村
    五通村
    五通山村
    西川村
    新安村
    新川村
    新槐村
    新民村
    新源村
    仰峰村
小浦镇
    高地村
    光耀村
    画溪村
    潘礼南村
    小浦村
    中山村
    大岕口村
    方岩村
    方一村
    合溪村
    五庄村
雉城街道
    金莲桥居民区
    古城居民区
    五峰居民区
    高家墩居民区
    雉城居民区
    钮店湾居民区
    上杨居民区
    鱼巷口社区
    皇家湾社区
    二虎头社区
    马巾巷社区
    大西门社区
    所前社区
    台苑新村社区
    明珠社区
    北门社区
    米行弄社区
    南门社区
    金陵社区
    高阳桥社区
    仓前街社区
    三狮社区
    小西门社区
    水木花都社区
    回龙山社区
太湖街道
    晨光社区
    新开河村
    南庄社区
    陆汇头社区
    上莘桥社区
    白溪社区
    杨庄社区
    王浜头社区
    陆家斗社区
    杨湾社区
    五里桥社区
    陈塘社区
    官斗社区
    八字桥社区
    留下社区
    祥符斗村
    霞城村
    南张浜村
    钱家斗村
    彭城村
    新塘村
    沉渎港村
    新溪社区
图影旅游
    碧岩村
    陈湾村
    大荡漾村
    横山桥村
    水产村
    图影村
    小沉渎村
南太湖产业集聚区
    陈家浜村
    广福桥村
    计家浜村
    老虎洞
    石泉村
经济技术开发区`
