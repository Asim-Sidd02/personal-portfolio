import React, { useState, useEffect } from 'react';
import "./header.css";

const links = [
  { id: 'home', label: 'Home', icon: 'uil-estate' },
  { id: 'about', label: 'About', icon: 'uil-user' },
  { id: 'skills', label: 'Skills', icon: 'uil-file-alt' },
  { id: 'services', label: 'Services', icon: 'uil-briefcase-alt' },
  { id: 'portfolio', label: 'Portfolio', icon: 'uil-scenery' },
  { id: 'contact', label: 'Contact', icon: 'uil-message' },
];

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  // Set the initial theme based on user preference or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    const handleExternalThemeChange = (event) => setTheme(event.detail);
    window.addEventListener('asim-theme-change', handleExternalThemeChange);
    return () => window.removeEventListener('asim-theme-change', handleExternalThemeChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('nav-menu-open', toggle);
  }, [toggle]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link of the section currently in view
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <nav className="nav container">
        <a href="#home" className="nav__logo">
          <span className="nav__logo-mark">A</span>
          <span className="nav__logo-text">Asim<span className="nav__logo-dot">.</span></span>
        </a>

        <div className={toggle ? "nav__menu show-menu" : "nav__menu"}>
          <ul className="nav__list">
            {links.map(({ id, label, icon }) => (
              <li className="nav__item" key={id}>
                <a
                  href={`#${id}`}
                  className={`nav__link ${active === id ? 'active-link' : ''}`}
                  onClick={() => setToggle(false)}
                >
                  <i className={`uil ${icon} nav__icon`}></i>{label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav__actions">
          <button
            type="button"
            className="nav__theme"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            <i className={`uil ${theme === 'dark' ? 'uil-sun' : 'uil-moon'}`}></i>
          </button>
          <a href="#contact" className="nav__cta">Let's talk</a>
          <button
            type="button"
            className={`nav__toggle ${toggle ? 'nav__toggle--open' : ''}`}
            onClick={() => setToggle(!toggle)}
            aria-label="Toggle menu"
            aria-expanded={toggle}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>
      {toggle && <div className="nav__backdrop" onClick={() => setToggle(false)}></div>}
    </header>
  );
};

export default Header;
