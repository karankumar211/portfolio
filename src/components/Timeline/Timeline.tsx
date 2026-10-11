// src/components/Timeline/Timeline.tsx
import React from 'react';
import styles from './Timeline.module.css';
import { experienceData } from '../../data/data';
import { FaBriefcase, FaMicrochip, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Timeline: React.FC = () => {
  return (
    <section className="section" id="experience">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Experience</span>
          <h2 className="section-title">Experience &amp; research</h2>
          <p className="section-subtitle">
            Professional frontend development delivering web features and UI systems, alongside institutional deep learning speech research.
          </p>
        </div>

        {/* Experience Cards Stack */}
        <div className={styles.experienceStack}>
          {experienceData.map((exp) => (
            <article key={exp.id} className={styles.experienceCard}>
              {/* Card Header */}
              <div className={styles.cardHeader}>
                <div className={styles.roleInfo}>
                  <div className={styles.roleTypeBadge}>
                    {exp.type === 'Work' ? (
                      <>
                        <FaBriefcase className={styles.badgeIcon} />
                        <span>Professional Experience</span>
                      </>
                    ) : (
                      <>
                        <FaMicrochip className={styles.badgeIcon} />
                        <span>Academic Research</span>
                      </>
                    )}
                  </div>
                  <h3 className={styles.roleTitle}>{exp.role}</h3>
                  <h4 className={styles.organization}>{exp.organization}</h4>
                </div>

                <div className={styles.metaInfo}>
                  <span className={styles.metaBadge}>
                    <FaCalendarAlt className={styles.metaIcon} />
                    {exp.duration}
                  </span>
                  <span className={styles.metaBadge}>
                    <FaMapMarkerAlt className={styles.metaIcon} />
                    {exp.location}
                  </span>
                </div>
              </div>

              {/* Summary */}
              <p className={styles.summaryText}>{exp.summary}</p>

              {/* Specific Bullet Points */}
              <div className={styles.bulletsContainer}>
                <ul className={styles.bulletList}>
                  {exp.points.map((pt, index) => (
                    <li key={index} className={styles.bulletItem}>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Badges */}
              <div className={styles.techStack}>
                {exp.technologies.map((tech) => (
                  <span key={tech} className={styles.techBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;