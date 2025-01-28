import React, { FC, use, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

// Composant pour encadrer du contenu qui peut scroll horizontalement.
// TODO : optimiser le fond de dégradé pour les flèches de scroll (valeur par défaut du setcanScrollRight et setcanScrollLeft)
// TODO : optimiser pour éviter les répétitions de code

// ajout d'un handle pour scroll horizontal vers la droite
const handleScrollRight = (boxName: string) => {
  const element = document.querySelector("#scrollBox-" + boxName);
  if (element) {
    element.scrollLeft += window.innerWidth * 0.9;
  }
}
// ajout d'un handle pour scroll horizontal vers la gauche
const handleScrollLeft = (boxName: string) => {
  const element = document.querySelector("#scrollBox-" + boxName);
  if (element) {
    element.scrollLeft -= window.innerWidth * 0.9;
  }
}

const ScrollX: FC<{ children: any, boxName: string }> = ({ children, boxName }) => {

  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);


useEffect(() => {
  const element = document.querySelector("#scrollBox-" + boxName);
  if (element) {
    element.addEventListener("scroll", () => {
      // retour booléen si scroll possible vers la droite
      setCanScrollRight(element.scrollWidth - element.scrollLeft > element.clientWidth);
      // retour booléen si scroll possible vers la gauche
      setCanScrollLeft(element.scrollLeft > 0);
      
    });
  }
}, []);

  return (
    <Box 
      sx={{
        position: "relative",
        padding: "10px 0",
      }}
    >
      <Box
        sx={{
          // vérification si scroll right
          opacity: canScrollRight ? "100" : "0",
          background: "linear-gradient(to left, rgba(0,0,0,0.5), rgba(0, 0, 0,0))",
         position: "absolute",
          top: "50%",
          right: "0",
          height: "100%",
          alignContent: "center",
          transform: "translateY(-50%)",
          cursor: "pointer",
          zIndex: 10,
          filter: "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.2))",
          transition: "all 0.3s",
        }}
      >
        <ArrowForwardIosIcon
          onClick={() => handleScrollRight(boxName)}
          sx={{
            fontSize: 30,
            color: "white",
            filter: "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.2))",
          }}
        />

      </Box>
      <Box
        sx={{
          // vérification si scroll left
          opacity: canScrollLeft ? "100" : "0",
          background: "linear-gradient(to right, rgba(0,0,0,0.5), rgba(0, 0, 0,0))",
          position: "absolute",
          height: "100%",
          alignContent: "center",
          top: "50%",
          transform: "translateY(-50%)",
          cursor: "pointer",
          zIndex: 10,
          filter: "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.2))",
          transition: "all 0.3s",
        }}
      >
        <ArrowBackIosNewIcon
          onClick={() => handleScrollLeft(boxName)}
          sx={{
        fontSize: 30,
        color: "white",
        filter: "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.2))",
          }}
        />
      </Box>
      <Box  // Conteneur pour les éléments à faire défiler horizontalement
    id={`scrollBox-${boxName}`}
        sx={{
          display: "flex",
          position: "relative",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "left",
          gap: "10px",
          padding: "10px",
          overflowX: "auto",
          overflowY: "hidden",
          height: "auto",
          scrollBehavior: "smooth",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ScrollX;
