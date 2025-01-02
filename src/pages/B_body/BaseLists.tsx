import React from 'react';
import {FC} from "react";
import Grid2 from "@mui/material/Grid2";
import {Helmet} from "react-helmet-async";
import ListeItem from "../../components/ListeItem";


const myBaseList = [
    {key: 0, name: "Favoris", color: "pink"},
    {key: 3, name: "Bibliothèque", color : "brown"},
    {key: 3, name: "PAL", color: "orange"}
]

const BaseLists: FC<{}> = ({}) => {
    return (
            <Grid2 container spacing={2}>
                {myBaseList.map((lists, index) =>
                    (
                            <Grid2 size={{xs: 6, md: 3}} key={index}>
                                <ListeItem category={lists.name}/>
                            </Grid2>
                    ))
                }
            </Grid2>
    );
};

export default BaseLists;
