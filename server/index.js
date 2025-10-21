require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const OpenAI = require("openai");

const app = express();
app.use(bodyParser.json());

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (_req, res) => res.send("✅ HenAgency WhatsApp Bot en línea"));

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
});

app.post("/webhook", async (req, res) => {
  try {
    const msg = req.body?.entry?.[0]?.changes?.[0]?.value?.messages?.[0];
    if (!msg) return res.sendStatus(200);

    const from = msg.from;
    const text = msg.text?.body || "";

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Eres el asistente de HenAgency (Meta Ads, SEO/SEM y automatizaciones con IA). Responde breve, claro y profesional.",
        },
        { role: "user", content: text },
      ],
      temperature: 0.5,
      max_tokens: 300,
    });

    const ai =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Gracias por contactar con HenAgency. ¿En qué podemos ayudarte?";

    await axios.post(
      `https://graph.facebook.com/v21.0/${process.env.PHONE_NUMBER_ID}/messages`,
      { messaging_product: "whatsapp", to: from, text: { body: ai } },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.META_TOKEN}`,
        },
      },
    );

    res.sendStatus(200);
  } catch (err) {
    console.error("❌ Error webhook:", err?.response?.data || err.message);
    res.sendStatus(200);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("🚀 Servidor escuchando en puerto", PORT));
