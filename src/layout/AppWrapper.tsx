import React, {FC} from 'react';
import Box from "@mui/material/Box";
import {Helmet} from "react-helmet-async";

// Composant pour encadrer le contenu de l'application
// permet de définir le titre de l'application

const AppWrapper: FC<{children:any}> = ({children}) => {
    return (
            <Box className={"app-wrapper-container"}>
                <Helmet>
                    <title>Mon app</title>
                </Helmet>
            {children}
            </Box>
    );
};

export default AppWrapper;