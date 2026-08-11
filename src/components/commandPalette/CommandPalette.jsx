import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './commandPalette.css';
import CV from '../../assets/Asim siddiqui.pdf';

const SECTIONS = [
  { id: 'home', label: 'Go to Home', icon: 'uil-estate' },
  { id: 'about', label: 'Go to About', icon: 'uil-user' },
  { id: 'github', label: 'Go to GitHub Activity', icon: 'uil-github-alt' },
  { id: 'skills', label: 'Go to Skills', icon: 'uil-file-alt' },
  { id: 'services', label: 'Go to Services', icon: 'uil-briefcase-alt' },
  { id: 'portfolio', label: 'Go to Portfolio', icon: 'uil-scenery' },
  { id: 'contact', label: 'Go to Contact', icon: 'uil-message' },
];

const LINKS = [
  { id: 'github', label: 'Open GitHub', icon: 'uil-github-alt', href: 'https://github.com/Asim-Sidd02' },
  { id: 'linkedin', label: 'Open LinkedIn', icon: 'uil-linkedin', href: 'https://www.linkedin.com/in/asim-siddiqui-a71731229/' },
  { id: 'instagram', label: 'Open Instagram', icon: 'uil-instagram', href: 'https://www.instagram.com/asim_sidd_/' },
];

const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  window.dispatchEvent(new CustomEvent('asim-theme-change', { detail: next }));
};

const downloadCV = () => {
  const anchor = document.createElement('a');
  anchor.href = CV;
  anchor.download = '';
  anchor.click();
};

const scrollToSection = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
const openLink = (href) => window.open(href, '_blank', 'noreferrer');

const readTheme = () => (document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const [theme, setTheme] = useState(readTheme);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const handleThemeToggle = (event) => {
    event?.stopPropagation();
    toggleTheme();
    setTheme(readTheme());
  };

  const commands = useMemo(
    () => [
      ...SECTIONS.map((section) => ({ ...section, run: () => scrollToSection(section.id) })),
      { id: 'theme', label: 'Toggle Light / Dark Theme', icon: theme === 'dark' ? 'uil-sun' : 'uil-moon', run: handleThemeToggle },
      { id: 'cv', label: 'Download CV', icon: 'uil-file-download-alt', run: downloadCV },
      { id: 'top', label: 'Scroll to Top', icon: 'uil-arrow-up', run: scrollToTop },
      ...LINKS.map((link) => ({ ...link, run: () => openLink(link.href) })),
    ],
    [theme]
  );

  const filtered = useMemo(
    () => commands.filter((command) => command.label.toLowerCase().includes(query.toLowerCase())),
    [commands, query]
  );

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      const isToggleCombo = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k';
      isToggleCombo && event.preventDefault();
      isToggleCombo && setOpen((prev) => !prev);
      event.key === 'Escape' && setOpen(false);
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    const handleExternalThemeChange = (event) => setTheme(event.detail);
    window.addEventListener('asim-theme-change', handleExternalThemeChange);
    return () => window.removeEventListener('asim-theme-change', handleExternalThemeChange);
  }, []);

  useEffect(() => {
    open && inputRef.current?.focus();
    !open && setQuery('');
    !open && setActiveIndex(0);
  }, [open]);

  useEffect(() => setActiveIndex(0), [query]);

  useEffect(() => {
    const activeItem = listRef.current?.children[activeIndex];
    activeItem?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const execute = (command) => {
    command?.run();
    setOpen(false);
  };

  const handleInputKeyDown = (event) => {
    const keyActions = {
      ArrowDown: () => setActiveIndex((prev) => Math.min(prev + 1, filtered.length - 1)),
      ArrowUp: () => setActiveIndex((prev) => Math.max(prev - 1, 0)),
      Enter: () => execute(filtered[activeIndex]),
    };
    keyActions[event.key]?.();
  };

  return (
    <>
      <motion.button
        type="button"
        className="command-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <i className="uil uil-search"></i>
        <span className="command-trigger__hint">⌘K</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="command-overlay"
            onClick={() => setOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            <motion.div
              className="command-palette"
              onClick={(event) => event.stopPropagation()}
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="command-palette__input-row">
                <i className="uil uil-search"></i>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={handleInputKeyDown}
                  placeholder="Type a command or search…"
                  className="command-palette__input"
                />
                <button
                  type="button"
                  className="command-palette__theme-toggle"
                  onClick={handleThemeToggle}
                  aria-label="Toggle light and dark theme"
                  title="Toggle theme"
                >
                  <i className={`uil ${theme === 'dark' ? 'uil-sun' : 'uil-moon'}`}></i>
                </button>
                <span className="command-palette__esc">ESC</span>
              </div>

              <ul className="command-palette__list" ref={listRef}>
                {filtered.map((command, index) => (
                  <motion.li
                    key={command.id}
                    className={`command-palette__item ${index === activeIndex ? 'command-palette__item--active' : ''}`}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => execute(command)}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.025 }}
                  >
                    <i className={`uil ${command.icon}`}></i>
                    <span>{command.label}</span>
                  </motion.li>
                ))}
                {filtered.length === 0 && <li className="command-palette__empty">No results found</li>}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CommandPalette;
