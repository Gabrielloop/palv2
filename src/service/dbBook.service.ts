import Dexie from "dexie";
import { DbBook, DbFavoris, DbLists, DbAvancement} from "../@types/database";
import { db } from "../db";
import { getAvancement, isInAvancement } from "./dbBookOptions.service";

// Ajouter un livre à la base de données
export const addBook = async (book: DbBook) => {
    try {
      await db.books.add(book);
      console.log("Livre ajouté :", book);
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un livre :", error);
    }
  };
  
  // Ajouter un livre à une liste
  export const addBookToList = async (userId: number, listeId: number, bookId: string) => {
    try {
      // Vérifier si le livre existe déjà dans dbBook
      const existingBook = await db.books.where("identifier").equals(bookId).first();
      if (!existingBook) {
        // Si le livre n'existe pas, l'ajouter à dbBook
        await db.books.add({ identifier: bookId, userId });
        console.log(`Livre ${bookId} ajouté à dbBook.`);
  
        // Ajouter une entrée dans dbAvancement pour ce livre avec avancement initial à 0
          // vérification de la présqence de book dans avancement :
        const alreadyInAvancement = await isInAvancement(userId, bookId);
        console.log('already in at :' + alreadyInAvancement);
        if (!alreadyInAvancement) {
          await db.avancements.add({ bookId, userId, avancement: 0 });
          console.log(`Livre ${bookId} ajouté à dbAvancement avec avancement initial à 0.`);
        } else {console.log(`Livre ${bookId} a déjà un avancement` +alreadyInAvancement);}
      }
  
      // Ajouter la relation entre la liste, le livre et l'utilisateur
      await db.liste_book.add({ userId, listeId, bookId });
      console.log(`Livre ${bookId} ajouté à la liste ${listeId} pour l'utilisateur ${userId}.`);
    } catch (error) {
      console.error(
        `Erreur lors de l'ajout du livre ${bookId} à la liste ${listeId} pour l'utilisateur ${userId} :`,
        error
      );
    }
  };

  // Vérifier si un livre est dans une liste
export const isBookInList = async (userId: number, listeId: number, bookId: string): Promise<boolean> => {
    try {
      const relation = await db.liste_book
        .where("userId")
        .equals(userId)
        .and((rel) => rel.listeId === listeId && rel.bookId === bookId)
        .first();
  
      const isInList = !!relation;
      return isInList;
    } catch (error) {
      return false;
    }
  };
  
// Récupérer les favoris d'un utilisateur
export const getBooksFromFavoris = async (userId: number): Promise<DbFavoris[]> => {
    try {
        const favoris = await db.favoris.where("userId").equals(userId).toArray();
        return favoris.map(favori => ({
            ...favori,
            bookId: favori.bookId.toString()
        }));
    
    } catch (error) {
        return [];
    }  
}

// Récupérer les livres en cours d'avancement d'un utilisateur
export const getBooksAdvancement = async (userId: number): Promise<DbAvancement[]> => {
    try {
        const avancements = await db.avancements.where("userId").equals(userId).toArray();
        return avancements;
    } catch (error) {
        return [];
    }
}

// Récupérer les livres d'un utilisateur total
export const getBookUser = async (userId: number): Promise<DbBook[]> => {
    try {
        const books = await db.books.where("userId").equals(userId).toArray();
        return books;
    } catch (error) {
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
        return [];
    }
}
export const removeBookFromList = async (userId: number, listeId: number, bookId: string) => {
    try {
      // Supprimer la relation entre la liste, le livre et l'utilisateur
      const deletedCount = await db.liste_book
        .where("userId")
        .equals(userId)
        .and((rel) => rel.listeId === listeId && rel.bookId === bookId)
        .delete();
  
      if (deletedCount > 0) {
        console.log('delete from liste_book:',bookId);
      } else {
      }
  
      // Vérifier si le livre est toujours dans une autre liste de l'utilisateur
      const remainingRelations = await db.liste_book
        .where("userId")
        .equals(userId)
        .and((rel) => rel.bookId === bookId)
        .count();
  
      if (remainingRelations === 0) {
        // Si le livre n'est plus associé à aucune liste de l'utilisateur, le supprimer de dbBook
        await db.books.where("identifier").equals(bookId).delete();
        await db.avancements.where("bookId").equals(bookId).delete();
        console.log('delete bookId:',bookId);
      }
    } catch (error) {
    }

    

  };
  // Récupération d'une liste de 5 livre de la dbBook ramdom :
  export const getRandomBooks = async (n:number): Promise<DbBook[]> => {
    try {
        const books = await db.books.orderBy('identifier').limit(n).toArray();
        const shuffledBooks = books.sort(() => 0.5 - Math.random());
        const randomBooks = shuffledBooks.slice(0, n);
        return randomBooks;
        return books;
    } catch (error) {
        return [];
    }
};