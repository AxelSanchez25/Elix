import React, { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Ajusta este número (por ejemplo 600) según dónde empiece tu sección blanca
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className='barra-de-navegacion'>
      <div className='logo'>
        <ul><li><a href="">sanchezdv</a></li></ul>
      </div>
      {/* Condicionamos la clase: si isScrolled es true, añade 'nav-dark' */}
      <ul className={`nav-glass ${isScrolled ? 'nav-dark' : ''}`}>
        <li><a href="">inicio</a></li>
        <li><a href="">proyectos</a></li>
        <li><a href="">blog</a></li>
        <li><a href="">link</a></li>
      </ul>
      <div className="placeholder"></div>
    </nav>
  );
}