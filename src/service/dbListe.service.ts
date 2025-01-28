import { BehaviorSubject } from 'rxjs';
import { DbLists } from '../@types/database';
import { db } from '../db';
import { removeBookFromList } from '../service/dbBook.service';


// Déclaration des observables
export const listSubject$ = new BehaviorSubject<DbLists[]>([]);

// Ajouter une liste à la base de données
export const addList = async (liste: DbLists) => {
  try {
    const id: string = await db.lists.add(liste);
    console.log(`addList: ${id}`);
    const currentLists = await getUserListes(1);
    listSubject$.next(currentLists); // Mise à jour du BehaviorSubject
  } catch (error) {
    console.error("error addlist :", error);
  }
};

// Récupérer les listes d'un utilisateur
export const getUserListes = async (userId: number): Promise<DbLists[]> => {
  try {
    const listes = await db.lists.where("userId").equals(userId).toArray();
    return listes;
  } catch (error) {
    return [];
  }
};

export const getListTitle = async (listeId: number): Promise<string> => {
  try {
    const liste = await db.lists.where("id").equals(listeId).first();
    if (!liste || !liste.id) {
      return "";
    }
    return liste.name;
  } catch (error) {
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
      }
    }
    const liste = await db.lists.where("id").equals(listeId).filter(item => item.userId === userId).first();
    if (!liste || !liste.id) {
      return false;
    }
    //  await db.listes.delete(liste.id.toString());
        await db.lists.where("id").equals(listeId).filter(item => item.userId === userId).delete();
    // const currentLists = await getUserListes(1);
    // listSubject$.next(currentLists); // Mise à jour du BehaviorSubject
    console.info('deleteListe:', listeId);
    return true;
  } catch (error) {
    console.error('deleteListe:', error);
    return false;
  }
};

