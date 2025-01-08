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
import { fromEventPattern, BehaviorSubject } from "rxjs";
import { listSubject$, getUserListes } from "../../service/dbListe.service";

const Listes: FC<{ localtitle: string }> = ({ localtitle }) => {
  const [userLists, setUserLists] = useState<dbListe[]>([]);

  useEffect(() => {
    const subscription = listSubject$.subscribe((lists) => {
      setUserLists(lists);
    });
    (async () => {
      try {
        const initialLists = await getUserListes(1);
        listSubject$.next(initialLists); // Met à jour le BehaviorSubject
      } catch (error) {
        console.error("Erreur lors du chargement des listes :", error);
      }
    })();

    return () => subscription.unsubscribe(); // Nettoyer l'abonnement
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
