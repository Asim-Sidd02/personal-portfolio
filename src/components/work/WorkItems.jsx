import React, { useRef } from 'react'
import { motion } from 'motion/react'

const WorkItems = React.forwardRef(({ item }, ref) => {
  const cardRef = useRef(null)

  // Interactive 3D tilt + spotlight that follows the cursor.
  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Normalized -0.5 .. 0.5 from center
    const px = x / rect.width - 0.5
    const py = y / rect.height - 0.5

    // Max tilt kept small (7deg) so it stays professional, not gimmicky.
    const rotateY = px * 14
    const rotateX = -py * 14

    card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`)
    card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`)
    card.style.setProperty('--mx', `${x}px`)
    card.style.setProperty('--my', `${y}px`)
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    if (!card) return
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
  }

  return (
    <motion.div
      ref={ref}
      className="work__card-wrapper"
      style={{ height: '100%' }}
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="work__card work__card--tilt"
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <span className="work__card-glow" aria-hidden="true" />
        <div className="work__card-inner">
          <img src={item.image} alt='' className='work__img' />
          <h3 className="work__title">{item.title}</h3>
          <a href={item.url} className="work__button" target="_blank" rel="noopener noreferrer">
            View <i className="bx bx-right-arrow-alt work__button-icon"></i>
          </a>
        </div>
      </div>
    </motion.div>
  )
})

export default WorkItems
