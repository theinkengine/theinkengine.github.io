(function () {
	"use strict";

	var works = window.WORKS || [];
	var ASSET_V = "20261112f";
	var grid = document.getElementById("works-grid");
	var dialog = document.getElementById("works-lightbox");
	var yearEl = document.getElementById("year");
	if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }
	if (!grid || !dialog || !works.length) { return; }

	if (works.length === 1) { grid.classList.add("works-grid--single"); }

	var img = dialog.querySelector("img");
	var caption = dialog.querySelector("figcaption");
	var counter = dialog.querySelector(".counter");
	var current = 0;
	var trigger = null;

	function currentLang() {
		return document.documentElement.lang === "en" ? "en" : "es";
	}

	function pick(value, lang) {
		if (value && typeof value === "object") {
			return value[lang] || value.es || value.en || "";
		}
		return value || "";
	}

	function pad(n) { return (n < 10 ? "0" : "") + n; }

	function dict(key, fallback) {
		var value = (window.INK_CURRENT_DICT || {})[key];
		return value || fallback;
	}

	function asset(url) { return url + "?v=" + ASSET_V; }

	function srcset(base) {
		return asset(base + "-480.webp") + " 480w, " + asset(base + "-960.webp") + " 960w, " + asset(base + "-1440.webp") + " 1440w";
	}

	function detailsFor(work, lang, extended) {
		var parts = [pick(work.medium, lang), pick(work.dimensions, lang)];
		if (extended) {
			parts.push(pick(work.paper, lang));
			parts.push(work.year);
		}
		return parts.filter(Boolean).join(" · ");
	}

	function buildGrid() {
		var lang = currentLang();
		grid.innerHTML = "";
		works.forEach(function (work, index) {
			var figure = document.createElement("figure");
			var link = document.createElement("a");
			var picture = document.createElement("picture");
			var source = document.createElement("source");
			var image = document.createElement("img");
			var cap = document.createElement("figcaption");
			var num = document.createElement("span");
			var title = document.createElement("span");

			link.href = asset(work.src + "-1440.webp");
			link.className = "work";
			link.dataset.index = String(index);
			link.setAttribute("aria-label", (lang === "en" ? "Open " : "Abrir ") + pick(work.title, lang));

			source.type = "image/webp";
			source.srcset = srcset(work.src);
			source.sizes = works.length === 1 ? "(max-width: 759px) 100vw, 960px" : "(max-width: 759px) 100vw, 47vw";

			image.src = asset(work.src + "-960.jpg");
			image.alt = pick(work.alt, lang);
			image.width = work.w;
			image.height = work.h;
			image.loading = index === 0 ? "eager" : "lazy";
			image.decoding = "async";
			if (index === 0) { image.fetchPriority = "high"; }

			num.className = "num";
			num.textContent = pad(index + 1);
			title.className = "title";
			title.textContent = pick(work.title, lang);

			cap.appendChild(num);
			cap.appendChild(title);
			if (work.year) {
				var year = document.createElement("span");
				year.className = "year";
				year.textContent = work.year;
				cap.appendChild(year);
			}

			var detailsText = detailsFor(work, lang, false);
			if (detailsText) {
				var details = document.createElement("span");
				details.className = "meta";
				details.textContent = detailsText;
				cap.appendChild(details);
			}

			var acquire = document.createElement("button");
			acquire.type = "button";
			acquire.className = "work-acquire";
			acquire.dataset.index = String(index);
			acquire.setAttribute("aria-haspopup", "dialog");
			acquire.textContent = dict("gallery_cta", lang === "en" ? "Ask about price" : "Consultar precio");
			cap.appendChild(acquire);

			picture.appendChild(source);
			picture.appendChild(image);
			link.appendChild(picture);
			figure.appendChild(link);
			figure.appendChild(cap);
			grid.appendChild(figure);
		});
	}

	function render(index) {
		current = (index + works.length) % works.length;
		var work = works[current];
		var lang = currentLang();
		img.src = asset(work.src + "-1440.webp");
		img.alt = pick(work.alt, lang);
		img.width = work.w;
		img.height = work.h;
		caption.textContent = pick(work.title, lang);
		var meta = document.createElement("span");
		meta.className = "meta";
		meta.textContent = detailsFor(work, lang, true);
		caption.appendChild(meta);
		counter.textContent = pad(current + 1) + " / " + pad(works.length);
	}

	function open(index, opener) {
		trigger = opener;
		render(index);
		if (typeof dialog.showModal === "function") { dialog.showModal(); }
		else { dialog.setAttribute("open", ""); }
	}

	function openAcquisition(index, opener) {
		var work = works[index];
		if (!work) { return; }
		document.dispatchEvent(new CustomEvent("ink:acquire", {
			detail: { index: index, work: work, opener: opener }
		}));
	}

	grid.addEventListener("click", function (event) {
		var acquire = event.target.closest("button.work-acquire");
		if (acquire) {
			event.preventDefault();
			openAcquisition(Number(acquire.dataset.index), acquire);
			return;
		}
		var link = event.target.closest("a.work");
		if (!link) { return; }
		event.preventDefault();
		open(Number(link.dataset.index), link);
	});

	dialog.querySelector(".prev").addEventListener("click", function () { render(current - 1); });
	dialog.querySelector(".next").addEventListener("click", function () { render(current + 1); });
	dialog.querySelector(".close").addEventListener("click", function () { dialog.close(); });

	dialog.addEventListener("keydown", function (event) {
		if (event.key === "ArrowLeft") { render(current - 1); }
		if (event.key === "ArrowRight") { render(current + 1); }
	});

	dialog.addEventListener("click", function (event) {
		if (event.target === dialog) { dialog.close(); }
	});

	dialog.addEventListener("close", function () {
		if (trigger) { trigger.focus(); }
	});

	var lastLang = currentLang();
	buildGrid();

	new MutationObserver(function () {
		var lang = currentLang();
		if (lang === lastLang) { return; }
		lastLang = lang;
		buildGrid();
		if (dialog.open) { render(current); }
	}).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
})();
