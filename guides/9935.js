// RK9 хард
//made by michengs

let notice_guide = true;
let player, entity, library, effect;
	let firstskill = 0,
		secondskill = 0,
		MSG = null,
		MSG1 = null,
		MSG2 = null,		
		print = false,
		tempskill = 0;	
	let firstskill1 = '？',
		secondskill1 = '？',
		tempskill1 = '？';	
	let firstskill2 = '？',
		secondskill2 = '？',
		tempskill2 = '？';			
let notice = true; 		
function guid_voice(handlers) {   
if(notice_guide) {
handlers['text']({
"sub_type": "message",
"delay": 3000,
"message_RU": "Вход в зону машиностроения"

});

handlers['text']({
"sub_type": "notification",
"delay": 3000,
"message_RU": "Вход в зону машиностроения"
});
}
notice_guide = false;

}	
	function  applyDistance(loc, distance, degrees) {
        let r = loc.w; //(loc.w / 0x8000) * Math.PI;
     	let	rads = (degrees * Math.PI/180);
	    let	finalrad = r - rads;
        loc.x += Math.cos(finalrad) * distance;
        loc.y += Math.sin(finalrad) * distance;
        return loc;
    }
// 	召喚光柱 ，告示牌提示（  角度 距离   延迟时间 时间）
function SpawnThing( degrees, radius, delay, times, handlers, event, entity ) {
	let shield_loc = entity['loc'].clone();
	shield_loc.w = entity['loc'].w;			
   let angle =  Math.PI * degrees / 180 
        handlers['spawn']({
			"sub_type": "build_object",
        	"id": 1,
			"delay": delay,			
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle,
			"ownerName": "SAFE SPOT",
			"message": "SAFE"
        }, {loc: shield_loc});  
        handlers['spawn']({
			"sub_type": "item",
        	"id": 88850,
			"delay": delay,			
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle
        }, {loc: shield_loc});	
}
// 	召喚点 ，提示（ 提示标志 角度 距离   延迟时间 时间）
function Spawnitem( item,degrees, radius, delay, times, handlers, event, entity ) {
	let shield_loc = entity['loc'].clone();
	shield_loc.w = entity['loc'].w;			
   let angle =  Math.PI * degrees / 180 
        handlers['spawn']({
        	"id": item,
			"delay": delay,			
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle
        }, {loc: shield_loc});	
}

	//构建直线（提示标志 偏移角度 偏移距离  角度 最远距离   时间）
