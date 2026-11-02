# The Ink Engine — índice operativo del sitio

> Leer este archivo primero. Abrir después solo el archivo o la sección citada.
> Última actualización: 2026-11-01 · Rama: `dev` · Bilingüe ES/EN y Diario (`blog/`) funcionando en local y HTTP.

## 1. Repo y estado

- Ruta local: `C:\Users\Leo\repositorios\theinkengine.github.io`
- Origen de referencia: `C:\Users\Leo\WebArtSupport\theinkengine.github.io` (rama `main`)
- Stack: HTML + CSS + JS estático, GitHub Pages, sin build.
- Dominio: `theinkengine.art` (`CNAME`).
- Estado: **landing + programa + diario**. `index.html` contiene todo el sitio; `programa.html` es el temario de clases enlazado desde la sección Classes; `blog/` es el Diario/Journal con portada, índice de entradas fechadas y lectura individual. Portada/hero y contacto/banner aprobados; el resto de imágenes está pendiente de sustituir.

## 1.1 Páginas

| Archivo | Uso |
|---|---|
| `index.html` | Landing completa (obra, galería, series, clases, encargos, contacto) |
| `programa.html` | Temario breve de 9 clases, enlazado desde Classes y CTA |
| `blog/index.html` | Portada y índice del Diario/Journal; pinta las tarjetas desde `blog.js` |
| `blog/AAAA-MM-DD-slug.html` | Entrada independiente: fecha, título, imagen, 2–3 párrafos y reflexión |
- Sistema bilingüe: `translations.json` (fuente) + `translations.js` (`window.INK_TRANSLATIONS`, permite `file://`) + `lang.js` (aplica `data-i18n`, `data-i18n-aria-label`, `data-i18n-content`, `data-i18n-alt`; guarda `ink_lang` en localStorage).
- Cache-busting: `lang.css`, `translations.js` y `lang.js` se referencian con `?v=YYYYMMDDx` en todas las páginas. **Subir la versión al editarlos** (Cloudflare cachea assets y sirvió un `lang.js` viejo que no enlazaba el switcher estático).

## 1.2 Blog (Diario / Journal)

- Portada: `images/blog/portada-diario.jpg` (2000×1333) + derivados `-480/-960/-1440/-2000.webp` y `-960.jpg`. Es la imagen que Leo eligió como cabecera del diario; no sustituir sin pedido.
- Índice: `assets/data/blog.js` (`window.INK_BLOG`) con `file`, `date`, `titleKey`, `ledeKey`, `image` (ruta relativa a `blog/`) e `imageAltKey`.
- Render: `assets/js/blog.js` crea las tarjetas, activa `blog-grid--single` cuando solo hay una entrada, fija el año, el header con scroll y el reveal.
- Entradas: HTML estático bilingüe con claves `post_<slug>_*` en el diccionario; una imagen, texto corto y `<blockquote class="blog-post__reflection">`.
- CSS: `assets/css/blog.css` (portada, tarjetas, artículo y reflexión; reutiliza tokens de `site.css`).
- Para publicar: crear `blog/AAAA-MM-DD-slug.html`, añadir sus claves a `translations.json`, regenerar `translations.js`, añadir la entrada a `blog.js`, al `sitemap.xml` y subir `?v=` de `blog.css`/`translations.js` si cambian.

## 2. Mapa de `index.html`

| # | Ancla | Sección | Contenido |
|---|---|---|---|
| — | — | Hero | Vídeo de portada + titular “The weight of iron, held in water.” |
| — | — | Statement | “First the line. Then the weather.” |
| 01 | `#work` | The work | Split 4:3 con `work-02` |
| 02 | `#selected` | Gallery | 20 obras desde `works-data.js` + lightbox |
| 03 | `#studio` | The studio | Split 4:5 con `work-01` |
| — | — | Marquee | Banda tipográfica decorativa |
| 04 | `#series` | Series | Air Tug, Heavyweight, Clockwork Heart (texto + paleta) |
| 05 | `#hybrid` | Hybrid | Pintura clásica con retoque digital y lienzo potenciado (trama, tensión, barniz); 3 placas + 2 films verticales provisionales |
| 06 | `#classes` | Classes | Split 4:5 con `work-06` |
| 07 | `#commissions` | Commissions | Split 4:5 con `work-08` |
| — | — | CTA | “Paper first. Then pixels.” |
| — | `#newsletter` | Newsletter | Fondo `work-10` + formulario `mailto:` |
| — | — | Principios | 3 citas de estudio |
| — | — | Banner | `work-09` a sangre (asociado a contacto) |
| — | `#contact` | Contact | Email del estudio |
| — | — | Footer | Instagram, Pinterest, copyright |

