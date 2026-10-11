// src/components/Skills/Skills.tsx
import React from 'react';
import styles from './Skills.module.css';
import { skillsData } from '../../data/data';
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaPython
} from 'react-icons/fa';
import {
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiRedux,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiRedis,
  SiJest,
  SiSonar,
  SiPytorch,
  SiHuggingface,
  SiCplusplus,
  SiPostman,
  SiLinux,
  SiHtml5,
  SiCss
} from 'react-icons/si';
import { FiDatabase, FiLayers, FiServer, FiCheckSquare, FiCpu } from 'react-icons/fi';

const iconMap: Record<string, React.ReactNode> = {
  // Frontend
  "React": <FaReact style={{ color: '#61DAFB' }} />,
  "Next.js": <SiNextdotjs />,
  "TypeScript": <SiTypescript style={{ color: '#3178C6' }} />,
  "JavaScript (ES6+)": <SiJavascript style={{ color: '#F7DF1E' }} />,
  "Redux Toolkit": <SiRedux style={{ color: '#764ABC' }} />,
  "Tailwind CSS": <SiTailwindcss style={{ color: '#38BDF8' }} />,
  "HTML5 & Semantic Web": <SiHtml5 style={{ color: '#E34F26' }} />,
  "CSS3 & Modern Layouts": <SiCss style={{ color: '#1572B6' }} />,

  // Backend
  "Node.js": <FaNodeJs style={{ color: '#68A063' }} />,
  "Express.js": <SiExpress />,
  "REST APIs": <FiServer style={{ color: 'var(--color-primary)' }} />,
  "JWT Auth": <FiLayers style={{ color: 'var(--color-secondary)' }} />,
  "WebSockets": <FiServer style={{ color: 'var(--color-primary)' }} />,
  "Socket.IO": <FiServer style={{ color: 'var(--color-primary)' }} />,

  // Data
  "MongoDB": <SiMongodb style={{ color: '#47A248' }} />,
  "PostgreSQL": <SiPostgresql style={{ color: '#4169E1' }} />,
  "MySQL": <SiMysql style={{ color: '#4479A1' }} />,
  "Redis": <SiRedis style={{ color: '#DC382D' }} />,

  // Testing & Tooling
  "Jest": <SiJest style={{ color: '#C21325' }} />,
  "SonarQube": <SiSonar style={{ color: '#4B9CD3' }} />,
  "Git & GitHub": <FaGitAlt style={{ color: '#F05032' }} />,
  "Docker": <FaDocker style={{ color: '#2496ED' }} />,
  "Linux / Bash": <SiLinux />,
  "Postman": <SiPostman style={{ color: '#FF6C37' }} />,

  // Research & Core
  "Python": <FaPython style={{ color: '#3776AB' }} />,
  "PyTorch": <SiPytorch style={{ color: '#EE4C2C' }} />,
  "Hugging Face": <SiHuggingface style={{ color: '#FFD21E' }} />,
  "C++": <SiCplusplus style={{ color: '#00599C' }} />,
  "SQL": <FiDatabase style={{ color: 'var(--color-primary)' }} />
};

const categoryIcons: Record<string, React.ReactNode> = {
  "Frontend Engineering": <FiLayers className={styles.categoryIcon} />,
  "Backend & APIs": <FiServer className={styles.categoryIcon} />,
  "Data & Databases": <FiDatabase className={styles.categoryIcon} />,
  "Testing & Tooling": <FiCheckSquare className={styles.categoryIcon} />,
  "Research & Core Programming": <FiCpu className={styles.categoryIcon} />
};

const Skills: React.FC = () => {
  return (
    <section className="section" id="skills">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-eyebrow">Technical Capabilities</span>
          <h2 className="section-title">Skills</h2>
          <p className="section-subtitle">
            Grouped by practical engineering domain rather than arbitrary rating bars. Practical usage is demonstrated directly in the projects above.
          </p>
        </div>

        {/* Skills Grid */}
        <div className={styles.skillsGrid}>
          {skillsData.map((group, index) => (
            <article key={index} className={styles.skillGroupCard}>
              <div className={styles.groupHeader}>
                <div className={styles.groupTitleRow}>
                  {categoryIcons[group.category] || <FiLayers className={styles.categoryIcon} />}
                  <h3 className={styles.groupTitle}>{group.category}</h3>
                </div>
                <p className={styles.groupDescription}>{group.description}</p>
              </div>

              <div className={styles.skillsList}>
                {group.items.map((skill, sIndex) => (
                  <div key={sIndex} className={styles.skillItem}>
                    <span className={styles.itemIcon}>
                      {iconMap[skill.name] || <FiLayers />}
                    </span>
                    <span className={styles.itemName}>{skill.name}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;