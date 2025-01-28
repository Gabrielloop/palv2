import React, {FC} from 'react';
import {Helmet} from "react-helmet-async";
import Grid2 from "@mui/material/Grid2";
import ListeItem from "../components/core/DashboardListPreview";
import OptionsListes from 'components/core/ListsOptions';

const myCategoryList = [
    {key: 0, name: "Albums"},
    {key: 1, name: "Souhaits"},
    {key: 2, name: "Livres Audio"},
    {key: 3, name: "BDs"},
    {key: 3, name: "Mangas"},
    {key: 4, name: "Noël"},
]
const Setting: FC<{ localtitle: string }> = ({localtitle}) => {
    return (
        <>
            <Helmet>
                <title>{localtitle}</title>
            </Helmet>
            <article>
                <h2>
                    Options
                </h2>
                Changements des paramètres (mail, mdp)
            </article>
            <article>
                <h2>
                    Mes listes
                </h2>
                <table>
                    <caption>
                        Gérer mes listes :
                    </caption>
                    <thead>
                    <tr>
                        <th scope="col">Nom de la liste</th>
                        <th scope="col">Livres</th>
                        <th scope="col">Options</th>
                    </tr>
                    </thead>
                    <tbody>
                        <OptionsListes/>
                    </tbody>
                    <tfoot>
                    <tr>
                        <th scope="row">Totals</th>
                        <td>X</td>
                        <td></td>
                    </tr>
                    </tfoot>
                </table>
            </article>

        </>
    );
};

export default Setting;
