// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import GithubStats from './components/github/GithubStats';
import Skills from './components/skills/Skills';
import Services from './components/services/Services';
import Qualification from './components/qualification/Qualification';
import Work from './components/work/Work';
import Contact from './components/contact/Contact';
import Preloader from './components/loader/Preloader';
import ScrollUp from './components/ScrollUp/ScrollUp';
import CustomCursor from './components/cursor/CustomCursor';
import CommandPalette from './components/commandPalette/CommandPalette';
import Terminal from './components/terminal/Terminal';
import FunZone from './components/funzone/FunZone';
import ScrollProgress from './components/scrollProgress/ScrollProgress';
import KonamiCode from './components/easterEgg/KonamiCode';
import ShortcutsHelp from './components/shortcuts/ShortcutsHelp';

import LiquidEther from './components/Background/LiquidEther'; // <-- adjust path if needed

const App = () => {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState('site');

  useEffect(() => {
    console.log('%cHey there 👋', 'font-size: 20px; font-weight: bold; color: #a97c33;');
    console.log('%cCurious developer, huh? I like that.', 'font-size: 13px; color: #888;');
    console.log("%cTry pressing Ctrl/Cmd+K, the backtick key (\`), or '?' on this site.", 'font-size: 13px; color: #888;');
    console.log('%cLet\'s talk: asimsiddiqui8181@gmail.com', 'font-size: 13px; color: #a97c33;');
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (loading || page !== 'site') return;

    const sections = Array.from(document.querySelectorAll('.section'));

    const revealSections = () => {
      const triggerBottom = window.innerHeight * 0.85;
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < triggerBottom) {
          section.classList.add('scroll-animate--visible');
        }
      });
    };

    revealSections();
    window.addEventListener('scroll', revealSections, { passive: true });

    return () => window.removeEventListener('scroll', revealSections);
  }, [loading, page]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <CustomCursor />
      <ScrollProgress />
      <KonamiCode />
      <ShortcutsHelp />
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
          <Header onNavigateFun={() => setPage('fun')} />
          {page === 'fun' ? (
            <FunZone onBack={() => setPage('site')} />
          ) : (
            <main className="main" id="main-content">
              <Home />
              <About />
              <GithubStats />
              <Skills />
              <Services />
              <Qualification />
              <Work />
              <Contact />
            </main>
          )}
          <ScrollUp />
          <CommandPalette />
          <Terminal />
        </div>
      )}
    </>
  );
};

export default App;
