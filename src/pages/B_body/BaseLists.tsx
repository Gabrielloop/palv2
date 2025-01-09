import React from "react";
import { FC } from "react";
import Grid2 from "@mui/material/Grid2";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";
import ArrowForwardIosOutLinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ScrollX from "../../components/ScrollX";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import TimelapseOutlined from "@mui/icons-material/TimelapseOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import CollectionsBookmarkOutlinedIxon from "@mui/icons-material/CollectionsBookmarkOutlined";
import BaseListsItem from "../../components/BaseListsItem";

export const myBaseList = [
  { key: 0, name: "Favoris", type: "fav", icon: <FavoriteOutlinedIcon/> },
  { key: 1, name: "A lire", type: "notStart", icon: <RadioButtonUncheckedOutlinedIcon/> },
  { key: 1, name: "En cours", type: "inProgress", icon: <TimelapseOutlined/> },
  { key: 1, name: "Terminé", type: "finished", icon: <TaskAltOutlinedIcon/> },
  { key: 2, name: "Enregistré", type: "save", icon: <CollectionsBookmarkOutlinedIxon/> },
];

const BaseLists: FC<{}> = ({}) => {
  return (
    <>
      <ScrollX>
          {myBaseList.map((lists, index) => (
            <Box key={index}>
              <BaseListsItem
                categoryTitle={lists.name}
                categoryType={lists.type}
              />
            </Box>
          ))}
        </ScrollX>
    </>
  );
};

export default BaseLists;
