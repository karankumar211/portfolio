import React, { useEffect, useRef } from 'react';
import styles from './Navbar.module.css';
import { FaSun, FaMoon } from 'react-icons/fa';
import gsap from 'gsap';

interface NavbarProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = headerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>(
      `.${styles.logo}, .${styles.navLink}, .${styles.themeToggle}`
    );

    const handleMouseMove = (e: MouseEvent, el: HTMLElement) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      // Limit magnetic movement to 35% of offset for a controlled, premium feel
      const pullX = x * 0.35;
      const pullY = y * 0.35;

      if (el.classList.contains(styles.themeToggle)) {
        gsap.to(el, {
          x: pullX,
          y: pullY,
          rotation: 15,
          scale: 1.1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      } else {
        gsap.to(el, {
          x: pullX,
          y: pullY,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      }
    };

    const handleMouseLeave = (el: HTMLElement) => {
      gsap.to(el, {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(1.2, 0.4)",
        overwrite: "auto"
      });
    };

    elements.forEach((el) => {
      const moveListener = (e: MouseEvent) => handleMouseMove(e, el);
      const leaveListener = () => handleMouseLeave(el);

      el.addEventListener('mousemove', moveListener);
      el.addEventListener('mouseleave', leaveListener);

      // Store listeners for easy cleanup
      (el as any)._magneticMove = moveListener;
      (el as any)._magneticLeave = leaveListener;
    });

    return () => {
      elements.forEach((el) => {
        if ((el as any)._magneticMove) {
          el.removeEventListener('mousemove', (el as any)._magneticMove);
        }
        if ((el as any)._magneticLeave) {
          el.removeEventListener('mouseleave', (el as any)._magneticLeave);
        }
      });
    };
  }, []);

  return (
    <header ref={headerRef} className={styles.navbar}>
      <a href="#" className={styles.logo}>
        Karan Kumar<span className={styles.logoAccent}>.</span>
      </a>
      
      <div className={styles.navRight}>
        <nav className={styles.navLinks}>
          <a href="#experience" className={styles.navLink}>about.</a>
          <a href="#projects" className={styles.navLink}>projects.</a>
          <a href="#skills" className={styles.navLink}>skills.</a>
        </nav>
        
        <button 
          className={styles.themeToggle} 
          onClick={toggleTheme} 
          aria-label="Toggle Theme"
        >
          {theme === 'light' ? (
            <FaMoon className={styles.toggleIcon} />
          ) : (
            <FaSun className={styles.toggleIcon} />
          )}
        </button>
      </div>
    </header>
  );
};

export default Navbar;