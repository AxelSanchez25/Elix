import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Se activa tras bajar 50px
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`barra-de-navegacion ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="nav-container">
        
        <div className="logo">
          <a href="#inicio">SANCHEZDV</a>
        </div>

        <ul className="nav-glass">
          <li><a href="#work">Work</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#labs">Labs</a></li>
        </ul>

        <div className="nav-actions">
          <a href="#contact" className="cta-tech">
            LET'S TALK
          </a>
        </div>

      </div>
    </nav>
  );
}