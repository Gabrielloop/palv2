import React, { useState, useEffect } from "react";
import { Box, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import listesData from "../dataFake/listes_data.json";
import bookData from "../dataFake/book_data.json";

// Composant pour afficher un selecteur comprenant les listes de l'utilisateur
// à faire : ajouter un indicateur de présence du livre dans une liste
// refacto : bouton d'ajout/suppression
// refacto : les erreurs dans un composant à part > Important

interface AddToListFormProps {
  isbn: string;
}

const AddToListForm: React.FC<AddToListFormProps> = ({isbn}) => {
  const [selectedList, setSelectedList] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isBookInList, setIsBookInList] = useState<boolean>(false);  // Vérifier si le livre est déjà dans la liste

  // Fonction de gestion du changement de sélection
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedList(event.target.value);
  };

  // Fonction de gestion de l'enregistrement du formulaire avec gestion des erreurs
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedList) {
      setError("Veuillez sélectionner une liste.");
    } else {
      setError("");
    }
  };

  // Fonction pour vérifier si l'ISBN est déjà dans la liste sélectionnée
  const checkIfBookInList = () => {
    const selectedListData = listesData.find(list => list.id === Number(selectedList));

    if (selectedListData) {
      const bookInList = bookData.find(book => book.isbn === isbn && book.listes.includes(selectedListData.id));
      setIsBookInList(!!bookInList);  // Mettre à jour l'état en fonction de la présence du livre dans la liste
    }
  };

  // Effet pour vérifier si l'ISBN est déjà dans la liste lors du changement de sélection
  useEffect(() => {
    if (selectedList) {
      checkIfBookInList();
    }
  }, [selectedList, isbn]);

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", gap: "5px", flexWrap: "nowrap", width: "100%" }}>
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel sx={{color:"white"}}>Mes Listes</InputLabel>
        <Select
          value={selectedList}
          onChange={handleChange}
          label="Mes Listes"
          required
          sx={{color:"white"}}
        >
          {listesData.map((list) => (
            <MenuItem key={list.id} value={list.id.toString()}>
              {list.titre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
        {isBookInList ? (
          <RemoveOutlinedIcon/>  // Si le livre est déjà dans la liste, afficher l'icône "Retirer"
        ) : (
          <AddBoxOutlinedIcon />  // Sinon, afficher l'icône "Ajouter"
        )}

      {/* Affichage de l'erreur si la liste n'est pas sélectionnée */}
      {error && <Box color="error.main" style={{ marginTop: "8px" }}>{error}</Box>}
    </form>
  );
};

export default AddToListForm;
