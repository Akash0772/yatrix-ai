/* eslint-env node */
import { GoogleGenAI } from '@google/genai'; // या जो भी पैकेज आप यूज़ कर रहे हैं

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

  // 1. पक्का करें कि चाबी लोड हो रही है
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: "Server Error: API Key missing in Vercel environment." });
  }

  try {
    // 2. जेमिनी को चाबी एकदम साफ़ तरीके से पास करें (Explicitly pass apiKey)
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() }); // .trim() स्पेस हटा देगा
    
    const { message, history } = req.body;

    // यहाँ अपना पुराना चैट जनरेशन वाला लॉजिक रखें, उदाहरण के लिए:
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash', // या जो भी मॉडल आप यूज़ कर रहे हैं
      contents: message,
    });

    const reply = response.text;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(error.status || 500).json({ 
      error: error.message || "Something went wrong on the proxy server" 
    });
  }
}