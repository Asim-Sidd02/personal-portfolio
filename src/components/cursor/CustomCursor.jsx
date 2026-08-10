import React, { useEffect, useRef } from 'react'
import './cursor.css'

const interactiveSelector = 'a, button, .button, .work__card, .office__card, .services__button, .nav__link, .qualification__button, .about__box, .skills__data, input, textarea, [data-cursor-hover]'

const CustomCursor = () => {
    const dotRef = useRef(null)
    const ringRef = useRef(null)
    const pointerPosition = useRef({ x: -100, y: -100 })
    const ringPosition = useRef({ x: -100, y: -100 })

    useEffect(() => {
        const supportsFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

        const handlePointerMove = (event) => {
            pointerPosition.current = { x: event.clientX, y: event.clientY }
            dotRef.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`
        }

        const handlePointerOver = (event) => {
            const hoveredTarget = event.target.closest(interactiveSelector)
            ringRef.current.classList.toggle('cursor__ring--active', Boolean(hoveredTarget))
        }

        const handlePointerDown = () => ringRef.current.classList.add('cursor__ring--click')
        const handlePointerUp = () => ringRef.current.classList.remove('cursor__ring--click')
        const handlePointerLeaveWindow = () => ringRef.current.classList.add('cursor__ring--hidden')
        const handlePointerEnterWindow = () => ringRef.current.classList.remove('cursor__ring--hidden')

        const animateRing = () => {
            ringPosition.current.x += (pointerPosition.current.x - ringPosition.current.x) * 0.16
            ringPosition.current.y += (pointerPosition.current.y - ringPosition.current.y) * 0.16
            ringRef.current.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0) translate(-50%, -50%)`
            frameId.current = requestAnimationFrame(animateRing)
        }

        const frameId = { current: null }

        document.body.classList.toggle('custom-cursor-enabled', supportsFinePointer)
        window.addEventListener('mousemove', handlePointerMove)
        window.addEventListener('mouseover', handlePointerOver)
        window.addEventListener('mousedown', handlePointerDown)
        window.addEventListener('mouseup', handlePointerUp)
        document.addEventListener('mouseleave', handlePointerLeaveWindow)
        document.addEventListener('mouseenter', handlePointerEnterWindow)
        frameId.current = requestAnimationFrame(animateRing)

        return () => {
            document.body.classList.remove('custom-cursor-enabled')
            window.removeEventListener('mousemove', handlePointerMove)
            window.removeEventListener('mouseover', handlePointerOver)
            window.removeEventListener('mousedown', handlePointerDown)
            window.removeEventListener('mouseup', handlePointerUp)
            document.removeEventListener('mouseleave', handlePointerLeaveWindow)
            document.removeEventListener('mouseenter', handlePointerEnterWindow)
            cancelAnimationFrame(frameId.current)
        }
    }, [])

    return (
        <div className="custom-cursor" aria-hidden="true">
            <div className="cursor__dot" ref={dotRef}></div>
            <div className="cursor__ring" ref={ringRef}></div>
        </div>
    )
}

export default CustomCursor
