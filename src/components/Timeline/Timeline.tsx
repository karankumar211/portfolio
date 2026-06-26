import React, { useEffect, useRef } from 'react';
import styles from './Timeline.module.css';
import { experienceData } from '../../data/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Timeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll(`.${styles.timelineItem}`);
    
    gsap.fromTo(items,
      { opacity: 0, x: -45 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 85%",
          toggleActions: "play none none none"
        }
      }
    );
  }, []);

  return (
    <section className={styles.timelineSection} id="experience">
      <h2 className={styles.sectionTitle}>experience.</h2>
      
      <div className={styles.timelineContainer} ref={containerRef}>
        {experienceData.map((item) => (
          <article key={item.id} className={styles.timelineItem}>
            <h3 className={styles.role}>{item.role}</h3>
            
            <div className={styles.companyInfo}>
              <span className={styles.company}>{item.company}</span>
              <span className={styles.duration}>{item.duration}</span>
            </div>
            
            <p className={styles.description}>
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Timeline;