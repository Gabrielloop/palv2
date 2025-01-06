import React, { useState } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, Button } from "@mui/material";

// Composant pour afficher le formulaire de recherche avancée
// à faire : ajouter des options de recherche avancée
// à faire : le lien avec bnfServices.ts
// refacto : le design du formulaire

interface AdvancedSearchFormProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
  onSearch: (params: { title: string, author: string, language: string, isbn: string }) => void;
}

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({ query, setQuery, handleSearch, onSearch }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [language, setLanguage] = useState('fre');
  const [isbn, setIsbn] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ title, author, language, isbn });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Titre"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Auteur"
        variant="outlined"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <FormControl variant="outlined">
        <InputLabel>Langue</InputLabel>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          label="Langue"
        >
          <MenuItem value="fre">Français</MenuItem>
          <MenuItem value="eng">Anglais</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="ISBN"
        variant="outlined"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <Button variant="contained" color="primary" type="submit">
        Recherche Avancée
      </Button>
    </form>
  );
};

export default AdvancedSearchForm;
