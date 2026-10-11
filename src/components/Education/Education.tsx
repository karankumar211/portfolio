// src/components/Education/Education.tsx
import React from 'react';
import styles from './Education.module.css';
import { educationData } from '../../data/data';
import { FaGraduationCap, FaCalendarAlt, FaMapMarkerAlt, FaAward } from 'react-icons/fa';

const Education: React.FC = () => {
  return (
    <section className="section" id="education">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">ACADEMIC BACKGROUND</span>
          <h2 className="section-title">Education</h2>
          <p className="section-subtitle">
            Formal computer science fundamentals, data structures, systems architecture, and software engineering principles.
          </p>
        </div>

        {/* Compact Education Card */}
        <div className={styles.educationCard}>
          <div className={styles.cardHeader}>
            <div className={styles.degreeInfo}>
              <div className={styles.degreeTitleRow}>
                <FaGraduationCap className={styles.capIcon} />
                <h3 className={styles.degreeTitle}>{educationData.degree}</h3>
              </div>
              <h4 className={styles.institution}>{educationData.institution}</h4>
            </div>

            <div className={styles.gradeBadge}>
              <FaAward className={styles.gradeIcon} />
              <span className={styles.gradeText}>CGPA: {educationData.grade}</span>
            </div>
          </div>

          <div className={styles.metaRow}>
            <span className={styles.metaItem}>
              <FaCalendarAlt className={styles.metaIcon} />
              {educationData.duration}
            </span>
            <span className={styles.metaItem}>
              <FaMapMarkerAlt className={styles.metaIcon} />
              {educationData.location}
            </span>
          </div>

          {/* Relevant Coursework */}
          <div className={styles.courseworkBox}>
            <h5 className={styles.courseworkLabel}>Core Coursework &amp; Fundamentals:</h5>
            <div className={styles.courseworkTags}>
              {educationData.coursework.map((course, index) => (
                <span key={index} className={styles.courseTag}>
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
