/* eslint-env node */
import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const apiKey = process.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server Error: API Key missing in Vercel environment." });
  }

  try {
    // नया SDK नई AQ वाली चाबियों को बिना किसी एरर के स्वीकार करता है
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
    
    const { message } = req.body;

    // नए SDK का सही मॉडल और कंटेंट जनरेशन मेथड
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
    });

    const reply = response.text;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ error: error.message || "Proxy Error" });
  }
}