//Corrupted Skynest
//made by michengs
let player, entity, library, effect;
let	print = true;
let debuff = null ;
let timer1;
let timer2;
let timer3;
let timer4;
let timer5;
let qbacting = null;
function  applyDistance(loc, distance, degrees) {
        let r = loc.w; //(loc.w / 0x8000) * Math.PI;
     	let	rads = (degrees * Math.PI/180);
	    let	finalrad = r - rads;
        loc.x += Math.cos(finalrad) * distance;
        loc.y += Math.sin(finalrad) * distance;
        return loc;
}
	//构建圆形范围提示    （提示标志  偏移角度 偏移距离 间隔 半径 延迟 时间）
function Spawnitem2(item,degree,distance, intervalDegrees, radius, delay, times, handlers, event, entity ) {
	let shield_loc = entity['loc'].clone();
	shield_loc.w = entity['loc'].w;
    let	degrees = 360 - degree;	
	applyDistance(shield_loc, distance, degrees);
    for (let angle = -Math.PI; angle <= Math.PI; angle +=  Math.PI * intervalDegrees / 180) {
        handlers['spawn']({
        	"id": item,
			"delay": delay,			
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle
        }, {loc: shield_loc});
    }
}	
const CK_TipMsg =
{
 0: {msgt: 'IN',     msg: 'К'}, 
 1: {msgt: 'OUT',     msg: 'От'}
};
const debuff_TipMsg =
{
 0: {msg: '------Готов к переключению красного-------!'},
 1: {msg: '------Подготовка к переключению синего-------'}
};
const boss_skill =
{
 213: {msg: 'Лево', msgt: 'left'},
 214: {msg: 'Право', msgt: 'right'},
 212: {msg: 'Право', msgt: 'right'},
 215: {msg: 'Лево', msgt: 'left'}
};
function skilld_event(skillid, handlers, event, ent, dispatch) {	
if ([3026004,3126004,3026005,3126005].includes(skillid)) {   // //愤怒0  恐惧1
qbacting = skillid % 2;	
//qbacting = null   
}
if ([3026001,3126001,3026002,3126002].includes(skillid)) {   // //蓝色0  红色1
//debuff = skillid % 2;	
clearTimeout(timer1);
clearTimeout(timer2);
clearTimeout(timer3);
clearTimeout(timer4);
clearTimeout(timer5);
 timer1 = setTimeout(()=>{
 if  (debuff != null) {
handlers['text']({
"sub_type": "message",
"message_RU": "дебафф 20сек"
});	
 }
  }, 70000);  
 timer2 = setTimeout(()=>{
 if  (debuff != null) {
handlers['text']({
"sub_type": "notification",
"message_RU": (`${debuff_TipMsg[debuff % 2].msg} `)
});	
handlers['text']({
"sub_type": "message",
"message": "debuff 50s",
"message_RU": "дебафф 50сек"
});	
 }
  }, 40000);  
 timer3 = setTimeout(()=>{
 if  (debuff != null) {
handlers['text']({
"sub_type": "message",
"message": "warning    debuff 15s",
"message_RU": "дебафф 15сек"
});	
 }
  }, 75000);  
 timer4 = setTimeout(()=>{
 if  (debuff != null) {
handlers['text']({
"sub_type": "message",
"message": "warning    debuff 10s",
"message_RU": "дебафф 10сек"
});	
 }
  }, 80000);  
 timer5 = setTimeout(()=>{
 if  (debuff != null) {
handlers['text']({
"sub_type": "message",
"message": "warning    debuff 5s",
"message_RU": "дебафф 5сек"
});	
 }
  }, 85000);   
}
if ([213,214].includes(skillid)) {   // //蓝内
 if  (debuff != null) {
handlers['text']({
"sub_type": "message",
"message": (`${boss_skill[skillid].msgt} | ${CK_TipMsg[(qbacting + debuff +1) %2].msgt}`),
"message_RU": (`${boss_skill[skillid].msg} | ${CK_TipMsg[(qbacting + debuff +1) %2].msg}`)
});	
 } 
}
if ([212,215].includes(skillid)) {   // //红内
 if  (debuff != null) {
handlers['text']({
"sub_type": "message",
"message": (`${boss_skill[skillid].msgt} | ${CK_TipMsg[(qbacting + debuff) %2].msgt}`),
"message_RU": (`${boss_skill[skillid].msg} | ${CK_TipMsg[(qbacting + debuff) %2].msg}`)
});	
 }
}
if (skillid === 99020020) { //死亡解除debuff
//debuff = null;
clearTimeout(timer1);
clearTimeout(timer2);
}
/*
if (skillid === 157) { //debuff
 if  (debuff != null) {
handlers['text']({
"sub_type": "message",
"delay": 2000,
"message": debuffs_targe[debuff]
 });	 
}
}
*/
}
// NULL % 2 =0
// 1 % 2 =1
//0 % 2 =0
//2 % 2 =0 
let debuff_tracker_started = false;
let debuffs_targe = {
	30260001: "Огненный дебафф",
	30260002: "Ледяной дебафф",
	31260001: "Огненный дебафф",
	31260002: "Ледяной дебафф"	
};
function start_debuff(handlers, event, entity, dispatch) {
	const abnormality_change = (added, event) => {
		if ((player.isMe(event.target) || player.playersInParty.includes(event.target.toString())) && debuffs_targe[event.id]) {
				if (added) {
			setTimeout(() =>  debuff = event.id, 500);			   
				} else {
                  debuff = null
				}
		}
	};
	if (!debuff_tracker_started) {
		dispatch.hook('S_ABNORMALITY_BEGIN', 4, abnormality_change.bind(null, true));
		dispatch.hook('S_ABNORMALITY_END', 1, abnormality_change.bind(null, false));
		debuff_tracker_started = true;
	}
}
module.exports = {
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},
"s-3026-1000-1112-0": [{"type": "text","sub_type": "message","message": "Ice()","message_RU": "Лёд"}],
"s-3026-1000-1110-0": [{"type": "text","sub_type": "message","message": "fire","message_RU": "Огонь"}],
"s-3026-1000-2112-0": [{"type": "text","sub_type": "message","message": "Ice()","message_RU": "Лёд"}],
"s-3026-1000-2110-0": [{"type": "text","sub_type": "message","message": "fire","message_RU": "Огонь"}],
"s-3026-1000-1108-0": [{"type": "text","sub_type": "message","message": "beat back","message_RU": "Поверните направо, чтобы отбить"}],
"s-3026-1000-2108-0": [{"type": "text","sub_type": "message","message": "beat back","message_RU": "Поверните направо, чтобы отбить"}],
"s-3026-1000-1158-0": [{"type": "text","sub_type": "message","message": "beat back","message_RU": "Поверните направо, чтобы отбить"}],
"s-3026-1000-2158-0": [{"type": "text","sub_type": "message","message": "beat back","message_RU": "Поверните направо, чтобы отбить"}],
"s-3026-1000-1109-0": [{"type": "text","sub_type": "message","message": "beat back","message_RU": "Поверните влево, чтобы отбить"}],
"s-3026-1000-2109-0": [{"type": "text","sub_type": "message","message": "beat back","message_RU": "Поверните влево, чтобы отбить"}],
"s-3026-1000-1159-0": [{"type": "text","sub_type": "message","message": "beat back","message_RU": "Поверните влево, чтобы отбить"}],
"s-3026-1000-2159-0": [{"type": "text","sub_type": "message","message": "beat back","message_RU": "Поверните влево, чтобы отбить"}],
"s-3026-1000-1120-0": [{"type": "text","sub_type": "message","message": "together","message_RU": "Яростный рёв"}],
"s-3026-1000-2120-0": [{"type": "text","sub_type": "message","message": "together","message_RU": "Яростный рёв"}],
"s-3026-1000-1157-0": [{"type": "text","sub_type": "message","message": "change","message_RU": "Смена"},{"type": "func","func": start_debuff}],
"s-3026-1000-2157-0": [{"type": "text","sub_type": "message","message": "change","message_RU": "Смена"},{"type": "func","func": start_debuff}],
"s-3026-1000-1103-0": [{"type": "text","sub_type": "message","message": "tail","message_RU": "Хвост"}],
"s-3026-1000-2103-0": [{"type": "text","sub_type": "message","message": "tail","message_RU": "Хвост"}],
"s-3026-1000-1118-1": [{"type": "text","sub_type": "message","message": "Jump","message_RU": "Прыжок"}],
"s-3026-1000-2118-1": [{"type": "text","sub_type": "message","message": "Jump","message_RU": "Прыжок"}],
//"s-3026-1000-118-2": [{"type": "text","sub_type": "message","message": "Jump","message_RU": "闪"}],
//"s-3026-1000-118-2": [{"type": "text","sub_type": "message","message": "Jump","message_RU": "闪"}],
"s-3026-1000-1145-0": [{"type": "text","sub_type": "message","message": "stun","message_RU": "Стан"}],
"s-3026-1000-2145-0": [{"type": "text","sub_type": "message","message": "stun","message_RU": "Стан"}],
"s-3026-1000-1206-0": [{"type": "text","sub_type": "message","message": "Jump back","message_RU": "Прыжок назад (полет)"}],
"s-3026-1000-2206-0": [{"type": "text","sub_type": "message","message": "Jump back","message_RU": "Прыжок назад (полет)"}],
"s-3026-1000-1206-2": [{"type": "func","func": Spawnitem2.bind(null,553,0,0,15,350,200,3000)}],
"s-3026-1000-2206-2": [{"type": "func","func": Spawnitem2.bind(null,553,0,0,15,350,200,3000)}],
"s-3026-1000-1153-0": [{"type": "text","sub_type": "message","message": "tail","message_RU": "Хвост"}],
"s-3026-1000-2153-0": [{"type": "text","sub_type": "message","message": "tail","message_RU": "Хвост"}],
"s-3026-1000-1154-0": [{"type": "text","sub_type": "message","message": "Ice storm","message_RU": "Ледяной шторм"}],   //30不可防
"s-3026-1000-2154-0": [{"type": "text","sub_type": "message","message": "Ice storm","message_RU": "Ледяной шторм"}],   //30不可防
"s-3026-1000-1155-0": [{"type": "text","sub_type": "message","message": "Knock down","message_RU": "Огненный столб(опрокид)"}],      //30不可防
"s-3026-1000-2155-0": [{"type": "text","sub_type": "message","message": "Knock down","message_RU": "Огненный столб(опрокид)"}],      //30不可防
"s-3026-1000-1137-0": [{"type": "text","sub_type": "message","message": "Knock down","message_RU": "Опрокидывание"},{"type": "func","func": Spawnitem2.bind(null,553,0,0,2,1275,200,13000)}],
"s-3026-1000-2137-0": [{"type": "text","sub_type": "message","message": "Knock down","message_RU": "Опрокидывание"},{"type": "func","func": Spawnitem2.bind(null,553,0,0,2,1275,200,13000)}],
"s-3026-1000-1138-0": [{"type": "text","sub_type": "message","message": "AOE","message_RU": "AOE"}],
"s-3026-1000-2138-0": [{"type": "text","sub_type": "message","message": "AOE","message_RU": "AOE"}],
"s-3026-1000-1139-0": [{"type": "text","sub_type": "message","message": "60°","message_RU": "60° всем (Лёд)"}],
"s-3026-1000-2139-0": [{"type": "text","sub_type": "message","message": "60°","message_RU": "60° всем (Лёд)"}],
"s-3026-1000-1140-0": [{"type": "text","sub_type": "message","message": "40","message_RU":  "40° всем (Огонь)"}],
"s-3026-1000-2140-0": [{"type": "text","sub_type": "message","message": "40","message_RU":  "40° всем (Огонь)"}],
"s-3026-1000-1212-0": [{"type": "func","func": skilld_event.bind(null, 212)},{"type": "func","func": Spawnitem2.bind(null,445,0,0,8,425,200,6000)}],  
"s-3026-1000-1215-0": [{"type": "func","func": skilld_event.bind(null, 215)},{"type": "func","func": Spawnitem2.bind(null,445,0,0,8,425,200,6000)}],      
"s-3026-1000-1213-0": [{"type": "func","func": skilld_event.bind(null, 213)},{"type": "func","func": Spawnitem2.bind(null,445,0,0,8,425,200,6000)}],
"s-3026-1000-1214-0": [{"type": "func","func": skilld_event.bind(null, 214)},{"type": "func","func": Spawnitem2.bind(null,445,0,0,8,425,200,6000)}],
"qb-3026-1000-3026005": [{"type": "func","func": skilld_event.bind(null, 3026005)}],//吃同色恐惧
"qb-3026-1000-3026004": [{"type": "func","func": skilld_event.bind(null, 3026004)}],//吃异色愤怒
"qb-3026-1000-3126005": [{"type": "func","func": skilld_event.bind(null, 3126005)}],//吃同色恐惧
"qb-3026-1000-3126004": [{"type": "func","func": skilld_event.bind(null, 3126004)}],//吃异色愤怒
"ae-0-0-99020020": [{"type": "func","func": skilld_event.bind(null, 99020020)}],
"am-3026-1000-30260001": [{"type": "func","func": skilld_event.bind(null, 3026001)}],//红色
"am-3026-1000-30260002": [{"type": "func","func": skilld_event.bind(null, 3026002)}],//蓝色
"am-3026-1000-31260001": [{"type": "func","func": skilld_event.bind(null, 3126001)}],//红色
"am-3026-1000-31260002": [{"type": "func","func": skilld_event.bind(null, 3126002)}]//蓝色
};