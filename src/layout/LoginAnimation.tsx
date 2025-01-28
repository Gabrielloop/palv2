import React from "react";
import { FC } from "react";
import { useEffect, useRef, useState } from "react";
import { getRandomBooks } from "../../src/service/dbBook.service";

const LoginAnimation: FC<{ children: any }> = ({ children }) => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  // Function moved above the useState call
  const generateRandomPositionAndRotation = () => {
    const randomX = Math.random() * 100; // Random percentage for position
    const randomY = Math.random() * 100; // Random percentage for position
    const randomRotation = Math.random() * 360; // Random rotation in degrees
    return {
      left: `${randomX}%`,
      top: `${randomY}%`,
      transform: `rotate(${randomRotation}deg)`,
    };
  };

  const [squares] = useState(() => {
    // Generate initial positions and rotations for the squares
    // get 5 random book from methode :
    const randBook= [getRandomBooks(5)];
    
    return randBook.map(() => generateRandomPositionAndRotation());
  });
  console.log (squares);
  const movingDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateTransform = () => {
    if (!movingDivRef.current) return "";

    const rect = movingDivRef.current.getBoundingClientRect();
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const offsetX = centerX - mouseX; // Inversion des contrôles horizontaux
    const offsetY = centerY - mouseY; // Inversion des contrôles verticaux

    return `translate(${offsetX * 1}px, ${offsetY * 1}px)`; // Augmentation du facteur pour amplifier le déplacement
  };

  return (
    <div className="login-anim-container">
      {/* Grande div qui suit la souris */}
      <div
        ref={movingDivRef}
        className="login-anim-moving-div"
        style={{
          transform: calculateTransform(),
        }}
      >
        {squares.map((style, index) => (
          <div key={index} className="login-anim-random-square" style={style}>{}</div>
        ))}
      </div>

      {/* Div fixe au centre */}
      <div className="login-anim-fixed-div">{children}</div>
    </div>
  );
};

export default LoginAnimation;
