import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/hero'
import About from './components/About'

import { useEffect, useRef } from "react"

function App() {
  const glowRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current

    const handleMove = (e) => {
      glow.style.left = e.clientX + "px"
      glow.style.top = e.clientY + "px"
    }

    window.addEventListener("mousemove", handleMove)

    return () => window.removeEventListener("mousemove", handleMove)
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


