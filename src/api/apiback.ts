import { Book } from '../@types/api';
import axios from 'axios';

// add a book to the database
export const postApiBack = (url:string, book: Book) => {
    axios.post(url, book)
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}