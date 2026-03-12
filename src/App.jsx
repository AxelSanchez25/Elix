import { useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Proyectos from './components/Proyectos'
import Footer from './components/Footer'
import SobreMi from './components/Sobremi'
import SmoothScroll from './components/SmoothScroll'

import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

function App() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current

    const handleMove = (e) => {
      // Detectamos si estamos sobre algo interactivo
      const isHovering = e.target.closest('a') || e.target.closest('button') || e.target.closest('.arc-card');

      gsap.to(glow, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4, // Más rápido para que no se sienta pesado sin el cursor real
        ease: "power3.out",
        scale: isHovering ? 2.5 : 1,
        // Al hacer click (e.buttons === 1), el cursor se encoge un poco
        width: e.buttons === 1 ? 15 : 25, 
        height: e.buttons === 1 ? 15 : 25,
        overwrite: "auto"
      });
    }

    // Efectos de entrada y salida de la ventana
    const handleMouseLeave = () => gsap.to(glow, { opacity: 0 });
    const handleMouseEnter = () => gsap.to(glow, { opacity: 1 });

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMove); // Para reacción al click
    window.addEventListener("mouseup", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMove);
      window.removeEventListener("mouseup", handleMove);
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className="cursor-glow"></div>
      
      {/* El SmoothScroll ya maneja a Lenis internamente */}
      <SmoothScroll />
      
      <Navbar />
      
      <main className='main-content'>
        <Hero />
        <About />
        <Proyectos />
        <SobreMi />
      </main>
      
      <Footer />
    </>
  )
}

export default App