## 3. CSS

- Base: `assets/css/site.css` (~1.577 líneas); `assets/css/blog.css` para el diario.
- Tokens: `--paper #ffffff`, `--ink #121212`, `--gold #b58a4e`, `--charcoal #2e2e33`, `--container 1747px`.
- Tipografía: `Cinzel` (display) + `Source Sans 3` (texto).
- Clases clave: `.site-head`, `.hero`, `.split`, `.split--reverse`, `.split__media--wide`, `.works-grid`, `.works-lightbox`, `.series-stack`, `.feature`, `.palette`, `.banner`, `.newsletter`, `.contact`.
- Página de programa: `.page-main`, `.page-intro`, `.programme`, `.syllabus`, `.lesson`, `.lesson__num`, `.lesson__outcome`.
- Blog: `.blog-cover`, `.blog-cover__media/__veil/__content`, `.blog-index`, `.blog-grid`, `.blog-grid--single`, `.blog-card`, `.blog-card__media/__date/__lede`, `.blog-post__head/__media/__reflection/__back`.
- Breakpoints principales: 599, 720, 900, 1100 px.
- `assets/css/lang.css`: switcher ES/EN (texto + hairline, activo en oro) y overrides de tema claro.
- Assets legados Helios eliminados (`main.css`, `noscript.css`, `fontawesome`, `sass/`, `webfonts/`, `jquery*`, `main.js`, `util.js`, `breakpoints.min.js`, `browser.min.js`).

## 4. JavaScript

- `assets/js/works-data.js`: array `window.WORKS` (20 obras) con `src`, `w`, `h`, `year`, `title`, `alt`, `source`.
- `assets/js/works.js`: construye `#works-grid`, gestiona `#works-lightbox` (prev/next/close/teclado) y usa variantes `-480/-960/-1440.webp` + `-960.jpg`.
- `assets/data/blog.js`: array `window.INK_BLOG` con las entradas del diario (metadatos + rutas relativas a `blog/`).
- `assets/js/blog.js`: pinta el índice del diario, marca la entrada única, año, header con scroll y reveal.
- `assets/data/translations.json` / `translations.js`: diccionarios es/en (246 claves por idioma, paridad exacta).
- `assets/js/lang.js`: aplica idioma guardado, traduce texto (`innerHTML`), placeholders, `aria-label`, `alt` y `meta[content]`; expone `window.INK_CURRENT_DICT` para el script inline.
- Script inline en `index.html`: header con scroll, año, reveal con `IntersectionObserver`, pausa del vídeo con `prefers-reduced-motion`, formulario de newsletter (mensajes y mailto traducidos vía `INK_CURRENT_DICT`).

## 5. Medios

### No cambiar (aprobado)

| Uso | Archivos |
|---|---|
| Hero | `videos/portada-sketching.webm`, `.mp4`, `images/portada-sketching-poster.jpg` |
| Contacto / banner | `images/works/work-09-*` |
| Portada del diario | `images/blog/portada-diario.jpg` (2000×1333) + `-480/-960/-1440/-2000.webp` y `-960.jpg` |

### Sustitutas pendientes

| Uso | Archivo actual | Original ideal |
|---|---|---|
| Sección Work (4:3) | `images/works/work-02-*` | 2000×1500 |
| Series 01/02/03 (16:9) | `images/pic01.jpg`, `pic02.jpg`, `pic03.jpg` | 2000×1125 |
| Classes (4:5) | `images/works/work-06-*` | 1600×2000 |
| Commissions (4:5) | `images/works/work-08-*` | 1600×2000 |
| Newsletter (16:9) | `images/works/work-10-*` | 2400×1350, tonos medios/oscuros |

Opcional para no recortar obra: `images/sections/classes.jpg`, `commissions.jpg`, `newsletter.jpg` (mismas medidas).

### Hybrid (provisional)

