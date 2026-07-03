import { useState, useRef } from 'react'

const ChatInput = ({ onSend, isLoading, currentLang }) => {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  const placeholders = {
    hi: 'अपना संदेश लिखें...',
    en: 'Type your message...',
    ru: 'Написать сообщение...',
    es: 'Escribe tu mensaje...'
  }

  const handleSend = () => {
    if (!input.trim() || isLoading) return
    onSend(input.trim())
    setInput('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const canSend = input.trim() && !isLoading

  return (
    <div
      className="px-3 pt-3 pb-2.5"
      style={{
        borderTop: '1px solid rgba(232,184,75,0.15)',
        background: 'linear-gradient(180deg, transparent, rgba(232,184,75,0.03))'
      }}>

      <div
        className="flex items-center gap-2 rounded-full px-1.5 py-1.5 transition-all"
        style={{
          background: 'rgba(255,255,255,0.04)',
          border: `1.5px solid ${input ? 'rgba(232,184,75,0.5)' : 'rgba(255,255,255,0.08)'}`,
        }}>

        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholders[currentLang] || placeholders.en}
          disabled={isLoading}
          className="flex-1 min-w-0 px-3 py-1.5 rounded-full text-sm bg-transparent outline-none"
          style={{
            color: 'white',
            fontFamily: "'Poppins', sans-serif"
          }}
        />

        <button
          onClick={handleSend}
          disabled={!canSend}
          aria-label="Send message"
          className="w-9 h-9 rounded-full flex items-center justify-center text-sm flex-shrink-0 transition-all duration-200"
          style={{
            background: canSend ? 'linear-gradient(135deg, var(--gold), var(--gold-light))' : 'rgba(255,255,255,0.08)',
            color: canSend ? '#0A0F2C' : 'rgba(255,255,255,0.3)',
            cursor: canSend ? 'pointer' : 'not-allowed',
            transform: canSend ? 'scale(1)' : 'scale(0.94)'
          }}>
          ➤
        </button>
      </div>

      {/* Trust Bar */}
      <div className="text-center pt-2 text-[10px] tracking-wide" style={{ color: 'rgba(255,255,255,0.25)' }}>
        🛡️ Secure • Trusted • Spiritual
      </div>
    </div>
  )
}

export default ChatInput