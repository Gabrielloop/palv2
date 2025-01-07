import React, { useEffect, useState } from "react";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import Box from "@mui/material/Box";
import ScrollX from "components/ScrollX";
import AddListeBox from "components/AddListBox";
import ListeItem from "../../components/ListeItem";
import { db } from "../../db"; // Assurez-vous que le chemin est correct
import { dbListe } from "../../db"; // Interface dbListe pour typage
import BaseLists from "./BaseLists";
import Carousel from "components/Carousel";

const Listes: FC<{ localtitle: string }> = ({ localtitle }) => {
  const [userLists, setUserLists] = useState<dbListe[]>([]);

  // Récupérer les listes de l'utilisateur 1
  useEffect(() => {
    const fetchUserLists = async () => {
      try {
        const lists = await db.listes.where("userId").equals(1).toArray(); // Filtrer par userId
        setUserLists(lists);
      } catch (error) {
        console.error("Erreur lors de la récupération des listes :", error);
      }
    };

    fetchUserLists();
  }, []);

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
            <Box key={list.id}> {/* Utilisez `id` comme clé */}
              <ListeItem
                categoryId={list.id || 0} // Utilisez 0 comme valeur par défaut si `id` est undefined
                categoryTitle={list.nom}
                categoryType={list.type}
                userId={1} // ID utilisateur fixe pour le test
              />
            </Box>
          ))}
          <AddListeBox />
        </Box>
      </ScrollX>
    </Box>
      <BaseLists />
      <Carousel/>
      </>
  );
};

export default Listes;
