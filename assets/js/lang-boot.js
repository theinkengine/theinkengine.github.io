(function () {
	var SPANISH_TIMEZONES = [
		"Europe/Madrid",
		"Africa/Ceuta",
		"Atlantic/Canary",
		"Africa/Malabo",
		"America/Argentina/Buenos_Aires",
		"America/Argentina/Cordoba",
		"America/Argentina/Salta",
		"America/Argentina/Jujuy",
		"America/Argentina/Tucuman",
		"America/Argentina/Catamarca",
		"America/Argentina/La_Rioja",
		"America/Argentina/San_Juan",
		"America/Argentina/Mendoza",
		"America/Argentina/San_Luis",
		"America/Argentina/Rio_Gallegos",
		"America/Argentina/Ushuaia",
		"America/Buenos_Aires",
		"America/Cordoba",
		"America/Mendoza",
		"America/Rosario",
		"America/Catamarca",
		"America/Jujuy",
		"America/Tucuman",
		"America/Ushuaia",
		"America/Salta",
		"America/San_Luis",
		"America/Rio_Gallegos",
		"America/Mexico_City",
		"America/Monterrey",
		"America/Cancun",
		"America/Tijuana",
		"America/Chihuahua",
		"America/Ojinaga",
		"America/Hermosillo",
		"America/Mazatlan",
		"America/Bahia_Banderas",
		"America/Merida",
		"America/Bogota",
		"America/Lima",
		"America/Santiago",
		"Pacific/Easter",
		"America/Caracas",
		"America/Guayaquil",
		"Pacific/Galapagos",
		"America/La_Paz",
		"America/Asuncion",
		"America/Montevideo",
		"America/Panama",
		"America/Costa_Rica",
		"America/Guatemala",
		"America/El_Salvador",
		"America/Tegucigalpa",
		"America/Managua",
		"America/Santo_Domingo",
		"America/Havana",
		"America/Puerto_Rico"
	];

	function fromLanguage() {
		var langs =
			navigator.languages && navigator.languages.length
				? navigator.languages
				: [navigator.language || ""];
		for (var i = 0; i < langs.length; i++) {
			if (/^es(-|$)/i.test(langs[i])) return "es";
		}
		return "en";
	}

	function fromTimezone() {
		try {
			var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
			if (!tz) return null;
			return SPANISH_TIMEZONES.indexOf(tz) !== -1 ? "es" : "en";
		} catch (e) {
			return null;
		}
	}

	var lang = null;
	try {
		lang = localStorage.getItem("ink_lang");
	} catch (e) {}

	if (!lang) {
		lang = fromTimezone() || fromLanguage();
	}

	window.INK_BOOT_LANG = lang;
	document.documentElement.lang = lang;

	if (lang !== "es") {
		document.documentElement.classList.add("ink-lang-pending");
		setTimeout(function () {
			document.documentElement.classList.remove("ink-lang-pending");
		}, 2500);
	}
})();
