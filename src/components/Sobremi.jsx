import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

export default function SobreMiTech() {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".slider-card");
      
      // Animación de rotación/desplazamiento infinito
      gsap.to(cards, {
        xPercent: -100 * (cards.length / 2),
        ease: "none",
        duration: 25,
        repeat: -1,
      });

      // Efecto de aparición del texto al hacer hover o scroll
      cards.forEach(card => {
        const text = card.querySelector(".card-text-reveal");
        card.addEventListener("mouseenter", () => {
          gsap.to(text, { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(text, { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const items = [
    { title: "ESTRATEGIA", img: "public/img/san sebastian9.jpg" },
    { title: "DISEÑO UI", img: "public/img/san sebastian9.jpg" },
    { title: "MOTION", img: "public/img/san sebastian9.jpg" },
    { title: "DEVELOPMENT", img: "public/img/san sebastian9.jpg" },
  ];

  // Duplicamos para el loop
  const list = [...items, ...items];

  return (
    <section ref={containerRef} className="circular-slider-section">
      <div className="slider-wrapper">
        <div ref={sliderRef} className="slider-inner">
          {list.map((item, i) => (
            <div key={i} className="slider-card">
              {/* El contenedor circular que mencionas */}
              <div className="circular-bg">
                <img src={item.img} alt={item.title} />
              </div>
              
              {/* Texto que aparece debajo al mover/interactuar */}
              <div className="card-text-reveal">
                <span className="category">Servicio // 0{i + 1}</span>
                <h4>{item.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}