import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

const STATUS_MESSAGES = [
  'Curating the details',
  'Arranging the layout',
  'Polishing the pixels',
  'Almost there',
];

const CIRCUMFERENCE = 470;

const Preloader = () => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress((prev) => Math.min(prev + Math.ceil(Math.random() * 5), 100));
    }, 45);
    return () => clearInterval(intervalRef.current);
  }, []);

  const statusIndex = Math.min(
    Math.floor(progress / (100 / STATUS_MESSAGES.length)),
    STATUS_MESSAGES.length - 1
  );

  return (
    <StyledWrapper>
      <div className="glow" />

      <div className="core">
        <div className="blob-orbit">
          <svg className="ring-svg" viewBox="0 0 160 160">
            <circle className="ring-track" cx="80" cy="80" r="75" />
            <circle
              className="ring-progress"
              cx="80"
              cy="80"
              r="75"
              style={{
                strokeDashoffset: CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100,
              }}
            />
          </svg>

          <div className="blob">
            <span className="percent">{progress}</span>
          </div>
        </div>

        <div className="mark">
          <span className="mark-line" />
          <h3 className="mark-title">Asim Siddiqui</h3>
        </div>

        <span className="status" key={statusIndex}>
          {STATUS_MESSAGES[statusIndex]}
        </span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  background: #0d0b09;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 999999;
  animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  .glow {
    position: absolute;
    width: 42vw;
    height: 42vw;
    min-width: 420px;
    min-height: 420px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(201, 154, 88, 0.22) 0%, transparent 68%);
    animation: breathe 5s ease-in-out infinite;
  }

  @keyframes breathe {
    0%, 100% { transform: scale(1); opacity: 0.8; }
    50% { transform: scale(1.12); opacity: 1; }
  }

  .core {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .blob-orbit {
    position: relative;
    width: 168px;
    height: 168px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .ring-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    transform: rotate(-90deg);
  }

  .ring-track {
    fill: none;
    stroke: rgba(255, 255, 255, 0.08);
    stroke-width: 1;
  }

  .ring-progress {
    fill: none;
    stroke: var(--accent-color);
    stroke-width: 1;
    stroke-linecap: round;
    stroke-dasharray: 470;
    transition: stroke-dashoffset 0.15s linear;
  }

  .blob {
    width: 132px;
    height: 132px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(150deg, #c69a58 0%, var(--accent-color) 55%, #8a6224 100%);
    box-shadow:
      inset 0 0 0 8px rgb(255 255 255 / 25%),
      0 25px 50px rgba(0, 0, 0, 0.16);
    animation: blobMorph 8s cubic-bezier(0.45, 0, 0.55, 1) infinite;
  }

  @keyframes blobMorph {
    0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
  }

  .percent {
    font-family: var(--heading-font);
    font-style: italic;
    font-weight: var(--font-semi-bold);
    font-size: 2.25rem;
    color: #0d0b09;
    letter-spacing: 0.5px;
    font-variant-numeric: tabular-nums;
  }

  .mark {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.6rem;
  }

  .mark-line {
    width: 48px;
    height: 1px;
    background-color: var(--accent-color);
  }

  .mark-title {
    font-family: var(--heading-font);
    font-style: italic;
    font-weight: var(--font-medium);
    font-size: var(--h2-font-size);
    color: #f4ede3;
    letter-spacing: 0.5px;
  }

  .status {
    font-family: var(--body-font);
    font-size: var(--smaller-font-size);
    font-weight: var(--font-medium);
    letter-spacing: 3px;
    text-transform: uppercase;
    color: var(--accent-color);
    animation: statusFade 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  @keyframes statusFade {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (max-width: 480px) {
    .blob-orbit {
      width: 128px;
      height: 128px;
    }
    .blob {
      width: 100px;
      height: 100px;
    }
    .percent {
      font-size: 1.6rem;
    }
    .mark-title {
      font-size: var(--h3-font-size);
    }
  }
`;

export default Preloader;
