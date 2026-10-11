// src/hooks/useGsapScroll.ts
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register plugins once
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export const useGsapScroll = () => {
  useEffect(() => {
    // 1. Smooth Scroll for all internal anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;

      try {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();

          gsap.to(window, {
            duration: 1.0,
            scrollTo: { y: targetElement, offsetY: 72 },
            ease: 'power3.inOut',
          });

          // Update hash in address bar without default browser jump
          window.history.pushState(null, '', href);
        }
      } catch {
        // Fallback to normal behavior if selector is invalid
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // 2. ScrollTrigger reveals for section headers & cards as user scrolls
    const ctx = gsap.context(() => {
      // Reveal section headers
      const headers = document.querySelectorAll('.section-header');
      headers.forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 28,
          opacity: 0,
          duration: 0.75,
          ease: 'power2.out',
        });
      });

      // Reveal cards in sections
      const sections = ['#work', '#impact', '#experience', '#skills', '#education', '#contact'];
      sections.forEach((secId) => {
        const secEl = document.querySelector(secId);
        if (!secEl) return;

        const contentBlocks = secEl.querySelectorAll(
          ':scope > .container > div:not(.section-header), :scope > .container > .cardsGrid'
        );

        if (contentBlocks.length > 0) {
          gsap.from(contentBlocks, {
            scrollTrigger: {
              trigger: secEl,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            y: 32,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out',
          });
        }
      });
    });

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      ctx.revert();
    };
  }, []);
};
