import React from 'react'
import { motion } from 'motion/react'

const SkillBar = ({ name, level, percent }) => (
  <div className="skills__data">
    <div className="skills__data-head">
      <h3 className="skills__name">{name}</h3>
      <span className="skills__level">{level}</span>
    </div>
    <div className="skills__bar">
      <motion.div
        className="skills__bar-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </div>
)

export default SkillBar
