import { useState, useEffect, useRef } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/hero'
import About from './components/About'

// 1. Importaciones de las nuevas librerías
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// 2. Registro de Plugin (FUERA del componente)
gsap.registerPlugin(ScrollTrigger);

function App() {
  const glowRef = useRef(null)

  useEffect(() => {
    // --- LÓGICA DE LENIS (Smooth Scroll) ---
    const lenis = new Lenis()

    // Sincronizar Lenis con ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)

    // Añadir el ticker de GSAP para que el scroll sea fluido
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    // --- LÓGICA DE TU CURSOR GLOW ---
    const glow = glowRef.current
    const handleMove = (e) => {
      // Tip: Podrías usar GSAP aquí también para que el cursor sea más suave
      gsap.to(glow, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.5, // Le da un ligero retraso elegante
        ease: "power2.out"
      })
    }

    window.addEventListener("mousemove", handleMove)

    // --- LIMPIEZA ---
    return () => {
      window.removeEventListener("mousemove", handleMove)
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return (
    <>
      <div ref={glowRef} className="cursor-glow"></div>
      <Navbar />
      <Hero />
      <About />
    </>
  )
}

export default App


