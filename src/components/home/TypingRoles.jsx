import React, { useState, useEffect, useRef } from 'react'

/**
 * TypingRoles — a professional "typewriter" that types and deletes a rotating
 * list of role titles. Clean timing, blinking caret, pauses on each full word.
 * Respects prefers-reduced-motion (shows the first role statically).
 */
const DEFAULT_ROLES = [
  'Software Engineer',
  'Full-Stack Developer',
  'Shopify Developer',
  'Vue.js & Laravel Dev',
  'Flutter App Developer',
]

const TypingRoles = ({ roles = DEFAULT_ROLES, typingSpeed = 90, deletingSpeed = 45, pause = 1400 }) => {
  const [text, setText] = useState('')
  const [roleIndex, setRoleIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const reduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )

  useEffect(() => {
    if (reduced.current) {
      setText(roles[0])
      return undefined
    }

    const current = roles[roleIndex % roles.length]
    let delay = deleting ? deletingSpeed : typingSpeed

    if (!deleting && text === current) {
      delay = pause
    } else if (deleting && text === '') {
      delay = 300
    }

    const timer = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setRoleIndex((i) => (i + 1) % roles.length)
      } else {
        const next = deleting
          ? current.substring(0, text.length - 1)
          : current.substring(0, text.length + 1)
        setText(next)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, roleIndex, roles, typingSpeed, deletingSpeed, pause])

  return (
    <span className="home__typing" aria-label={roles[roleIndex % roles.length]}>
      <span className="home__typing-text">{text}</span>
      <span className="home__typing-caret" aria-hidden="true">|</span>
    </span>
  )
}

export default TypingRoles
