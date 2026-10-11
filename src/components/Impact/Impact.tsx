// src/components/Impact/Impact.tsx
import React from 'react';
import styles from './Impact.module.css';
import { impactMetrics } from '../../data/data';

const Impact: React.FC = () => {
  return (
    <section className="section" id="impact">
      <div className="container">
        {/* Section Header - Human, clear label per Section 17.4 */}
        <div className="section-header">
          <span className="section-eyebrow">Internship Experience</span>
          <h2 className="section-title">Internship impact</h2>
          <p className="section-subtitle">
            Reported from Frontend Developer Internship at Galactix Solutions Pvt. Ltd. Verified through code reviews, test coverage reports, and SonarQube quality gates.
          </p>
        </div>

        {/* Metrics Grid - Clean, breathable, no decorative corner counters */}
        <div className={styles.metricsGrid}>
          {impactMetrics.map((metric, index) => (
            <div key={index} className={styles.metricCard}>
              <span className={styles.metricValue}>{metric.value}</span>
              <h3 className={styles.metricLabel}>{metric.label}</h3>
              <p className={styles.metricContext}>{metric.context}</p>
            </div>
          ))}
        </div>

        {/* Clean Context Note */}
        <p className={styles.attributionNote}>
          Attributed specifically to frontend engineering responsibilities at <strong>Galactix Solutions Pvt. Ltd.</strong> across React micro-frontends and REST API integrations.
        </p>
      </div>
    </section>
  );
};

export default Impact;
