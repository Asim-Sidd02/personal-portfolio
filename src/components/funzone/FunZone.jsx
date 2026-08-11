import React, { useState, useEffect, useRef, useCallback } from 'react';
import './funzone.css';

const gameDuration = 15;
const startingOrbSize = 64;
const minOrbSize = 28;
const comboWindow = 900;

const statusCopy = {
  idle: { title: 'Reflex Rush', subtitle: 'Chase the orb, chain combos, beat your best score.' },
  playing: { title: 'Go go go!', subtitle: 'Keep the streak alive — quick catches score more.' },
  finished: { title: "Time's up!", subtitle: 'Nice reflexes. Run it back?' },
};

const streakTiers = [
  { min: 6, label: 'BLAZING', points: 3, className: 'funzone__streak--blazing' },
  { min: 3, label: 'ON FIRE', points: 2, className: 'funzone__streak--hot' },
  { min: 0, label: 'WARMING UP', points: 1, className: 'funzone__streak--warm' },
];

const resolveTier = (streak) => streakTiers.find((tier) => streak >= tier.min) ?? streakTiers[streakTiers.length - 1];

const FunZone = ({ onBack }) => {
  const [phase, setPhase] = useState('idle');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => Number(window.localStorage.getItem('funzone-best-score')) || 0);
  const [timeLeft, setTimeLeft] = useState(gameDuration);
  const [orbPosition, setOrbPosition] = useState({ top: 40, left: 40 });
  const [orbSize, setOrbSize] = useState(startingOrbSize);
  const [streak, setStreak] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const [spotlight, setSpotlight] = useState({ x: 50, y: 30 });

  const arenaRef = useRef(null);
  const timerRef = useRef(null);
  const lastCatchRef = useRef(0);

  const moveOrb = useCallback((size) => {
    const bounds = arenaRef.current?.getBoundingClientRect();
    const maxTop = Math.max((bounds?.height ?? 260) - size, 10);
    const maxLeft = Math.max((bounds?.width ?? 320) - size, 10);
    setOrbPosition({ top: Math.random() * maxTop, left: Math.random() * maxLeft });
  }, []);

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(gameDuration);
    setOrbSize(startingOrbSize);
    setPhase('playing');
    lastCatchRef.current = 0;
    moveOrb(startingOrbSize);
  };

  const catchOrb = () => {
    const now = Date.now();
    const gap = now - lastCatchRef.current;
    const nextStreak = gap < comboWindow ? streak + 1 : 1;
    const tier = resolveTier(nextStreak);
    const nextSize = Math.max(orbSize - 2.2, minOrbSize);

    lastCatchRef.current = now;
    setStreak(nextStreak);
    setScore((current) => current + tier.points);
    setOrbSize(nextSize);
    setBurstKey((key) => key + 1);
    moveOrb(nextSize);
  };

  const handlePointerMove = (event) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    setSpotlight({
      x: ((event.clientX - bounds.left) / bounds.width) * 100,
      y: ((event.clientY - bounds.top) / bounds.height) * 100,
    });
  };

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = phase === 'playing' ? setInterval(() => setTimeLeft((current) => current - 1), 1000) : null;
    return () => clearInterval(timerRef.current);
  }, [phase]);

  useEffect(() => {
    phase === 'playing' && timeLeft <= 0 && setPhase('finished');
  }, [timeLeft, phase]);

  useEffect(() => {
    const nextBest = Math.max(best, score);
    phase === 'finished' && nextBest > best && setBest(nextBest);
    phase === 'finished' && window.localStorage.setItem('funzone-best-score', String(nextBest));
  }, [phase]);

  const actionMap = {
    idle: { label: 'Start', handler: startGame },
    playing: { label: 'Playing…', handler: catchOrb },
    finished: { label: 'Play Again', handler: startGame },
  };

  const copy = statusCopy[phase];
  const action = actionMap[phase];
  const tier = resolveTier(streak);

  return (
    <section
      className="funzone"
      onMouseMove={handlePointerMove}
      style={{ '--spot-x': `${spotlight.x}%`, '--spot-y': `${spotlight.y}%` }}
    >
      <div className="funzone__glow" />
      <div className="funzone__orbit funzone__orbit--a">🎮</div>
      <div className="funzone__orbit funzone__orbit--b">⚡</div>
      <div className="funzone__orbit funzone__orbit--c">✨</div>

      <div className="funzone__container">
        <button className="funzone__back" onClick={onBack}>← Back to Portfolio</button>

        <h1 className="funzone__title">Welcome to the Fun Zone</h1>
        <p className="funzone__intro">
          You found the secret hangout spot. The orb shrinks and speeds up the better you get — chain fast catches for combo multipliers.
        </p>

        <div className="funzone__card">
          <div className="funzone__cardHead">
            <h2>{copy.title}</h2>
            <span className={`funzone__streak ${tier.className}`}>{tier.label} ×{tier.points}</span>
          </div>
          <p className="funzone__subtitle">{copy.subtitle}</p>

          <div className="funzone__stats">
            <div className="funzone__stat">
              <span className="funzone__statValue">{score}</span>
              <span className="funzone__statLabel">Score</span>
            </div>
            <div className="funzone__stat">
              <span className="funzone__statValue">{timeLeft}s</span>
              <span className="funzone__statLabel">Time</span>
            </div>
            <div className="funzone__stat">
              <span className="funzone__statValue">{streak}</span>
              <span className="funzone__statLabel">Streak</span>
            </div>
            <div className="funzone__stat funzone__stat--best">
              <span className="funzone__statValue">{best}</span>
              <span className="funzone__statLabel">Best</span>
            </div>
          </div>

          <div className="funzone__arena" ref={arenaRef}>
            <span key={burstKey} className="funzone__burst" />
            <button
              className="funzone__orb"
              style={{
                top: orbPosition.top,
                left: orbPosition.left,
                width: orbSize,
                height: orbSize,
              }}
              onClick={catchOrb}
              disabled={phase !== 'playing'}
            >
              ●
            </button>
          </div>

          <button className="funzone__button" onClick={action.handler}>{action.label}</button>
        </div>
      </div>
    </section>
  );
};

export default FunZone;
