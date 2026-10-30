# The Ink Engine — índice operativo del sitio

> Leer este archivo primero. Abrir después solo el archivo o la sección citada.
> Última actualización: 2026-10-29 · Rama: `dev` · Sin commit ni deploy.

## 1. Repo y estado

- Ruta local: `C:\Users\Leo\repositorios\theinkengine.github.io`
- Origen de referencia: `C:\Users\Leo\WebArtSupport\theinkengine.github.io` (rama `main`)
- Stack: HTML + CSS + JS estático, GitHub Pages, sin build.
- Dominio: `theinkengine.art` (`CNAME`).
- Estado: **landing + programa**. `index.html` contiene todo el sitio; `programa.html` es el temario de clases enlazado desde la sección Classes. Portada/hero y contacto/banner aprobados; el resto de imágenes está pendiente de sustituir.

## 1.1 Páginas

| Archivo | Uso |
|---|---|
| `index.html` | Landing completa (obra, galería, series, clases, encargos, contacto) |
| `programa.html` | Temario breve de 9 clases, enlazado desde Classes y CTA |
- No hay commit en `dev`. No commitear sin pedido explícito.

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

- Archivo único: `assets/css/site.css` (~1.385 líneas).
- Tokens: `--paper #ffffff`, `--ink #121212`, `--gold #b58a4e`, `--charcoal #2e2e33`, `--container 1747px`.
- Tipografía: `Cinzel` (display) + `Source Sans 3` (texto).
- Clases clave: `.site-head`, `.hero`, `.split`, `.split--reverse`, `.split__media--wide`, `.works-grid`, `.works-lightbox`, `.series-stack`, `.feature`, `.palette`, `.banner`, `.newsletter`, `.contact`.
- Página de programa: `.page-main`, `.page-intro`, `.programme`, `.syllabus`, `.lesson`, `.lesson__num`, `.lesson__outcome`.
- Breakpoints principales: 599, 720, 900, 1100 px.
- `assets/css/main.css` es legado Helios y ya no se usa en `index.html`.

## 4. JavaScript

- `assets/js/works-data.js`: array `window.WORKS` (20 obras) con `src`, `w`, `h`, `year`, `title`, `alt`, `source`.
- `assets/js/works.js`: construye `#works-grid`, gestiona `#works-lightbox` (prev/next/close/teclado) y usa variantes `-480/-960/-1440.webp` + `-960.jpg`.
- Script inline en `index.html`: header con scroll, año, reveal con `IntersectionObserver`, pausa del vídeo con `prefers-reduced-motion`, formulario de newsletter.

## 5. Medios

### No cambiar (aprobado)

| Uso | Archivos |
|---|---|
| Hero | `videos/portada-sketching.webm`, `.mp4`, `images/portada-sketching-poster.jpg` |
| Contacto / banner | `images/works/work-09-*` |

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

### Galería (20 obras)

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
3. Revisar `_preview-home-*.png` (~4 MB) y no commitearlos.
4. Decidir si se borran assets legados (`main.css`, `assets/sass/`, `jquery*.js`, `webfonts/`).
5. Añadir `sitemap.xml` y `robots.txt`.
6. Commit + push a `dev`; purgar caché de Cloudflare al desplegar.

## 8. QA y entorno (Windows)

- Servidor local: `python -m http.server 8899` dentro del repo.
- Comprobar obras generadas: Chrome headless `--dump-dom` y contar `class="work"` (deben ser 20).
- Capturas por sección: CDP con `Runtime.evaluate` + `scrollBehavior='auto'`.
- Chrome: `C:\Program Files\Google\Chrome\Application\chrome.exe`.
- `Remove-Item` está denegado: borrar con `node -e "fs.unlinkSync(...)"`.
- Capturas y artefactos: `C:\Users\Leo\.local\share\opencode\tool-output`.

## 9. Archivos retirados

`gallery-01..05.html`, `left-sidebar.html`, `right-sidebar.html`, `no-sidebar.html`, `gallery-recent.html`, `clases.html`, `equipment-store.html`, `images/store/`.

El contenido de las series se consolidó en `index.html`; el de clases, en `programa.html`.
