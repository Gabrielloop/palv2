import React from 'react';
import {FC} from "react";
import Grid2 from "@mui/material/Grid2";
import BookItem from "../../components/BookItem";
import {Helmet} from "react-helmet-async";
import ListeItem from "../../components/ListeItem";
import BaseLists from './BaseLists';


const myCategoryList = [
    {key: 0, name: "Albums"},
    {key: 1, name: "Souhaits"},
    {key: 2, name: "Livres Audio"},
    {key: 3, name: "BDs"},
    {key: 3, name: "Mangas"},
    {key: 4, name: "Noël"},
]



const Listes: FC<{localtitle:string}> = ({localtitle}) => {
    return (
        <>
            <BaseLists />
            <Helmet>
                <title>{localtitle}</title>
            </Helmet>
            <h2>
                Mes Listes
            </h2>
            <Grid2 container spacing={2}>
                {myCategoryList.map((lists, index) =>
                    (
                            <Grid2 size={{xs: 6, md: 3}} key={index}>
                                <ListeItem category={lists.name}/>
                            </Grid2>
                    ))
                }
            </Grid2>
        </>
    );
};

export default Listes;