function Spawnitem1(item,degree,distance,angles, maxRadius, times, handlers, event, entity) {
	
	let shield_loc = entity['loc'].clone();
	shield_loc.w = entity['loc'].w;	
    let	degrees = 360 - degree;	
	applyDistance(shield_loc, distance, degrees);		
    let angle = angles * Math.PI/180
    for (let radius=50 ; radius<=maxRadius; radius+=50) {
        handlers['spawn']({
        	"id": item,
        	"sub_delay": times,
        	"distance": radius,
        	"offset": angle
        }, {loc: shield_loc});
    }
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

function skilld_event(skillid, handlers, event, ent, dispatch) {
	
if (skillid === 9935311 ) {
			firstskill = tempskill;
			secondskill = 0;
			firstskill1 = tempskill1;
			secondskill1 = '？';
			firstskill2 = tempskill2;
			secondskill2 = '？';			
 MSG =  'Next: ' + firstskill + ' + ' + secondskill
 MSG1 = 'Next: ' + firstskill1  + secondskill1 
 MSG2 = 'Next: ' + firstskill2  + secondskill2 
handlers['text']({
"sub_type": "message",
"message_RU":  MSG,
"message": MSG2
});
handlers['text']({
"sub_type": "alert",
"message_RU":  MSG1,
"message": MSG2
});
} else if (skillid === 9935312) { //REVERSE
			secondskill = tempskill;
			firstskill = 0;
			secondskill1 = tempskill1;
			firstskill1 = '？';	
			secondskill2 = tempskill2;
			firstskill2 = '？';				
 MSG =  'Next: ' + firstskill + ' + ' + secondskill
 MSG1 = 'Next: ' + firstskill1 + secondskill1 
 MSG2 = 'Next: ' + firstskill2 + secondskill2 
handlers['text']({
"sub_type": "message",
"message_RU":  MSG,
"message": MSG2
});			
handlers['text']({
"sub_type": "alert",
"message_RU":  MSG1,
"message": MSG2
});			
		}	

if (skillid === 9935302 ) {
			firstskill = 'От';
			tempskill = 'От';
			firstskill1 = 'От';
			tempskill1 = 'От';
			firstskill2 = 'OUT';
			tempskill2 = 'OUT';			
handlers['text']({
"sub_type": "alert",
"delay": 3000,
"message_RU":  "От",
"message": "OUT"
});
		
} else if (skillid === 9935303) { //
			firstskill = 'К';
			tempskill = 'К';
			firstskill1 = 'К';
			tempskill1 = 'К';
			firstskill2 = 'IN';
			tempskill2 = 'IN';			
handlers['text']({
"sub_type": "alert",
"delay": 3000,
"message_RU":  "К",
"message": "IN"
});			
			
}else if (skillid === 9935304) { //
			firstskill = 'Волны';
			tempskill = 'Волны';
			firstskill1 = 'Волны';
			tempskill1 = 'Волны';	
			firstskill2 = 'Waves';
			tempskill2 = 'Waves';				
handlers['text']({
"sub_type": "alert",
"delay": 3000,
"message_RU":  "Волны",
"message": "Waves"
});			
			
		}

 if ( firstskill === 0 && skillid === 935301) {
					firstskill = 'От';
					tempskill = 'От';
			        firstskill1 = 'От';
			        tempskill1 = 'От';	
		          	firstskill2 = 'OUT';
			        tempskill2 = 'OUT';						
 MSG = firstskill + ' + ' + secondskill
 MSG1 = firstskill1 + ' + ' + secondskill1 
 MSG2 = firstskill2 + ' + ' + secondskill2 
 handlers['text']({
"sub_type": "message",
"message_RU":  MSG,
"message": MSG2
});	
					secondskill = tempskill;
					firstskill = 0;	
					secondskill1 = tempskill1;
					firstskill1 = '？';	
					secondskill2 = tempskill2;
			        firstskill2 = '？';			
handlers['text']({
"sub_type": "alert",
"delay": 8000,
"message_RU":  "От",
"message": "OUT"
});		
}else if ( firstskill === 0 && skillid === 935302) {
					firstskill = 'К';
					tempskill = 'К';
			        firstskill1 = 'К';
			        tempskill1 = 'К';	
					firstskill2 = 'IN';
			        tempskill2 = 'IN';			
 MSG = firstskill + ' + ' + secondskill
 MSG1 = firstskill1 + ' + ' + secondskill1 
 MSG2 = firstskill2 + ' + ' + secondskill2  
 handlers['text']({
"sub_type": "message",
"message_RU":  MSG,
"message":  MSG2
});	
					secondskill = tempskill;
					firstskill = 0;
					secondskill1 = tempskill1;
					firstskill1 = '？';	
					secondskill2 = tempskill2;
			        firstskill2 = '？';			
handlers['text']({
"sub_type": "alert",
"delay": 8000,
"message_RU":  "К",
"message": "IN"
});						

}else if ( firstskill === 0 && skillid === 935303) {
					firstskill = 'Волны';
					tempskill = 'Волны';
					firstskill1 = 'Волны';
					tempskill1 = 'Волны';	
					firstskill2 = 'Waves';
			        tempskill2 = 'Waves';				
 MSG = firstskill + ' + ' + secondskill
 MSG1 = firstskill1 + ' + ' + secondskill1 
 MSG2 = firstskill2 + ' + ' + secondskill2  
 handlers['text']({
"sub_type": "message",
"message_RU":  MSG,
"message": MSG2
});	
					secondskill = tempskill;
					firstskill = 0;
					secondskill1 = tempskill1;
					firstskill1 = '？';	
					secondskill2 = tempskill2;
			        firstskill2 = '？';						
handlers['text']({
"sub_type": "alert",
"delay": 8000,
"message_RU":  "Волны",
"message": "Waves"
});	
}

 if ( secondskill === 0 && skillid === 935301) {
					secondskill = 'От';
					tempskill = 'От';
					secondskill1 = 'От';
					tempskill1 = 'От';	
					secondskill2 = 'OUT';
					tempskill2 = 'OUT';					
 MSG = firstskill + ' + ' + secondskill
 MSG1 = firstskill1 + ' + ' + secondskill1
 MSG2 = firstskill2 + ' + ' + secondskill2  
 handlers['text']({
"sub_type": "message",
"message_RU":  MSG,
"message": MSG2
});	
					firstskill = tempskill;
					secondskill = 0;
					firstskill1 = tempskill1;
					secondskill1 = '？';
					firstskill2 = tempskill2;
					secondskill2 = '？';					
handlers['text']({
"sub_type": "alert",
"delay": 8000,
"message_RU":  "От",
"message": "OUT"
});	
}else if ( secondskill === 0 && skillid === 935302) {
					secondskill = 'К';
					tempskill = 'К';
					secondskill1 = 'К';
					tempskill1 = 'К';	
					secondskill2 = 'IN';
					tempskill2 = 'IN';						
 MSG = firstskill + ' + ' + secondskill 
 MSG1 = firstskill1 + ' + ' + secondskill1 
 MSG2 = firstskill2 + ' + ' + secondskill2  
 handlers['text']({
"sub_type": "message",
"message_RU":  MSG,
"message": MSG2
});	
					firstskill = tempskill;
					secondskill = 0;
					firstskill1 = tempskill1;
					secondskill1 = '？';	
					firstskill2 = tempskill2;
					secondskill2 = '？';						
handlers['text']({
"sub_type": "alert",
"delay": 8000,
"message_RU":  "К",
"message": "IN"
});	
}else if ( secondskill === 0 && skillid === 935303) {
					secondskill = 'Волны';
					tempskill = 'Волны';
					secondskill1 = 'Волны';
					tempskill1 = 'Волны';	
					secondskill2 = 'Waves';
					tempskill2 = 'Waves';						
 MSG = firstskill + ' + ' + secondskill 
 MSG1 = firstskill1 + ' + ' + secondskill1
 MSG2 = firstskill2 + ' + ' + secondskill2  
 handlers['text']({
"sub_type": "message",
"message_RU":  MSG,
"message": MSG2
});	
					firstskill = tempskill;
					secondskill = 0;
					firstskill1 = tempskill1;
					secondskill1 = '？';	
					firstskill2 = tempskill2;
					secondskill2 = '？';						
handlers['text']({
"sub_type": "alert",
"delay": 8000,
"message_RU":  "Волны",
"message": "Waves"
});						
}
	if (notice && skillid == 301 ) {
		notice = false;
handlers['text']({"sub_type": "message","message": "throws","message_RU": "Бомба"});	
		
		setTimeout(() => notice = true, 13000);
					}
}
function start_boss() {
print = true;
}
function print_seventy(handlers) {
if(print) {
handlers['text']({
"sub_type": "message",
"message": "70%",
"message_RU": "70%"
});
}
print = false;
}
module.exports = {
	
	load(dispatch) {
		({ player, entity, library, effect } = dispatch.require.library);
	},
// 	召喚点 ，提示（ 提示标志 角度 距离   延迟时间 时间）


   // "h-935-1000-100": [{"type": "func","func": guid_voice}],


    "s-935-1000-108-0": [{"type": "text","sub_type": "message","message": "OUT","message_RU": "От" }],
    "s-935-1000-111-0": [{"type": "text","sub_type": "message","message": "BACK ATTACK","message_RU": "Удар назад" }],	
    "s-935-1000-112-0": [{"type": "text","sub_type": "message","message": "BACK ATTACK","message_RU": "Удар назад" }],
    "s-935-1000-205-0": [{"type": "text","sub_type": "message","message": "wind","message_RU": "Ветер (кайя)!!!" }],	
    "s-935-1000-304-0": [{"type": "text","sub_type": "message","message": "OUT","message_RU": "От" }],
    "s-935-1000-305-0": [{"type": "text","sub_type": "message","message": "IN","message_RU": "К" }],	
    "s-935-1000-306-0": [{"type": "text","sub_type": "message","message": "Incoming Summon","message_RU": "Бомбы !!!" }], 	
    "s-935-1000-307-0": [{"type": "text","sub_type": "message","message": "PULL","message_RU": "Стяжка!!!" }],	
	
    "s-935-1000-309-0": [ 
      {"type": "text","sub_type": "message","message": "Four missile launches were initiated","message_RU": "Запуск 4 ракет!!!" },
      {"type": "text","sub_type": "message","delay": 7000,"message": "5", "message_RU": "5"},
      {"type": "text","sub_type": "message","delay": 8000,"message": "4", "message_RU": "4"},
      {"type": "text","sub_type": "message","delay": 9000,"message": "3", "message_RU": "3"},
      {"type": "text","sub_type": "message","delay": 10000,"message": "2", "message_RU": "2"},
      {"type": "text","sub_type": "message","delay": 11000,"message": "1", "message_RU": "1"},
      {"type": "text","sub_type": "message","delay": 12000,"message": "JUMP", "message_RU": "快跳！"}
],
    "s-935-1000-311-0": [{"type": "text","sub_type": "message","message": "Safe right front →↗","message_RU": "Верхний правый" },
     {"type": "func","func": SpawnThing.bind(null,67,120,100,12000)}],//
    "s-935-1000-312-0": [{"type": "text","sub_type": "message","message": "Safe right back →↘","message_RU": "Справа внизу" },
     {"type": "func","func": SpawnThing.bind(null,112,120,100,12000)}],	//
    "s-935-1000-313-0": [{"type": "text","sub_type": "message","message": "Safe back left ↓↙","message_RU": "Сзади слева" },
     {"type": "func","func": SpawnThing.bind(null,202,120,100,12000)}],//
    "s-935-1000-314-0": [{"type": "text","sub_type": "message","message": "Safe front left ↑↖","message_RU": "Передний левый" },
     {"type": "func","func": SpawnThing.bind(null,337,120,100,12000)}],//
    "s-935-1000-315-0": [{"type": "text","sub_type": "message","message": "Safe front right ↑↗","message_RU": "Справа спереди" },
     {"type": "func","func": SpawnThing.bind(null,22,120,100,12000)}],	//
    "s-935-1000-316-0": [{"type": "text","sub_type": "message","message": "Safe back right ↓↘","message_RU": "Сзади справа" },
     {"type": "func","func": SpawnThing.bind(null,157,120,100,12000)}],//
    "s-935-1000-317-0": [{"type": "text","sub_type": "message","message": "Safe left back ←↙","message_RU": "Левый нижний" },
     {"type": "func","func": SpawnThing.bind(null,247,120,100,12000)}],//
    "s-935-1000-318-0": [{"type": "text","sub_type": "message","message": "Safe left front ←↖","message_RU": "Верхний левый" },
     {"type": "func","func": SpawnThing.bind(null,292,120,100,12000)}],//
    "s-935-1000-319-0": [{"type": "text","sub_type": "message","message": "Safe front right ↑↗","message_RU": "Справа спереди" },
     {"type": "func","func": SpawnThing.bind(null,22,120,100,12000)}],	//
    "s-935-1000-320-0": [{"type": "text","sub_type": "message","message": "Safe back right ↓↘","message_RU": "Сзади справа" },
     {"type": "func","func": SpawnThing.bind(null,157,120,100,12000)}],//
    "s-935-1000-321-0": [{"type": "text","sub_type": "message","message": "Safe back left ↓↙","message_RU": "Сзади слева" },
     {"type": "func","func": SpawnThing.bind(null,202,120,100,12000)}],//
    "s-935-1000-322-0": [{"type": "text","sub_type": "message","message": "Safe left front ←↖","message_RU": "Верхний левый" },
     {"type": "func","func": SpawnThing.bind(null,292,120,100,12000)}],	//
    "s-935-1000-323-0": [{"type": "text","sub_type": "message","message": "Safe right front →↗","message_RU": "Верхний правый" },
     {"type": "func","func": SpawnThing.bind(null,67,120,100,12000)}], //
    "s-935-1000-324-0": [{"type": "text","sub_type": "message","message": "Safe right back →↘","message_RU": "Справа внизу" },
     {"type": "func","func": SpawnThing.bind(null,112,120,100,12000)}],//
    "s-935-1000-325-0": [{"type": "text","sub_type": "message","message": "Safe left back ←↙","message_RU": "Левый нижний" },
     {"type": "func","func": SpawnThing.bind(null,247,120,100,12000)}],//
    "s-935-1000-326-0": [{"type": "text","sub_type": "message","message": "Safe front left ↑↖","message_RU": "Передний левый" },
     {"type": "func","func": SpawnThing.bind(null,337,120,100,12000)}],//

//------------------------------------2王

"s-935-2000-102-0": [{"type": "text","class_position":"tank","sub_type": "message","message": "front","message_RU": "Пила(Эвейд)"}],
"s-935-2000-105-0": [{"type": "text","sub_type": "message","message": "360","message_RU": "Крутилка (откид)"},
{"type": "func","func": Spawnitem2.bind(null,912,0,0,15,250,100,4000)}
],
"s-935-2000-108-0": [{"type": "text","sub_type": "message","message": "back","message_RU": "Откид назад"}],
"s-935-2000-301-0": [{"type": "func","func": skilld_event.bind(null, 301)}],

"s-935-2000-304-0": [{"type": "text","sub_type": "message","message": "OUT","message_RU": "От!!!"}],
"s-935-2000-305-0": [{"type": "text","sub_type": "message","message": "IN","message_RU": "К | От"},
{"type": "func","func": Spawnitem2.bind(null,912,0,0,15,225,100,4000)}
],
"s-935-2000-308-0": [{"type": "text","sub_type": "message","message": "left←","message_RU": "Влево "}],
"s-935-2000-309-0": [{"type": "text","sub_type": "message","message": "right→","message_RU": "Вправо "}],

"s-935-2007-201-0": [
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,0,500,8000)},
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,90,500,8000)},
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,180,500,8000)},
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,270,500,8000)}],
					 
