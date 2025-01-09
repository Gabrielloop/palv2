import Dexie from "dexie";
import { DbBook, DbFavoris, DbListe, DbAvancement} from "../@types/bookItem";
import { db } from "../db";

// Récupérer les favoris d'un utilisateur
export const getBooksFromFavoris = async (userId: number): Promise<DbFavoris[]> => {
    try {
        const favoris = await db.favoris.where("userId").equals(userId).toArray();
        console.log("Favoris récupérés :", favoris);
        return favoris.map(favori => ({
            ...favori,
            bookId: favori.bookId.toString()
        }));
    
    } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
        return [];
    }  
}

// Récupérer les livres en cours d'avancement d'un utilisateur
export const getBooksAdvancement = async (userId: number): Promise<DbAvancement[]> => {
    try {
        const avancements = await db.avancements.where("userId").equals(userId).toArray();
        console.log("Avancements récupérés :", avancements);
        return avancements;
    } catch (error) {
        console.error("Erreur lors de la récupération des avancements :", error);
        return [];
    }
}

// Récupérer les livres d'un utilisateur total
export const getBookUser = async (userId: number): Promise<DbBook[]> => {
    try {
        const books = await db.books.where("userId").equals(userId).toArray();
        console.log("Livres récupérés :", books);
        return books;
    } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
        return [];
    }
}

// Récupérer les livres d'une liste de l'utilisateur
export const getBooksFromList = async (userId: number, listId: number): Promise<string[]> => {
    try {  
        const books = await db.liste_book
            .where("userId")
            .equals(userId)
            .and((rel) => rel.listeId === listId)
            .toArray();
        return books.map(book => book.bookId.toString());
    } catch (error) {
        console.error("Erreur lors de la récupération des livres de la liste :", error);
        return [];
    }
}