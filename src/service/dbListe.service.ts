import { BehaviorSubject } from 'rxjs';
import { DbLists } from '../@types/bookItem';
import { db } from '../db';
import { removeBookFromList } from '../service/dbBook.service';


// Déclaration des observables
export const listSubject$ = new BehaviorSubject<DbLists[]>([]);

// Ajouter une liste à la base de données
export const addList = async (liste: DbLists) => {
  try {
    const id: string = await db.lists.add(liste);
    const currentLists = await getUserListes(1);
    listSubject$.next(currentLists); // Mise à jour du BehaviorSubject
  } catch (error) {
    console.error("Erreur lors de l'ajout de la liste :", error);
  }
};

// Récupérer les listes d'un utilisateur
export const getUserListes = async (userId: number): Promise<DbLists[]> => {
  try {
    const listes = await db.lists.where("userId").equals(userId).toArray();
    console.log(`Listes récupérées pour l'utilisateur ${userId}:`, listes);
    return listes;
  } catch (error) {
    console.error(`Erreur lors de la récupération des listes pour l'utilisateur ${userId}:`, error);
    return [];
  }
};

export const getListTitle = async (listeId: number): Promise<string> => {
  try {
    const liste = await db.lists.where("id").equals(listeId).first();
    if (!liste || !liste.id) {
      console.warn(`Aucune liste trouvée avec ID : ${listeId}`);
      return ""; // Rien à supprimer
    }
    return liste.name;
  } catch (error) {
    console.error(`Erreur lors de la récupération du titre de la liste avec ID ${listeId}:`, error);
    return "";
  }
};

// Supprimer une liste de la base de données
export const deleteListe = async (userId:number, listeId: number): Promise<boolean> => {
  try {
    const toClean = (await db.liste_book.where("listeId").equals(listeId).filter(item => item.userId === userId).toArray());
    if (toClean.length > 0) {
      for (const item of toClean) {
        await removeBookFromList(userId, listeId, item.bookId);
        console.log(`Livre ${item.bookId} retiré de la liste ${listeId} pour l'utilisateur ${userId}.`);
      }
    }
    const liste = await db.lists.where("id").equals(listeId).filter(item => item.userId === userId).first();
    if (!liste || !liste.id) {
      console.warn(`Aucune liste trouvée avec ID : ${listeId}`);
      return false; // Rien à supprimer
    }
    //  await db.listes.delete(liste.id.toString());
        await db.lists.where("id").equals(listeId).filter(item => item.userId === userId).delete();
    // const currentLists = await getUserListes(1);
    // listSubject$.next(currentLists); // Mise à jour du BehaviorSubject
    console.info(`Liste avec ID ${listeId} supprimée.`);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la liste avec ID ${listeId}:`, error);
    return false;
  }
};

