import React, { useEffect, useState, useCallback } from "react";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import Box from "@mui/material/Box";
import ScrollX from "components/ScrollX";
import AddListeBox from "components/AddListBox";
import ListeItem from "../../components/ListeItem";
import { db } from "../../db";
import { dbListe } from "../../db"; // Typage pour `dbListe`
import BaseLists from "./BaseLists";
import Carousel from "components/Carousel";
import { fromEventPattern } from "rxjs";

const Listes: FC<{ localtitle: string }> = ({ localtitle }) => {
  const [userLists, setUserLists] = useState<dbListe[]>([]);

  // Fonction pour récupérer les listes d'un utilisateur
  const fetchUserLists = useCallback(async () => {
    try {
      const lists = await db.listes.where("userId").equals(1).toArray(); // Filtrer par userId
      setUserLists(lists);
    } catch (error) {
      console.error("Erreur lors de la récupération des listes :", error);
    }
  }, []);

// Créer un behavior subject pour les listes []





  // Charger les listes à l'initialisation
  useEffect(() => {
    fetchUserLists();
  }, [fetchUserLists]);

  return (
    <>
      <Box>
        <Helmet>
          <title>{localtitle}</title>
        </Helmet>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <h2>Mes Listes</h2>
        </Box>
        <ScrollX>
          <Box sx={{ display: "flex", gap: "10px" }}>
            {userLists.map((list) => (
              <Box key={list.id}>
                <ListeItem
                  categoryId={list.id || 0}
                  categoryTitle={list.nom}
                  categoryType={list.type}
                  userId={1}
                />
              </Box>
            ))}
            <AddListeBox />
          </Box>
        </ScrollX>
      </Box>
      <BaseLists />
      <Carousel />
    </>
  );
};

export default Listes;
