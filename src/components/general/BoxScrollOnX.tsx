import React, { FC } from "react";
import MenuBox from "../core/MenuBox";
import Box from "@mui/material/Box";
import { Helmet } from "react-helmet-async";
import ArrowForwardIosOutLinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

// Composant pour encadrer du contenu qui peut scroll horizontalement.
// à faire : ajouter des flèches à droite et à gauche lors du défilement.

const ScrollX: FC<{ children: any }> = ({ children }) => {
  return (
    <Box 
      sx={{
        position: "relative",
        padding: "10px 0",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          right: 10,
          transform: "translateY(-50%)",
          cursor: "pointer",
          zIndex: 10,
          filter: "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.2))",
        }}
      >
        <ArrowForwardIosOutLinedIcon
          sx={{
            fontSize: 30,
            color: "gray",
            filter: "drop-shadow(3px 3px 10px rgba(0, 0, 0, 0.2))",
          }}
        />
      </Box>
      <Box  // Conteneur pour les éléments à faire défiler horizontalement
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
          height: "auto"
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default ScrollX;
