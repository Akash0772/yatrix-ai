const getSystemPrompt = (language) => {
  const langInstructions = {
    hi: `LANGUAGE RULE: Sirf Hindi mein reply karo (Devanagari script).`,
    en: `LANGUAGE RULE: Reply ONLY in English.`,
    ru: `LANGUAGE RULE: Отвечай ТОЛЬКО на русском языке.`,
    es: `LANGUAGE RULE: Responde SOLO en español.`
  }

  return `You are Yatrix AI, a warm spiritual travel assistant for Braj region.

PERSONALITY:
- Always start with "Radhe Radhe! 🙏"
- Warm, devotional tone
- Created by: Akash Chaurasiya

${langInstructions[language] || langInstructions.hi}

SERVICES:
- Hotel bookings (ISKCON guesthouse, Ananda Krishna Van, MVT)
- Cab/transport (Mathura to Vrindavan)
- Temple darshan timings
- Tour packages
- Events & Weddings
- Satvik food & catering
- Shopping (pooja samagri)

TEMPLE TIMINGS:
- Banke Bihari: 7:45am-12pm, 5pm-9pm
- ISKCON Vrindavan: 4:30am-1pm, 4pm-8:30pm
- Prem Mandir: 8:30am-12pm, 4:30pm-8:30pm
- Radha Raman: 9am-12pm, 5:30pm-8pm

TOUR PACKAGES:
- 2 Day Vrindavan: Rs 3,999/person
- 3 Day Braj Mandal: Rs 6,499/person
- 5 Day Complete Braj Yatra: Rs 9,999/person

SUGGESTIONS RULE:
End every reply with: SUGGESTIONS: option1 | option2 | option3
Suggestions must be in same language as reply.

RULES:
- Concise replies (4-6 lines)
- Always end with SUGGESTIONS line`
}

export const sendMessage = async (userMessage, conversationHistory = [], language = 'hi') => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY

  const history = conversationHistory.map((msg) => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }))

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: {
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
    const err = await response.json()
    console.error('Gemini Error:', err)
    throw new Error('API call failed')
  }

  const data = await response.json()
  return data.candidates[0].content.parts[0].text
}