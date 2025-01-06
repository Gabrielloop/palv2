import React from "react";
import { FC } from "react";
import Grid2 from "@mui/material/Grid2";
import { Helmet } from "react-helmet-async";
import ListeItem from "../../components/ListeItem";
import BaseLists from "./BaseLists";
import listesData from "../../dataFake/listes_data.json";
import myBaseList from "./BaseLists";
import Box from "@mui/material/Box";
import ArrowForwardIosOutLinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ScrollX from "components/ScrollX";
import Carousel from "components/Carousel";

const Listes: FC<{ localtitle: string }> = ({ localtitle }) => {
  return (
    <Box> 
      <Helmet>
        <title>{localtitle}</title>
      </Helmet>
      <h2>Mes Listes</h2>

      <ScrollX>
        {listesData.map((lists, index) => (
          <Box>
            <ListeItem
              categoryId={lists.id}
              categoryTitle={lists.titre}
              categoryType={lists.type}
            />
          </Box>
        ))}
      </ScrollX>
      <BaseLists />
      <Carousel/>
    </Box>
  );
};

export default Listes;
