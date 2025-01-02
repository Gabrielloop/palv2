import React, {FC} from 'react';
import {Helmet} from "react-helmet-async";
import {useLocation} from "react-router";
import movies from "../../dataFake/movie_details.json";

let detailsBook:any = {};

const MyBook: FC<{}> = ({}) => {
    const location = useLocation();
    const lastSegment = Number(location.pathname.split("/").pop());

    if (movies.id === lastSegment) {
        detailsBook= {...movies};


        if (detailsBook.title) {
            console.log("Titre :", detailsBook.title);
        }


        return (
            <>
                <Helmet>
                    <title>{detailsBook.title}</title>
                </Helmet>
                <h2>
                    <strong>Titre :</strong> {detailsBook.title}
                </h2>
            </>
        );

    } else {
        return (
            <>
                <Helmet>
                    <title>Erreur</title>
                </Helmet>
                <h2>
                    Erreur
                </h2>
            </>
        );}



};

export default MyBook;
