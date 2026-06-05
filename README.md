# P1 Landing page - La Mesa Verde

Landing page estática de demo para portafolio. Presenta una oferta corta de
almuerzos caseros para un restaurante local ficticio en Chapinero, Bogotá.

## Archivos

- `index.html`
- `styles.css`
- `script.js`
- `functions/api/contact.js`
- `img/` con imágenes locales usadas por la página

No usa librerías externas, CMS, WordPress, build tools ni tracking. El
JavaScript del frontend solo muestra notificaciones del formulario; no procesa
datos ni intercepta el envío. La landing funciona abriendo `index.html`
directamente en el navegador; el envío del formulario requiere Cloudflare Pages
Functions.

## Publicación en Cloudflare Pages

Configuración sugerida:

- Framework preset: `None`
- Build command: vacío
- Build output directory: `/`

El formulario usa `method="POST"` y `action="/api/contact"`. La Cloudflare Pages
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
- Si al enviar vuelve a la landing con `?sent=error`, revisa los logs de
  Cloudflare Pages Functions.
- Si falta una variable de entorno, la función registra cuál falta sin imprimir
  secretos.
- Si Resend falla, la función registra estado, texto de estado y respuesta de
  Resend, pero no imprime la API key.

## Sistema reutilizable de formulario

La estructura funcional del formulario no debe cambiarse sin actualizar la
Function. El formulario envía por POST normal a `/api/contact`; `script.js` solo
muestra notificaciones según la URL y no procesa datos, no intercepta `submit` y
no envía información.

Campos requeridos por `/api/contact`:

- `name`
- `phone`
- `product`

Campos opcionales:

- `message`
- `source`

La función está en `functions/api/contact.js` y usa estas variables obligatorias:

- `RESEND_API_KEY`
- `CONTACT_TO_EMAIL`

Para adaptar este sistema a otra landing P1 se puede cambiar:

- Textos visibles.
- Estilos CSS.
- Opciones del select `product`.
- `value` del campo hidden `source`.
- Mensajes `data-success-message` y `data-error-message`.

No se debe cambiar sin revisar backend:

- `method`
- `action`
- `name` de los campos.

Nunca pongas API keys en el frontend.

Success usa `?sent=success` y error usa `?sent=error`. La URL se limpia con
`script.js` para evitar que la query quede visible después de mostrar la
notificación. No hay scroll automático.

La acción principal de la landing es WhatsApp:

- `https://wa.me/573229059423`

## Alcance P1

- Una sola página.
- Tres secciones principales.
- Oferta corta.
- CTA principal a WhatsApp.
- Formulario corto secundario.
- Sin catálogo grande, blog, usuarios, ecommerce, CRM o automatizaciones.
