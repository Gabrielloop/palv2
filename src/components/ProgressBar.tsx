import React from "react";
import { Box, Typography } from "@mui/material";

// Composant perso de bar de progression
// à faire : mettre en variable ou css la couleur des barres

interface ProgressBarProps {
  value: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ value }) => {
  // Controle de l'interval de la valeur entre 0 et 100
  const progressValue = Math.min(Math.max(value, 0), 100);

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      {/* Affichage du pourcentage superposé au-dessus de la barre */}
      <Typography
        variant="body2"
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          fontSize: "0.7rem",
          zIndex: 1,
        }}
      >
        {progressValue}%
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "17px",
          backgroundColor: "var(--black-text-tr)",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: `${progressValue}%`,
            height: "100%",
            backgroundColor: progressValue === 100 ? "green" : "var(--secondary-terra-cota)",
            transition: "width 0.3s ease-in-out", // Animation dans le cas où la valeur change (ex. caroussel)
          }}
        />
      </Box>
    </Box>
  );
};

export default ProgressBar;
