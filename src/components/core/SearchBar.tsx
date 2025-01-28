import React from "react";
import { Box, Button, Switch, TextField } from "@mui/material";
import SwitchDisplayResult from "../ui/SwitchDisplayResult";

// Composant pour la barre de recherche

interface SearchBarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, setQuery, handleSearch }) => {
  return (
      <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
        <TextField
        className="my-search-bar"
        label="Rechercher par titre ou ISBN"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
          handleSearch(e);
          }
        }}
        fullWidth
        style={{ width: "100%" }}
        />
        {/* Bouton facultatif pour soumettre le formulaire
        <Button type="submit" variant="contained" color="primary" sx={{ width: "100%" }}>
        Rechercher
        </Button> */}
        
      </Box>
  );
};

export default SearchBar;