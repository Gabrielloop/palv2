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


const BookItem: FC<{book:any}> = ({book}) => {
    const MyImagePoster= "https://covers.openlibrary.org/b/id/" + book.cover_i +"-M.jpg";
    const path_liste: string = "/recherches/" + book.isbn;
    const navigate = useNavigate();
    console.log(book)
    return (
        <Card className = "my-own-class" sx={{width:"min(250px 100%)"}} onClick={() => navigate(path_liste)}>
            <CardMedia
                sx={{height: 190}}
                image={MyImagePoster}
                title={book.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {book.title}
                </Typography>
                <Typography className={"film-card-description"} variant="body2" sx={{color: 'text.secondary'}}>
                    {book.author}
                    <br/>
                    {book.author_name}
                </Typography>
                <MyRatingSys HereRating={book.ratings_average}/><i>{book.ratings_average}</i>
            </CardContent>
        </Card>
    );
};

export default BookItem;
