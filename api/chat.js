/* eslint-env node */

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
    const { message } = req.body;

    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;
    
    // जेमिनी को प्रॉम्प्ट निर्देश कि वह जवाब के साथ सजेशन्स भी फ़ॉर्मेट में दे
    const systemInstruction = "You are Yatrix AI, a helpful spiritual travel assistant for the Braj region. Answer the user's question nicely. CRITICAL RULE: At the very end of your response, you MUST always add exactly one line with 3 short relevant follow-up options or questions in the user's language using this exact format: \\n\\nSUGGESTIONS: Option 1 | Option 2 | Option 3";

    const response = await fetch(googleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: `${systemInstruction}\n\nUser Message: ${message}` }
            ]
          }
        ]
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API Error Response:", data);
      return res.status(response.status).json({ 
        error: data.error?.message || "Google API responded with an error" 
      });
    }

    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found.";
    
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Fetch Proxy Error:", error);
    return res.status(500).json({ error: error.message || "Proxy Fetch Error" });
  }
}