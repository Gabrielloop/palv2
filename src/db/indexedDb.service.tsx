import { dbBookItem } from "../@types/bookItem";
import { dbmybooks } from "../db";

export const addOrUpdateBook = async (book: dbBookItem, liste: number ) => {
  dbmybooks.open(); // Ouvre la connexion à la base de données

  try {
    // Vérifier si un livre avec le même 'identifier' existe déjà
    const existingBook = await dbmybooks.table('books').where('identifier').equals(book.identifier).first();
    
    if (existingBook) {
      // Si le livre existe déjà, on ajoute un ID de liste supplémentaire à la liste des listes
      // On vérifie si l'ID de liste est déjà présent pour éviter les doublons
      if (!existingBook.listes.includes(book.liste)) {
        existingBook.listes.push(book.liste);
      }

      // Met à jour le livre existant avec le nouvel ID de liste
      await dbmybooks.table('books').put(existingBook);
      console.log('Livre mis à jour avec le nouvel ID de liste');
      return existingBook;
    } else {
      // Si le livre n'existe pas, on l'ajoute comme un nouveau livre
      const id = await dbmybooks.table('books').add(book);
      const newBook = await dbmybooks.table('books').get(id);
      console.log('Nouveau livre ajouté');
      return newBook;
    }
  } catch (error) {
    console.log('Erreur lors de l’ajout ou de la mise à jour du livre:', error);
  }
};