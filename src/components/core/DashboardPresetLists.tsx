import React from "react";
import { FC } from "react";
import { Box } from "@mui/material";
import ScrollX from "../general/BoxScrollOnX";
import DashboardPresetListButton from "./DashboardPresetListButton";
import {presetLists} from "../../service/dbPresetLists.service";

const DashboardPresetLists: FC<{}> = ({}) => {
  return (
    <>
      <ScrollX>
          {presetLists.map((lists, index) => (
            <Box key={index}>
              <DashboardPresetListButton
                categoryTitle={lists.name}
                categoryType={lists.type}
              />
            </Box>
          ))}
        </ScrollX>
    </>
  );
};

export default DashboardPresetLists;
