import React, { useEffect, useRef } from 'react';
import styles from './Projects.module.css';
import { projectsData } from '../../data/data';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = container.querySelectorAll<HTMLElement>(`.${styles.projectCard}`);

    // Entry reveal animation
    gsap.fromTo(cards,
      { opacity: 0, x: 80, scale: 0.95 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        stagger: 0.15,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
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

        // Rotate up to 15 degrees
        const tiltX = -normY * 15;
        const tiltY = normX * 15;

        gsap.to(card, {
          rotateX: tiltX,
          rotateY: tiltY,
          y: -8, // subtle card lift
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.15)",
          transformPerspective: 1000,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });

        // Pull inner content forward to create true depth (parallax pop)
        const content = card.querySelector(`.${styles.projectContent}`);
        if (content) {
          gsap.to(content, {
            z: 25,
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

        const content = card.querySelector(`.${styles.projectContent}`);
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
    <section className={styles.projectsSection} id="projects">
      <h2 className={styles.sectionTitle}>projects.</h2>
      
      <div className={styles.projectList} ref={containerRef}>
        {projectsData.map((project) => (
          <article key={project.id} className={styles.projectCard}>
            <div className={styles.projectContent}>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              
              <div className={styles.techStack}>
                {project.techStack.map((tech, index) => (
                  <span key={index} className={styles.techItem}>
                    {tech}
                  </span>
                ))}
              </div>

              <p className={styles.projectDescription}>
                {project.description}
              </p>
              
              {(project.problemSolved || project.contribution) && (
                <div className={styles.detailsList}>
                  {project.problemSolved && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Challenge:</span> {project.problemSolved}
                    </div>
                  )}
                  {project.contribution && (
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Role/Impact:</span> {project.contribution}
                    </div>
                  )}
                </div>
              )}
              
              <div className={styles.projectActions}>
                {project.githubLink ? (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className={styles.primaryButton}>
                    View on GitHub
                  </a>
                ) : (
                  <span className={styles.inProgressButton}>Under Process</span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;