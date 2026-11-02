document.addEventListener("DOMContentLoaded", () => {
	const translations = window.INK_TRANSLATIONS || {};
	const savedLang = localStorage.getItem("ink_lang") || "es";
	const dict = translations[savedLang] || translations.es || {};

	function formatDate(iso) {
		const parts = String(iso || "").split("-");
		if (parts.length !== 3) { return iso || ""; }
		return parts[2] + " \u00b7 " + parts[1] + " \u00b7 " + parts[0];
	}

	function textFor(key) {
		return dict[key] || "";
	}

	const grid = document.getElementById("blog-grid");
	const empty = document.getElementById("blog-empty");
	const entries = Array.isArray(window.INK_BLOG) ? window.INK_BLOG : [];

	if (grid && entries.length) {
		entries.forEach((entry) => {
			const card = document.createElement("a");
			card.className = "blog-card";
			card.href = entry.file;
			card.setAttribute("data-reveal", "");

			const media = document.createElement("span");
			media.className = "blog-card__media";

			const img = document.createElement("img");
			img.src = entry.image;
			img.alt = textFor(entry.imageAltKey);
			img.loading = "lazy";
			img.decoding = "async";
			img.setAttribute("data-i18n-alt", entry.imageAltKey);
			media.appendChild(img);

			const body = document.createElement("span");
			body.className = "blog-card__body";

			const date = document.createElement("span");
			date.className = "blog-card__date";
			const time = document.createElement("time");
			time.dateTime = entry.date;
			time.textContent = formatDate(entry.date);
			date.appendChild(time);

			const title = document.createElement("h2");
			title.setAttribute("data-i18n", entry.titleKey);
			title.textContent = textFor(entry.titleKey);

			const lede = document.createElement("span");
			lede.className = "blog-card__lede";
			lede.setAttribute("data-i18n", entry.ledeKey);
			lede.textContent = textFor(entry.ledeKey);

			const read = document.createElement("span");
			read.className = "text-link";
			read.setAttribute("data-i18n", "blog_read");
			read.textContent = textFor("blog_read") || "Leer la entrada";

			body.appendChild(date);
			body.appendChild(title);
			body.appendChild(lede);
			body.appendChild(read);

			card.appendChild(media);
			card.appendChild(body);
			grid.appendChild(card);
		});
	}

	if (grid) {
		grid.classList.toggle("blog-grid--single", entries.length === 1);
	}

	if (empty) {
		empty.hidden = entries.length > 0;
	}

	const year = document.getElementById("year");
	if (year) { year.textContent = String(new Date().getFullYear()); }

	const head = document.querySelector(".site-head");
	if (head) {
		const onScroll = () => { head.dataset.scrolled = String(window.scrollY > 40); };
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
	}

	const items = document.querySelectorAll("[data-reveal]");
	if (!("IntersectionObserver" in window)) {
		items.forEach((el) => el.classList.add("is-visible"));
	} else {
		let fired = false;
		const io = new IntersectionObserver((observed) => {
			fired = true;
			observed.forEach((item) => {
				if (item.isIntersecting) {
					item.target.classList.add("is-visible");
					io.unobserve(item.target);
				}
			});
		}, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
		items.forEach((el) => io.observe(el));
		window.setTimeout(() => {
			if (!fired) { items.forEach((el) => el.classList.add("is-visible")); }
		}, 2000);
	}
});
