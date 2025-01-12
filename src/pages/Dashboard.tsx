import React, { useEffect, useState, useCallback, useTransition } from "react";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import { dbLists } from "../db";
import { listSubject$, getUserListes } from "../service/dbListe.service";
import Box from "@mui/material/Box";
import ScrollX from "components/general/BoxScrollOnX";
import AddListeBox from "components/core/DashboardAddList";
import ListeItem from "../components/core/DashboardListPreview";
import DashboardPresetLists from "../components/core/DashboardPresetLists";
import Carousel from "components/ui/Carousel";
import { useAuth } from "hooks/useAuth";

const Listes: FC<{ localtitle: string }> = ({ localtitle }) => {
  const [userLists, setUserLists] = useState<dbLists[]>([]);
  const [isPending, startTransition] = useTransition();
  const loginUserId = useAuth()?.loginUserId ?? 0;  // Récupération du contexte utilisateur

  useEffect(() => {
    startTransition(async () =>  setUserLists(await getUserListes(loginUserId)));
    const subscription = listSubject$.subscribe((lists) => {
      setUserLists(lists);
    });
    return () => subscription.unsubscribe();
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
        {isPending && userLists.length === 0 ? (
          <p>Chargement...</p>
        ) : (
          <ScrollX>
            <Box sx={{ display: "flex", gap: "10px" }}>
              {userLists.map((list) => (
                <Box key={list.id}>
                  <ListeItem
                    categoryId={list.id || 0}
                    categoryTitle={list.name}
                    categoryType={list.type}
                    userId={1}
                  />
                </Box>
              ))}
              <AddListeBox />
            </Box>
          </ScrollX>
        )}
      </Box>
      <DashboardPresetLists />
      <Carousel />
    </>
  );
};

export default Listes;
