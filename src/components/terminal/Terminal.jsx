import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import './terminal.css'
import MatrixRain from './MatrixRain'

const JOKES = [
    'Why do programmers prefer dark mode? Because light attracts bugs.',
    'A SQL query walks into a bar, walks up to two tables and asks: "Can I join you?"',
    'There are only 10 kinds of people: those who understand binary and those who don\u2019t.',
    'I would tell you a UDP joke, but you might not get it.',
    '99 little bugs in the code, 99 little bugs. Take one down, patch it around, 127 little bugs in the code.',
]

const COFFEE_ART = [
    '        ) ) )',
    '       ( ( (',
    '      .......',
    "      |     |]",
    '      \\     /',
    "       `---'",
    'fueled and ready to ship.',
]

const HELP_LINES = [
    'available commands:',
    '  help        show this list',
    '  about       who I am',
    '  skills      what I work with',
    '  projects    things I have shipped',
    '  contact     how to reach me',
    '  social      github / linkedin / instagram',
    '  whoami      guess',
    '  date        current date and time',
    '  theme       toggle light / dark theme',
    '  joke        a programmer joke',
    '  coffee      brew something',
    '  matrix      wake up, Neo',
    '  sudo connect     try it',
    '  clear       clear the screen',
    '  exit        close the terminal',
]

const ABOUT_LINES = [
    "Asim Siddiqui \u2014 Software Engineer based in Hyderabad.",
    'Vue.js, Laravel, Flutter, React, Node.js and Shopify, end to end.',
    "Currently building at Adab Digital, and shipping side projects for fun.",
]

const SKILLS_LINES = [
    'frontend : HTML, CSS, React, Flutter, Bootstrap',
    'backend  : PHP, Node.js, Python, Java',
    'data     : MySQL, Firebase',
    'tooling  : Git',
]

const PROJECTS_LINES = [
    'personal     : Weather App, TaskMate, Spendster, Magic Mirror,',
    '               Mental Health Chatbot, Plan & Scheduling App',
    'professional : Somany Ceramics, Jurix Legal Apps, Aptronix India',
    "type 'sudo connect' if you like what you see.",
]

const CONTACT_LINES = [
    'scroll to the contact section, or use the form there.',
    "you can also open the command palette with ctrl/cmd + k.",
]

const SOCIAL_LINES = [
    'github    -> https://github.com/Asim-Sidd02',
    'linkedin  -> https://www.linkedin.com/in/asim-siddiqui-a71731229/',
    'instagram -> https://www.instagram.com/asim_sidd_/',
]

const CONNECT_LINES = [
    'access granted.',
    'initializing connection sequence... done.',
    'result: this engineer ships fast, cares about detail, and is always up for a good conversation.',
    "scroll down to the contact section and say hello.",
]

const toggleSiteTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
    const next = current === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', next)
    localStorage.setItem('theme', next)
    window.dispatchEvent(new CustomEvent('asim-theme-change', { detail: next }))
    return `theme switched to ${next}.`
}

const openExternal = (href) => window.open(href, '_blank', 'noreferrer')

const openGithub = () => {
    openExternal('https://github.com/Asim-Sidd02')
    return ['opening github\u2026']
}

const openLinkedin = () => {
    openExternal('https://www.linkedin.com/in/asim-siddiqui-a71731229/')
    return ['opening linkedin\u2026']
}

const WELCOME_LINES = [
    "hey, welcome to Asim's terminal.",
    "type 'help' to see what this thing can do.",
]

const Terminal = () => {
    const [open, setOpen] = useState(false)
    const [lines, setLines] = useState(WELCOME_LINES.map((text) => ({ type: 'output', text })))
    const [input, setInput] = useState('')
    const [historyIndex, setHistoryIndex] = useState(null)
    const [matrixActive, setMatrixActive] = useState(false)
    const commandHistoryRef = useRef([])
    const inputRef = useRef(null)
    const bodyRef = useRef(null)

    const textCommands = useMemo(
        () => ({
            help: () => HELP_LINES,
            about: () => ABOUT_LINES,
            skills: () => SKILLS_LINES,
            projects: () => PROJECTS_LINES,
            contact: () => CONTACT_LINES,
            social: () => SOCIAL_LINES,
            whoami: () => ['a curious visitor, poking around a developer\u2019s terminal. respect.'],
            date: () => [new Date().toString()],
            joke: () => [JOKES[Math.floor(Math.random() * JOKES.length)]],
            coffee: () => COFFEE_ART,
            theme: () => [toggleSiteTheme()],
            matrix: () => {
                setMatrixActive(true)
                return ['wake up, Neo...']
            },
            'sudo connect': () => CONNECT_LINES,
            github: openGithub,
            linkedin: openLinkedin,
        }),
        []
    )

    useEffect(() => {
        open && inputRef.current?.focus()
    }, [open])

    useEffect(() => {
        bodyRef.current && (bodyRef.current.scrollTop = bodyRef.current.scrollHeight)
    }, [lines])

    useEffect(() => {
        const handleGlobalKeyDown = (event) => {
            const target = event.target
            const isTypingElsewhere = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA'
            const isToggleKey = event.key === '\u0060' && !isTypingElsewhere
            isToggleKey && setOpen((previous) => !previous)
            event.key === 'Escape' && open && setOpen(false)
        }
        window.addEventListener('keydown', handleGlobalKeyDown)
        return () => window.removeEventListener('keydown', handleGlobalKeyDown)
    }, [open])

    const appendLines = (entries) => setLines((previous) => [...previous, ...entries])

    const runCommand = (rawInput) => {
        const trimmed = rawInput.trim()
        const empty = trimmed.length === 0
        empty || (commandHistoryRef.current = [trimmed, ...commandHistoryRef.current])
        setHistoryIndex(null)

        empty || appendLines([{ type: 'command', text: trimmed }])

        const lowered = trimmed.toLowerCase()

        const specialActions = {
            clear: () => setLines([]),
            exit: () => setOpen(false),
            close: () => setOpen(false),
        }

        const specialAction = specialActions[lowered]
        specialAction && specialAction()

        const isSpecial = Boolean(specialAction)
        const shouldRunText = !empty && !isSpecial

        shouldRunText &&
            appendLines([
                {
                    type: 'output',
                    text:
                        (textCommands[lowered] ? textCommands[lowered]() : [
                            `command not found: ${trimmed}`,
                            "type 'help' to see available commands.",
                        ]),
                },
            ])

        setInput('')
    }

    const handleKeyDown = (event) => {
        const keyActions = {
            Enter: () => runCommand(input),
            ArrowUp: () => {
                event.preventDefault()
                const nextIndex = Math.min((historyIndex ?? -1) + 1, commandHistoryRef.current.length - 1)
                const hasEntry = nextIndex >= 0
                hasEntry && setHistoryIndex(nextIndex)
                hasEntry && setInput(commandHistoryRef.current[nextIndex])
            },
            ArrowDown: () => {
                event.preventDefault()
                const nextIndex = (historyIndex ?? 0) - 1
                const withinRange = nextIndex >= 0
                setHistoryIndex(withinRange ? nextIndex : null)
                setInput(withinRange ? commandHistoryRef.current[nextIndex] : '')
            },
        }
        keyActions[event.key]?.()
    }

    return (
        <>
            <motion.button
                type="button"
                className="terminal-trigger"
                onClick={() => setOpen(true)}
                aria-label="Open interactive terminal"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
            >
                <i className="uil uil-terminal"></i>
                <span className="terminal-trigger__hint">try my terminal</span>
            </motion.button>

            <AnimatePresence>
                {matrixActive && <MatrixRain onComplete={() => setMatrixActive(false)} />}
            </AnimatePresence>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="terminal-overlay"
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
                    >
                        <motion.div
                            className="terminal-window"
                            onClick={(event) => event.stopPropagation()}
                            initial={{ opacity: 0, y: 24, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 16, scale: 0.98 }}
                            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="terminal-window__titlebar">
                                <span className="terminal-window__dot terminal-window__dot--red"></span>
                                <span className="terminal-window__dot terminal-window__dot--yellow"></span>
                                <span className="terminal-window__dot terminal-window__dot--green"></span>
                                <span className="terminal-window__title">asim@portfolio: ~</span>
                                <i
                                    className="uil uil-times terminal-window__close"
                                    onClick={() => setOpen(false)}
                                ></i>
                            </div>

                            <div className="terminal-window__body" ref={bodyRef}>
                                {lines.map((line, index) => (
                                    <div key={index} className={`terminal-line terminal-line--${line.type}`}>
                                        {line.type === 'command' && <span className="terminal-line__prompt">guest@asim ~ %</span>}
                                        {Array.isArray(line.text) ? (
                                            line.text.map((subLine, subIndex) => <div key={subIndex}>{subLine}</div>)
                                        ) : (
                                            <span>{line.text}</span>
                                        )}
                                    </div>
                                ))}

                                <div className="terminal-line terminal-line--input">
                                    <span className="terminal-line__prompt">guest@asim ~ %</span>
                                    <input
                                        ref={inputRef}
                                        value={input}
                                        onChange={(event) => setInput(event.target.value)}
                                        onKeyDown={handleKeyDown}
                                        className="terminal-window__input"
                                        spellCheck="false"
                                        autoComplete="off"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}

export default Terminal
