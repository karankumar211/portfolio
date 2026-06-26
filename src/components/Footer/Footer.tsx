// src/components/Footer/Footer.tsx
import React, { useEffect, useRef } from 'react';
import styles from './Footer.module.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer: React.FC = () => {
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (footerRef.current) {
      const tag = footerRef.current.querySelector(`.${styles.accentTag}`);
      const heading = footerRef.current.querySelector(`.${styles.thankYouHeading}`);

      const targets = [tag, heading].filter((el): el is Element => el !== null);

      if (targets.length > 0) {
        gsap.fromTo(targets,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 90%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    }
  }, []);

  return (
    <footer ref={footerRef} className={styles.footerSection} id="contact">
      <div className={styles.footerContainer}>
        
        <div className={styles.leftContent}>
          <div className={styles.thankYouBlock}>
            <span className={styles.accentTag}>GREETINGS</span>
            <h3 className={styles.thankYouHeading}>
              Thank You <br />
              <span className={styles.highlightText}>for visiting my portfolio.</span>
            </h3>
          </div>
        </div>

        <div className={styles.rightContent}>
          <h4 className={styles.linksTitle}>Quick Links</h4>
          <nav className={styles.footerLinks}>
            <a href="#" className={styles.footerLink}>home.</a>
            <a href="#experience" className={styles.footerLink}>about.</a>
            <a href="#projects" className={styles.footerLink}>projects.</a>
            <a href="#skills" className={styles.footerLink}>skills.</a>
          </nav>
        </div>

      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Karan Kumar. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;