import React from "react";
import { Skeleton } from "@mui/material";

// Composant SkeletonLoader qui affiche 5 fois le SkeletonLoader avec une opacité réduite à chaque itération


const SkeletonLoader: React.FC = () => {
  return (
    <div>
      {[...Array(10)].map((_, index) => {
        return (
          <SkeletonLoaderItem
            key={index} 
            opacity={1 - index * 0.1}
          />
        );
      })}
    </div>
  );
};

interface SkeletonLoaderItemProps {
  opacity: number;
}

const SkeletonLoaderItem: React.FC<SkeletonLoaderItemProps> = ({ opacity }) => {
  return (
    <div
      style={{
        display: "flex",
        padding: "5px",
        borderBottom: "1px solid var(--black-text-tr)",
        alignItems: "center",
        height: "90px",
        overflow: "hidden",
        opacity: opacity,
      }}
    >
      {/* Colonne pour la couverture */}
      <div style={{ flex: 0.75, paddingRight: "5px", width: "75px"}}>
        <Skeleton variant="rectangular" width={75} height={100} />
      </div>

      {/* Colonne regroupant Titre + Date et Auteur + Éditeur */}
      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        <div>
          {/* Titre et Date */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1.5rem" }} />
        </div>

        <div>
          {/* Auteur et Éditeur */}
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        </div>
      </div>
      <div
        style={{
          flex: 0.25,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          borderLeft: "1px solid var(--off-white-tr)",
          gap: "1px",
        }}
      ><Skeleton variant="rectangular" width={23} height={"100%"} /></div>
    </div>
  );
};

export default SkeletonLoader;
