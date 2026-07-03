import { useState, useCallback } from 'react'
import { sendMessage } from "../services/geminiService";
// import { sendMessage } from '../services/openRouterService';

const getWelcomeMessage = (lang) => {
  const messages = {
    hi: `राधे राधे! 🙏\n\nमैं Yatrix AI हूँ, आपकी आध्यात्मिक यात्रा सहायक। आपकी ब्रज यात्रा को सुंदर और यादगार बनाने के लिए मैं हमेशा तैयार हूँ!\n\nआज मैं आपकी क्या सहायता कर सकता हूँ?\n\nSUGGESTIONS: होटल बुकिंग | कैब बुकिंग | मंदिर दर्शन | टूर पैकेज`,
    en: `Radhe Radhe! 🙏\n\nI am Yatrix AI, your spiritual travel assistant. I am always ready to make your Braj journey beautiful and memorable!\n\nHow may I assist you today?\n\nSUGGESTIONS: Hotel Booking | Cab Booking | Temple Darshan | Tour Packages`,
    ru: `Радхе Радхе! 🙏\n\nЯ Yatrix AI, ваш духовный помощник по путешествиям. Я всегда готов сделать ваше путешествие в Брадж красивым и незабываемым!\n\nЧем могу помочь?\n\nSUGGESTIONS: Бронирование отеля | Такси | Храмы | Туры`,
    es: `Radhe Radhe! 🙏\n\nSoy Yatrix AI, tu asistente de viajes espirituales. ¡Siempre estoy listo para hacer tu viaje a Braj hermoso e inolvidable!\n\n¿En qué puedo ayudarte hoy?\n\nSUGGESTIONS: Reservar Hotel | Taxi | Templos | Paquetes de Tour`
  }
  return messages[lang] || messages.hi
}

export const parseSuggestions = (text) => {
  const suggestionMatch = text.match(/SUGGESTIONS:\s*(.+)$/m)
  if (suggestionMatch) {
    const cleanText = text.replace(/SUGGESTIONS:\s*.+$/m, '').trim()
    const suggestions = suggestionMatch[1].split('|').map((s) => s.trim()).filter(Boolean)
    return { cleanText, suggestions }
  }
  return { cleanText: text, suggestions: [] }
}

export const useChat = () => {
  const [language, setLanguage] = useState('hi')
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'bot',
      content: getWelcomeMessage('hi'),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showServices: true
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [conversationHistory, setConversationHistory] = useState([])

  const changeLanguage = useCallback((lang) => {
    setLanguage(lang)
    setMessages([{
      id: Date.now(),
      role: 'bot',
      content: getWelcomeMessage(lang),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showServices: true
    }])
    setConversationHistory([])
  }, [])

  const sendUserMessage = useCallback(async (text) => {
    if (!text.trim() || isLoading) return

    const userMsg = {
      id: Date.now(),
      role: 'user',
      content: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      const reply = await sendMessage(text, conversationHistory, language)

      const botMsg = {
        id: Date.now() + 1,
        role: 'bot',
        content: reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }

      setMessages((prev) => [...prev, botMsg])
      setConversationHistory((prev) => [
        ...prev,
        { role: 'user', content: text },
        { role: 'assistant', content: reply }
      ])
    } catch (error) {
      const errorMessages = {
        hi: 'राधे राधे! 🙏 कुछ तकनीकी समस्या हुई। कृपया दोबारा प्रयास करें।',
        en: 'Radhe Radhe! 🙏 A technical issue occurred. Please try again.',
        ru: 'Радхе Радхе! 🙏 Произошла техническая ошибка. Попробуйте снова.',
        es: 'Radhe Radhe! 🙏 Ocurrió un problema técnico. Por favor intente de nuevo.'
      }
      setMessages((prev) => [...prev, {
        id: Date.now() + 1,
        role: 'bot',
        content: errorMessages[language] || errorMessages.hi,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, conversationHistory, language])

  const clearChat = useCallback(() => {
    setMessages([{
      id: Date.now(),
      role: 'bot',
      content: getWelcomeMessage(language),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      showServices: true
    }])
    setConversationHistory([])
  }, [language])

  return {
    messages,
    isLoading,
    language,
    sendUserMessage,
    clearChat,
    changeLanguage
  }
}