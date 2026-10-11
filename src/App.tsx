// src/App.tsx
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Impact from './components/Impact/Impact';
import Timeline from './components/Timeline/Timeline';
import Skills from './components/Skills/Skills';
import Education from './components/Education/Education';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';
import { useGsapScroll } from './hooks/useGsapScroll';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme_mode');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    }
    // Default white mode per user request
    return 'light';
  });

  // Enable GSAP smooth scrolling and scroll-triggered animations
  useGsapScroll();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme_mode', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content">
        <Hero />
        <Projects />
        <Impact />
        <Timeline />
        <Skills />
        <Education />
      </main>
      <Footer />
    </>
  );
}

export default App;