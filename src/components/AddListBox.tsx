import React, { useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { addList } from "../service/dbListe.service";
import listeViergeImage from "../assets/liste_vierge.jpg";


const AddListeBox: React.FC = () => {
  const [listName, setListName] = useState<string>("");

  const handleAddListe = async () => {
    if (listName.trim() === "") {
      alert("Le nom de la liste ne peut pas être vide !");
      return;
    }

    const newListe = {
      userId: 1, // ID utilisateur fixe pour le test
      name: listName,
      type: "liste",
    };

    try {
      await addList(newListe);
      alert(`Liste "${listName}" ajoutée avec succès !`);
      setListName(""); // Réinitialise le champ texte après l'ajout
    } catch (error) {
      console.error("Erreur lors de l'ajout de la liste :", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddListe();
    }
  };

  return (
      <>
      <div
        className={"apercus-liste"}
        style={{
          background: "var(--black-text-tr)",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          overflow: "hidden"
        }}
      >
        <div className="apercus-liste-fond">
          <img src={listeViergeImage} alt="Liste vierge"
          style={{
            width: "100%",
            height: "auto",
            alignContent: "center",
            objectFit: "cover",
            zoom: "1.5",
            color: "white"
            }}
          />
        </div>
        <div className="apercus-liste-titre">
        <TextField
        id="standard-basic"
        label="Ajouter une liste"
        variant="standard"
        value={listName}
        onChange={(e) => setListName(e.target.value)}
        onKeyDown={handleKeyDown}
        error={listName.trim() === ""} // Affiche une erreur si vide
        //helperText={listName.trim() === "" ? "Le champ ne peut pas être vide" : ""} // Message d'aide
        fullWidth
        InputProps={{
          sx: {
            color: "white",
          },
        }}
      />
        </div>
        
      </div>
    </>
  );
};

export default AddListeBox;
