import React, { useState, useEffect } from "react";
import { Box, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { addBookToList, removeBookFromList, isBookInList} from "../../service/dbBook.service";
import { getUserListes } from "../../service/dbListe.service";
import { DbLists } from "../../@types/database";

interface AddToListFormProps {
  isbn: string; // ISBN du livre à gérer
  userId: number; // ID de l'utilisateur
}

const AddToListForm: React.FC<AddToListFormProps> = ({ isbn, userId }) => {
  const [selectedList, setSelectedList] = useState<string>(""); // Liste sélectionnée
  const [error, setError] = useState<string>(""); // Message d'erreur
  const [userLists, setUserLists] = useState<DbLists[]>([]); // Listes de l'utilisateur
  const [booksInLists, setBooksInLists] = useState<{ [key: number]: boolean }>({}); // Indique si le livre est dans chaque liste

  // Fonction de gestion du changement de sélection
  const handleChange = (event: SelectChangeEvent<string>) => {
    setSelectedList(event.target.value);
  };

  // Ajouter ou retirer un livre d'une liste
  const handleAddOrRemove = async () => {
    if (!selectedList) {
      setError("Veuillez sélectionner une liste.");
      return;
    }
    setError("");

    const listeId = Number(selectedList);

    if (booksInLists[listeId]) {
      // Si le livre est déjà dans la liste, le retirer
      await removeBookFromList(userId, listeId, isbn);
      setBooksInLists((prev) => ({ ...prev, [listeId]: false })); // Met à jour l'état local
    } else {
      // Sinon, l'ajouter
      await addBookToList(userId, listeId, isbn);
      setBooksInLists((prev) => ({ ...prev, [listeId]: true })); // Met à jour l'état local
    }
  };

  // Vérifie pour chaque liste si le livre (ISBN) est présent
  const fetchBooksInLists = async () => {
    try {
      const bookPresence: { [key: number]: boolean } = {};
      for (const list of userLists) {
        const isInList = await isBookInList(userId, list.id!, isbn); // Vérifie avec userId
        bookPresence[list.id!] = isInList;
      }
      setBooksInLists(bookPresence);
    } catch (error) {
      console.error("Erreur lors de la vérification des livres dans les listes :", error);
    }
  };

  // Effet pour récupérer les listes de l'utilisateur
  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const lists = await getUserListes(userId); // Utilise la fonction centralisée
        setUserLists(lists);
      } catch (error) {
        console.error("Erreur lors de la récupération des listes :", error);
      }
    };

    fetchUserLists();
  }, [userId]);

  // Effet pour vérifier la présence du livre dans les listes
  useEffect(() => {
    if (userLists.length > 0) {
      fetchBooksInLists();
    }
  }, [userLists, isbn]);

  return (
    <form
      onSubmit={(e) => e.preventDefault()} // Empêche le rechargement de la page
      style={{
        display: "flex",
        alignItems: "center",
        gap: "5px",
        flexWrap: "nowrap",
        width: "100%",
      }}
    >
      {/* Sélecteur des listes de l'utilisateur */}
      <FormControl variant="outlined" style={{ width: "100%" }}>
        <InputLabel sx={{ color: "white" }}>Mes Listes</InputLabel>
        <Select
          value={selectedList}
          onChange={handleChange}
          label="Mes Listes"
          required
          sx={{ color: "white" }}
        >
          {userLists.map((list) => (
            <MenuItem key={list.id} value={list.id?.toString() || ""}>
              {list.name}
              {/* Affiche un symbole si le livre est dans la liste */}
              {booksInLists[list.id!] && (
                <CheckCircleOutlineIcon
                  sx={{ marginLeft: "8px", color: "green" }}
                  fontSize="small"
                />
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Bouton d'ajout/suppression */}
      <Box
        onClick={handleAddOrRemove}
        sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
      >
        {selectedList && booksInLists[Number(selectedList)] ? (
          <RemoveOutlinedIcon /> // Si le livre est déjà dans la liste sélectionnée, afficher "Retirer"
        ) : (
          <AddBoxOutlinedIcon /> // Sinon, afficher "Ajouter"
        )}
      </Box>

      {/* Affichage de l'erreur si la liste n'est pas sélectionnée */}
      {error && (
        <Box color="error.main" style={{ marginTop: "8px" }}>
          {error}
        </Box>
      )}
    </form>
  );
};

export default AddToListForm;
