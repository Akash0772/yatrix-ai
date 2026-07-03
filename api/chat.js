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

    // सीधे गूगल के ऑफ़िशियल REST API एंडपॉइंट को हिट करें (बिना किसी हेडर कन्फ्यूजन के)
    //const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey.trim()}`;
    // ✅ नया यूआरएल (इसे बदलें):
    const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;
    const response = await fetch(googleUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: message }
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

    // गूगल से टेक्स्ट रिस्पॉन्स निकालें
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text found.";
    
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Fetch Proxy Error:", error);
    return res.status(500).json({ error: error.message || "Proxy Fetch Error" });
  }
}