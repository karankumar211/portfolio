// src/components/CustomCursor/CustomCursor.tsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './CustomCursor.module.css';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run if pointer device is fine (mouse/trackpad, not touch)
    if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Fast, hardware-accelerated GSAP quickTo setters
    const setDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power2.out' });
    const setDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power2.out' });
    const setRingX = gsap.quickTo(ring, 'x', { duration: 0.28, ease: 'power3.out' });
    const setRingY = gsap.quickTo(ring, 'y', { duration: 0.28, ease: 'power3.out' });

    let isVisible = false;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
      }

      setDotX(e.clientX);
      setDotY(e.clientY);
      setRingX(e.clientX);
      setRingY(e.clientY);
    };

    const onMouseEnter = () => {
      isVisible = true;
      gsap.to([dot, ring], { opacity: 1, duration: 0.25 });
    };

    const onMouseLeave = () => {
      isVisible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    const onMouseDown = () => {
      ring.classList.add(styles.ringActive);
      gsap.to(ring, { scale: 0.75, duration: 0.15, ease: 'power1.out' });
      gsap.to(dot, { scale: 1.4, duration: 0.15, ease: 'power1.out' });
    };

    const onMouseUp = () => {
      ring.classList.remove(styles.ringActive);
      gsap.to(ring, { scale: 1, duration: 0.25, ease: 'back.out(2)' });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power1.out' });
    };

    // Detect hovers on interactive targets
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest(
        'a, button, [role="button"], [role="tab"], input, textarea, select, .projectCard, .compactTextCard'
      );

      if (interactiveElement) {
        ring.classList.add(styles.ringHover);
        gsap.to(ring, { scale: 1.5, duration: 0.25, ease: 'power2.out' });
      } else {
        ring.classList.remove(styles.ringHover);
        gsap.to(ring, { scale: 1, duration: 0.25, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseenter', onMouseEnter);
    document.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseover', onMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseover', onMouseOver);
    };
  }, []);

  return (
    <div className={styles.cursorContainer} aria-hidden="true">
      <div ref={dotRef} className={styles.cursorDot} />
      <div ref={ringRef} className={styles.cursorRing} />
    </div>
  );
};

export default CustomCursor;
