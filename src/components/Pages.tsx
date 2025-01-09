import React, {FC} from 'react';
import MenuBox from "../pages/C_footer/MenuBox";
import Box from "@mui/material/Box";
import {Helmet} from "react-helmet-async";

const Pages: FC<{children:any}> = ({children}) => {
    return (
            <Box className={"box-page-content"}>
                <Helmet>
                    <title>Mon app</title>
                </Helmet>
            {children}
            </Box>
    );
};

export default Pages;
