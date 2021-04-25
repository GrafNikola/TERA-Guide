﻿// Bahaar's Sanctum (Guide)
//
// made by michengs

module.exports = (dispatch, handlers, guide, lang) => {
	guide.type = SP;

	let print = false;
	let notice = true;
	let printend = false;

	function skilld_event(skillid, ent) {
		if (skillid == 30372304) {
			handlers.text({ sub_type: "notification", message: "Stun", message_RU: "Стан!!!" });
			handlers.text({ sub_type: "message", message: "Stun", message_RU: "Стан!!!" });
		}

		if (notice && skillid == 305) {
			notice = false;
			handlers.text({
				sub_type: "message",
				message: "Laser",
				message_RU: "Лазер"
			});

			dispatch.setTimeout(() => notice = true, 4000);
		}

		// Wawes
		if ([1121, 2121, 1140, 2140, 1123, 2123, 1142, 2142, 1122, 2122, 1141, 2141].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "vector", args: [553, 90, 50, 0, 500, 0, 6000] },
				{ type: "spawn", func: "vector", args: [553, 270, 50, 0, 500, 0, 6000] },
				{ type: "spawn", func: "vector", args: [553, 90, 50, 180, 500, 0, 6000] },
				{ type: "spawn", func: "vector", args: [553, 270, 50, 180, 500, 0, 6000] },
				{ type: "spawn", func: "circle", args: [false, 445, 0, 0, 6, 400, 0, 6000] },
				{ type: "text", sub_type: "alert", delay: 60000, message: "Waves soon...", message_RU: "Скоро волны..." }
			]);
		}

		// Left
		if ([1121, 2121].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 37, 125, 0, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 143, 125, 0, 2533, false, ["safe", "safe"]] }
			]);
		}

		// Right
		if ([1140, 2140].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 323, 125, 0, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 217, 125, 0, 2533, false, ["safe", "safe"]] }
			]);
		}

		// 2nd fast 123 142
		// Left
		if ([1123, 2123].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 37, 125, 0, 2500, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 143, 125, 0, 2500, false, ["safe", "safe"]] }
			]);
		}

		// Right
		if ([1142, 2142].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 323, 125, 0, 2500, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 217, 125, 0, 2500, false, ["safe", "safe"]] }
			]);
		}

		// 3rd fast 122 141
		// Left
		if ([1122, 2122].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 37, 125, 0, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 143, 125, 0, 2533, false, ["safe", "safe"]] }
			]);
		}

		// Right
		if ([1141, 2141].includes(skillid)) {
			handlers.event([
				{ type: "spawn", func: "marker", args: [false, 323, 125, 0, 2533, false, ["safe", "safe"]] },
				{ type: "spawn", func: "marker", args: [false, 217, 125, 0, 2533, false, ["safe", "safe"]] }
			]);
		}
	}

	function start_boss() {
		print = true;
		printend = true;
	}

	function print_th() {
		if (print) {
			handlers.text({
				sub_type: "message",
				message: "Laser (loading)",
				message_RU: "Лазер (зарядка)"
			});
		}

		print = false;
	}

	function print_end() {
		if (printend) {
			handlers.text({
				sub_type: "message",
				message: "Laser (loading)",
				message_RU: "Лазер (зарядка)"
			});
			handlers.text({
				sub_type: "message",
				delay: 30000,
				message: "Laser (loading)",
				message_RU: "Лазер (зарядка)"
			});
		}

		printend = false;
	}

	return {
		// PHASE 1
		"nd-3037-1000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" }
		],

		// ---------------------------------------- Not enraged ----------------------------------------
		"s-3037-1000-2103-0": [
			{ type: "text", sub_type: "message", message: "Front (Dodge)", message_RU: "Удар вперед (эвейд)" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] }
		],
		"s-3037-1000-2108-0": [{ type: "text", sub_type: "message", message: "Back Throw | Front", message_RU: "Стан назад | Черенок" }],
		"s-3037-1000-2111-0": [
			{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-3037-1000-2113-0": [{ type: "text", sub_type: "message", message: "Throw (Bait)", message_RU: "Молот (байт)" }],
		"s-3037-1000-2114-0": [
			{ type: "text", sub_type: "message", message: "Front Slam", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 260, 10, 320, 100, 4000] }
		],
		"s-3037-1000-2115-0": [{ type: "text", sub_type: "message", delay: 234, message: "Knockup", message_RU: "Черкаш (полет)" }],
		"s-3037-1000-2116-0": [
			{ type: "text", sub_type: "message", message: "Donuts", message_RU: "Бублики" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 6000] }
		],
		"s-3037-1000-2117-0": [{ type: "text", sub_type: "message", message: "Jump (Bait)", message_RU: "Прыжок (байт)" }],
		"s-3037-1000-2118-0": [{ type: "text", sub_type: "message", message: "Jump (Tank)", message_RU: "Прыжок (танк)" }],
		"s-3037-1000-2121-0": [{ type: "text", sub_type: "message", message: "Waves (Left)", message_RU: "Волны (левая)" }, { type: "func", func: skilld_event, args: [2121] }],
		//
		"s-3037-1000-2131-0": [
			{ type: "text", sub_type: "message", message: "Front | Left Scratch", message_RU: "Удар в вперед | Левый черкаш" },
			{ type: "spawn", func: "circle", args: [false, 445, 358, 340, 8, 660, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 4000] }
		],
		"s-3037-1000-2132-0": [
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] }
		],
		//
		"s-3037-1000-2137-0": [
			{ type: "text", sub_type: "message", message: "Hammer Back", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-3037-1000-2138-0": [{ type: "text", sub_type: "message", delay: 234, message: "Knockup (Bait)", message_RU: "Черкаш (полет)" }],
		"s-3037-1000-2139-0": [
			{ type: "text", sub_type: "message", message: "Dodge!", message_RU: "Эвейд!" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 360, 0, 2000] }
		],
		"s-3037-1000-2140-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right)", message_RU: "Волны (правая)" },
			{ type: "func", func: skilld_event, args: [2140] }
		],

		// ---------------------------------------- Enraged ----------------------------------------
		"s-3037-1000-1103-0": [
			{ type: "text", sub_type: "message", message: "Front (Dodge)", message_RU: "Удар вперед (эвейд)" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] }
		],
		"s-3037-1000-1108-0": [{ type: "text", sub_type: "message", message: "Back Throw | Front", message_RU: "Стан назад | Черенок" }],
		"s-3037-1000-1111-0": [
			{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-3037-1000-1113-0": [{ type: "text", sub_type: "message", message: "Throw (Bait)", message_RU: "Молот (байт)" }],
		"s-3037-1000-1114-0": [
			{ type: "text", sub_type: "message", message: "Front Slam", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 260, 10, 320, 100, 4000] }
		],
		"s-3037-1000-1115-0": [{ type: "text", sub_type: "message", delay: 1300, message: "Knockup", message_RU: "Черкаш (полет)" }],
		"s-3037-1000-1116-0": [
			{ type: "text", sub_type: "message", message: "Donuts", message_RU: "Бублики" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 6000] }
		],
		"s-3037-1000-1117-0": [{ type: "text", sub_type: "message", message: "Jump (Bait)", message_RU: "Прыжок (байт)" }],
		"s-3037-1000-1118-0": [{ type: "text", sub_type: "message", message: "Jump (Tank)", message_RU: "Прыжок (танк)" }],
		"s-3037-1000-1121-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left)", message_RU: "Волны (левая)" },
			{ type: "func", func: skilld_event, args: [1121] }
		],
		"s-3037-1000-1131-0": [
			{ type: "text", sub_type: "message", message: "Front | Left Scratch", message_RU: "Удар вперед | Левый черкаш" },
			{ type: "spawn", func: "circle", args: [false, 445, 358, 340, 8, 660, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 4000] }
		],
		"s-3037-1000-1132-0": [
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 500, 0, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 0, 2000] }
		],
		"s-3037-1000-1137-0": [
			{ type: "text", sub_type: "message", message: "Hammer Back", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-3037-1000-1138-0": [{ type: "text", sub_type: "message", delay: 1300, message: "Knockup (Bait)", message_RU: "Черкаш (полет)" }],
		"s-3037-1000-1139-0": [
			{ type: "text", sub_type: "message", message: "Dodge!", message_RU: "Эвейд!" },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "circle", args: [false, 912, 0, 0, 8, 360, 0, 2000] }
		],
		"s-3037-1000-1140-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right)", message_RU: "Волны (правая)" },
			{ type: "func", func: skilld_event, args: [1140] }
		],


		// PHASE 2
		"nd-3037-2000": [
			{ type: "stop_timers" },
			{ type: "despawn_all" },
			{ type: "func", func: print_end }
		],
		"ns-3037-2000": [
			//{ type: "spawn", func: "vector", args: [542, 0, 0, 0, 3000, 0, 6000000] },
			//{ type: "spawn", func: "vector", args: [542, 0, 0, 180, 3000, 0, 6000000] },
			{ type: "spawn", func: "marker", args: [false, 0, -700, 100, 60000000, false, ["Throne", "Throne Direction"]] },
			{ type: "spawn", func: "point", args: [513, 0, 800, 100, 60000000] },
			{ type: "func", func: start_boss }
		],

		// ---------------------------------------- Not enraged ----------------------------------------
		"s-3037-2000-1101-0": [
			{ type: "text", sub_type: "message", message: "4 Hit Combo", message_RU: "270" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 195, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 270, 500, 0, 3000] }
		],
		"s-3037-2000-1103-0": [
			{ type: "text", sub_type: "message", message: "Front (Dodge)", message_RU: "Удар вперед (эвейд)" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] }
		],
		"s-3037-2000-1107-0": [{ type: "text", sub_type: "message", message: "4 Hit (3)", message_RU: "4" }],
		"s-3037-2000-1108-0": [{ type: "text", sub_type: "message", message: "Back Throw | Front", message_RU: "Стан назад | Удар вперед" }],
		"s-3037-2000-1111-0": [
			{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-3037-2000-1112-0": [
			//{ type: "text", sub_type: "message", message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 1240, message: "Perfect Defense", message_RU: "Идеальный блок" },
			//{ type: "text", sub_type: "message", delay: 2040, message: "1" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 220, 12, 210, 100, 4000] }
		],
		"s-3037-2000-1113-0": [{ type: "text", sub_type: "message", message: "Throw (Bait)", message_RU: "Молот (байт)" }],
		"s-3037-2000-1114-0": [
			{ type: "text", sub_type: "message", message: "Front Slam", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 260, 10, 320, 100, 4000] }
		],
		"s-3037-2000-1115-0": [{ type: "text", sub_type: "message", delay: 1300, message: "Knockup", message_RU: "Черкаш (полет)" }],
		"s-3037-2000-1116-0": [
			{ type: "text", sub_type: "message", message: "Donuts", message_RU: "Бублики" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 6000] }
		],
		"s-3037-2000-1117-0": [{ type: "text", sub_type: "message", message: "Jump (Bait)", message_RU: "Прыжок (байт)" }],
		"s-3037-2000-1118-0": [{ type: "text", sub_type: "message", message: "Jump (Tank)", message_RU: "Прыжок (танк)" }],
		"s-3037-2000-1119-0": [
			{ type: "text", sub_type: "message", message: "Left Swipe", message_RU: "Слева" },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 270, 300, 100, 2000, true, null] }
		],
		"s-3037-2000-1120-0": [
			{ type: "text", sub_type: "message", message: "Right Swipe", message_RU: "Справа" },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 90, 300, 100, 2000, true, null] }
		],
		"s-3037-2000-1121-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left)", message_RU: "Волны (левая)" },
			{ type: "func", func: skilld_event, args: [1121] }
		],
		"s-3037-2000-1122-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left) 3nd fast", message_RU: "Волны (левая) 3-я быстрая" },
			{ type: "func", func: skilld_event, args: [1122] }
		],
		"s-3037-2000-1123-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left) 2nd fast", message_RU: "Волны (левая) 2-я быстрая" },
			{ type: "func", func: skilld_event, args: [1123] }
		],
		//
		"s-3037-2000-1125-0": [
			{ type: "text", sub_type: "message", message: "Front | Right Scratch", message_RU: "Удар вперед | Правый черкаш" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] },
			{ type: "spawn", func: "vector", args: [553, 356, 0, 180, 500, 100, 3000] },
			{ type: "spawn", func: "vector", args: [553, 356, 0, 0, 500, 100, 3000] }
		],
		"s-3037-2000-1126-0": [
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 500, 100, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 100, 2000] }
		],
		"s-3037-2000-1131-0": [
			{ type: "text", sub_type: "message", message: "Front | Left Scratch", message_RU: "Удар вперед | Левый черкаш" },
			{ type: "spawn", func: "circle", args: [false, 445, 358, 340, 8, 660, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 4000] }
		],
		"s-3037-2000-1132-0": [
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 500, 100, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 100, 2000] }
		],
		//
		"s-3037-2000-1135-0": [
			//{ type: "text", sub_type: "message", message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 200, message: "Perfect Defense", message_RU: "Идеальный блок" },
			//{ type: "text", sub_type: "message", delay: 1535, message: "1" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 220, 12, 210, 100, 4000] }
		],
		"s-3037-2000-1137-0": [
			{ type: "text", sub_type: "message", message: "Hammer back", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-3037-2000-1138-0": [{ type: "text", sub_type: "message", delay: 1300, message: "Knockup (Bait)", message_RU: "Черкаш (полет)" }],
		"s-3037-2000-1139-0": [{ type: "text", sub_type: "message", message: "Dodge!", message_RU: "Эвейд!" }],
		"s-3037-2000-1140-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right)", message_RU: "Волны (правая)" },
			{ type: "func", func: skilld_event, args: [1140] }
		],
		"s-3037-2000-1141-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right) 3nd fast", message_RU: "Волны (правая) 3-я быстрая" },
			{ type: "func", func: skilld_event, args: [1141] }
		],
		"s-3037-2000-1142-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right) 2nd fast", message_RU: "Волны (правая) 2-я быстрая" },
			{ type: "func", func: skilld_event, args: [1142] }
		],
		"s-3037-2000-1307-0": [{ type: "text", sub_type: "message", message: "!", message_RU: "!" },
			{ type: "text", sub_type: "message", delay: 20000, message: "Last aerolite", message_RU: "Последний метеор" }
		],
		"ab-3037-2000-30372303": [{ type: "text", sub_type: "message", message: "Plague/Regress", message_RU: "Регресс" }],
		"s-3037-2000-1308-0": [{ type: "text", sub_type: "message", message: "Stun (1)", message_RU: "Стан (1)" }],
		"s-3037-2000-1309-0": [{ type: "text", sub_type: "message", message: "Stun (2)", message_RU: "Стан (2)" }],
		"s-3037-2000-1310-0": [{ type: "text", sub_type: "message", message: "Stun (3)", message_RU: "Стан (3)" }],
		"s-3037-2000-1311-0": [
			{ type: "text", sub_type: "message", message: "Wrath", message_RU: "Облепиха" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 6000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 6000] }
		],
		"s-3037-2000-1312-0": [
			{ type: "text", sub_type: "message", message: "Wrath!", message_RU: "Облепиха" },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 0, 500, 0, 6000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 180, 500, 0, 6000] }
		],

		// ---------------------------------------- Enraged ----------------------------------------
		"s-3037-2000-2101-0": [
			{ type: "text", sub_type: "message", message: "4 Hit combo", message_RU: " 270 " },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 195, 500, 0, 4000] },
			{ type: "spawn", func: "vector", args: [553, 0, 0, 270, 500, 0, 3000] }
		],
		"s-3037-2000-2103-0": [
			{ type: "text", sub_type: "message", message: "Front (Dodge)", message_RU: "Удар вперед (эвейд)" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] }
		],
		"s-3037-2000-2107-0": [{ type: "text", sub_type: "message", message: "4 Hit (3)", message_RU: "4" }],
		"s-3037-2000-2108-0": [{ type: "text", sub_type: "message", message: "Back Throw | Front", message_RU: "Стан назад | Удар вперед" }],
		"s-3037-2000-2111-0": [
			{ type: "text", sub_type: "message", message: "Back", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-3037-2000-2112-0": [
			//{ type: "text", sub_type: "message", message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 2000, message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 2700, message: "x2" },
			//{ type: "text", sub_type: "message", delay: 2800, message: "1" },
			//{ type: "text", sub_type: "message", delay: 3690, message: "2" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 220, 12, 210, 100, 4000] }
		],
		"s-3037-2000-2113-0": [{ type: "text", sub_type: "message", message: "Throw (Bait)", message_RU: "Молот (байт)" }],
		"s-3037-2000-2114-0": [
			{ type: "text", sub_type: "message", message: "Front Slam", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 260, 10, 320, 100, 4000] }
		],
		"s-3037-2000-2115-0": [{ type: "text", sub_type: "message", delay: 234, message: "Knockup", message_RU: "Черкаш (полет)" }],
		"s-3037-2000-2116-0": [
			{ type: "text", sub_type: "message", message: "Donuts", message_RU: "Бублики" },
			{ type: "spawn", func: "circle", args: [false, 553, 0, 0, 8, 290, 100, 6000] }
		],
		"s-3037-2000-2117-0": [{ type: "text", sub_type: "message", message: "Jump (Bait)", message_RU: "Прыжок (байт)" }],
		"s-3037-2000-2118-0": [{ type: "text", sub_type: "message", message: "Jump (Tank)", message_RU: "Прыжок (танк)" }],
		"s-3037-2000-2119-0": [
			{ type: "text", sub_type: "message", message: "Left Swipe", message_RU: "Слева" },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [0, 180, 912, 0, 0, 8, 360, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 270, 300, 100, 2000, true, null] }
		],
		"s-3037-2000-2120-0": [
			{ type: "text", sub_type: "message", message: "Right Swipe", message_RU: "Справа" },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 20, 160, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 12, 220, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 10, 300, 0, 2000] },
			{ type: "spawn", func: "semicircle", args: [180, 360, 912, 0, 0, 8, 360, 0, 2000] },
			{ type: "spawn", func: "marker", args: [false, 90, 300, 100, 2000, true, null] }
		],
		"s-3037-2000-2121-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left)", message_RU: "Волны (левая)" },
			{ type: "func", func: skilld_event, args: [2121] }
		],
		"s-3037-2000-2122-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left) 3nd fast", message_RU: "Волны (левая) 3-я быстрая" },
			{ type: "func", func: skilld_event, args: [2122] }
		],
		"s-3037-2000-2123-0": [
			{ type: "text", sub_type: "message", message: "Waves (Left) 2nd fast", message_RU: "Волны (левая) 2-я быстрая" },
			{ type: "func", func: skilld_event, args: [2123] }
		],
		//
		"s-3037-2000-2125-0": [
			{ type: "text", sub_type: "message", message: "Front | Right Scratch", message_RU: "Удар вперед | Правый черкаш" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 400, 8, 350, 100, 3000] },
			{ type: "spawn", func: "vector", args: [553, 356, 0, 180, 500, 100, 3000] },
			{ type: "spawn", func: "vector", args: [553, 356, 0, 0, 500, 100, 3000] }
		],
		"s-3037-2000-2126-0": [
			{ type: "spawn", func: "vector", args: [553, 90, 200, 0, 500, 100, 2000] },
			{ type: "spawn", func: "vector", args: [553, 90, 200, 180, 500, 100, 2000] }
		],
		"s-3037-2000-2131-0": [
			{ type: "text", sub_type: "message", message: "Front | Left Scratch", message_RU: "Удар вперед | Левый черкаш" },
			{ type: "spawn", func: "circle", args: [false, 445, 358, 340, 8, 660, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 180, 500, 100, 4000] },
			{ type: "spawn", func: "vector", args: [553, 358, 0, 0, 500, 100, 4000] }
		],
		"s-3037-2000-2132-0": [
			{ type: "spawn", func: "vector", args: [553, 270, 200, 0, 500, 100, 2000] },
			{ type: "spawn", func: "vector", args: [553, 270, 200, 180, 500, 100, 2000] }
		],
		//
		"s-3037-2000-2135-0": [
			//{ type: "text", sub_type: "message", message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 200, message: "Perfect Defense", message_RU: "Идеальный блок" },
			{ type: "text", sub_type: "message", delay: 1535, message: "x2" },
			//{ type: "text", sub_type: "message", delay: 1535, message: "1" },
			//{ type: "text", sub_type: "message", delay: 2535, message: "2" },
			{ type: "spawn", func: "circle", args: [false, 445, 356, 220, 12, 210, 100, 4000] }
		],
		"s-3037-2000-2137-0": [
			{ type: "text", sub_type: "message", message: "Hammer back", message_RU: "Удар назад" },
			{ type: "spawn", func: "circle", args: [false, 445, 180, 500, 8, 480, 100, 2000] }
		],
		"s-3037-2000-2138-0": [{ type: "text", sub_type: "message", delay: 234, message: "Knockup (Bait)", message_RU: "Черкаш (полет)" }],
		"s-3037-2000-2139-0": [{ type: "text", sub_type: "message", message: "Dodge!", message_RU: "Эвейд!" }],
		"s-3037-2000-2140-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right)", message_RU: "Волны (правая)" },
			{ type: "func", func: skilld_event, args: [2140] }
		],
		"s-3037-2000-2141-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right) 3nd fast", message_RU: "Волны (правая) 3-я быстрая" },
			{ type: "func", func: skilld_event, args: [2141] }
		],
		"s-3037-2000-2142-0": [
			{ type: "text", sub_type: "message", message: "Waves (Right) 2nd fast", message_RU: "Волны (правая) 2-я быстрая" },
			{ type: "func", func: skilld_event, args: [2142] }
		],

		"ab-3037-2000-30372000": [{ type: "func", func: skilld_event, args: [30372000] }],
		"ab-3037-2000-30372001": [{ type: "func", func: skilld_event, args: [30372001] }],
		"ab-3037-2000-30372304": [{ type: "func", func: skilld_event, args: [30372304] }],
		"ab-3037-2000-903037001": [{ type: "func", func: skilld_event, args: [903037001] }],
		"s-3037-2500-1201-0": [{ type: "func", func: print_th }],
		"s-3037-2500-1305-0": [
			{ type: "func", func: skilld_event, args: [305] },
			{ type: "spawn", func: "vector", args: [912, 0, 0, 0, 3000, 0, 4000] }
		]
	};
};