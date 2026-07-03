import { useState } from 'react'
import Layout from './components/layout/Layout'
import HeroSection from './components/home/HeroSection'
import ServicesGrid from './components/home/ServicesGrid'
import WhyYatrix from './components/home/WhyYatrix'
import ChatButton from './components/chatbot/ChatButton'
import ChatWindow from './components/chatbot/ChatWindow'
import { useChat } from './hooks/useChat'

const App = () => {
  const [chatOpen, setChatOpen] = useState(false)
  const {
    messages,
    isLoading,
    language,
    sendUserMessage,
    clearChat,
    changeLanguage
  } = useChat()

  const handleChatOpen = (msg = null) => {
    setChatOpen(true)
    if (msg) {
      setTimeout(() => sendUserMessage(msg), 400)
    }
  }

  return (
    <Layout onChatOpen={() => handleChatOpen()}>
      <HeroSection onChatOpen={handleChatOpen} />
      <ServicesGrid onServiceClick={handleChatOpen} />
      <WhyYatrix onChatOpen={handleChatOpen} />

      <ChatButton
        onClick={() => chatOpen ? setChatOpen(false) : handleChatOpen()}
        isOpen={chatOpen}
      />

      <ChatWindow
        isOpen={chatOpen}
        onClose={() => setChatOpen(false)}
        messages={messages}
        isLoading={isLoading}
        onSend={sendUserMessage}
        onClear={clearChat}
        language={language}
        onLanguageChange={changeLanguage}
      />
    </Layout>
  )
}

export default App