import React, { FC, useState } from "react";
import { Box, Autocomplete, TextField } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";

// COmposant Out of date

const titles: string[] = [
  "Empire of Whisper",
  "Adventure of Chronicle",
  "Chronicle of Fate",
  "Shadow of Empire",
  "Legacy of Secret",
];

const NavBarTop: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Gestion des états
  const [query, setQuery] = useState<string>("");
  const [recherche, setRecherche] = useState<string>("Titre");

  // Gestion de la touche Entrée pour valider la recherche
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      // Déterminer le paramètre à utiliser dans l'URL
      let searchParam = "";
      if (recherche === "Titre") {
        searchParam = `q=${encodeURIComponent(query)}`;
      } else if (recherche === "Auteur") {
        searchParam = `a=${encodeURIComponent(query)}`;
      } else if (recherche === "ISBN") {
        searchParam = `isbn=${encodeURIComponent(query)}`;
      }

      navigate(`/recherches?${searchParam}`);
    }
  };

  // Gestion du type de recherche
  const handleChange = (event: SelectChangeEvent) => {
    setRecherche(event.target.value);
    setQuery(""); // Réinitialiser la recherche lorsqu'on change le type
  };

  // Gestion de la saisie (valide uniquement les chiffres pour ISBN)
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = event.target.value;
    if (recherche === "ISBN") {
      // Permet uniquement les chiffres pour ISBN
      if (/^\d*$/.test(value)) {
        setQuery(value);
      }
    } else {
      setQuery(value);
    }
  };

  return (
    <nav style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      {/* Bouton Retour */}
      <div className={"my-div-circle"} onClick={() => navigate(-1)}>
        <ArrowBackIcon sx={{ height: 50 }} />
      </div>

      {/* Icône Scanner */}
      <div className={"my-div-circle"}>
        <QrCodeScannerIcon sx={{ height: 50 }} />
      </div>

      {/* Barre de recherche */}
      {recherche !== "Titre" ? (
        <TextField
          className={"my-search-bar"}
          sx={{ width: 300 }}
          value={query}
          onChange={handleInputChange} // Gestion spécifique pour ISBN
          label={`Recherche par ${recherche}`}
          onKeyDown={handleKeyDown} // Détecte la touche Entrée
        />
      ) : (
        <Autocomplete
          className={"my-search-bar"}
          disablePortal
          options={titles}
          sx={{ width: 300 }}
          value={query}
          onInputChange={(event, newInputValue) => setQuery(newInputValue)} // Met à jour localement la recherche
          renderInput={(params) => (
            <TextField
              {...params}
              label={`Recherche par ${recherche}`}
              onKeyDown={handleKeyDown} // Détecte la touche Entrée
            />
          )}
        />
      )}

      {/* Sélecteur du type de recherche */}
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="recherche-select-label">Recherche</InputLabel>
        <Select
          labelId="recherche-select-label"
          id="recherche-select"
          value={recherche}
          label="Recherche"
          onChange={handleChange}
        >
          <MenuItem value="Titre">Titre</MenuItem>
          <MenuItem value="Auteur">Auteur</MenuItem>
          <MenuItem value="ISBN">ISBN</MenuItem>
        </Select>
      </FormControl>
    </nav>
  );
};

export default NavBarTop;