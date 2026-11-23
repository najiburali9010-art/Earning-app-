import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY. Add it to your hosting environment or .env file.");
}
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(express.json({ limit: "30kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, configured: Boolean(process.env.OPENAI_API_KEY) });
});

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body?.message;
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "একটি প্রশ্ন লিখুন।" });
    }
    if (message.length > 8000) {
      return res.status(413).json({ error: "প্রশ্নটি অনেক বড়। ৮,০০০ অক্ষরের মধ্যে লিখুন।" });
    }
    if (!process.env.OPENAI_API_KEY) {
      return res.status(503).json({ error: "সার্ভারে API key সেট করা হয়নি।" });
    }

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-6-luna",
      instructions: "You are Najib AI, a helpful multilingual assistant. Reply in the language used by the user. Be clear, respectful, and honest. Do not claim to be ChatGPT or OpenAI.",
      input: message,
      max_output_tokens: 1200
    });
    res.json({ reply: response.output_text });
  } catch (error) {
    console.error("OpenAI request failed:", error?.message || error);
    res.status(500).json({ error: "AI উত্তর তৈরি করতে সমস্যা হয়েছে। API key, billing ও model access পরীক্ষা করুন।" });
  }
});

app.listen(port, () => console.log(`Najib AI running on port ${port}`));
