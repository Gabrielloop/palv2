import {FC} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';

const pages: any = [
    {name: "Mes listes", navigation: "/listes", icn: <ListAltIcon/>, colorClass: "bg-primary"},
    {name: "Recherches", navigation: "/recherches", icn: <SearchIcon/>, colorClass: "bg-secondary"},
    {name: "options", navigation: "/options", icn: <SettingsIcon/>, colorClass: "bg-dark"}
];


const MenuBox: FC<{}> = ({}) => {

    const navigate = useNavigate();
    return (
        <Box className={"menu_class_fix"}>
            {pages.map((element:any) => (
                <Button className={element.colorClass} key={element.navigation} startIcon={element.icn} variant="contained" onClick={() => navigate(element.navigation)}>
                    <span className={"btn-name-display"}>{element.name}</span>
                </Button>
            ))}
        </Box>
    );
};

export default MenuBox;
