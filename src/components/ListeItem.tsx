import {FC} from 'react';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {MovieItem as MovieType} from "../@types/movieItem";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MyRatingSys from "./MyRatingSys";
import convertRound from "./convertRound";
import {useNavigate} from "react-router";

const ListeItem: FC<{ category:string}> = ({category}) => {
    const navigate = useNavigate();
    const path_liste:string= "/listes/" + category;
    const classListColor:string = "liste-" + category;
    console.log(classListColor)
    return (
        <Card className ={"my-own-class " + classListColor} sx={{width:"min(250px 100%)"}} onClick={() => navigate(path_liste)}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    contenu
                </Typography>
                <Button key={category} variant="contained">
                    {category}
                </Button>
            </CardContent>
        </Card>
    );
};

export default ListeItem;
