import React from 'react'
import { motion } from 'motion/react'

const WorkItems = ({ item }) => {
  return (
    <motion.div
      className="work__card-wrapper"
      style={{ height: '100%' }}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="work__card">
        <img src={item.image} alt='' className='work__img' />
        <h3 className="work__title">{item.title}</h3>
        <a href={item.url} className="work__button" target="_blank" rel="noopener noreferrer">
          View <i className="bx bx-right-arrow-alt work__button-icon"></i>
        </a>
      </div>
    </motion.div>
  )
}

export default WorkItems
