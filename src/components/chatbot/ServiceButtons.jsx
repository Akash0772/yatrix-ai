import { SERVICES } from '../../constants/services'

const ServiceButtons = ({ onServiceClick }) => {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {SERVICES.map(service => (
        <button
          key={service.id}
          onClick={() => onServiceClick(service.msg)}
          className="flex items-center gap-2 p-2 rounded-xl text-left transition-all duration-200"
          style={{
            background: 'white',
            border: '1px solid rgba(201,146,26,0.2)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'var(--gold-pale)'
            e.currentTarget.style.borderColor = 'var(--gold)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'white'
            e.currentTarget.style.borderColor = 'rgba(201,146,26,0.2)'
          }}>

          {/* Icon */}
          <span className="text-lg flex-shrink-0">{service.icon}</span>

          {/* Text */}
          <div>
            <div className="text-xs font-semibold" style={{ color: 'var(--navy)' }}>
              {service.name}
            </div>
            <div className="text-xs" style={{
              color: '#999',
              fontFamily: "'Noto Sans Devanagari', sans-serif",
              fontSize: '10px'
            }}>
              {service.hindi}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

export default ServiceButtons