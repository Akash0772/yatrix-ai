import { useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import ChatInput from './ChatInput'
import ServiceButtons from './ServiceButtons'
import krishnaEating from '../../assets/krishna-eating.png'

const TypingIndicator = () => (
  <div className="flex gap-2.5 items-start">
    <div
      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #151d54, #0A0F2C)',
        border: '1px solid rgba(232,184,75,0.4)'
      }}>
      <img src={krishnaEating} alt="" style={{ width: '130%', height: '130%', objectFit: 'contain', objectPosition: 'bottom' }} />
    </div>
    <div
      className="px-4 py-3 flex gap-1.5 items-center rounded-2xl"
      style={{
        background: 'rgba(232,184,75,0.06)',
        border: '1px solid rgba(232,184,75,0.18)',
        borderTopLeftRadius: '4px'
      }}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{
            background: 'var(--gold-light)',
            animation: `yx-typing 1.2s infinite ${i * 0.18}s`
          }}
        />
      ))}
    </div>
  </div>
)

const LANG_LABELS = { hi: 'हिं', en: 'EN', ru: 'RU', es: 'ES' }

const ChatWindow = ({
  isOpen,
  onClose,
  messages,
  isLoading,
  onSend,
  onClear,
  language,
  onLanguageChange
}) => {
  const messagesEndRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  if (!isOpen) return null

  return (
    <>
      <style>{`
        @keyframes yx-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5 }
          30% { transform: translateY(-5px); opacity: 1 }
        }
        @keyframes yx-blink {
          0%, 100% { opacity: 1; box-shadow: 0 0 8px 2px rgba(74,222,128,0.6) }
          50% { opacity: 0.5; box-shadow: 0 0 2px 0 rgba(74,222,128,0.3) }
        }
        @keyframes yx-slide-up {
          from { opacity: 0; transform: translateY(24px) scale(0.97) }
          to { opacity: 1; transform: translateY(0) scale(1) }
        }
        .yx-scroll::-webkit-scrollbar { width: 4px; }
        .yx-scroll::-webkit-scrollbar-thumb { background: rgba(232,184,75,0.35); border-radius: 4px; }
      `}</style>

      <div
        className="fixed z-50 flex flex-col overflow-hidden"
        style={{
          bottom: '104px',
          right: '20px',
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '600px',
          maxHeight: 'calc(100vh - 140px)',
          borderRadius: '24px',
          padding: '1px',
          background: 'linear-gradient(160deg, rgba(232,184,75,0.5), rgba(201,146,26,0.08) 30%, rgba(255,255,255,0.06) 70%, rgba(232,184,75,0.3))',
          boxShadow: '0 24px 70px rgba(0,0,0,0.55)',
          animation: 'yx-slide-up 0.3s cubic-bezier(0.16,1,0.3,1)'
        }}>
        <div
          className="flex flex-col flex-1 overflow-hidden"
          style={{
            borderRadius: '23px',
            background: 'rgba(8,12,34,0.92)',
            backdropFilter: 'blur(24px)'
          }}>

          {/* Header */}
          <div
            className="flex items-center gap-3 px-4 py-3.5 flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(232,184,75,0.08), rgba(13,20,64,0.4))',
              borderBottom: '1px solid rgba(232,184,75,0.15)'
            }}>
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden"
              style={{
                background: 'linear-gradient(160deg, #151d54, #0A0F2C)',
                boxShadow: 'inset 0 0 0 1.5px var(--gold)'
              }}>
              <img src={krishnaEating} alt="Yatrix AI" style={{ width: '130%', height: '130%', objectFit: 'contain', objectPosition: 'bottom' }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold text-sm tracking-wide">Yatrix AI</div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'yx-blink 2s infinite' }} />
                <span className="text-[11px]" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  Online • Spiritual Concierge
                </span>
              </div>
            </div>

            {/* Language pills */}
            <div className="flex gap-1 mr-1">
              {Object.entries(LANG_LABELS).map(([code, label]) => (
                <button
                  key={code}
                  onClick={() => onLanguageChange(code)}
                  className="px-2 py-1 rounded-lg text-[10px] font-semibold transition-all duration-200"
                  style={{
                    background: language === code ? 'var(--gold)' : 'rgba(255,255,255,0.06)',
                    color: language === code ? '#0A0F2C' : 'rgba(255,255,255,0.55)',
                  }}>
                  {label}
                </button>
              ))}
            </div>

            <button
              onClick={onClear}
              aria-label="Clear chat"
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'white' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(232,184,75,0.25)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
              ↺
            </button>
            <button
              onClick={onClose}
              aria-label="Close chat"
              className="w-7 h-7 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'white' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}>
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="yx-scroll flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
            {messages.map((msg) => (
              <div key={msg.id}>
                <ChatMessage message={msg} onSuggestionClick={onSend} />
                {msg.showServices && (
                  <div className="ml-[42px] mt-2.5">
                    <ServiceButtons onServiceClick={onSend} />
                  </div>
                )}
              </div>
            ))}
            {isLoading && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex-shrink-0">
            <ChatInput
              onSend={onSend}
              isLoading={isLoading}
              currentLang={language}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatWindow