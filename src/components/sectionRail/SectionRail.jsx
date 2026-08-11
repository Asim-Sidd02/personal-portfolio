import React, { useEffect, useRef, useState } from 'react'
import './sectionRail.css'

const SECTIONS = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'github', label: 'GitHub' },
    { id: 'skills', label: 'Skills' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
]

const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

const SectionRail = () => {
    const [activeId, setActiveId] = useState('home')
    const observerRef = useRef(null)

    useEffect(() => {
        const elements = SECTIONS.map((section) => document.getElementById(section.id)).filter(Boolean)

        const handleIntersect = (entries) => {
            const mostVisibleEntry = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
            mostVisibleEntry && setActiveId(mostVisibleEntry.target.id)
        }

        observerRef.current = new IntersectionObserver(handleIntersect, {
            threshold: [0.2, 0.4, 0.6, 0.8],
            rootMargin: '-15% 0px -35% 0px',
        })

        elements.forEach((element) => observerRef.current.observe(element))

        return () => observerRef.current?.disconnect()
    }, [])

    const activeIndex = Math.max(SECTIONS.findIndex((section) => section.id === activeId), 0)
    const progressPercent = (activeIndex / (SECTIONS.length - 1)) * 100

    return (
        <nav className="section-rail" aria-label="Section navigation">
            <span className="section-rail__track"></span>
            <span className="section-rail__progress" style={{ height: `${progressPercent}%` }}></span>

            <ul className="section-rail__list">
                {SECTIONS.map((section) => (
                    <li key={section.id} className="section-rail__item">
                        <button
                            type="button"
                            className={`section-rail__dot ${section.id === activeId ? 'section-rail__dot--active' : ''}`}
                            onClick={() => scrollToSection(section.id)}
                            aria-label={`Go to ${section.label}`}
                        >
                            <span className="section-rail__tooltip">{section.label}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default SectionRail
