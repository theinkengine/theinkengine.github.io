(function () {
	"use strict";

	function pageLang() {
		return document.documentElement.lang === "en" ? "en" : "es";
	}

	function pagePath() {
		return window.location.pathname + window.location.search;
	}

	function merge(base, extra) {
		var out = base || {};
		if (extra) {
			Object.keys(extra).forEach(function (key) {
				if (extra[key] !== undefined && extra[key] !== null && extra[key] !== "") {
					out[key] = extra[key];
				}
			});
		}
		return out;
	}

	function track(name, params) {
		try {
			if (typeof window.gtag === "function") {
				window.gtag("event", name, merge({ page_path: pagePath(), page_lang: pageLang() }, params));
			}
		} catch (error) {
			/* la analítica nunca debe romper la página */
		}
	}

	function formSuccess(name, params) {
		var payload = merge({ form_name: name }, params);
		track("form_submit", payload);
		track("generate_lead", payload);
	}

	function formMailto(name, params) {
		track("form_mailto", merge({ form_name: name }, params));
	}

	function formError(name, params) {
		track("form_error", merge({ form_name: name }, params));
	}

	function subscribe(params) {
		track("newsletter_submit", merge({ form_name: "newsletter" }, params));
	}

	function labelFor(el) {
		var label = el.getAttribute("data-ga-label");
		if (label) { return label; }
		var text = (el.textContent || "").replace(/\s+/g, " ").trim();
		if (text) { return text.slice(0, 100); }
		return el.getAttribute("href") || "";
	}

	window.INK_ANALYTICS = {
		track: track,
		formSuccess: formSuccess,
		formMailto: formMailto,
		formError: formError,
		subscribe: subscribe
	};

	document.addEventListener("click", function (event) {
		var target = event.target;
		if (!target || typeof target.closest !== "function") { return; }
		var el = target.closest("a,button");
		if (!el) { return; }

		var href = el.getAttribute("href") || "";
		var label = labelFor(el);

		if (/^mailto:/i.test(href)) {
			track("outbound_click", { link_type: "email", href: href, label: label });
			return;
		}

		if (/^https?:\/\//i.test(href) && href.indexOf(window.location.hostname) === -1) {
			var type = /instagram|pinterest/i.test(href) ? "social" : "external";
			track("outbound_click", { link_type: type, href: href, label: label });
			return;
		}

		if (el.tagName === "BUTTON" && el.type === "submit" && el.closest("form")) {
			return;
		}

		if (el.matches("[data-ga-cta], a.button, button.button, .text-link, .blog-card, .work-acquire")) {
			track("cta_click", {
				cta: label,
				cta_key: el.getAttribute("data-ga-cta") || "",
				href: href
			});
		} else if (el.closest(".site-nav")) {
			track("nav_click", { label: label, href: href });
		}
	});
})();
