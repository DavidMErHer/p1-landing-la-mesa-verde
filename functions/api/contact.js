const RESEND_ENDPOINT = "https://api.resend.com/emails";

function fieldValue(formData, name) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function buildEmailHtml({ name, phone, product, message, source }) {
  const rows = [
    ["Nombre", name],
    ["Telefono / WhatsApp", phone],
    ["Producto", product],
    ["Mensaje", message || "Sin mensaje adicional"],
    ["Source", source || "No informado"],
  ];

  return `
    <h1>Nueva solicitud desde La Mesa Verde</h1>
    <table cellpadding="8" cellspacing="0" border="0">
      <tbody>
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td><strong>${escapeHtml(label)}</strong></td>
                <td>${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </tbody>
    </table>
  `;
}

function buildEmailText({ name, phone, product, message, source }) {
  return [
    "Nueva solicitud desde La Mesa Verde",
    "",
    `Nombre: ${name}`,
    `Telefono / WhatsApp: ${phone}`,
    `Producto: ${product}`,
    `Mensaje: ${message || "Sin mensaje adicional"}`,
    `Source: ${source || "No informado"}`,
  ].join("\n");
}

export async function onRequest(context) {
  const { request } = context;

  if (request.method === "GET") {
    return new Response("Endpoint activo. Usa POST desde el formulario.", {
      status: 200,
    });
  }

  if (request.method !== "POST") {
    return new Response("Metodo no permitido.", {
      status: 405,
      headers: { Allow: "POST" },
    });
  }

  const formData = await request.formData();

  const submission = {
    name: fieldValue(formData, "name"),
    phone: fieldValue(formData, "phone"),
    product: fieldValue(formData, "product"),
    message: fieldValue(formData, "message"),
    source: fieldValue(formData, "source"),
  };

  if (!submission.name || !submission.phone || !submission.product) {
    return new Response("Faltan campos requeridos.", { status: 400 });
  }

  if (!context.env.RESEND_API_KEY) {
    return new Response("Falta RESEND_API_KEY", { status: 500 });
  }

  if (!context.env.CONTACT_TO_EMAIL) {
    return new Response("Falta CONTACT_TO_EMAIL", { status: 500 });
  }

  const resendResponse = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${context.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "User-Agent": "la-mesa-verde/1.0",
    },
    body: JSON.stringify({
      from: "La Mesa Verde <onboarding@resend.dev>",
      to: [context.env.CONTACT_TO_EMAIL],
      subject: "Nueva solicitud desde La Mesa Verde",
      html: buildEmailHtml(submission),
      text: buildEmailText(submission),
    }),
  });

  if (!resendResponse.ok) {
    console.error("Resend request failed", {
      status: resendResponse.status,
      statusText: resendResponse.statusText,
      body: await resendResponse.text(),
    });

    return new Response("No se pudo enviar la solicitud.", { status: 502 });
  }

  return Response.redirect(new URL("/?sent=1#pedido", request.url), 303);
}
