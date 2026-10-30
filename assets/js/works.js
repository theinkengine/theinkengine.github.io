(function () {
	"use strict";

	var works = window.WORKS || [];
	var grid = document.getElementById("works-grid");
	var dialog = document.getElementById("works-lightbox");
	var yearEl = document.getElementById("year");
	if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }
	if (!grid || !dialog || !works.length) { return; }

	var img = dialog.querySelector("img");
	var caption = dialog.querySelector("figcaption");
	var counter = dialog.querySelector(".counter");
	var current = 0;
	var trigger = null;

	function pad(n) { return (n < 10 ? "0" : "") + n; }

	function srcset(base) {
		return base + "-480.webp 480w, " + base + "-960.webp 960w, " + base + "-1440.webp 1440w";
	}

	works.forEach(function (work, index) {
		var figure = document.createElement("figure");
		var link = document.createElement("a");
		var picture = document.createElement("picture");
		var source = document.createElement("source");
		var image = document.createElement("img");
		var cap = document.createElement("figcaption");
		var num = document.createElement("span");
		var title = document.createElement("span");

		link.href = work.src + "-1440.webp";
		link.className = "work";
		link.dataset.index = String(index);
		link.setAttribute("aria-label", "Open " + work.title);

		source.type = "image/webp";
		source.srcset = srcset(work.src);
		source.sizes = "(max-width: 759px) 100vw, 47vw";

		image.src = work.src + "-960.jpg";
		image.alt = work.alt;
		image.width = work.w;
		image.height = work.h;
		image.loading = index === 0 ? "eager" : "lazy";
		image.decoding = "async";
		if (index === 0) { image.fetchPriority = "high"; }

		num.className = "num";
		num.textContent = pad(index + 1);
		title.className = "title";
		title.textContent = work.title;

		cap.appendChild(num);
		cap.appendChild(title);
		if (work.year) {
			var year = document.createElement("span");
			year.className = "year";
			year.textContent = work.year;
			cap.appendChild(year);
		}

		picture.appendChild(source);
		picture.appendChild(image);
		link.appendChild(picture);
		figure.appendChild(link);
		figure.appendChild(cap);
		grid.appendChild(figure);
	});

	function render(index) {
		current = (index + works.length) % works.length;
		var work = works[current];
		img.src = work.src + "-1440.webp";
		img.alt = work.alt;
		img.width = work.w;
		img.height = work.h;
		caption.textContent = work.title;
		var meta = document.createElement("span");
		meta.textContent = "Watercolor and ink on paper" + (work.year ? " · " + work.year : "");
		caption.appendChild(meta);
		counter.textContent = pad(current + 1) + " / " + pad(works.length);
	}

	function open(index, opener) {
		trigger = opener;
		render(index);
		if (typeof dialog.showModal === "function") { dialog.showModal(); }
		else { dialog.setAttribute("open", ""); }
	}

	grid.addEventListener("click", function (event) {
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
})();
