/* eslint-env node */
import { GoogleGenerativeAI } from '@google/generative-ai';

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

  // 1. Vercel Environment से API Key निकालें
  const apiKey = process.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    return res.status(500).json({ error: "Server Error: API Key missing in Vercel environment." });
  }

  try {
    // 2. आपके प्रोजेक्ट के सही पैकेज (@google/generative-ai) के साथ इनिशियलाइज़ करें
    const genAI = new GoogleGenerativeAI(apiKey.trim());
    
    // प्रोजेक्ट में जो भी मॉडल यूज़ हो रहा था (जैसे gemini-1.5-flash या gemini-pro)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const { message } = req.body;

    // 3. कंटेंट जनरेट करें
    const result = await model.generateContent(message);
    const response = await result.response;
    const reply = response.text();

    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Gemini Error:", error);
    return res.status(500).json({ 
      error: error.message || "Something went wrong on the proxy server" 
    });
  }
}