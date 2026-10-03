// Astro 7.3.5 + Starlight 0.42.5 scaffold (work unit 1).
// Pins re-verified against the npm registry and official Astro/Starlight docs
// at scaffold time; see apply-progress for the verification record.
// Sidebar is a top-level-group skeleton only; content wiring lands in later units.
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
	site: 'https://denuczi.github.io',
	base: '/guia-docker',
	integrations: [
		starlight({
			title: 'Docker desde cero',
			// Monolingual Spanish site: Starlight's documented single-language
			// pattern is `locales.root` (content at the docs root, served at
			// `/`). A named single locale (`locales: { es }`) makes Starlight
			// resolve every slug's locale to 'es', so sidebar `slug` lookups
			// get prefixed to `es/<slug>` and never match collection entries.
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			// Design tokens load first (sole owner of values), then the
			// Starlight mapping. Order is logical; var resolution is runtime.
			customCss: ['./src/styles/tokens.css', './src/styles/starlight.css'],
			// Terminal-dark code canvas in both themes (see starlight.css):
			// a single dark syntax theme keeps token colors readable on the
			// dark canvas even when the page is in light mode.
		expressiveCode: {
			themes: ['starlight-dark'],
			useStarlightDarkModeSwitch: false,
		},
		// Component overrides (verified against installed Starlight 0.42.5
		// `ComponentUserConfig`: all keys exist in its schema):
		// - ThemeSelect -> compact sun/moon icon toggle (Spanish
		//   aria-label, persisted preference, no page animation).
		// - Head -> default Starlight head tags plus Astro 7.3
		//   `<ClientRouter />` for client-side route transitions.
		// - Search -> stock search UI inside a `transition:persist`
		//   wrapper, so the booted Pagefind instance survives
		//   ClientRouter swaps instead of opening an empty dialog.
		// - SiteTitle -> navbar-only "Guía Docker" brand text. The
		//   `SiteTitle` key exists in the installed Starlight 0.42.5
		//   `ComponentUserConfig` schema, so this override changes only
		//   the header brand; tab `<title>` tags keep resolving from the
		//   `title` option above via `getSiteTitle`/`getHead` untouched.
		// - MarkdownContent -> stock content plus copy-to-clipboard
		//   behavior for heading anchor links (rehype-emitted markup
		//   no component prop can reach).
		// Repo icon in the header, right of the theme toggle: Starlight's
		// native `social` config renders the GitHub SVG via SocialIcons
		// (installed Starlight 0.42.5 `SocialLinksSchema` requires an ARRAY
		// of { icon, label, href } — the `{ github: url }` object shorthand
		// was removed in v0.33.0 and now fails validation, so the array
		// shape is used; `github` is a valid icon in the installed Icons
		// map). No hand-rolled SVGs.
		social: [
			{ icon: 'github', label: 'GitHub', href: 'https://github.com/denuczi/guia-docker' },
		],
		components: {
			ThemeSelect: './src/components/overrides/ThemeSelect.astro',
			Head: './src/components/overrides/Head.astro',
			Search: './src/components/overrides/Search.astro',
			SiteTitle: './src/components/overrides/SiteTitle.astro',
			MarkdownContent: './src/components/overrides/MarkdownContent.astro',
		},
		sidebar: [
			// Ruta progresiva ordenada (DESIGN.md, Navigation Patterns).
				// Cada grupo solo lista páginas existentes: sin navegación muerta.
			{
				label: 'Ejemplo',
				items: [
					{ label: 'Tu primer contenedor', slug: 'examples/first-container' },
				],
			},
			{
				label: 'Instalación',
				items: [
					{ label: 'macOS', slug: 'install-macos' },
					{ label: 'Windows', slug: 'install-windows' },
					{ label: 'Linux', slug: 'install-linux' },
				],
			},
			{
				label: 'Fundamentos',
					items: [
						{ label: 'Qué es Docker', slug: 'what-is-docker' },
						{ label: 'Imágenes', slug: 'images' },
						{ label: 'Contenedores', slug: 'containers' },
						{ label: 'Registros de imágenes', slug: 'registries' },
					],
				},
				{
					label: 'Uso básico',
					items: [
						{ label: 'Ejecutar contenedores', slug: 'running-containers' },
						{ label: 'Ver y consultar contenedores', slug: 'inspecting-containers' },
						{ label: 'Detener, iniciar y reiniciar', slug: 'stopping-containers' },
						{ label: 'Logs', slug: 'container-logs' },
						{ label: 'Eliminar contenedores', slug: 'removing-containers' },
						{ label: 'Solución de problemas', slug: 'troubleshooting' },
					],
				},
				{
					label: 'Datos y comunicación',
					items: [
						{ label: 'Volúmenes', slug: 'volumes' },
						{ label: 'Redes', slug: 'networks' },
					],
				},
				{
					label: 'Construcción de imágenes',
					items: [
						{ label: 'Dockerfile', slug: 'dockerfile' },
					],
				},
				{
					label: 'Aplicaciones con varios servicios',
					items: [
						{ label: 'Docker Compose', slug: 'compose' },
					],
				},
				{
					label: 'Proyectos reales',
					items: [
						{ label: 'Node.js', slug: 'nodejs' },
						{ label: 'Laravel', slug: 'laravel' },
					],
				},
				{
					label: 'Operación y mantenimiento',
					items: [
						{ label: 'Seguridad', slug: 'security' },
						{ label: 'Limpieza', slug: 'cleanup' },
						{ label: 'Buenas prácticas', slug: 'best-practices' },
					],
				},
			],
		}),
	],
});
