# P1 Landing page - La Mesa Verde

Landing page estática de demo para portafolio. Presenta una oferta corta de
almuerzos caseros para un restaurante local ficticio en Chapinero, Bogotá.

## Archivos

- `index.html`
- `styles.css`
- `img/` con imágenes locales usadas por la página

No usa JavaScript, librerías externas, CMS, WordPress, build tools ni tracking.
Funciona abriendo `index.html` directamente en el navegador.

## Publicación en Cloudflare Pages

Configuración sugerida:

- Framework preset: `None`
- Build command: vacío
- Build output directory: `/`

El formulario está preparado con `method="post"` y `action="/pedido"` para que
una futura Cloudflare Pages Function reciba la solicitud y la reenvíe al correo
documentado: `david.mer.her@gmail.com`.

La acción principal de la landing es WhatsApp:

- `https://wa.me/573229059423`

## Alcance P1

- Una sola página.
- Tres secciones principales.
- Oferta corta.
- CTA principal a WhatsApp.
- Formulario corto secundario.
- Sin catálogo grande, blog, usuarios, ecommerce, CRM o automatizaciones.
