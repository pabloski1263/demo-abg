import { GoogleGenerativeAI } from "@google/generative-ai";
import { getContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return Response.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    const content = getContent();

    if (!content.chat?.api_key) {
      return Response.json({ error: "Chat no configurado" }, { status: 503 });
    }

    // Build the system prompt with all site content
    const siteInfo = buildSiteContext(content);

    const genAI = new GoogleGenerativeAI(content.chat.api_key);
    const model = genAI.getGenerativeModel({
      model: content.chat?.model || "gemini-2.5-flash-lite",
      systemInstruction: siteInfo,
    });

    const result = await model.generateContentStream(message);
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const text = chunk.text();
            if (text) {
              controller.enqueue(new TextEncoder().encode(text));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err: any) {
    console.error("Chat error:", err);
    return Response.json({ error: err.message || "Error del servidor" }, { status: 500 });
  }
}

function buildSiteContext(content: any): string {
  const c = content;

  let ctx = `Eres un asistente virtual del estudio jurídico "${c.site.name} (${c.site.subtitle})".
Tu rol es responder preguntas de clientes y visitantes del sitio web. Debes ser amable, profesional y conocedor de toda la información del estudio.

INFORMACIÓN DEL SITIO WEB:

--- HERO / INICIO ---
Título: ${c.hero?.title?.replace(/<br\/?>/gi, ", ")}
Descripción: ${c.hero?.subtitle || ""}

--- SERVICIOS ---
Título de sección: ${c.services?.title || ""}
`;

  if (c.services?.items) {
    c.services.items.forEach((s: any) => {
      ctx += `- ${s.title}: ${s.description}\n`;
    });
  }

  ctx += `\n--- NOSOTROS ---\n`;
  ctx += `${c.about?.description || ""}\n`;
  ctx += `Misión: ${c.about?.mission || ""}\n`;
  ctx += `Visión: ${c.about?.vision || ""}\n`;

  if (c.about?.values) {
    ctx += `Valores:\n`;
    c.about.values.forEach((v: any) => {
      ctx += `- ${v.title}: ${v.description}\n`;
    });
  }

  ctx += `\n--- ESTADÍSTICAS ---\n`;
  if (c.stats?.items) {
    c.stats.items.forEach((s: any) => {
      ctx += `- ${s.label}: ${s.value}${s.suffix}\n`;
    });
  }

  ctx += `\n--- EQUIPO ---\n`;
  if (c.team?.members) {
    c.team.members.forEach((m: any) => {
      ctx += `- ${m.name}: ${m.role} — ${m.description}\n`;
    });
  }

  ctx += `\n--- TESTIMONIOS ---\n`;
  if (c.testimonials?.items) {
    c.testimonials.items.forEach((t: any) => {
      ctx += `- "${t.text}" — ${t.author}, ${t.company}\n`;
    });
  }

  ctx += `\n--- CONTACTO ---\n`;
  ctx += `Dirección: ${c.contact?.address || ""}\n`;
  ctx += `Teléfono: ${c.contact?.phone || ""}\n`;
  ctx += `Email: ${c.contact?.email || ""}\n`;
  ctx += `Horario: ${c.contact?.hours || ""}\n`;

  ctx += `\n--- FOOTER ---\n`;
  ctx += `${c.footer?.description || ""}\n`;

  ctx += `\nINSTRUCCIONES IMPORTANTES:
- Responde SIEMPRE en español, de forma clara y amable.
- Si te preguntan por información que no está disponible en el contexto, indica amablemente que contacten directamente mediante el formulario o los datos de contacto proporcionados.
- No inventes información que no esté en el contexto del sitio.
- Sé conciso pero completo en tus respuestas.
- Si preguntan por precios o valores, indica que deben contactar al estudio para una asesoría personalizada.
- Mantén un tono profesional pero cercano.`;

  return ctx;
}
