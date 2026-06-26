import React, { useEffect, useRef } from 'react';
import styles from './CustomCursor.module.css';
import gsap from 'gsap';

const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Position out of viewport initially
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, x: -100, y: -100 });

    // Inner dot: very fast tracking (almost zero delay for selection accuracy)
    const dotXTo = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3.out" });
    const dotYTo = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3.out" });

    // Outer ring: slower tracking (creates the lag delay follow effect)
    const ringXTo = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power2.out" });
    const ringYTo = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power2.out" });

    const onMouseMove = (e: MouseEvent) => {
      dotXTo(e.clientX);
      dotYTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.style.cursor === 'pointer'
      ) {
        // Hover state: Dot shrinks/disappears, Ring expands and turns into a target sight
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(ring, { 
          scale: 1.8, 
          backgroundColor: 'rgba(45, 140, 255, 0.12)', 
          borderColor: 'var(--primary)',
          borderWidth: '2px',
          duration: 0.2 
        });
      } else {
        // Default state: Dot visible, Ring standard size
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 });
        gsap.to(ring, { 
          scale: 1, 
          backgroundColor: 'transparent', 
          borderColor: 'var(--primary)',
          borderWidth: '1.5px',
          duration: 0.2 
        });
      }
    };

    const createSparkles = (x: number, y: number) => {
      const colors = ['#FFD700', '#FF69B4', '#00FFFF', '#ADFF2F', '#FF4500', '#9370DB', '#2d8cff'];
      const sparkleCount = 10;
      
      for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = styles.sparkle;
        
        const size = gsap.utils.random(8, 20);
        const color = gsap.utils.random(colors);
        
        Object.assign(sparkle.style, {
          left: `${x}px`,
          top: `${y}px`,
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: color,
          transform: 'translate(-50%, -50%) scale(0)',
        });
        
        document.body.appendChild(sparkle);
        
        const angle = gsap.utils.random(0, Math.PI * 2);
        const distance = gsap.utils.random(35, 95);
        const destX = Math.cos(angle) * distance;
        const destY = Math.sin(angle) * distance;
        const rotation = gsap.utils.random(90, 270);
        
        gsap.to(sparkle, {
          x: destX,
          y: destY,
          scale: gsap.utils.random(0.8, 1.4),
          rotation: rotation,
          duration: gsap.utils.random(0.4, 0.7),
          ease: "power2.out",
        });
        
        gsap.to(sparkle, {
          opacity: 0,
          scale: 0,
          delay: gsap.utils.random(0.2, 0.35),
          duration: gsap.utils.random(0.25, 0.35),
          ease: "power1.in",
          onComplete: () => {
            sparkle.remove();
          }
        });
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      // Click implodes the ring for responsive feedback
      gsap.to(ring, { scale: 0.6, duration: 0.1, ease: "power2.out" });
      createSparkles(e.clientX, e.clientY);
    };

    const onMouseUp = () => {
      // Springs back with bounce
      gsap.to(ring, { scale: 1.1, duration: 0.15, ease: "power2.out" }).then(() => {
        gsap.to(ring, { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.3)" });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className={styles.cursorDot} />
      <div ref={ringRef} className={styles.cursorRing} />
    </>
  );
};

export default CustomCursor;
