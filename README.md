# P1 Landing page - La Mesa Verde

Landing page estática de demo para portafolio. Presenta una oferta corta de
almuerzos caseros para un restaurante local ficticio en Chapinero, Bogotá.

## Archivos

- `index.html`
- `styles.css`
- `img/` con imágenes locales usadas por la página

No usa JavaScript en el frontend, librerías externas, CMS, WordPress, build
tools ni tracking. La landing funciona abriendo `index.html` directamente en el
navegador; el envío del formulario requiere Cloudflare Pages Functions.

## Publicación en Cloudflare Pages

Configuración sugerida:

- Framework preset: `None`
- Build command: vacío
- Build output directory: `/`

El formulario usa `method="post"` y `action="/api/contact"`. La Cloudflare Pages
Function en `functions/api/contact.js` recibe la solicitud y envía un correo con
Resend, sin SDK ni dependencias npm.

## Configurar Resend

1. Crea una cuenta en Resend desde `https://resend.com`.
2. Crea una API key en el panel de Resend.
3. En Cloudflare Pages, abre el proyecto y configura estas variables de entorno:

```text
RESEND_API_KEY=tu_api_key_de_resend
CONTACT_TO_EMAIL=david.mer.her@gmail.com
```

4. Haz redeploy del proyecto para que Cloudflare tome las variables nuevas.
5. Prueba el formulario desde la URL pública `.pages.dev`.
6. Mientras no haya dominio propio verificado, usa el remitente de prueba
   `La Mesa Verde <onboarding@resend.dev>`. En producción se debe verificar un
   dominio en Resend y cambiar el remitente por uno propio.

## Troubleshooting del formulario

- Abre `/api/contact` en la URL pública. Debe responder:
  `Endpoint activo. Usa POST desde el formulario.`
- Si al enviar aparece `Falta RESEND_API_KEY`, revisa que la variable exista en
  Cloudflare Pages Production como Secret y haz redeploy.
- Si aparece `Falta CONTACT_TO_EMAIL`, revisa que la variable exista en
  Cloudflare Pages Production y haz redeploy.
- Si aparece `No se pudo enviar la solicitud.`, revisa los logs de Cloudflare
  Pages Functions. La función registra estado, texto de estado y respuesta de
  Resend, pero no imprime la API key.

La acción principal de la landing es WhatsApp:

- `https://wa.me/573229059423`

## Alcance P1

- Una sola página.
- Tres secciones principales.
- Oferta corta.
- CTA principal a WhatsApp.
- Formulario corto secundario.
- Sin catálogo grande, blog, usuarios, ecommerce, CRM o automatizaciones.
