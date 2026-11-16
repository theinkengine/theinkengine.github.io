# The Ink Engine — instrucciones del repo

> Leer `INDICE-SITIO.md` antes de explorar. Este archivo fija dónde se guarda cada material. No cambiar estas rutas sin pedido de Leo.

## Destinos

### Diario / blog
- Entrada: `blog/AAAA-MM-DD-slug.html`.
- Imágenes: `images/blog/<slug>-{480,960,1440}.{webp,jpg}` (tarjeta: `-960.jpg`).
- Datos: `assets/data/blog.js`.
- Textos: `assets/data/translations.json` (`post_<slug>_*`), regenerar `assets/data/translations.js`.
- URL: `sitemap.xml`.
- Cache: bumpear `?v=YYYYMMDDx` de `translations.js` y `blog.css` si cambian.

### Obra / galería
- Fotos crudas: `G:\Mi unidad\Arte\Galería web` (solo lectura).
- Trabajo: `C:\Users\Leo\repositorios\theinkengineimages\{inbox,working,output,archive}`.
- Derivados aprobados: `images/works/work-NN-{480,960,1440}.webp` + `-960.jpg`; metadatos en `assets/js/works-data.js`.
- Portada de galería: `images/gallery/`.
- No publicar maestros; tope 1280 px (máx. 1440).

### Imágenes de secciones / landing
- `images/` (raíz) o `images/works/`; respetar proporción y peso indicados en `INDICE-SITIO.md`.

### Instagram
- Material listo para publicar: `G:\Mi unidad\Arte\InstagramTheInkEngine\`.
- Nombre: `AAAA-MM-DD-<tema>-<formato>.<ext>` + `.md` con copy ES/EN.
- Formatos: story/reel 1080×1920; feed 1080×1350 (o 1080×1080).
- No guardar material de Instagram en el repo.

## Reglas
- No commitear ni pushear sin pedido explícito.
- Backup con `git archive --format=tar.gz --prefix=theinkengine.github.io/ HEAD -o ...`.
- QA bilingüe ES/EN y HTTP antes de cerrar.
