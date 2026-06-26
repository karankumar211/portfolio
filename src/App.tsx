import { useEffect, useState } from 'react';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Timeline from './components/Timeline/Timeline';
import Skills from './components/Skills/Skills';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/CustomCursor/CustomCursor';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;

      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      return systemTheme;
    }
    return 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    window.addEventListener('contextmenu', handleContextMenu);
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <main>
      <CustomCursor />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero />
      <Timeline />
      <Projects />
      <Skills />
      <Footer/>
    </main>
  );
}

export default App;