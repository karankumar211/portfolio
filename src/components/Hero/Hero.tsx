// src/components/Hero/Hero.tsx
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Hero.module.css';
import { personalInfo } from '../../data/data';
import profileImg from '../../assets/you.jpeg';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaDownload, FaCheck, FaCopy } from 'react-icons/fa';

const Hero: React.FC = () => {
  const [copied, setCopied] = useState(false);

  // Animation Refs
  const heroSectionRef = useRef<HTMLElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadlineRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const socialRowRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const profileRowsRef = useRef<HTMLDivElement>(null);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance animation timeline on page load
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(eyebrowRef.current, {
        y: -18,
        opacity: 0,
        duration: 0.6,
      })
        .from(
          headlineRef.current,
          {
            y: 28,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.35'
        )
        .from(
          subheadlineRef.current,
          {
            y: 20,
            opacity: 0,
            duration: 0.7,
          },
          '-=0.5'
        )
        .from(
          ctaGroupRef.current ? Array.from(ctaGroupRef.current.children) : [],
          {
            y: 16,
            opacity: 0,
            stagger: 0.12,
            duration: 0.55,
            ease: 'back.out(1.2)',
          },
          '-=0.4'
        )
        .from(
          socialRowRef.current ? Array.from(socialRowRef.current.children) : [],
          {
            y: 12,
            opacity: 0,
            stagger: 0.08,
            duration: 0.45,
          },
          '-=0.3'
        )
        .from(
          profileCardRef.current,
          {
            x: 35,
            opacity: 0,
            scale: 0.95,
            duration: 0.85,
          },
          '-=0.6'
        )
        .from(
          profileRowsRef.current ? Array.from(profileRowsRef.current.children) : [],
          {
            x: -12,
            opacity: 0,
            stagger: 0.07,
            duration: 0.4,
          },
          '-=0.45'
        );

      // 2. Interactive mouse movement animation (Spotlight follow + 3D Card tilt)
      const hero = heroSectionRef.current;
      const card = profileCardRef.current;
      const spotlight = spotlightRef.current;

      if (!hero || !card || !spotlight) return;

      const setSpotX = gsap.quickTo(spotlight, 'x', { duration: 0.45, ease: 'power2.out' });
      const setSpotY = gsap.quickTo(spotlight, 'y', { duration: 0.45, ease: 'power2.out' });

      const onMouseMove = (e: MouseEvent) => {
        const heroRect = hero.getBoundingClientRect();
        const relX = e.clientX - heroRect.left;
        const relY = e.clientY - heroRect.top;

        // Move spotlight
        gsap.to(spotlight, { opacity: 0.75, duration: 0.3 });
        setSpotX(relX);
        setSpotY(relY);

        // 3D Parallax tilt on profile card
        const cardRect = card.getBoundingClientRect();
        const cardCenterX = cardRect.left + cardRect.width / 2;
        const cardCenterY = cardRect.top + cardRect.height / 2;
        const deltaX = (e.clientX - cardCenterX) / (window.innerWidth / 2);
        const deltaY = (e.clientY - cardCenterY) / (window.innerHeight / 2);

        gsap.to(card, {
          rotateY: deltaX * 8,
          rotateX: -deltaY * 8,
          transformPerspective: 1000,
          duration: 0.4,
          ease: 'power2.out',
        });
      };

      const onMouseLeave = () => {
        gsap.to(spotlight, { opacity: 0, duration: 0.5 });
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.7,
          ease: 'power2.out',
        });
      };

      hero.addEventListener('mousemove', onMouseMove, { passive: true });
      hero.addEventListener('mouseleave', onMouseLeave);

      return () => {
        hero.removeEventListener('mousemove', onMouseMove);
        hero.removeEventListener('mouseleave', onMouseLeave);
      };
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroSectionRef} className={styles.heroSection} id="hero">
      {/* Ambient interactive spotlight following cursor */}
      <div ref={spotlightRef} className={styles.spotlightGlow} aria-hidden="true" />

      <div className={`container ${styles.heroContainer}`}>
        {/* Left Column: Focused Headline & Clean Actions */}
        <div className={styles.heroContent}>
          <span ref={eyebrowRef} className={styles.eyebrow}>
            Frontend Engineer · Full-Stack Developer
          </span>

          <h1 ref={headlineRef} className={styles.headline}>
            {personalInfo.headline}
          </h1>

          <p ref={subheadlineRef} className={styles.subheadline}>
            {personalInfo.subheadline}
          </p>

          {/* Action CTAs - Rectangular with subtle rounding, strictly NO pills */}
          <div ref={ctaGroupRef} className={styles.ctaGroup}>
            <a href="#work" className={styles.primaryCta}>
              <span>View projects</span>
              <FaArrowRight className={styles.ctaIcon} />
            </a>

            <a
              href={personalInfo.resumeUrl}
              download="Karan_Kumar_Resume.pdf"
              className={styles.secondaryCta}
            >
              <FaDownload className={styles.ctaIcon} />
              <span>Download resume</span>
            </a>
          </div>

          {/* Social Links & Direct Email */}
          <div ref={socialRowRef} className={styles.socialRow}>
            <span className={styles.socialLabel}>Connect:</span>
            <div className={styles.socialIcons}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="GitHub Profile"
                title="GitHub Profile"
              >
                <FaGithub />
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialLink}
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
              >
                <FaLinkedin />
              </a>

              <a
                href={`mailto:${personalInfo.email}`}
                className={styles.socialLink}
                aria-label={`Email ${personalInfo.email}`}
                title={`Email ${personalInfo.email}`}
              >
                <FaEnvelope />
              </a>

              <button
                type="button"
                onClick={copyEmail}
                className={styles.emailCopyBtn}
                title="Copy email address"
                aria-label="Copy email address to clipboard"
              >
                {copied ? (
                  <>
                    <FaCheck className={styles.checkIcon} />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <FaCopy />
                    <span>{personalInfo.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Clean, Personal Engineering Profile Panel with 3D Tilt */}
        <div className={styles.heroVisual}>
          <div ref={profileCardRef} className={styles.profileCard}>
            <div className={styles.profileHeader}>
              <img
                src={profileImg}
                alt={`${personalInfo.name} Portrait`}
                className={styles.avatar}
                width="84"
                height="84"
              />
              <div className={styles.profileHeaderInfo}>
                <h2 className={styles.profileName}>{personalInfo.name}</h2>
                <p className={styles.profileRole}>Frontend &amp; Full-Stack Developer</p>
                <p className={styles.profileMeta}>Hyderabad, India</p>
              </div>
            </div>

            <div ref={profileRowsRef} className={styles.profileBody}>
              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Education</span>
                <span className={styles.infoValue}>B.Tech in Computer Science (2023–2027)</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Experience</span>
                <span className={styles.infoValue}>Frontend Developer Intern at Galactix Solutions</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Research</span>
                <span className={styles.infoValue}>Speech Data Analytics at IIIT Hyderabad</span>
              </div>

              <div className={styles.infoRow}>
                <span className={styles.infoLabel}>Core Stack</span>
                <span className={styles.infoValue}>React, TypeScript, Redux Toolkit, Node.js, Docker</span>
              </div>
            </div>

            <div className={styles.profileFooter}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusNote}>Available for frontend and entry full-stack roles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;