"s-935-2007-306-0": [
                      {"type": "func","func": Spawnitem1.bind(null,553,0,0,0,500,4000)},
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,90,500,4000)},
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,180,500,4000)},
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,270,500,4000)}],
"s-935-2007-307-0": [
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,0,500,12000)},
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,90,500,12000)},
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,180,500,12000)},
                     {"type": "func","func": Spawnitem1.bind(null,553,0,0,270,500,12000)}],
//------------------------------------3王
    "h-935-3000-99": [{"type": "func","func": start_boss}],
    "h-935-3000-70": [{"type": "func","func": print_seventy}],
   "dm-0-0-9935311": [{"type": "func","func": skilld_event.bind(null, 9935311)}],	
   "dm-0-0-9935312": [{"type": "func","func": skilld_event.bind(null, 9935312)}],	
   "dm-0-0-9935302": [{"type": "func","func": skilld_event.bind(null, 9935302)}],	   
   "dm-0-0-9935303": [{"type": "func","func": skilld_event.bind(null, 9935303)}],
   "dm-0-0-9935304": [{"type": "func","func": skilld_event.bind(null, 9935304)}],	
   "qb-935-3000-935301": [{"type": "func","func": skilld_event.bind(null, 935301)}],	
   "qb-935-3000-935302": [{"type": "func","func": skilld_event.bind(null, 935302)}],
   "qb-935-3000-935303": [{"type": "func","func": skilld_event.bind(null, 935303)}],	
