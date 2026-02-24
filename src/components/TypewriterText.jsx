// src/components/TypewriterText.jsx
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const TypewriterText = ({ text, delay = 0, speed = 0.05, jumpIndex = -1, jumpDuration = 0.3 }) => {
  const textRef = useRef(null);
  const currentText = useRef(''); // Para ir construyendo el texto

  useEffect(() => {
    if (!textRef.current) return;

    currentText.current = ''; // Resetear al inicio

    // TL: Timeline de GSAP para secuenciar las animaciones
    const tl = gsap.timeline({ delay: delay });

    // Dividimos el texto en caracteres para animarlos uno a uno
    const characters = text.split('');

    characters.forEach((char, index) => {
      // Si es el índice donde queremos el "salto"
      if (index === jumpIndex) {
        tl.to(textRef.current, {
          y: -10, // Salto hacia arriba
          duration: jumpDuration / 2,
          ease: "power2.out",
          onComplete: () => {
            currentText.current += char;
            textRef.current.textContent = currentText.current;
          }
        })
        .to(textRef.current, {
          y: 0, // Regresa a la posición original
          duration: jumpDuration / 2,
          ease: "power2.in",
          onComplete: () => {
            // Asegurarse de que el último carácter se añade si el salto termina aquí
            if (index === characters.length - 1 && index !== jumpIndex) {
                 currentText.current += char;
                 textRef.current.textContent = currentText.current;
            }
          }
        });
      } else {
        // Animación normal de máquina de escribir
        tl.to(textRef.current, {
          duration: speed, // Velocidad de escritura por carácter
          ease: "none",
          onComplete: () => {
            currentText.current += char;
            textRef.current.textContent = currentText.current;
          }
        });
      }
    });

    return () => tl.kill(); // Limpiar el timeline al desmontar
  }, [text, delay, speed, jumpIndex, jumpDuration]);

  return (
    <span ref={textRef} style={{ display: 'inline-block' }}></span>
  );
};

export default TypewriterText;