// Shared clipboard helper for docs UI (heading anchor links).
//
// Consumers are static-first Astro components with small inline scripts
// bundled by Vite, so a plain module import shares this logic with zero
// framework runtime. Returns true on success, false when every clipboard
// path fails (caller owns the visible + announced feedback).

export async function copyText(text: string): Promise<boolean> {
	if (navigator.clipboard && window.isSecureContext !== false) {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch {
			// Fall through to the legacy path below.
		}
	}
	const area = document.createElement('textarea');
	area.value = text;
	area.setAttribute('readonly', '');
	area.style.position = 'fixed';
	area.style.opacity = '0';
	document.body.appendChild(area);
	area.select();
	let ok = false;
	try {
		ok = document.execCommand('copy');
	} catch {
		ok = false;
	}
	document.body.removeChild(area);
	return ok;
}
