document.addEventListener("DOMContentLoaded", async () => {
	const savedLang = localStorage.getItem("ink_lang") || "es";
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

	function applyLang(lang) {
		localStorage.setItem("ink_lang", lang);
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

		document.querySelectorAll(".lang-switcher button").forEach((btn) => {
			const isActive = btn.getAttribute("data-lang") === lang;
			btn.classList.toggle("active", isActive);
			btn.setAttribute("aria-pressed", isActive ? "true" : "false");
		});
	}

	function bindSwitcher() {
		document.querySelectorAll(".lang-switcher button").forEach((btn) => {
			btn.addEventListener("click", () => {
				applyLang(btn.getAttribute("data-lang"));
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

	applyLang(savedLang);
});
