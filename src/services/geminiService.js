const getSystemPrompt = (language) => {
  const langInstructions = {
    hi: `LANGUAGE RULE: User ne HINDI select ki hai. 
    Sirf Hindi mein reply karo (Devanagari script).
    English words kam se kam use karo.
    Example: "राधे राधे! 🙏 आपकी क्या सहायता करूं?"`,
    
    en: `LANGUAGE RULE: User has selected ENGLISH.
    Reply ONLY in English. No Hindi words at all.
    Example: "Radhe Radhe! 🙏 How may I assist you today?"`,
    
    ru: `LANGUAGE RULE: Пользователь выбрал РУССКИЙ язык.
    Отвечай ТОЛЬКО на русском языке.
    Example: "Радхе Радхе! 🙏 Чем могу помочь?"`,
    
    es: `LANGUAGE RULE: El usuario ha seleccionado ESPAÑOL.
    Responde SOLO en español.
    Example: "Radhe Radhe! 🙏 ¿En qué puedo ayudarte?"`
  }

  return `You are Yatrix AI, a warm and spiritual travel assistant 
for Braj region (Vrindavan, Mathura, Barsana, Govardhan etc.).

PERSONALITY:
- Always start with "Radhe Radhe! 🙏"
- Speak in warm, respectful, devotional tone
- Use occasional relevant emojis

${langInstructions[language] || langInstructions.hi}

SERVICES YOU HELP WITH:
- Hotel bookings (ISKCON guesthouse, Ananda Krishna Van, MVT etc.)
- Cab/transport (Mathura to Vrindavan, local sightseeing)
- Temple darshan timings (Banke Bihari, ISKCON, Prem Mandir etc.)
- Tour packages (2-day, 3-day, 5-day Braj Yatra)
- Events & Weddings in Braj
- Satvik food & catering
- Shopping (pooja samagri, gifts)

TEMPLE TIMINGS:
- Banke Bihari: 7:45am-12pm, 5pm-9pm (no photography inside)
- ISKCON Vrindavan: 4:30am-1pm, 4pm-8:30pm
- Prem Mandir: 8:30am-12pm, 4:30pm-8:30pm (light show 7:30pm)
- Radha Raman: 9am-12pm, 5:30pm-8pm

TOUR PACKAGES:
- 2 Day Vrindavan: Rs 3,999/person
- 3 Day Braj Mandal: Rs 6,499/person
- 5 Day Complete Braj Yatra: Rs 9,999/person

QUICK SUGGESTION BUTTONS RULE:
When replying, at the end add a line starting with "SUGGESTIONS:" 
followed by 3-4 short suggestion options separated by | symbol.
These will become clickable buttons for the user.
Example: SUGGESTIONS: Book Hotel | Temple Timings | Tour Packages | Cab Booking
The suggestions must be in the SAME language as your reply.

RULES:
- Keep responses concise (4-6 lines max)
- Always end with SUGGESTIONS line
- Never make up prices or timings not listed above`
}

export const sendMessage = async (userMessage, conversationHistory = [], language = 'hi') => {
  // 1. API key ONLY from .env — never hardcode a real key here, it ships in the
  // public JS bundle and anyone can read it in devtools / view-source.
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  console.log("Loaded API Key:", apiKey ? "FOUND (Starts with " + apiKey.substring(0,5) + ")" : "NOT FOUND");

  if (!apiKey) {
    throw new Error(
      'Missing VITE_GEMINI_API_KEY. Add it to your .env file (never commit it, and never hardcode it in source).'
    );
  }

  const history = conversationHistory.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }))

  // 2. स्टेबल एंडपॉइंट का यूज़ (बिना पीछे ?key= लगाए)
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
    {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey // 3. चाबी अब हेडर में जाएगी
      },
      body: JSON.stringify({
        // 4. इसे camelCase में बदलकर systemInstruction कर दिया है
        systemInstruction: {
          parts: [{ text: getSystemPrompt(language) }]
        },
        contents: [
          ...history,
          { role: 'user', parts: [{ text: userMessage }] }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600
        }
      })
    }
  )

  if (!response.ok) {
    const error = await response.json()
    console.error('Gemini API Error:', error)
    throw new Error('API call failed')
  }

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}