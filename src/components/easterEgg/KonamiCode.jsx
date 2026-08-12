import React, { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './konamiCode.css'

const SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']

const COLORS = ['#a97c33', '#41b883', '#3c873a', '#02569B', '#95BF47', '#f0b90b', '#e63946']

const spawnConfetti = (canvas) => {
  const ctx = canvas.getContext('2d')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const particles = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: -20 - Math.random() * canvas.height * 0.3,
    size: 6 + Math.random() * 6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    speedY: 2 + Math.random() * 3,
    speedX: (Math.random() - 0.5) * 3,
    rotation: Math.random() * 360,
    spin: (Math.random() - 0.5) * 10,
    opacity: 1,
  }))

  let frame

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      particle.y += particle.speedY
      particle.x += particle.speedX
      particle.rotation += particle.spin
      particle.opacity = Math.max(0, 1 - particle.y / canvas.height)

      ctx.save()
      ctx.globalAlpha = particle.opacity
      ctx.translate(particle.x, particle.y)
      ctx.rotate((particle.rotation * Math.PI) / 180)
      ctx.fillStyle = particle.color
      ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.6)
      ctx.restore()
    })

    const stillFalling = particles.some((particle) => particle.opacity > 0.02)
    frame = stillFalling ? requestAnimationFrame(draw) : null
    stillFalling || ctx.clearRect(0, 0, canvas.width, canvas.height)
  }

  draw()
  return () => cancelAnimationFrame(frame)
}

const KonamiCode = () => {
  const [unlocked, setUnlocked] = useState(false)
  const canvasRef = useRef(null)
  const progressRef = useRef(0)

  const triggerUnlock = () => {
    setUnlocked(true)
    canvasRef.current && spawnConfetti(canvasRef.current)
    setTimeout(() => setUnlocked(false), 4000)
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target
      const isTypingElsewhere = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
      const expected = SEQUENCE[progressRef.current]
      const pressed = event.key.length === 1 ? event.key.toLowerCase() : event.key
      const isMatch = !isTypingElsewhere && pressed === expected

      progressRef.current = isMatch ? progressRef.current + 1 : 0

      const completed = progressRef.current === SEQUENCE.length
      completed && (progressRef.current = 0)
      completed && triggerUnlock()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="konami-confetti" aria-hidden="true"></canvas>

      <AnimatePresence>
        {unlocked && (
          <motion.div
            className="konami-toast"
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="konami-toast__icon">🎮</span>
            <div>
              <p className="konami-toast__title">Achievement Unlocked</p>
              <p className="konami-toast__subtitle">You found the Konami code. Respect.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default KonamiCode
