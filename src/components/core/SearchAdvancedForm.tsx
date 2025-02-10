import React, { useState } from "react";
import { TextField, MenuItem, Select, InputLabel, FormControl, Button } from "@mui/material";


// Composant pour afficher le formulaire de recherche avancée
// à faire : ajouter des options de recherche avancée
// à faire : le lien avec bnfServices.ts
// refacto : le design du formulaire

interface AdvancedSearchFormProps {
  advanceQuery: string;
  setAdvanceQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => void;
  onSearch: (params: { title: string, author: string, publisher: string, year: number }) => void;
}

const AdvancedSearchForm: React.FC<AdvancedSearchFormProps> = ({ advanceQuery, setAdvanceQuery, handleSearch, onSearch }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ title, author, publisher, year });
    setAdvanceQuery(title);
  };

  return (
    <form onSubmit={handleSubmit}
    style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        gap: "1rem"
        }}>
      <TextField
      sx={{
        width: "100%",
      }}
        label="Titre"
        variant="outlined"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
      sx={{
        width: "100%",
      }}
        label="Auteur"
        variant="outlined"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <TextField
      sx={{
        width: "55%",
      }}
        label="Publié par"
        variant="outlined"
        value={publisher}
        onChange={(e) => setPublisher(e.target.value)}
      />
      <TextField
      sx={{
        width: "40%",
      }}
        label="Année"
        type="number"
        variant="outlined"
        value=''
        onChange={(e) => setYear(Number(e.target.value))}
      />
      <Button sx={{
        width: "100%",
      }}
      variant="contained" color="primary" type="submit">
        Recherche Avancée
      </Button>
    </form>
  );
};

export default AdvancedSearchForm;
