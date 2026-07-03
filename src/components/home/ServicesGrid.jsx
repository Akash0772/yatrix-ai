import { motion } from 'framer-motion'
import { SERVICES } from '../../constants/services'
import krishnaSitting from '../../assets/krishna-sitting.png'

const ServicesGrid = ({ onServiceClick }) => {
  return (
<section className="relative py-24 px-6 bg-[#06091F] overflow-hidden" style={{ background: 'var(--navy)' }}>
      {/* Decorative mascot, tucked in the corner so it doesn't compete with the grid */}
      <img
        src={krishnaSitting}
        alt=""
        aria-hidden="true"
        className="hidden lg:block absolute pointer-events-none select-none"
        style={{
          bottom: '-10px',
          right: '2%',
          width: '190px',
          opacity: 0.18,
          filter: 'grayscale(20%)'
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Title */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}>

          <div className="gold-divider mb-3">
            <span className="text-sm font-semibold tracking-widest" style={{ color: 'var(--gold)' }}>
              ✦ POPULAR SERVICES ✦
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white">Hamari Sewayein</h2>
          <p className="text-sm mt-2" style={{ color: 'rgba(255,255,255,0.5)' }}>
            Service select karo aur Yatrix AI se seedha baat karo
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              onClick={() => onServiceClick(service.msg)}
              className="card-dark rounded-2xl p-5 text-center cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}>

              <div className="text-4xl mb-3">{service.icon}</div>
              <div className="text-sm font-semibold text-white mb-1">{service.name}</div>
              <div className="text-xs" style={{
                color: 'rgba(255,255,255,0.4)',
                fontFamily: "'Noto Sans Devanagari', sans-serif"
              }}>
                {service.hindi}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default ServicesGrid