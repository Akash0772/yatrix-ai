import { parseSuggestions } from '../../hooks/useChat'
import krishnaEating from '../../assets/krishna-eating.png'

const ChatMessage = ({ message, onSuggestionClick }) => {
  const isBot = message.role === 'bot' || message.role === 'assistant' || message.role === 'model'

  const { cleanText, suggestions } = isBot
    ? parseSuggestions(message.content || '')
    : { cleanText: message.content || '', suggestions: [] }

  return (
    <div className={`flex gap-2.5 items-start ${!isBot ? 'flex-row-reverse' : ''}`}>

      {/* Avatar */}
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm overflow-hidden"
        style={{
          background: isBot
            ? 'linear-gradient(160deg, #151d54, #0A0F2C)'
            : 'linear-gradient(160deg, rgba(232,184,75,0.25), rgba(232,184,75,0.08))',
          border: `1px solid ${isBot ? 'rgba(232,184,75,0.4)' : 'rgba(255,255,255,0.2)'}`
        }}>
        {isBot
          ? <img src={krishnaEating} alt="" style={{ width: '130%', height: '130%', objectFit: 'contain', objectPosition: 'bottom' }} />
          : '👤'}
      </div>

      {/* Bubble + Suggestions + Time */}
      <div className={`max-w-[80%] flex flex-col ${!isBot ? 'items-end' : 'items-start'}`}>

        <div
          className="px-3.5 py-2.5 text-sm leading-relaxed rounded-2xl"
          style={{
            background: isBot
              ? 'rgba(232,184,75,0.07)'
              : 'linear-gradient(135deg, rgba(232,184,75,0.22), rgba(201,146,26,0.12))',
            color: 'white',
            border: isBot
              ? '1px solid rgba(232,184,75,0.2)'
              : '1px solid rgba(232,184,75,0.3)',
            borderTopLeftRadius: isBot ? '4px' : '16px',
            borderTopRightRadius: isBot ? '16px' : '4px',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word'
          }}>
          {cleanText}
        </div>

        {suggestions.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {suggestions.map((suggestion, i) => (
              <button
                key={i}
                onClick={() => onSuggestionClick(suggestion)}
                className="text-xs px-3 py-1.5 rounded-full cursor-pointer transition-all duration-200
                           bg-[rgba(232,184,75,0.08)] border border-[rgba(232,184,75,0.3)] text-[var(--gold-light)]
                           hover:bg-[rgba(232,184,75,0.22)] hover:border-[var(--gold)]">
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <div className="text-[10px] mt-1 px-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
          {message.time}
        </div>
      </div>
    </div>
  )
}

export default ChatMessage