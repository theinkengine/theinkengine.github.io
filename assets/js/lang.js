document.addEventListener("DOMContentLoaded", async () => {
	const savedLang = localStorage.getItem("ink_lang") || "es";
	let translations = {};

	try {
		const res = await fetch("assets/data/translations.json");
		translations = await res.json();
	} catch (e) {
		console.error("Could not load translations", e);
		return;
	}

	function applyLang(lang) {
		localStorage.setItem("ink_lang", lang);
		document.documentElement.lang = lang;

		const dict = translations[lang] || translations["es"];
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

		document.querySelectorAll(".lang-switcher button").forEach((btn) => {
			if (btn.getAttribute("data-lang") === lang) {
				btn.classList.add("active");
			} else {
				btn.classList.remove("active");
			}
		});
	}

	const nav = document.querySelector(".site-nav");
	if (nav && !document.querySelector(".lang-switcher")) {
		const switcher = document.createElement("div");
		switcher.className = "lang-switcher";
		switcher.innerHTML = `
			<button type="button" data-lang="es">ES</button>
			<span>/</span>
			<button type="button" data-lang="en">EN</button>
		`;
		nav.appendChild(switcher);

		switcher.querySelectorAll("button").forEach((btn) => {
			btn.addEventListener("click", () => {
				applyLang(btn.getAttribute("data-lang"));
			});
		});
	}

	applyLang(savedLang);
});
