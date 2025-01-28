import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// Composant pour afficher une flèche de retour avec le lien vers la page précédente
// à faire : gérer le retour vers une ancre.

const ArrowReturn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Si vous souhaitez, vous pouvez récupérer la dernière partie de l'URL comme un titre ou un indicateur
  const lastSegment = location.pathname.split("/").pop();

  return (
    <div className="my-div-circle" onClick={() => navigate(-1)} style={{ cursor: "pointer" }}>
      <ArrowBackIosIcon sx={{ height: 50 }} />
    </div>
  );
};

export default ArrowReturn;
