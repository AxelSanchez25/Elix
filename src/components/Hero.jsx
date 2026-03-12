import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TypewriterText from './TypewriterText';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const tituloRef = useRef(null);
    const heroSectionRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        // --- TUS ANIMACIONES ORIGINALES ---
        gsap.fromTo(tituloRef.current,
            { opacity: 0, y: 100 },
            { opacity: 1, y: 0, duration: 2.2, ease: "power3.out" }
        );

        gsap.fromTo(heroSectionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
        );

        // --- LÓGICA DEL FONDO TECH (CANVAS) ---
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let points = [];
        const numPoints = 80;
        const maxDist = 150;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        const initPoints = () => {
            points = [];
            for (let i = 0; i < numPoints; i++) {
                points.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
            
            points.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < points.length; j++) {
                    const p2 = points[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(113, 77, 201, ${1 - dist / maxDist})`; // Usa tu color morado
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(draw);
        };

        resize();
        initPoints();
        draw();

        // Parallax del fondo al scrollear
        gsap.to(canvas, {
            y: 200,
            ease: "none",
            scrollTrigger: {
                trigger: heroSectionRef.current,
                start: "top top",
                scrub: true
            }
        });

        window.addEventListener('resize', resize);
        return () => window.removeEventListener('resize', resize);
    }, []);

    return (
        <header ref={heroSectionRef} style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Canvas de fondo */}
            <canvas 
                ref={canvasRef} 
                style={{ 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    zIndex: 0, 
                    pointerEvents: 'none',
                    opacity: 0.4 
                }} 
            />
            
            <div className='section-bienvenida' style={{ position: 'relative', zIndex: 1 }}>
                <h1 ref={tituloRef}>Diseño, código y propósito<br /><span>Todo en uno</span></h1>
                <p>
                    <TypewriterText
                        text="       Soy axel sanchez. Programador y creador visual.
                    Construyo experiencias digitales limpias, humanas y con intención."
                        delay={1}
                        speed={0.07}
                        jumpIndex={13}
                        jumpDuration={0.4}
                    />
                </p>
            </div>
        </header>
    )
}