import express from "express";
import OpenAI from "openai";

const router = express.Router();

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { transcript, prompt } = req.body;

    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a meeting notes summarizer." },
        { role: "user", content: `${prompt}\n\n${transcript}` }
      ]
    });

    const summary = response.choices[0].message.content;
    res.json({ summary });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Failed to summarize transcript" });
  }
});

export default router;
