// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Skills from './components/skills/Skills';
import Services from './components/services/Services';
import Qualification from './components/qualification/Qualification';
import Work from './components/work/Work';
import Contact from './components/contact/Contact';
import Preloader from './components/loader/Preloader';

import LiquidEther from './components/Background/LiquidEther'; // <-- adjust path if needed

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      {loading ? (
        <Preloader />
      ) : (
        <div style={{ position: 'relative', width: '100%', minHeight: '100vh' }}>
          
          {/* ---------- LiquidEther background (fixed behind content) ---------- */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              width: '100%',
              height: '100%',
              zIndex: -1,            // keep behind everything
              pointerEvents: 'none', // prevents blocking UI interactions (remove if you want ether to receive mouse)
              overflow: 'hidden',
            }}
          >
            {/* If LiquidEther internally uses its own canvas that needs pointer events,
                remove pointerEvents: 'none' above or set this inner wrapper to pointerEvents: 'auto' */}
            <div style={{ width: '100%', height: '100%' }}>
              <LiquidEther
                colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
                mouseForce={20}
                cursorSize={100}
                isViscous={false}
                viscous={30}
                iterationsViscous={32}
                iterationsPoisson={32}
                resolution={0.5}
                isBounce={false}
                autoDemo={true}
                autoSpeed={0.5}
                autoIntensity={2.2}
                takeoverDuration={0.25}
                autoResumeDelay={3000}
                autoRampDuration={0.6}
              />
            </div>
          </div>

          {/* ---------- Foreground content ---------- */}
          <Header />
          <main className="main">
            <Home />
            <About />
            <Skills />
            <Services />
            <Qualification />
            <Work />
            <Contact />
          </main>
        </div>
      )}
    </>
  );
};

export default App;
