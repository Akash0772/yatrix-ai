import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import krishnaHero from '../../assets/krishna-hero.png'
import krishnaStanding from '../../assets/krishna-standing.png'
import krishnaEating from '../../assets/krishna-eating.png'
import krishnaMeditating from '../../assets/krishna-meditating.png'
import krishnaSitting from '../../assets/krishna-sitting.png'

const HERO_IMAGES = [krishnaHero, krishnaStanding, krishnaEating, krishnaMeditating, krishnaSitting]

const POPULAR_SERVICES = [
  { icon: '🗺️', name: 'Itinerary Planner', sub: 'Plan your Yatra', msg: '2 din ka Vrindavan tour plan karo' },
  { icon: '🏨', name: 'Hotel Booking', sub: 'Stay peacefully', msg: 'Hotel book karna hai Vrindavan mein' },
  { icon: '🚕', name: 'Transport', sub: 'Cab & Rental', msg: 'Transport chahiye Vrindavan ke liye' },
  { icon: '🛕', name: 'Temple Passes', sub: 'VIP Darshan Info', msg: 'Temple VIP pass chahiye' },
]

const Stars = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
    {[...Array(50)].map((_, i) => (
      <div
        key={i}
        className="star"
        style={{
          width: Math.random() * 2 + 1 + 'px',
          height: Math.random() * 2 + 1 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          '--duration': (Math.random() * 3 + 3) + 's',
          '--delay': (Math.random() * 4) + 's',
        }}
      />
    ))}
  </div>
)

const HeroSection = ({ onChatOpen }) => {
  const [imgIndex, setImgIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % HERO_IMAGES.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center py-20 lg:py-0 bg-[#06091F]">
      
      <Stars />

      {/* Ambient Divine Lights */}
      <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full pointer-events-none divine-glow-1" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full pointer-events-none divine-glow-2" />

      <div className="max-w-7xl mx-auto px-6 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT SIDE: Heading & Assistant Preview (Spacious) */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.15] mb-6 tracking-tight">
              <span className="text-white">Experience</span><br />
              <span className="gold-text font-serif italic">Divine Braj</span>
            </h1>

            <p className="text-lg md:text-xl font-light mb-8 max-w-xl text-slate-300 leading-relaxed">
              Simplify your spiritual journey. Seamlessly explore hand-crafted Tour Packages, Temple Timings, Premium Hotels & Cabs.
            </p>

            {/* Main Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-12">
              <button
                onClick={() => onChatOpen('Tour packages dikhao')}
                className="px-8 py-4 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-r from-[#C9921A] to-[#E8B84B] shadow-[0_4px_25px_rgba(201,146,26,0.35)]"
              >
                Explore Services 🦚
              </button>
              <button
                onClick={() => onChatOpen('Mera trip plan karo')}
                className="px-8 py-4 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 border-2 border-slate-500 text-white hover:border-[var(--gold)] hover:text-[var(--gold-light)] bg-transparent"
              >
                Plan My Trip →
              </button>
            </div>

            {/* Smart Inline Assistant Box */}
            <div className="rounded-2xl p-5 max-w-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-base border border-[var(--gold)] bg-[#111854]">🎭</div>
                <div>
                  <div className="text-white text-sm font-bold tracking-wide">Yatrix AI Assistant</div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] text-slate-400 font-medium">Ready to assist you</span>
                  </div>
                </div>
              </div>
              <div className="rounded-xl p-3.5 text-xs md:text-sm mb-4 bg-[rgba(201,146,26,0.06)] border border-[rgba(201,146,26,0.15)] text-slate-200 leading-relaxed font-light">
                "Radhe Radhe! 🙏 Vrindavan aur Mathura yatra ke liye hotel, cab ya darshan timing ki jankari chahiye? Mujhe batayein."
              </div>
              <div className="flex flex-wrap gap-2">
                {['Hotel Booking', 'Cab Rental', 'Temple Darshan'].map(chip => (
                  <button
                    key={chip}
                    onClick={() => onChatOpen(chip + ' chahiye')}
                    className="text-xs px-4 py-2 rounded-full transition-all border border-white/10 bg-white/[0.04] text-slate-300 hover:bg-[rgba(201,146,26,0.15)] hover:border-[var(--gold)] cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Gorgeous Framed Krishna & Quick Actions */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center gap-8">
            
            {/* Image Wrapper with Divine Frame Mask */}
            <motion.div 
              className="relative w-72 h-72 md:w-85 md:h-85 rounded-full p-4 avatar-frame flex items-center justify-center overflow-hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={imgIndex}
                  src={HERO_IMAGES[imgIndex]}
                  alt="Krishna"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  className="absolute w-[90%] h-[90%] object-contain animate-float drop-shadow-[0_10px_30px_rgba(201,146,26,0.3)]"
                />
              </AnimatePresence>

              {/* Slideshow dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {HERO_IMAGES.map((_, i) => (
                  <span
                    key={i}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: i === imgIndex ? '16px' : '5px',
                      height: '5px',
                      background: i === imgIndex ? 'var(--gold-light)' : 'rgba(255,255,255,0.3)'
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Quick Micro-Services Grid */}
            <motion.div 
              className="w-full grid grid-cols-2 gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {POPULAR_SERVICES.map((service, i) => (
                <button
                  key={i}
                  onClick={() => onChatOpen(service.msg)}
                  className="flex items-center gap-3 p-3 rounded-xl text-left transition-all duration-300 bg-white/[0.02] border border-white/[0.05] hover:bg-[rgba(201,146,26,0.08)] hover:border-[rgba(201,146,26,0.3)]"
                >
                  <span className="text-xl p-1.5 rounded-lg bg-white/[0.04]">{service.icon}</span>
                  <div>
                    <div className="text-white text-xs font-semibold">{service.name}</div>
                    <div className="text-[10px] text-slate-400">{service.sub}</div>
                  </div>
                </button>
              ))}
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  )
}

export default HeroSection