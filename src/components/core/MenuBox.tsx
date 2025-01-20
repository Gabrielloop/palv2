import {FC} from 'react';
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router";
import ListAltIcon from '@mui/icons-material/ListAlt';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import {useLocation} from "react-router-dom";

// Composant du menu principale
// à faire : alignement des icones.


const pages: any = [
    {name: "Mes listes", navigation: "/listes", icn: <ListAltIcon/>, colorClass: "bg-primary"},
    {name: "Recherche", navigation: "/search", icn: <SearchIcon/>, colorClass: "bg-secondary"},
    {name: "Options", navigation: "/options", icn: <SettingsIcon/>, colorClass: "bg-dark"}
];
/*{name: "Scanner", navigation: "/options", icn: <QrCodeScannerIcon/>, colorClass: "bg-dark"}, */



const MenuBox: FC<{}> = ({}) => {
    const location = useLocation();
    const navigate = useNavigate();
    return (
        <Box className={"menu_class_fix"}>
            {pages.map((element:any) => (
                <Button key={element.navigation} 
                        startIcon={element.icn}
                        variant="contained"
                        style={{
                            backgroundColor: "transparent",
                            color: location.pathname.startsWith(element.navigation) 
                                ? "white"
                                : "var(--off-white-tr)",
                            boxShadow: "none",
                            margin: "auto",
                        }}
                        onClick={() => navigate(element.navigation)}>
                    <span>{element.name}</span>
                </Button>
            ))}
        </Box>
    );
};

export default MenuBox;
