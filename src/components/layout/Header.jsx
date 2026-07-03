import { useState, useEffect } from 'react'

const Header = ({ onChatOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? 'rgba(10,15,44,0.95)'
          : 'rgba(10,15,44,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(201,146,26,0.2)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.3)' : 'none'
      }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl"
            style={{
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              boxShadow: '0 4px 15px rgba(201,146,26,0.3)'
            }}>
            🦚
          </div>
          <div>
            <div className="font-bold text-xl tracking-wide">
              <span className="text-white">YATRIX</span>
              <span className="gold-text"> AI</span>
            </div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Your Spiritual Travel Assistant
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { label: 'Home', active: true },
            { label: 'Services' },
            { label: 'Destinations' },
            { label: 'Packages' },
            { label: 'Events' },
            { label: 'More' }
          ].map(item => (
            // ✅ यहाँ एरर फिक्स कर दिया है (Opening <a> tag जोड़ा गया है)
            <a
              key={item.label}
              className="text-sm font-medium cursor-pointer transition-all duration-200 relative group"
              style={{ color: item.active ? 'var(--gold-light)' : 'rgba(255,255,255,0.8)' }}>
              {item.label}
              {item.active && (
                <div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                  style={{ background: 'var(--gold)' }}
                />
              )}
              <div
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: 'var(--gold-light)' }}
              />
            </a>
          ))}
        </nav>

        {/* Login Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={onChatOpen}
            className="hidden md:block text-sm font-semibold px-6 py-2.5 rounded-full transition-all duration-200 hover:scale-105"
            style={{
              background: 'var(--gold)',
              color: 'white',
              boxShadow: '0 4px 15px rgba(201,146,26,0.3)'
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--gold-light)'}
            onMouseLeave={e => e.currentTarget.style.background = 'var(--gold)'}>
            Login
          </button>

          {/* Mobile Menu */}
          <button
            className="md:hidden text-2xl"
            style={{ color: 'var(--gold-light)' }}
            onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4"
          style={{
            background: 'rgba(10,15,44,0.98)',
            borderTop: '1px solid rgba(201,146,26,0.15)'
          }}>
          {['Home', 'Services', 'Destinations', 'Packages', 'Events', 'More'].map(item => (
            <div
              key={item}
              className="py-3 text-sm font-medium border-b cursor-pointer transition-colors"
              style={{
                color: 'rgba(255,255,255,0.8)',
                borderColor: 'rgba(255,255,255,0.08)'
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--gold-light)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.8)'}>
              {item}
            </div>
          ))}
          <button
            onClick={onChatOpen}
            className="mt-4 w-full text-sm font-semibold px-5 py-2.5 rounded-full"
            style={{ background: 'var(--gold)', color: 'white' }}>
            Login
          </button>
        </div>
      )}
    </header>
  )
}

export default Header