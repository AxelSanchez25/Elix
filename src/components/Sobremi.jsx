import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RoshanArcSlider() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);

  const data = [
    { title: "Obsesión musical", desc: "La música es vida. Siempre la escucho y a veces...", img: "public/img/IMG_7146.JPG" },
    { title: "Vida nocturna", desc: "Explorando la ciudad bajo las luces de neón.", img: "public/img/FOTOBASE1_52.jpg" },
    { title: "Vitoria Gasteiz", desc: "Cultura, arquitectura y minimalismo moderno.", img: "public/img/IMG_SAM0817.jpg" },
    { title: "Street Photo", desc: "Capturando la esencia de lo cotidiano.", img: "public/img/_SAM2363.png" },
  ];

  useLayoutEffect(() => {
    const cards = gsap.utils.toArray(".arc-card");

    // 1. Animación Horizontal y de Arco Unificada
    let scrollTween = gsap.to(containerRef.current, {
      x: () => -(containerRef.current.scrollWidth - window.innerWidth),
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        pin: true,
        scrub: 1.5, // Suavidad en el movimiento
        snap: {
          snapTo: 1 / (data.length - 1),
          duration: 0.8,
          ease: "power2.inOut"
        },
        end: () => `+=${containerRef.current.scrollWidth}`,
        onUpdate: (self) => {
          const progress = self.progress * (data.length - 1);

          cards.forEach((card, i) => {
            const distanceFromCenter = Math.abs(progress - i);

            // Dentro del cards.forEach en tu useLayoutEffect
            const glow = distanceFromCenter < 0.2 ? 1.2 : 1; // Brilla un 20% más en el centro
            const blur = distanceFromCenter * 2; // Desenfoque suave a los lados

            gsap.to(card, {
              rotate: (i - progress) * 12,
              y: distanceFromCenter * 40,
              scale: 1.1 - (distanceFromCenter * 0.2),
              opacity: 1 - (distanceFromCenter * 0.7),
              filter: `brightness(${glow}) blur(${blur}px)`, // <-- Efecto de enfoque y brillo
              duration: 0.4,
              overwrite: "auto"
            });

            // Calculamos la rotación y posición de forma continua (Interpolación)
            // Esto elimina el "golpe" porque no hay saltos de estado
            gsap.to(card, {
              rotate: (i - progress) * 12,
              y: distanceFromCenter * 40,
              scale: 1.1 - (distanceFromCenter * 0.2), // Se hace pequeña al alejarse
              opacity: 1 - (distanceFromCenter * 0.7), // Se oscurece al alejarse
              duration: 0.4,
              ease: "power1.out",
              overwrite: "auto"
            });

            // Animación del texto (reveal) dentro de cada carta
            const info = card.querySelector(".card-info");
            gsap.to(info, {
              opacity: distanceFromCenter < 0.2 ? 1 : 0,
              y: distanceFromCenter < 0.2 ? 0 : 20,
              duration: 0.4,
              overwrite: "auto"
            });
          });
        }
      }
    });

    return () => {
      if (scrollTween.scrollTrigger) scrollTween.scrollTrigger.kill();
      scrollTween.kill();
    };
  }, []); // Quitamos activeIndex de aquí para que no reinicie la animación

  return (
    <section ref={sectionRef} className="roshan-section">
      <div ref={containerRef} className="cards-display">
        {data.map((item, i) => (
          <div key={i} className="arc-card">
            <div className="img-container">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="card-info">
              <h3 className="info-title">{item.title}</h3>
              <p className="info-desc">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="arc-line-bg"></div>
    </section>
  );
}