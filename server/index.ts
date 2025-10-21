import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import axios from "axios";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const app = express();
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// ✅ Ruta de prueba
app.get("/", (_req: Request, res: Response) => {
  res.send("HenAgency WhatsApp Bot activo ✅");
});

// ✅ Verificación del webhook de Meta
app.get("/webhook", (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// ✅ Recepción de mensajes de WhatsApp
app.post("/webhook", async (req: Request, res: Response) => {
  try {
    const msg = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!msg) return res.sendStatus(200);

    const from = msg.from;
    const text = msg.text?.body || "";

    // --- Respuesta con IA ---
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres el asistente oficial de HenAgency, una agencia de marketing digital exclusiva especializada en Meta Ads, SEO y automatizaciones con IA. Responde siempre en tono profesional y cercano.",
        },
        { role: "user", content: text },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });

    const aiResponse = completion.choices[0].message?.content || "Un momento...";

    await axios.post(
      `https://graph.facebook.com/v21.0/${process.env.PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        to: from,
        text: { body: aiResponse },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.META_TOKEN}`,
        },
      }
    );

    res.sendStatus(200);
  } catch (error: any) {
    console.error("Error:", error?.response?.data || error.message);
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor escuchando en puerto ${PORT}`));
