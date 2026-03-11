import React from 'react'

export default function About() {
  return (
    <section className="about-container">
      {/* SECCIÓN 1: DISEÑO / APPLE STYLE */}
      <div className="about-sticky-section">
        <div className="about-content">
          <div className="about-text">
            <span className="label">01 — Filosofía</span>
            <h2>Simplicidad Radical</h2>
            <p>
              Me inspiro en la estética moderna y la tecnología con calma. 
              Cada proyecto de <strong>SANCHEZDV</strong> busca el equilibrio 
              entre funcionalidad, diseño y mensaje.
            </p>
          </div>
          <div className="about-image">
            <img src="public/img/FOTOBASE1_26.jpg" alt="Minimalismo" />
          </div>
        </div>
      </div>

      {/* SECCIÓN 2: CÓDIGO / STARK TECH */}
      <div className="about-sticky-section">
        <div className="about-content">
          <div className="about-text">
            <span className="label">02 — Ingeniería</span>
            <h2>Arquitectura Full Stack</h2>
            <p>
              Desarrollo interfaces líquidas y sistemas escalables. 
              Desde el primer pixel hasta la lógica del servidor, 
              construyo con precisión quirúrgica.
            </p>
          </div>
          <div className="about-image">
            <img src="public/img/IMG_SAM1980.jpg" alt="Ingeniería" />
          </div>
        </div>
      </div>

      {/* SECCIÓN 3: FOTOGRAFÍA / VISUALS */}
      <div className="about-sticky-section">
        <div className="about-content">
          <div className="about-text">
            <span className="label">03 — Narrativa</span>
            <h2>Narrativa Visual</h2>
            <p>
              La fotografía no es solo captura, es composición. 
              Aporto una mirada artística para que el branding 
              de cada proyecto sea único e imponente.
            </p>
          </div>
          <div className="about-image">
            <img src="public/img/Diseño sin título (4).png" alt="Fotografía" />
          </div>
        </div>
      </div>
    </section>
  )
}