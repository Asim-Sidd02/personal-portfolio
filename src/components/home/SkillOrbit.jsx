import React from 'react'
import { motion } from 'motion/react'
import './skillOrbit.css'

const ORBIT_ICONS = [
  { id: 'vue', icon: 'bxl-vuejs', color: '#41b883', label: 'Vue.js' },
  { id: 'node', icon: 'bxl-nodejs', color: '#3c873a', label: 'Node.js' },
  { id: 'flutter', icon: 'bxl-flutter', color: '#02569B', label: 'Flutter' },
  { id: 'shopify', icon: 'bxl-shopify', color: '#95BF47', label: 'Shopify' },
  { id: 'js', icon: 'bxl-javascript', color: '#f0b90b', label: 'JavaScript' },
  { id: 'github', icon: 'bxl-github', color: 'var(--title-color)', label: 'GitHub' },
]

const RADIUS = 172
const DURATION = 26

const SkillOrbit = () => {
  const count = ORBIT_ICONS.length

  return (
    <div className="skill-orbit" aria-hidden="true">
      <div className="skill-orbit__ring"></div>

      {ORBIT_ICONS.map((item, index) => {
        const startAngle = (360 / count) * index
        return (
          <motion.div
            key={item.id}
            className="skill-orbit__pivot"
            animate={{ rotate: [startAngle, startAngle + 360] }}
            transition={{ repeat: Infinity, duration: DURATION, ease: 'linear' }}
          >
            <div className="skill-orbit__arm" style={{ transform: `translate(${RADIUS}px, -50%)` }}>
              <motion.div
                className="skill-orbit__badge"
                title={item.label}
                animate={{ rotate: [-startAngle, -(startAngle + 360)] }}
                transition={{ repeat: Infinity, duration: DURATION, ease: 'linear' }}
                whileHover={{ scale: 1.28 }}
              >
                <i className={`bx ${item.icon}`} style={{ color: item.color }}></i>
              </motion.div>
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}

export default SkillOrbit
