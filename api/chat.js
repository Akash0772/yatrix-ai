/* eslint-env node */

export default async function handler(req, res) {
  // CORS Headers सेट करें ताकि ब्राउज़र ब्लॉक न करे
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // यहाँ से हमने unused 'message' हटा दिया है ताकि पहली एरर खत्म हो जाए
    const { history, systemPrompt } = req.body;
    
    // Vercel के सर्वर एनवायरनमेंट से चाबी उठाना
    const apiKey = process.env.VITE_GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: 'Missing VITE_GEMINI_API_KEY on Vercel server side.' });
    }

    // Google Gemini API को बैकएंड से सुरक्षित कॉल करना
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
      {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: history,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 600
          }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini Server Error:', errorData);
      return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    const reply = data.candidates[0].content.parts[0].text;
    
    return res.status(200).json({ reply });

  } catch (error) {
    console.error('Serverless Proxy Error:', error);
    return res.status(500).json({ error: 'Internal server error occurred' });
  }
}