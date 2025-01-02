import React from 'react';
import {FC} from "react";
import Grid2 from "@mui/material/Grid2";
import moviesCollection from "../../dataFake/movie_collection.json"
import BookItem from "../../components/BookItem";
import {Helmet} from "react-helmet-async";
import {useLocation} from 'react-router';

const MyList: FC<{}> = ({}) => {
    const location = useLocation();
    const lastSegment = location.pathname.split("/").pop();

    return (
        <>
            <Helmet>
                <title>Liste</title>
            </Helmet>
            <h2>
                {lastSegment}
            </h2>

             {/*
            <Grid2 container spacing={2}>
                {moviesCollection.results.map((film, index) =>
                    (
                            <Grid2 size={{xs: 6, md: 3}} key={index}>
                                <BookItem movie={film}/>
                            </Grid2>
                    ))
                }
            </Grid2>
              */}
        </>
    );
};

export default MyList;