import { motion } from 'framer-motion'
import krishnaMeditating from '../../assets/krishna-meditating.png'
import mathuraImg from '../../assets/Mathura.png'
import vrindavanImg from '../../assets/Vrindavan.png'
import gokulImg from '../../assets/Gokul.png'
import govardhanImg from '../../assets/Govardhan.png'
import barsanaImg from '../../assets/Barsana.png'

const FEATURES = [
  { icon: '🤖', title: 'AI Powered', sub: 'Smart & Instant Responses' },
  { icon: '🌐', title: 'Multi-Language', sub: 'Hindi, English & 10+ Langs' },
  { icon: '🛡️', title: '100% Secure', sub: 'Trusted & Safe Experience' },
  { icon: '📞', title: '24/7 Support', sub: 'Always Here To Help You' }
]

const DESTINATIONS = [
  { name: 'Mathura', sub: 'Shri Krishna Janmabhoomi', img: mathuraImg },
  { name: 'Vrindavan', sub: 'Banke Bihari Temple', img: vrindavanImg },
  { name: 'Gokul', sub: "Nand Baba's Village", img: gokulImg },
  { name: 'Govardhan', sub: 'Govardhan Parikrama', img: govardhanImg },
  { name: 'Barsana', sub: 'Radha Rani Temple', img: barsanaImg }
]

const WhyYatrix = ({ onChatOpen }) => {
  return (
    <>
      {/* Features Bar with Premium Spacing */}
      <section className="py-12 px-6 bg-white/[0.01] border-t border-b border-[rgba(201,146,26,0.15)]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-4 p-2"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 bg-[rgba(201,146,26,0.08)] border border-[rgba(201,146,26,0.25)] text-[var(--gold-light)]">
                  {f.icon}
                </div>
                <div>
                  <div className="text-white text-sm font-bold">{f.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{f.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations Section with massive breathing space */}
      <section className="py-24 px-6 bg-[#0B0F28]">
        <div className="max-w-6xl mx-auto">
          
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="gold-divider mb-4">
              <span className="text-xs font-bold tracking-[0.2em] text-[var(--gold)]">
                ✦ TOP DESTINATIONS IN BRAJ ✦
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Pavitra Sthan</h2>
          </motion.div>

          {/* Clean Responsive Flex Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
            {DESTINATIONS.map((dest, i) => (
              <motion.div
                key={i}
                onClick={() => onChatOpen(`${dest.name} ke baare mein batao`)}
                className="relative rounded-2xl overflow-hidden cursor-pointer group h-52"
                style={{ border: '1px solid rgba(201,146,26,0.15)' }}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <img
                  src={dest.img}
                  alt={dest.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(180deg, rgba(11,15,40,0.05) 0%, rgba(6,9,31,0.55) 55%, rgba(6,9,31,0.95) 100%)' }}
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ boxShadow: 'inset 0 0 0 1.5px var(--gold-light)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-3.5 text-center">
                  <div className="text-white text-sm font-bold group-hover:text-[var(--gold-light)] transition-colors">{dest.name}</div>
                  <div className="text-[11px] text-slate-300 mt-1 font-light leading-tight">{dest.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Bottom CTA — Fixed Double Button and Spacing Bug 🔥 */}
      <section className="py-24 px-6 relative overflow-hidden bg-[#06091F] border-t border-white/[0.03]">
        <div className="absolute inset-0 pointer-events-none bg-radial from-[rgba(201,146,26,0.05)] to-transparent" />

        <div className="max-w-3xl mx-auto text-center relative z-10 flex flex-col items-center">
          <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(201,146,26,0.25) 0%, transparent 70%)',
                filter: 'blur(20px)'
              }}
            />
            <img
              src={krishnaMeditating}
              alt="Yatrix AI"
              className="relative w-full h-full object-contain animate-float drop-shadow-[0_10px_30px_rgba(201,146,26,0.35)]"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Let Yatrix AI Plan Your Perfect Yatra
          </h2>
          <p className="text-base text-slate-400 mb-8 max-w-xl font-light">
            Get your personalized spiritual itinerary, trusted guesthouse recommendations, and hassle-free transit with one click.
          </p>
          
          {/* केवल एक सिंगल, परफेक्टली डिजाइन्ड बटन */}
          <button
            onClick={() => onChatOpen('Meri perfect Braj yatra plan karo')}
            className="px-8 py-4 rounded-full text-sm font-bold text-white transition-all duration-300 hover:scale-105 bg-gradient-to-r from-[#C9921A] to-[#E8B84B] shadow-[0_5px_25px_rgba(201,146,26,0.35)] cursor-pointer"
          >
            Start Your Journey →
          </button>

          <div className="mt-8 text-xs font-semibold tracking-widest text-[var(--gold)] uppercase">
            ✦ Radhe Radhe ✦
          </div>
        </div>
      </section>
    </>
  )
}

export default WhyYatrix