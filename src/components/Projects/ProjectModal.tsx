import React, { useEffect } from 'react';
import styles from './ProjectModal.module.css';
import type { Project } from '../../data/data';
import { FaTimes, FaGithub, FaCheckCircle, FaExclamationTriangle, FaCodeBranch, FaCogs } from 'react-icons/fa';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { details } = project;

  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerInfo}>
            <span className={styles.eyebrow}>{project.eyebrow}</span>
            <h2 id="modal-title" className={styles.title}>{project.title}</h2>
            <p className={styles.tagline}>{project.tagline}</p>
          </div>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close project modal">
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <div className={styles.body}>
          {/* Action Bar */}
          <div className={styles.actionBar}>
            <div className={styles.actionButtons}>
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.actionLink}
                  aria-label={`View ${project.title} source code on GitHub`}
                >
                  <FaGithub />
                  <span>Inspect Source Code</span>
                </a>
              )}
            </div>

            <div className={styles.techStack}>
              {project.techStack.map((tech) => (
                <span key={tech} className={styles.techBadge}>{tech}</span>
              ))}
            </div>
          </div>

          {/* Screenshot Artifact */}
          <div className={styles.imageContainer}>
            <img
              src={project.imageUrl}
              alt={project.imageAlt}
              className={styles.modalImage}
              loading="lazy"
            />
          </div>

          {/* Section: Problem & Goals */}
          <section className={styles.modalSection}>
            <h3 className={styles.sectionHeading}>
              <FaCheckCircle className={styles.sectionIcon} />
              Problem &amp; Objectives
            </h3>
            <p className={styles.sectionText}>{details.problemAndGoals}</p>
          </section>

          {/* Section: Architecture Overview */}
          <section className={styles.modalSection}>
            <h3 className={styles.sectionHeading}>
              <FaCodeBranch className={styles.sectionIcon} />
              System Architecture &amp; Data Flow
            </h3>
            {details.architectureDiagram && (
              <div className={styles.architectureBox}>
                <code className={styles.diagramCode}>{details.architectureDiagram}</code>
              </div>
            )}
            <p className={styles.sectionText}>{details.architectureNotes}</p>
          </section>

          {/* Section: Key Features & Flows */}
          <section className={styles.modalSection}>
            <h3 className={styles.sectionHeading}>
              <FaCogs className={styles.sectionIcon} />
              Features &amp; User Flows
            </h3>
            <ul className={styles.bulletList}>
              {details.featuresAndFlows.map((flow, index) => (
                <li key={index} className={styles.bulletItem}>{flow}</li>
              ))}
            </ul>
          </section>

          {/* Section: Technical Decisions & Trade-Offs */}
          <section className={styles.modalSection}>
            <h3 className={styles.sectionHeading}>
              Engineering Decisions &amp; Trade-Offs
            </h3>
            <div className={styles.decisionsGrid}>
              {details.technicalDecisions.map((item, index) => (
                <div key={index} className={styles.decisionCard}>
                  <h4 className={styles.decisionTitle}>{item.decision}</h4>
                  <p className={styles.decisionRationale}>{item.rationale}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Difficult Bug or Challenge Resolved */}
          <section className={styles.modalSection}>
            <h3 className={styles.sectionHeading}>
              <FaExclamationTriangle className={styles.warningIcon} />
              Technical Challenge &amp; Solution
            </h3>
            <div className={styles.challengeBox}>
              <p className={styles.sectionText}>{details.challengesAndFixes}</p>
            </div>
          </section>

          {/* Section: Evaluation & Testing */}
          <section className={styles.modalSection}>
            <h3 className={styles.sectionHeading}>
              Verification, Testing &amp; Metrics
            </h3>
            <p className={styles.sectionText}>{details.evaluationAndTesting}</p>
          </section>

          {/* Section: Learnings & Improvements */}
          <section className={styles.modalSection}>
            <h3 className={styles.sectionHeading}>
              Learnings &amp; Planned Iterations
            </h3>
            <p className={styles.sectionText}>{details.learningsAndNextSteps}</p>
          </section>
        </div>

        {/* Footer */}
        <div className={styles.footer}>
          <button onClick={onClose} className={styles.doneBtn}>
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
