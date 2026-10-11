// src/components/Projects/Projects.tsx
import React, { useState, useRef, useEffect, useMemo } from 'react';
import styles from './Projects.module.css';
import { projectsData, additionalProjects, type Project, type AdditionalProject } from '../../data/data';
import ProjectModal from './ProjectModal';
import { FaGithub, FaBookOpen, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

type FilterType = 'all' | 'featured' | 'systems';

const Projects: React.FC = () => {
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const scrollTrackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Group systems projects into pairs of 2: one up, another down per column
  const pairedSystemsProjects = useMemo(() => {
    const pairs: Array<{ top: AdditionalProject; bottom?: AdditionalProject }> = [];
    for (let i = 0; i < additionalProjects.length; i += 2) {
      pairs.push({
        top: additionalProjects[i],
        bottom: additionalProjects[i + 1],
      });
    }
    return pairs;
  }, []);

  // Check scroll position to update navigation arrow states
  const updateScrollState = () => {
    if (scrollTrackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollTrackRef.current;
      setCanScrollLeft(scrollLeft > 20);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
    }
  };

  useEffect(() => {
    updateScrollState();
    const currentTrack = scrollTrackRef.current;
    if (currentTrack) {
      currentTrack.addEventListener('scroll', updateScrollState, { passive: true });
      window.addEventListener('resize', updateScrollState);
    }
    return () => {
      if (currentTrack) {
        currentTrack.removeEventListener('scroll', updateScrollState);
      }
      window.removeEventListener('resize', updateScrollState);
    };
  }, [activeFilter]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollTrackRef.current) {
      const { clientWidth } = scrollTrackRef.current;
      // Scroll by one view width (2 cards on desktop, 1 on mobile)
      const scrollOffset = direction === 'left' ? -clientWidth * 0.9 : clientWidth * 0.9;
      scrollTrackRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    if (scrollTrackRef.current) {
      scrollTrackRef.current.scrollTo({ left: 0, behavior: 'smooth' });
    }
  };

  const showFeatured = activeFilter === 'all' || activeFilter === 'featured';
  const showSystems = activeFilter === 'all' || activeFilter === 'systems';

  const renderCompactCard = (item: AdditionalProject) => (
    <article key={item.id} className={styles.compactTextCard}>
      <div className={styles.compactCardTopRow}>
        <span className={styles.projectEyebrow}>
          {item.eyebrow || 'Systems & Engineering'}
        </span>
        {item.timeline && (
          <span className={styles.timelineBadge}>{item.timeline}</span>
        )}
      </div>

      <h3 className={styles.compactCardTitle}>{item.title}</h3>

      {/* Tech Badges */}
      <div className={styles.techStack}>
        {item.technologies.map((tech) => (
          <span key={tech} className={styles.techBadge}>
            {tech}
          </span>
        ))}
      </div>

      {/* Bullet Points with clean 4px dot bullets */}
      <ul className={styles.compactBulletsList}>
        {item.points.map((pt, pIdx) => (
          <li key={pIdx} className={styles.compactBulletItem}>
            {pt}
          </li>
        ))}
      </ul>

      {/* Card Actions - Rectangular button, NO live demo */}
      {item.githubLink && (
        <div className={styles.compactCardActions}>
          <a
            href={item.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionBtn}
            aria-label={`View source code for ${item.title}`}
          >
            <FaGithub />
            <span>Source Code</span>
          </a>
        </div>
      )}
    </article>
  );

  return (
    <section className="section" id="work">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className={styles.sectionHeaderRow}>
            <div className={styles.headerText}>
              <span className="section-eyebrow">ENGINEERING SHOWCASE</span>
              <h2 className="section-title">Projects</h2>
              <p className="section-subtitle">
                Full-stack web products, automated cloud build pipelines, and low-level systems engineering.
              </p>
            </div>
          </div>

          {/* Navigation & Toolbar */}
          <div className={styles.toolbar}>
            {/* Filter Tabs */}
            <div className={styles.filterTabs} role="tablist" aria-label="Filter projects">
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'all'}
                onClick={() => handleFilterChange('all')}
                className={`${styles.filterTab} ${activeFilter === 'all' ? styles.activeFilterTab : ''}`}
              >
                All Projects (8)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'featured'}
                onClick={() => handleFilterChange('featured')}
                className={`${styles.filterTab} ${activeFilter === 'featured' ? styles.activeFilterTab : ''}`}
              >
                Featured Apps (2)
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeFilter === 'systems'}
                onClick={() => handleFilterChange('systems')}
                className={`${styles.filterTab} ${activeFilter === 'systems' ? styles.activeFilterTab : ''}`}
              >
                Systems &amp; Core (6)
              </button>
            </div>

            {/* Scroll Controls (Right scrolling) */}
            <div className={styles.scrollControls}>
              <span className={styles.scrollHint}>Scroll right to explore →</span>
              <div className={styles.navArrows}>
                <button
                  type="button"
                  onClick={() => scroll('left')}
                  disabled={!canScrollLeft}
                  className={styles.arrowBtn}
                  aria-label="Scroll projects left"
                  title="Scroll left"
                >
                  <FaChevronLeft />
                </button>
                <button
                  type="button"
                  onClick={() => scroll('right')}
                  disabled={!canScrollRight}
                  className={styles.arrowBtn}
                  aria-label="Scroll projects right"
                  title="Scroll right"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Carousel Track: 2 columns in view on desktop, right scrolling */}
        <div className={styles.carouselContainer}>
          <div
            ref={scrollTrackRef}
            className={styles.carouselTrack}
            tabIndex={0}
            aria-label="Horizontally scrollable projects list"
          >
            {/* 1. Featured Image Projects */}
            {showFeatured &&
              projectsData.map((project) => (
                <div key={project.id} className={styles.carouselItem}>
                  <article className={styles.projectCard}>
                    {/* Thumbnail with High-Contrast Category Tag */}
                    <div className={styles.imageWrapper}>
                      <img
                        src={project.imageUrl}
                        alt={project.imageAlt}
                        className={styles.projectImage}
                        loading="lazy"
                      />
                      {project.badge && (
                        <span className={styles.badge}>{project.badge}</span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className={styles.cardContent}>
                      <div className={styles.cardHeader}>
                        <span className={styles.projectEyebrow}>{project.eyebrow}</span>
                        <h3 className={styles.projectTitle}>{project.title}</h3>
                        <p className={styles.projectDescription}>{project.description}</p>
                      </div>

                      {/* Tech Stack Tags - Rectangular, NO pills */}
                      <div className={styles.techStack}>
                        {project.techStack.map((tech) => (
                          <span key={tech} className={styles.techBadge}>
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Key Engineering Details */}
                      <div className={styles.highlightsBox}>
                        <p className={styles.highlightsLabel}>Key Engineering Focus</p>
                        <ul className={styles.highlightsList}>
                          {project.highlights.map((highlight, hIndex) => (
                            <li key={hIndex} className={styles.highlightItem}>
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Links - Rectangular buttons, NO live demo */}
                      <div className={styles.cardActions}>
                        <button
                          type="button"
                          onClick={() => setActiveModalProject(project)}
                          className={styles.caseStudyBtn}
                          aria-label={`Open technical case study for ${project.title}`}
                        >
                          <FaBookOpen />
                          <span>Case Study</span>
                        </button>

                        {project.githubLink && (
                          <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.actionBtn}
                            aria-label={`View ${project.title} source code on GitHub`}
                          >
                            <FaGithub />
                            <span>Source Code</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </div>
              ))}

            {/* 2. Systems & Engineering Box Projects (Paired 2 per column: one up, one down) */}
            {showSystems &&
              pairedSystemsProjects.map((pair, idx) => (
                <div key={`system-col-${idx}`} className={styles.carouselItem}>
                  <div className={styles.pairedColumn}>
                    {renderCompactCard(pair.top)}
                    {pair.bottom && renderCompactCard(pair.bottom)}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Case Study Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
};

export default Projects;