//s拳
"s-935-3000-116-0": [{"type": "text","sub_type": "message","message": "RIGHT →↘","message_RU": "Справа"}, 
	{"type": "func","func": Spawnitem.bind(null,6,170,200,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,6,350,200,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,120,250,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,130,240,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,140,230,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,150,220,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,160,210,0,3000)},	
	{"type": "func","func": Spawnitem1.bind(null,912,170,210,180,290,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,300,250,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,310,240,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,320,230,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,330,220,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,340,210,0,3000)},		
	{"type": "func","func": Spawnitem1.bind(null,912,350,210,0,290,3000)}],
"s-935-3000-117-0": [{"type": "text","sub_type": "message","message": "LEFT ←↙","message_RU": "Слева"}, 
	{"type": "func","func": Spawnitem.bind(null,6,10,200,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,6,190,200,0,3000)},	
	{"type": "func","func": Spawnitem1.bind(null,912,10,210,0,290,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,20,210,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,30,220,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,40,230,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,50,240,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,60,250,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,240,250,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,230,240,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,220,230,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,210,220,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,200,210,0,3000)},	
	{"type": "func","func": Spawnitem1.bind(null,912,190,210,180,290,3000)}],
"s-935-3000-118-0": [{"type": "text","sub_type": "message","message": "LEFT ←↙","message_RU": "Слева"}, 
	{"type": "func","func": Spawnitem.bind(null,6,10,200,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,6,190,200,0,3000)},	
	{"type": "func","func": Spawnitem1.bind(null,912,10,210,0,290,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,20,210,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,30,220,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,40,230,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,50,240,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,60,250,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,240,250,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,230,240,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,220,230,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,210,220,0,3000)},		
	{"type": "func","func": Spawnitem.bind(null,912,200,210,0,3000)},	
	{"type": "func","func": Spawnitem1.bind(null,912,190,210,180,290,3000)}],	
