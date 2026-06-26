import React, { useEffect, useRef } from 'react';
import styles from './Skills.module.css';
import { skillsData } from '../../data/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { 
  FaReact, 
  FaGitAlt, 
  FaNodeJs, 
  FaDocker, 
  FaAws, 
  FaJava 
} from 'react-icons/fa';
import { 
  SiJavascript, 
  SiTypescript, 
  SiMongodb, 
  SiMysql, 
  SiCplusplus, 
  SiExpress, 
  SiNextdotjs, 
  SiRedux,
  SiPostman,
  SiJest,
  SiSelenium
} from 'react-icons/si';
import { 
  FiTerminal, 
  FiGlobe 
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const iconMap: { [key: string]: React.ReactNode } = {
  // Languages
  "C++": <SiCplusplus style={{ color: '#00599C' }} />,
  "Java": <FaJava style={{ color: '#ED8B00' }} />,
  "JavaScript": <SiJavascript style={{ color: '#F7DF1E', backgroundColor: '#000000', borderRadius: '2px' }} />,
  "TypeScript": <SiTypescript style={{ color: '#3178C6' }} />,
  
  // Backend
  "Node.js": <FaNodeJs style={{ color: '#339933' }} />,
  "Express": <SiExpress style={{ color: 'var(--dark)' }} />,
  "REST APIs": <FiTerminal style={{ color: 'var(--primary)' }} />,
  "WebSockets": <FiGlobe style={{ color: 'var(--primary)' }} />,
  
  // Frontend
  "React": <FaReact style={{ color: '#61DAFB' }} />,
  "Next.js": <SiNextdotjs style={{ color: '#000000' }} />,
  "Redux": <SiRedux style={{ color: '#764ABC' }} />,
  
  // Databases
  "MongoDB": <SiMongodb style={{ color: '#47A248' }} />,
  "MySQL": <SiMysql style={{ color: '#4479A1' }} />,
  
  // Cloud & DevOps
  "Docker": <FaDocker style={{ color: '#2496ED' }} />,
  "AWS": <FaAws style={{ color: '#FF9900' }} />,
  "Git": <FaGitAlt style={{ color: '#F05032' }} />,

  // Testing & Debugging
  "Postman": <SiPostman style={{ color: '#FF6C37' }} />,
  "Jest": <SiJest style={{ color: '#C21325' }} />,
  "Selenium": <SiSelenium style={{ color: '#43B02A' }} />
};

const Skills: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(`.${styles.skillCard}`);
    
    // Entry reveal animation
    gsap.fromTo(cards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: grid,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );

    // 3D Tilt Hover Listeners
    cards.forEach((card) => {
      card.style.transformStyle = 'preserve-3d';

      const handleMouseMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Normalize mouse coordinates around the card center (-0.5 to 0.5)
        const normX = (x / rect.width) - 0.5;
        const normY = (y / rect.height) - 0.5;

        // Rotate up to 12 degrees
        const tiltX = -normY * 12;
        const tiltY = normX * 12;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          y: -5, // lift card
          boxShadow: "6px 6px 0 var(--dark)", // maintain retro solid shadow on hover
          transformPerspective: 1000,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });

        // Slight parallax push for text content
        const content = card.querySelector(`.${styles.cardContent}`);
        if (content) {
          gsap.to(content, {
            z: 20,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          y: 0,
          boxShadow: "none",
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });

        const content = card.querySelector(`.${styles.cardContent}`);
        if (content) {
          gsap.to(content, {
            z: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      };

      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);

      // Store callbacks on element for cleanup
      (card as any)._tiltMove = handleMouseMove;
      (card as any)._tiltLeave = handleMouseLeave;
    });

    return () => {
      cards.forEach((card) => {
        if ((card as any)._tiltMove) {
          card.removeEventListener('mousemove', (card as any)._tiltMove);
        }
        if ((card as any)._tiltLeave) {
          card.removeEventListener('mouseleave', (card as any)._tiltLeave);
        }
      });
    };
  }, []);

  return (
    <section className={styles.skillsSection} id="skills">
      <div className={styles.titleContainer}>
        <h2 className={styles.sectionTitle}>TECHNICAL SKILLS</h2>
      </div>
      
      <div className={styles.skillsGrid} ref={gridRef}>
        {skillsData.map((category, index) => (
          <article key={index} className={styles.skillCard}>
            
            {category.type === "icons" ? (
              <div className={styles.iconsRow}>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className={styles.iconCapsule} title={skill}>
                    <div className={styles.skillIcon}>
                      {iconMap[skill] || <FiTerminal />}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.pillsRow}>
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className={styles.textPill}>
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{category.title}</h3>
              <p className={styles.cardDescription}>{category.description}</p>
            </div>

          </article>
        ))}
      </div>
    </section>
  );
};

export default Skills;