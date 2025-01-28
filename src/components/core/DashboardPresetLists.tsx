import { FC } from "react";
import { Box } from "@mui/material";
import ScrollX from "../general/BoxScrollOnX";
import DashboardPresetListButton from "./DashboardPresetListButton";
import {presetLists} from "../../service/dbPresetLists.service";

interface DashboardPresetListsProps {
  group: string;
}

const DashboardPresetLists: FC<DashboardPresetListsProps> = ({ group }) => {
  return (
    <>
      <ScrollX boxName={group}>
            {presetLists.filter(lists => lists.group === group).map((lists, index) => (
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
