import React, { useEffect, useRef, useState } from 'react'
import './matrixRain.css'

const CHARACTERS = 'アァカサタナハマヤャラワ01ABCDEFGHIJK'.split('')

const MatrixRain = ({ onComplete }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        const fontSize = 16

        const resizeCanvas = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }
        resizeCanvas()
        window.addEventListener('resize', resizeCanvas)

        const columnCount = Math.floor(canvas.width / fontSize)
        const dropPositions = new Array(columnCount).fill(1)

        const draw = () => {
            context.fillStyle = 'rgba(0, 0, 0, 0.08)'
            context.fillRect(0, 0, canvas.width, canvas.height)
            context.fillStyle = '#5affa0'
            context.font = `${fontSize}px monospace`

            dropPositions.forEach((position, columnIndex) => {
                const character = CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
                context.fillText(character, columnIndex * fontSize, position * fontSize)
                const shouldReset = position * fontSize > canvas.height && Math.random() > 0.975
                dropPositions[columnIndex] = shouldReset ? 0 : position + 1
            })
        }

        const intervalId = setInterval(draw, 40)
        const timeoutId = setTimeout(onComplete, 6000)

        return () => {
            clearInterval(intervalId)
            clearTimeout(timeoutId)
            window.removeEventListener('resize', resizeCanvas)
        }
    }, [onComplete])

    return <canvas ref={canvasRef} className="matrix-rain"></canvas>
}

export default MatrixRain
