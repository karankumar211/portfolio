// src/components/Footer/Footer.tsx
import React, { useState } from 'react';
import styles from './Footer.module.css';
import { personalInfo } from '../../data/data';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaCopy,
  FaCheck,
  FaArrowUp,
  FaPaperPlane,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    // Simulate deterministic accessible submission flow
    setTimeout(() => {
      setIsSubmitting(false);
      setFormSubmitted(true);
      // Reset form
      setFormData({ name: '', email: '', message: '' });
    }, 600);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footerSection} id="contact">
      {/* Contact Panel Container */}
      <div className={`container ${styles.contactContainer}`}>
        <div className={styles.contactCard}>
          <div className={styles.contactLeft}>
            <span className={styles.eyebrow}>GET IN TOUCH</span>
            <h2 className={styles.heading}>Have a role or a problem worth solving?</h2>
            <p className={styles.subtext}>
              I'm interested in frontend and full-stack opportunities where I can build useful products and keep growing as an engineer.
            </p>

            <div className={styles.directContactBox}>
              <div className={styles.emailDisplay}>
                <FaEnvelope className={styles.mailIcon} />
                <span className={styles.emailAddress}>{personalInfo.email}</span>
              </div>
              <div className={styles.emailActions}>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className={styles.sendEmailBtn}
                  aria-label={`Send email directly to ${personalInfo.email}`}
                >
                  <FaPaperPlane />
                  <span>Send Direct Email</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className={styles.copyEmailBtn}
                  aria-label="Copy email address to clipboard"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <FaCheck className={styles.successIcon} />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className={styles.socialChannels}>
              <span className={styles.socialLabel}>Professional Profiles:</span>
              <div className={styles.socialLinksRow}>
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialChannelBtn}
                  aria-label="GitHub Profile"
                >
                  <FaGithub />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialChannelBtn}
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialChannelBtn}
                  aria-label="LeetCode Profile"
                >
                  <SiLeetcode />
                  <span>LeetCode</span>
                </a>
                <a
                  href={personalInfo.resumeUrl}
                  download="Karan_Kumar_Resume.pdf"
                  className={styles.socialChannelBtn}
                  aria-label="Download Resume"
                >
                  <FaExternalLinkAlt />
                  <span>Resume PDF</span>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className={styles.contactRight}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Send a Quick Message</h3>
              <p className={styles.formSubtitle}>
                Prefer a quick form? Fill out this note and I'll respond within 24 hours.
              </p>

              {formSubmitted ? (
                <div className={styles.successMessage} role="alert">
                  <FaCheck className={styles.successMessageIcon} />
                  <div>
                    <h4 className={styles.successHeading}>Message Prepared!</h4>
                    <p className={styles.successDesc}>
                      Thank you for reaching out. You can also reach me directly at <strong>{personalInfo.email}</strong>.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormSubmitted(false)}
                    className={styles.sendAnotherBtn}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label htmlFor="contact-name" className={styles.label}>
                      Your Name <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Connor"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-email" className={styles.label}>
                      Your Email Address <span className={styles.required}>*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="sarah@company.com"
                      className={styles.input}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="contact-message" className={styles.label}>
                      Message / Project Details <span className={styles.required}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Karan, we'd like to talk about a frontend engineering role at..."
                      className={styles.textarea}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.submitBtn}
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <FaPaperPlane />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContainer}`}>
          <div className={styles.bottomLeft}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} <strong>Karan Kumar</strong>. Built with React, TypeScript &amp; Vanilla CSS.
            </p>
            <p className={styles.editorialNote}>
              Designed per editorial engineering guidelines, calm, precise, and content-first.
            </p>
          </div>

          <div className={styles.bottomRight}>
            <nav className={styles.footerNav} aria-label="Footer Quick Links">
              <a href="#work" className={styles.footerNavLink}>Work</a>
              <a href="#impact" className={styles.footerNavLink}>Impact</a>
              <a href="#experience" className={styles.footerNavLink}>Experience</a>
              <a href="#skills" className={styles.footerNavLink}>Skills</a>
              <a href="#education" className={styles.footerNavLink}>Education</a>
            </nav>

            <button
              onClick={scrollToTop}
              className={styles.scrollTopBtn}
              aria-label="Scroll back to top of page"
              title="Back to top"
            >
              <FaArrowUp />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;