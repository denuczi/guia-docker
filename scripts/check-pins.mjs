// Pin guard for the foundation toolchain (verify WARNING 1 remediation).
//
// Re-verifies the installed versions of every pinned dependency in
// package.json against the recorded pins and FAILS (exit 1) on any mismatch
// or missing install. Run with: pnpm run check:pins
//
// Pins live in package.json as exact versions (no ranges); the lockfile makes
// installs reproducible, and this script is the automated rejection branch
// the verify report found missing: a drifted or hoisted install can no
// longer pass verification silently.
import { readFileSync } from 'node:fs';

const pkg = JSON.parse(readFileSync(new URL('../package.json', import.meta.url), 'utf8'));

const pinned = { ...pkg.dependencies, ...pkg.devDependencies };
let failed = false;

for (const [name, expected] of Object.entries(pinned)) {
	let installed;
	try {
		// Read the installed manifest from the filesystem directly: resolving
		// `${name}/package.json` through the module resolver is blocked for
		// packages whose `exports` map does not expose that subpath, even
		// when the package is correctly installed.
		installed = JSON.parse(
			readFileSync(new URL(`../node_modules/${name}/package.json`, import.meta.url), 'utf8'),
		).version;
	} catch {
		console.error(`FAIL ${name}: not installed (pinned ${expected})`);
		failed = true;
		continue;
	}
	if (installed !== expected) {
		console.error(`FAIL ${name}: installed ${installed} !== pinned ${expected}`);
		failed = true;
	} else {
		console.log(`OK ${name}@${installed}`);
	}
}

if (failed) {
	console.error('Pin check failed: installed versions drifted from package.json pins.');
	process.exit(1);
}
console.log('All pins verified.');
