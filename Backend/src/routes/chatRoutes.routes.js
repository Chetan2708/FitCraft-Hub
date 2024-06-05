import { Router } from "express";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API,
});

const router = Router();
 
router.route('/').post(async (req, res) => {
  const { message } = req.body;
  console.log(process.env.OPENAI_API)
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        {
          role: "user",
          content: message,
        },
      ],
      max_tokens: 150,
      temperature: 0.9,
    });
    res.json({ message: response.choices[0].message.content }); 
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
