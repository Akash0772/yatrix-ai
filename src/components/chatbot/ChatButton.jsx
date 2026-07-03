import { useEffect, useState } from 'react'
import krishnaEating from '../../assets/krishna-eating.png'

const ChatButton = ({ onClick, isOpen }) => {
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setShowTooltip(true)
        setTimeout(() => setShowTooltip(false), 5000)
      }, 2000)
      return () => clearTimeout(timer)
    } else {
      setShowTooltip(false)
    }
  }, [isOpen])

  return (
    <>
      <style>{`
        @keyframes yx-ring {
          0% { transform: scale(1); opacity: 0.55 }
          100% { transform: scale(1.6); opacity: 0 }
        }
        @keyframes yx-float {
          0%, 100% { transform: translateY(0px) }
          50% { transform: translateY(-6px) }
        }
        @keyframes yx-spin {
          to { transform: rotate(360deg) }
        }
        @keyframes yx-pop {
          0% { transform: scale(0.8); opacity: 0 }
          100% { transform: scale(1); opacity: 1 }
        }
      `}</style>

      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div
          className="fixed z-40 text-white text-xs px-3.5 py-2.5 rounded-2xl leading-relaxed"
          style={{
            bottom: '104px',
            right: '92px',
            background: 'rgba(8,12,36,0.9)',
            border: '1px solid rgba(232,184,75,0.35)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.45)',
            backdropFilter: 'blur(16px)',
            maxWidth: '170px',
            animation: 'yx-pop 0.25s ease-out'
          }}>
          Radhe Radhe! 🙏<br />
          <strong className="font-semibold">How can I help you?</strong>
          <div style={{
            position: 'absolute',
            right: '-7px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 0,
            height: 0,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderLeft: '7px solid rgba(8,12,36,0.9)'
          }} />
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={onClick}
        aria-label={isOpen ? 'Close chat' : 'Open Yatrix AI chat'}
        className="fixed z-50 flex items-center justify-center transition-transform duration-300"
        style={{
          bottom: '28px',
          right: '28px',
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          padding: 0,
          border: 'none',
          background: 'transparent',
          animation: isOpen ? 'none' : 'yx-float 3.2s ease-in-out infinite'
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>

        {/* Rotating gradient ring */}
        {!isOpen && (
          <span
            className="absolute inset-[-4px] rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, var(--gold), transparent 30%, var(--gold-light) 60%, transparent 90%, var(--gold))',
              animation: 'yx-spin 4s linear infinite',
              filter: 'blur(0.5px)'
            }}
          />
        )}

        {/* Pulse rings */}
        {!isOpen && (
          <>
            <span className="absolute inset-0 rounded-full" style={{ border: '1.5px solid var(--gold-light)', animation: 'yx-ring 2.2s ease-out infinite' }} />
            <span className="absolute inset-0 rounded-full" style={{ border: '1.5px solid var(--gold)', animation: 'yx-ring 2.2s ease-out 1.1s infinite' }} />
          </>
        )}

        {/* Core */}
        <span
          className="relative overflow-hidden rounded-full flex items-center justify-center"
          style={{
            width: '58px',
            height: '58px',
            background: 'linear-gradient(160deg, #0D1440, #050818)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(232,184,75,0.5)'
          }}>
          <img
            src={krishnaEating}
            alt=""
            style={{ width: '112%', height: '112%', objectFit: 'contain', objectPosition: 'bottom', opacity: isOpen ? 0.5 : 1, transition: 'opacity 0.25s' }}
          />
          {isOpen && (
            <span className="absolute text-white text-xl" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>✕</span>
          )}
        </span>

        {/* Badge */}
        {!isOpen && (
          <span
            className="absolute flex items-center justify-center text-white font-bold"
            style={{
              top: '-1px',
              right: '-1px',
              width: '19px',
              height: '19px',
              background: 'linear-gradient(135deg, #E85353, #C22B2B)',
              borderRadius: '50%',
              fontSize: '10px',
              border: '2px solid #050818',
              boxShadow: '0 2px 8px rgba(200,40,40,0.5)'
            }}>
            1
          </span>
        )}
      </button>
    </>
  )
}

export default ChatButton