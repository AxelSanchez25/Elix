import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Proyectos() {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  useLayoutEffect(() => {
    // Definimos la función del cursor fuera para poder limpiarla correctamente
    const moveCursor = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.6,
          ease: "power3.out",
        });
      }
    };

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray(".project-panel");
      if (!containerRef.current) return;

      // 1. Scroll Horizontal
      let scrollTween = gsap.to(containerRef.current, {
        x: () => -(containerRef.current.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          // Evitamos el error de scrollWidth con una función flecha
          end: () => `+=${containerRef.current?.scrollWidth || 0}`,
          onUpdate: (self) => {
            gsap.to(".progress-bar", {
              width: self.progress * 100 + "%",
              overwrite: "auto",
            });
          },
        },
      });

      // 2. Animaciones de Imágenes (Efecto Revelado Apple)
      panels.forEach((panel) => {
        const img = panel.querySelector("img");
        gsap.fromTo(img,
          { scale: 1.6, filter: "contrast(1.2) brightness(0.2)" },
          {
            scale: 1,
            filter: "contrast(1) brightness(1)",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: "left right",
              end: "left left",
              scrub: true,
            },
          }
        );
      });

      // 3. Eventos del Cursor (Hover)
      panels.forEach((panel) => {
        panel.addEventListener("mouseenter", () => {
          gsap.to(cursorRef.current, { scale: 1, opacity: 1 });
        });
        panel.addEventListener("mouseleave", () => {
          gsap.to(cursorRef.current, { scale: 0, opacity: 0 });
        });
      });

      window.addEventListener("mousemove", moveCursor);
    }, sectionRef);

    return () => {
      ctx.revert();
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="dark-section">
      <div ref={cursorRef} className="cursor">DISCOVER</div>
      <div className="progress-bar"></div>

      <div className="horizontal-wrapper">
        <div ref={containerRef} className="horizontal-container">
          
          {/* Proyecto 1 */}
          <div className="project-panel">
            <div className="project-info">
              <span className="project-category">Interactive // 2026</span>
              <h3 className="project-title">JOSE CARLOS<br/>HERRERA</h3>
            </div>
            <div className="project-image-box">
              <img src="public/img/_SAM3878.png" alt="Project 01" />
            </div>
            <div className="project-footer">
              <p>Minimalist Digital Experience</p>
              <a href="https://josecarlosherrera.com/" target="_blank" className="explore-btn">EXPLORE</a>
            </div>
          </div>

          {/* Proyecto 2 */}
          <div className="project-panel">
            <div className="project-info">
              <span className="project-category">Editorial // 2026</span>
              <h3 className="project-title">SUSANITA<br/>URBAN</h3>
            </div>
            <div className="project-image-box">
              <img src="public/img/_SAM3746.png" alt="Project 02" />
            </div>
            <div className="project-footer">
              <p>Premium Identity Design</p>
              <a href="https://susanitaurban.com/" target="_blank" className="explore-btn">EXPLORE</a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}