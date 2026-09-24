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
import ScrollProgress from './components/scrollProgress/ScrollProgress';
import CommandPalette from './components/commandPalette/CommandPalette';
import Terminal from './components/terminal/Terminal';
import Scene3D from './components/Background/Scene3D/Scene3D';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (loading) return;

    const sections = Array.from(document.querySelectorAll('.section'));
    if (!sections.length) return;

    // Prefer IntersectionObserver — cheaper than a scroll listener.
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-animate--visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12 }
      );
      sections.forEach((section) => observer.observe(section));
      return () => observer.disconnect();
    }

    // Fallback for very old browsers.
    sections.forEach((s) => s.classList.add('scroll-animate--visible'));
    return undefined;
  }, [loading]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Scene3D />
      <ScrollProgress />
      {loading ? (
        <Preloader />
      ) : (
        <div className="app-shell">
          <Header />
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
          <ScrollUp />
          <CommandPalette />
          <Terminal />
        </div>
      )}
    </>
  );
};

export default App;
