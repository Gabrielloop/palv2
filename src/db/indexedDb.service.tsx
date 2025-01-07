import Dexie from "dexie";
import { dbBook, dbListe } from "../@types/bookItem";
import { db } from "../db";

// Ajouter un livre à la base de données
export const addBook = async (book: dbBook) => {
  try {
    await db.books.add(book);
    console.log("Livre ajouté :", book);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un livre :", error);
  }
};

// Ajouter une liste à la base de données
export const addListe = async (liste: dbListe) => {
  try {
    const id = await db.listes.add(liste);
    console.log("Liste ajoutée avec ID :", id);
  } catch (error) {
    console.error("Erreur lors de l'ajout de la liste :", error);
  }
};

// Récupérer les listes d'un utilisateur
export const getUserListes = async (userId: number): Promise<dbListe[]> => {
  try {
    const listes = await db.listes.where("userId").equals(userId).toArray();
    console.log(`Listes récupérées pour l'utilisateur ${userId}:`, listes);
    return listes;
  } catch (error) {
    console.error(`Erreur lors de la récupération des listes pour l'utilisateur ${userId}:`, error);
    return [];
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
      await db.avancements.add({ bookId, userId, avancement: 0 });
      console.log(`Livre ${bookId} ajouté à dbAvancement avec avancement initial à 0.`);
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


export const removeBookFromList = async (userId: number, listeId: number, bookId: string) => {
  try {
    // Supprimer la relation entre la liste, le livre et l'utilisateur
    const deletedCount = await db.liste_book
      .where("userId")
      .equals(userId)
      .and((rel) => rel.listeId === listeId && rel.bookId === bookId)
      .delete();

    if (deletedCount > 0) {
      console.log(`Livre ${bookId} retiré de la liste ${listeId} pour l'utilisateur ${userId}.`);
    } else {
      console.log(
        `Aucune correspondance trouvée pour le livre ${bookId} dans la liste ${listeId} pour l'utilisateur ${userId}.`
      );
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
      console.log(
        `Livre ${bookId} supprimé de dbBook car il n'est plus dans aucune liste de l'utilisateur ${userId}.`
      );
    }
  } catch (error) {
    console.error(
      `Erreur lors de la suppression du livre ${bookId} de la liste ${listeId} pour l'utilisateur ${userId} :`,
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
    console.log(
      `Le livre ${bookId} est ${isInList ? "présent" : "absent"} dans la liste ${listeId} pour l'utilisateur ${userId}.`
    );
    return isInList;
  } catch (error) {
    console.error(
      `Erreur lors de la vérification du livre ${bookId} dans la liste ${listeId} pour l'utilisateur ${userId} :`,
      error
    );
    return false;
  }
};
