import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registrar el plugin fuera del componente
gsap.registerPlugin(ScrollTrigger);

export default function Proyectos() {
    useLayoutEffect(() => {
        // Tu lógica exacta aquí dentro para que detecte los elementos
        const container = document.querySelector(".horizontal-container");
        const panels = gsap.utils.toArray(".project-panel");
        const cursor = document.querySelector(".cursor");

        if (!container) return;

        /* Scroll horizontal principal */
        let scrollTween = gsap.to(container, {
            x: () => -(container.scrollWidth - window.innerWidth),
            ease: "none",
            scrollTrigger: {
                trigger: "#projects",
                start: "top top",
                end: () => "+=" + container.scrollWidth,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                onUpdate: self => {
                    gsap.to(".progress-bar", {
                        width: (self.progress * 100) + "%"
                    });
                }
            }
        });

        /* Activación por panel */
        panels.forEach((panel) => {
            ScrollTrigger.create({
                trigger: panel,
                containerAnimation: scrollTween,
                start: "left center",
                onEnter: () => activatePanel(panel),
                onEnterBack: () => activatePanel(panel),
            });

            /* Parallax imagen */
            gsap.to(panel.querySelector("img"), {
                x: -100,
                ease: "none",
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: scrollTween,
                    start: "left right",
                    scrub: true
                }
            });
        });

        function activatePanel(panel) {
            gsap.to(panels, { opacity: 0.3 });
            gsap.to(panel, { opacity: 1, duration: 0.6 });
            let bg = panel.getAttribute("data-bg");
            gsap.to("#projects", { backgroundColor: bg, duration: 0.8 });
        }

        /* Cursor personalizado */
        const handleMove = e => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2
            });
        };

        document.addEventListener("mousemove", handleMove);

        panels.forEach(panel => {
            panel.addEventListener("mouseenter", () => {
                gsap.to(cursor, { opacity: 1, scale: 1 });
            });
            panel.addEventListener("mouseleave", () => {
                gsap.to(cursor, { opacity: 0, scale: 0.8 });
            });
        });

        // Limpieza al salir
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
            document.removeEventListener("mousemove", handleMove);
        };
    }, []);
    return (
        <section id="projects" class="dark-section">
            <div class="cursor">Ver proyecto</div>
            <div class="progress-bar"></div>

            <div class="horizontal-wrapper">
                <div class="horizontal-container">

                    <div class="project-panel" data-bg="#0f0f0f">
                        <div class="project-image">
                            <img src="public/img/_SAM3878.png" alt="" />
                        </div>
                        <div class="project-content">
                            <h3>JoseCarlosHerrera.com</h3>
                            <p>Experiencia digital minimalista.</p>
                            <a href="https://josecarlosherrera.com/" target="_blank">Ver proyecto →</a>
                        </div>
                    </div>

                    <div class="project-panel" data-bg="#1a1a1a">
                        <div class="project-image">
                            <img src="public/img/_SAM3746.png" alt="" />
                        </div>
                        <div class="project-content">
                            <h3>SusanitaUrban.com</h3>
                            <p>Identidad editorial elegante.</p>
                            <a href="https://susanitaurban.com/" target="_blank">Ver proyecto →</a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}