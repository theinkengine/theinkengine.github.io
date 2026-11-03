document.addEventListener("DOMContentLoaded", async () => {
	const savedLang = localStorage.getItem("ink_lang");
	const SPANISH_COUNTRIES = new Set(
		"AR BO CL CO CR CU DO EC SV GQ GT HN MX NI PA PY PE PR ES UY VE".split(" ")
	);

	function langFromLanguage() {
		const langs =
			navigator.languages && navigator.languages.length
				? navigator.languages
				: [navigator.language || ""];
		return langs.some((l) => /^es(-|$)/i.test(l)) ? "es" : "en";
	}

	async function langFromCountry() {
		try {
			const controller = new AbortController();
			const timer = setTimeout(() => controller.abort(), 1200);
			const res = await fetch("/cdn-cgi/trace", {
				signal: controller.signal,
				cache: "no-store"
			});
			clearTimeout(timer);
			if (!res.ok) return null;
			const text = await res.text();
			const match = /^loc=([A-Z]{2})$/m.exec(text);
			if (!match) return null;
			const country = match[1];
			if (country === "XX" || country === "T1") return null;
			return SPANISH_COUNTRIES.has(country) ? "es" : "en";
		} catch (e) {
			return null;
		}
	}

	function detectLang() {
		return window.INK_BOOT_LANG || langFromLanguage();
	}

	async function correctLangFromCountry(currentLang) {
		const byCountry = await langFromCountry();
		if (byCountry && byCountry !== currentLang) applyLang(byCountry, false);
	}

	let translations = window.INK_TRANSLATIONS || null;

	if (!translations) {
		try {
			const res = await fetch("assets/data/translations.json");
			translations = await res.json();
		} catch (e) {
			console.error("Could not load translations", e);
			return;
		}
	}

	function applyLang(lang, persist) {
		if (persist) localStorage.setItem("ink_lang", lang);
		document.documentElement.lang = lang;

		const dict = translations[lang] || translations["es"];
		window.INK_CURRENT_DICT = dict;

		document.querySelectorAll("[data-i18n]").forEach((el) => {
			const key = el.getAttribute("data-i18n");
			if (dict[key]) {
				if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
					el.placeholder = dict[key];
				} else {
					el.innerHTML = dict[key];
				}
			}
		});

		document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
			const key = el.getAttribute("data-i18n-aria-label");
			if (dict[key]) {
				el.setAttribute("aria-label", dict[key]);
			}
		});

		document.querySelectorAll("[data-i18n-content]").forEach((el) => {
			const key = el.getAttribute("data-i18n-content");
			if (dict[key]) {
				el.setAttribute("content", dict[key]);
			}
		});

		document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
			const key = el.getAttribute("data-i18n-alt");
			if (dict[key]) {
				el.setAttribute("alt", dict[key]);
			}
		});

		document.querySelectorAll(".lang-switcher button").forEach((btn) => {
			const isActive = btn.getAttribute("data-lang") === lang;
			btn.classList.toggle("active", isActive);
			btn.setAttribute("aria-pressed", isActive ? "true" : "false");
		});

		document.documentElement.classList.remove("ink-lang-pending");
	}

	function bindSwitcher() {
		document.querySelectorAll(".lang-switcher button").forEach((btn) => {
			btn.addEventListener("click", () => {
				applyLang(btn.getAttribute("data-lang"), true);
			});
		});
	}

	const nav = document.querySelector(".site-nav");
	if (nav) {
		let switcher = nav.querySelector(".lang-switcher");
		if (!switcher) {
			switcher = document.createElement("div");
			switcher.className = "lang-switcher";
			switcher.setAttribute("role", "group");
			switcher.setAttribute("aria-label", "Idioma / Language");
			switcher.innerHTML =
				'<button type="button" data-lang="es" aria-pressed="true">ES</button>' +
				'<span class="lang-switcher__sep" aria-hidden="true"></span>' +
				'<button type="button" data-lang="en" aria-pressed="false">EN</button>';
			nav.appendChild(switcher);
		}
		bindSwitcher();
	}

	const initialLang = savedLang || detectLang();
	applyLang(initialLang, false);

	if (!savedLang) {
		correctLangFromCountry(initialLang);
	}
});
