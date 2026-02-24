import React from 'react'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import TypewriterText from './TypewriterText';


export default function Hero() {
    const tituloRef = useRef(null);

    useEffect(() => {
        // Animación de entrada
        gsap.fromTo(tituloRef.current,
            { opacity: 0, y: 100 }, // Estado inicial
            { opacity: 1, y: 0, duration: 2.2, ease: "power3.out" } // Estado final
        );
    }, []);
    const heroSectionRef = useRef(null); // Para posibles animaciones de toda la sección

    useEffect(() => {
        // Aquí puedes poner animaciones para toda la sección Hero si quieres,
        // por ejemplo, que aparezca con un fade-in.
        gsap.fromTo(heroSectionRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, delay: 0.5, ease: "power2.out" }
        );
    }, []);
    return (
        <header>
            <div className='section-bienvenida'>
                <h1 ref={tituloRef}>Diseño, código y propósito.<br /><span>Todo en uno.</span></h1>
                <p>
                    <TypewriterText
                        text="      Soy axel sanchez. Programador y creador visual.
                    Construyo experiencias digitales limpias, humanas y con intención."
                        delay={1} // Empieza a escribir 1 segundo después de que cargue el Hero
                        speed={0.07} // Más lento, 0.07 segundos por carácter
                        jumpIndex={13} // El carácter "e" de "increíble" (cuenta desde 0)
                        jumpDuration={0.4}
                    />

                </p>
            </div>
        </header>
    )
}