"s-935-3000-119-0": [{"type": "text","sub_type": "message","message": "RIGHT →↘","message_RU": "Справа"}, 
	{"type": "func","func": Spawnitem.bind(null,6,170,200,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,6,350,200,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,120,250,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,130,240,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,140,230,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,150,220,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,160,210,0,3000)},	
	{"type": "func","func": Spawnitem1.bind(null,912,170,210,180,290,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,300,250,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,310,240,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,320,230,0,3000)},	
	{"type": "func","func": Spawnitem.bind(null,912,330,220,0,3000)},
	{"type": "func","func": Spawnitem.bind(null,912,340,210,0,3000)},		
	{"type": "func","func": Spawnitem1.bind(null,912,350,210,0,290,3000)}],
	
"s-935-3000-129-0": [{"type": "text","class_position":"tank","sub_type": "message","message": "dodge","message_RU": "Эвейд"}],	


"s-935-3000-305-0": [{"type": "func","func": Spawnitem2.bind(null,912,0,0,15,300,100,7000)}],
  "s-935-3000-321-0": [
		  {"type": "text","sub_type": "message","message": "SHIELD!","message_RU": "BOSS护盾 快打，不然灭团!" },
          {"type": "text","sub_type": "message","delay": 105000,"message": "After 10s SHIELD! ", "message_RU": "Через 10сек щит!!!"}	  
		 ],

"s-935-3000-324-0": [{"type": "text","sub_type": "message","message": "out","message_RU": "От"}]

};
