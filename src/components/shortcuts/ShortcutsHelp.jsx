import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import './shortcutsHelp.css'

const SHORTCUTS = [
  { keys: ['Ctrl', 'K'], macKeys: ['⌘', 'K'], label: 'Open the command palette' },
  { keys: ['`'], macKeys: ['`'], label: 'Open the interactive terminal' },
  { keys: ['↑', '↓'], macKeys: ['↑', '↓'], label: 'Navigate results / command history' },
  { keys: ['Enter'], macKeys: ['Enter'], label: 'Run the selected command' },
  { keys: ['Esc'], macKeys: ['Esc'], label: 'Close any open panel' },
  { keys: ['Ctrl', 'P'], macKeys: ['⌘', 'P'], label: 'Print / save this page as a PDF' },
  { keys: ['?'], macKeys: ['?'], label: 'Show this shortcuts panel' },
]

const isMac = () => window.navigator.platform.toLowerCase().includes('mac')

const ShortcutsHelp = () => {
  const [open, setOpen] = useState(false)
  const mac = isMac()

  useEffect(() => {
    const handleKeyDown = (event) => {
      const target = event.target
      const isTypingElsewhere = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
      const isHelpKey = event.key === '?' && !isTypingElsewhere
      isHelpKey && event.preventDefault()
      isHelpKey && setOpen((prev) => !prev)
      event.key === 'Escape' && setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <>
      <motion.button
        type="button"
        className="shortcuts-trigger"
        onClick={() => setOpen(true)}
        aria-label="Show keyboard shortcuts"
        title="Keyboard shortcuts"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="uil uil-question-circle"></i>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="shortcuts-overlay"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="shortcuts-panel"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="shortcuts-panel__header">
                <h3>Keyboard Shortcuts</h3>
                <i className="uil uil-times" onClick={() => setOpen(false)}></i>
              </div>

              <ul className="shortcuts-panel__list">
                {SHORTCUTS.map((shortcut) => (
                  <li key={shortcut.label} className="shortcuts-panel__item">
                    <span className="shortcuts-panel__label">{shortcut.label}</span>
                    <span className="shortcuts-panel__keys">
                      {(mac ? shortcut.macKeys : shortcut.keys).map((key) => (
                        <kbd key={key}>{key}</kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default ShortcutsHelp
