import React from "react";
import { FC } from "react";
import { Box } from "@mui/material";
import ScrollX from "../general/BoxScrollOnX";
import BaseListsItem from "./DashboardPresetListButton";
import {presetLists} from "../../service/dbPresetLists.service";

const BaseLists: FC<{}> = ({}) => {
  return (
    <>
      <ScrollX>
          {presetLists.map((lists, index) => (
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
