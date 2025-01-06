import React, {FC} from 'react';
import Box from "@mui/material/Box";
import {Helmet} from "react-helmet-async";

// Composant pour afficher un children dans un container header (ex par de recherche)
// à faire : optimiser l'utilisateur avec des proprs

const HeaderContainer: FC<{children:any}> = ({children}) => {
    return (
            <Box className={"header-container"}>
            {children}
            </Box>
    );
};

export default HeaderContainer;
