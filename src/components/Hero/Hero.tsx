import React, { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { personalInfo, statsData } from '../../data/data';
import profileImg from '../../assets/you.jpeg';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TypeAnimation } from 'react-type-animation';
import ParticlesBg from './ParticlesBg';

gsap.registerPlugin(ScrollTrigger);

const Hero: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Select the resume button and individual social icons for magnetic hover attraction
    const magneticTargets = section.querySelectorAll(
      `.${styles.resumeButton}, .${styles.icon}`
    );

    magneticTargets.forEach((el) => {
      const target = el as HTMLElement;

      const onMouseMove = (e: MouseEvent) => {
        const bound = target.getBoundingClientRect();
        const mouseX = e.clientX - (bound.left + bound.width / 2);
        const mouseY = e.clientY - (bound.top + bound.height / 2);

        // Magnet strength offset coefficient (0.35)
        gsap.to(target, {
          x: mouseX * 0.35,
          y: mouseY * 0.35,
          duration: 0.3,
          ease: 'power2.out',
        });
      };

      const onMouseLeave = () => {
        // Spring back to original position
        gsap.to(target, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1, 0.3)',
        });
      };

      target.addEventListener('mousemove', onMouseMove);
      target.addEventListener('mouseleave', onMouseLeave);
    });

    // Count-up animation for stats numbers
    const counters = section.querySelectorAll<HTMLElement>('[data-target]');
    counters.forEach((counter) => {
      const targetValue = parseFloat(counter.getAttribute('data-target') || '0');
      const decimals = parseInt(counter.getAttribute('data-decimals') || '0', 10);
      
      const countObj = { val: 0 };
      gsap.to(countObj, {
        val: targetValue,
        duration: 1.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: counter,
          start: "top 95%",
          toggleActions: "play none none none"
        },
        onUpdate: () => {
          counter.textContent = countObj.val.toFixed(decimals);
        }
      });
    });
  }, []);

  return (
    <div className={styles.heroWrapper}>
      <ParticlesBg />
      <section ref={sectionRef} className={styles.heroSection}>
        <div className={styles.heroMain}>
          <div className={styles.textContent}>
            <p className={styles.greeting}>Hi, my name is</p>
            <h1 className={styles.name}>{personalInfo.name}.</h1>
            <p className={styles.bio}>
              I am a{' '}
              <span className={styles.typedText}>
                <TypeAnimation
                  sequence={[
                    'Software Engineer',
                    2000,
                    'Frontend Developer',
                    2000,
                    'Backend Developer',
                    2000,
                    'Full Stack Developer',
                    2000
                  ]}
                  wrapper="span"
                  speed={40}
                  repeat={Infinity}
                />
              </span>{' '}
              {personalInfo.shortBio}
            </p>
            
            <div className={styles.actionsContainer}>
              <a 
                href={`${personalInfo.resumeUrl}?v=${new Date().getTime()}`} 
                download="Karan_Kumar_Resume.pdf" 
                className={styles.resumeButton}
              >
                Resume
              </a>
              <div className={styles.socialLinks}>
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub className={styles.icon} />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedin className={styles.icon} />
                </a>
                <a href={personalInfo.leetcode} target="_blank" rel="noopener noreferrer" aria-label="LeetCode">
                  <SiLeetcode className={styles.icon} />
                </a>
              </div>
            </div>
          </div>

          <div className={styles.imageContent}>
            <img 
              src={profileImg} 
              alt={`${personalInfo.name} Portrait`} 
              className={styles.profileImage}
            />
          </div>
        </div>

        {/* Stats Row */}
        <div className={styles.statsRow}>
          {statsData.map((stat, index) => (
            <div key={index} className={styles.statItem}>
              <div className={styles.statNumberContainer}>
                <span 
                  className={styles.statNumber} 
                  data-target={stat.value} 
                  data-decimals={stat.decimals || 0}
                >
                  0
                </span>
                {stat.suffix && <span className={styles.statAccent}>{stat.suffix}</span>}
              </div>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Hero;