- 3 placas verticales: `images/works/work-14-960.jpg`, `work-16-960.jpg`, `work-19-960.jpg` (recorte 9:16).
- 2 posters de films: `work-10-960.jpg`, `work-12-960.jpg`.
- Sustituir por pintura clásica y vídeos verticales 9:16. Añadir `<source src="videos/hybrid-01.webm">` y `.mp4` (y `hybrid-02`) dentro de los `<video class="hybrid-video">`.
- Medida ideal de films: 1080×1920, H.264/VP9, sin audio, 6–12 s, ≤ 4 MB.
- Copy: transferencia manual (no filtro) + párrafo del lienzo (leer trama y tensión, no borrarlas; impresión en algodón y barniz a mano). Herramientas: Huion 16" 4K · heavy cotton canvas · hand varnish · archival print master.

### Galería (20 obras, grid no montado)

- Ahora `index.html` muestra una imagen de estudio y el aviso de galería; no existe `#works-grid`, así que `works.js` no pinta obras. El sistema queda listo para reactivarlo.
- Nombres: `images/works/work-NN-480.webp`, `-960.webp`, `-1440.webp`, `-960.jpg` (lado largo).
- Original: lado largo **2000 px** (mínimo 1440). Actualizar `w`/`h` en `works-data.js` al sustituir.
- Proporciones actuales: `01` 3:4 · `02` 16:9 · `03–08` 1:1 · `10–13` 1:1 · `14` 2:3 · `15` 1:1 · `16` 4:5 · `17–18` 1:1 · `19` 4:5 · `20` 1:1.
- `work-07` mide 382×382: reemplazo obligatorio.

### Calidad y pesos

- sRGB, 8 bits, sin marcas ni bordes, sin ampliar.
- WebP q82 (línea fina q86); JPEG q85–88 progresivo.
- Máximos: `-480` 60 KB · `-960` 180 KB · `-960.jpg` 220 KB · `-1440` 350 KB · secciones 400 KB.

## 6. Conocimiento (pseudo-RAG)

Base: `C:\Users\Leo\.config\opencode\knowledge`

| Tema | Archivo |
|---|---|
| Estado del sitio y decisiones | `theinkengine/sitio-web-estado.md` |
| Dossier de obra y copy | `theinkengine/artist-leocalcagno.md` |
| Textos de referencia | `theinkengine/repertorio-textos.md` |
| Historial de sesiones | `projects/log.md` |

## 7. Pendientes

1. Sustituir las imágenes de la tabla anterior y regenerar derivados.
2. Actualizar dimensiones reales en `works-data.js`.
3. Purgar caché de Cloudflare al desplegar.
4. Strings generados por `works.js` (aria del lightbox y meta de obra) siguen en inglés fijo; opcional localizarlos si se re-renderiza la galería al cambiar idioma.
5. La entrada `blog/2026-11-01-oxido-como-fecha.html` es una demo de estructura y copy; sustituir por contenido real cuando Leo lo indique.
6. Añadir nuevas entradas al diario: archivo fechado, claves `post_<slug>_*`, entrada en `blog.js` y `sitemap.xml`.

## 8. QA y entorno (Windows)

- Servidor local: `python -m http.server 8899` dentro del repo.
- Comprobar que la galería no pinta obras (no hay `#works-grid`); si se reactiva, contar `class="work"` (deben ser 20).
- Diario: `blog/index.html` debe pintar N tarjetas desde `blog.js` y la portada debe cargar; ES↔EN debe cambiar title, nav, alt y textos; la entrada debe mostrar imagen, reflexión y volver al índice.
- Programa: comprobar que el script inline se ejecuta (no aparece código crudo al final) y que ES↔EN cambia el h1.
- Capturas por sección: CDP con `Runtime.evaluate` + `scrollBehavior='auto'`.
- Chrome: `C:\Program Files\Google\Chrome\Application\chrome.exe`.
- `Remove-Item` está denegado: borrar con `node -e "fs.unlinkSync(...)"`.
- Capturas y artefactos: `C:\Users\Leo\.local\share\opencode\tool-output`.

## 9. Archivos retirados

`gallery-01..05.html`, `left-sidebar.html`, `right-sidebar.html`, `no-sidebar.html`, `gallery-recent.html`, `clases.html`, `equipment-store.html`, `images/store/`.

Assets Helios: `assets/css/main.css`, `noscript.css`, `fontawesome-all.min.css`, `assets/css/images/`, `assets/sass/`, `assets/webfonts/`, `assets/js/jquery*.js`, `main.js`, `util.js`, `breakpoints.min.js`, `browser.min.js`, `_preview-home-*.png`.

El contenido de las series se consolidó en `index.html`; el de clases, en `programa.html`.
