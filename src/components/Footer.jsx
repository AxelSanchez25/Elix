import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const footerRef = useRef(null);

  useLayoutEffect(() => {
    // El efecto de "revelado" (Unveil)
    // Básicamente, el footer está detrás y la sección anterior se levanta
    gsap.from(".footer-content", {
      y: -150, // El contenido baja un poco mientras se revela
      opacity: 0,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top bottom", // Empieza cuando el footer entra por abajo
        end: "bottom bottom",
        scrub: true,
      }
    });
    
    
  }, []);

  return (
    <footer ref={footerRef} className="footer-container">
      <div className="footer-content">
        <div className="footer-top">
          <h2 className="cta-text">HABLEMOS<span>.</span></h2>
          <a href="mailto:tuemail@ejemplo.com" className="email-link">hola@tusitio.com</a>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <div className="link-group">
              <h4>SOCIAL</h4>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
              <a href="#">Instagram</a>
            </div>
            <div className="link-group">
              <h4>MENU</h4>
              <a href="#">Inicio</a>
              <a href="#">Proyectos</a>
              <a href="#">Sobre mí</a>
            </div>
          </div>
          
          <div className="footer-info">
            <p>© 2026 — HECHO CON PASIÓN</p>
            <p>LOCALIZACIÓN: TU CIUDAD, MUNDO</p>
          </div>
        </div>
      </div>
    </footer>
  );
}