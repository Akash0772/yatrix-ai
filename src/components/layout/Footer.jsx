const Footer = () => {
  return (
    <footer
      className="py-12 px-4"
      style={{
        background: '#050818',
        borderTop: '1px solid rgba(201,146,26,0.15)'
      }}>
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🦚</span>
              <div>
                <div className="font-bold text-lg">
                  <span className="text-white">YATRIX</span>
                  <span className="gold-text">AI</span>
                </div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Your Spiritual Travel Assistant
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
              Braj ki divya yatra ka sabse vishwasaniya saathi
            </p>
            <div className="mt-4 text-sm font-medium" style={{ color: 'var(--gold)' }}>
              ✦ Radhe Radhe ✦
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--gold-light)' }}>
              Hamari Sewayein
            </h4>
            {['Hotel Booking', 'Cab Booking', 'Temple Darshan', 'Tour Packages', 'Events & Weddings'].map(s => (
              <div key={s}
                className="text-xs py-1.5 cursor-pointer transition-colors"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}>
                {s}
              </div>
            ))}
          </div>

          {/* Temples */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--gold-light)' }}>
              Pramukh Mandir
            </h4>
            {['Banke Bihari Mandir', 'ISKCON Vrindavan', 'Prem Mandir', 'Radha Raman', 'Govardhan Parvat'].map(t => (
              <div key={t}
                className="text-xs py-1.5 cursor-pointer transition-colors"
                style={{ color: 'rgba(255,255,255,0.45)' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.45)'}>
                {t}
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: 'var(--gold-light)' }}>
              Sampark Karein
            </h4>
            <div className="space-y-2">
              {[
                { icon: '📞', text: '+91 9999 999 999' },
                { icon: '✉️', text: 'info@yatrix.ai' },
                { icon: '📍', text: 'Vrindavan, Mathura, UP' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs"
                  style={{ color: 'rgba(255,255,255,0.45)' }}>
                  <span>{item.icon}</span> {item.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              {['📘', '📸', '▶️', '💬'].map((icon, i) => (
                <div key={i}
                  className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer text-sm transition-all"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'var(--gold)'
                    e.currentTarget.style.borderColor = 'var(--gold)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  }}>
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section - Updated with Developer Credits */}
        <div
          className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.3)' }}>
              © 2026 Yatrix AI — Yatrix Global Pvt. Ltd. All rights reserved.
            </div>
            
            {/* Developer Tag with LinkedIn and GitHub Links */}
            <div className="text-xs flex items-center gap-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
              <span>Designed & Developed by</span>
              <span className="font-semibold" style={{ color: 'var(--gold-light)' }}>Akash Chaurasiya</span>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              
              {/* GitHub Link */}
              <a 
                href="https://github.com/Akash0772" // <-- यहाँ अपना असली GitHub प्रोफाइल लिंक डालें
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-0.5 transition-colors"
                style={{ color: 'var(--gold)' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'var(--gold)'}
              >
                GitHub ↗
              </a>
              
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              
              {/* LinkedIn Link */}
              <a 
                href="https://www.linkedin.com/in/akash0772/" // <-- यहाँ अपना असली LinkedIn प्रोफाइल लिंक डालें
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-0.5 transition-colors"
                style={{ color: 'var(--gold)' }}
                onMouseEnter={e => e.target.style.color = '#fff'}
                onMouseLeave={e => e.target.style.color = 'var(--gold)'}
              >
                LinkedIn ↗
              </a>
            </div>
          </div>

          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Use', 'Refund Policy'].map(item => (
              <span key={item}
                className="text-xs cursor-pointer transition-colors"
                style={{ color: 'rgba(255,255,255,0.3)' }}
                onMouseEnter={e => e.target.style.color = 'var(--gold-light)'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}>
                {item}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer