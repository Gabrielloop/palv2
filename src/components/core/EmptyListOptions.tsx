import React from "react";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";



const EmptyListOptions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="liste-vide-options"
    onClick={() => navigate("/search")}
    style={{
      cursor: "pointer"
    }}
    >
      <SearchIcon style={{fontSize: "100"}}/><p>rechercher un livre</p>
    </div>
  );
}

export default EmptyListOptions;
