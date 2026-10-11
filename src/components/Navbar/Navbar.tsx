// src/components/Navbar/Navbar.tsx
import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { personalInfo } from '../../data/data';
import { FaSun, FaMoon, FaBars, FaTimes, FaExternalLinkAlt } from 'react-icons/fa';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Work', href: '#work' },
    { label: 'Impact', href: '#impact' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills', href: '#skills' },
    { label: 'Education', href: '#education' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navbarContainer}`}>
        <a href="#" className={styles.logo} aria-label="Karan Kumar Homepage">
          <span className={styles.logoBracket}>&lt;</span>
          <span className={styles.logoText}>KARAN.DEV</span>
          <span className={styles.logoBracket}>/&gt;</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.desktopNav} aria-label="Main Navigation">
          <ul className={styles.navList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.navLink}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.navActions}>
            <a
              href={personalInfo.resumeUrl}
              download="Karan_Kumar_Resume.pdf"
              className={styles.resumeBtn}
              aria-label="Download resume PDF"
            >
              <span>Resume</span>
              <FaExternalLinkAlt className={styles.resumeIcon} />
            </a>

            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </nav>

        {/* Mobile Actions: Theme toggle + Hamburger */}
        <div className={styles.mobileRight}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={styles.menuToggle}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        id="mobile-nav-menu"
        className={`${styles.mobileDrawer} ${mobileMenuOpen ? styles.mobileOpen : ''}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className={styles.mobileDrawerContent}>
          <ul className={styles.mobileNavList}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={styles.mobileNavLink}
                  onClick={handleLinkClick}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.mobileDrawerFooter}>
            <a
              href={personalInfo.resumeUrl}
              download="Karan_Kumar_Resume.pdf"
              className={styles.mobileResumeBtn}
              onClick={handleLinkClick}
            >
              <span>Download Resume</span>
              <FaExternalLinkAlt />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;