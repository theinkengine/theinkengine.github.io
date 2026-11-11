(function () {
	function cleanText(value, maxLength, allowNewlines) {
		var text = value == null ? "" : String(value);
		text = text.replace(/\r\n?/g, "\n");
		if (allowNewlines) {
			text = text.replace(/[^\S\n]+/g, " ");
			text = text.replace(/\n{3,}/g, "\n\n");
		} else {
			text = text.replace(/\s+/g, " ");
		}
		text = text.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
		text = text.trim();
		if (maxLength && text.length > maxLength) {
			text = text.slice(0, maxLength).trim();
		}
		return text;
	}

	function cleanEmail(value) {
		return cleanText(value, 254, false).replace(/\s+/g, "");
	}

	function isEmail(value) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
	}

	window.INK_FORMS = {
		cleanText: cleanText,
		cleanEmail: cleanEmail,
		isEmail: isEmail
	};
})();
