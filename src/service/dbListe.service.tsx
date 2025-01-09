import { BehaviorSubject } from 'rxjs';
import { DbListe } from '../@types/bookItem';
import { db } from '../db';



// Déclaration des observables
export const listSubject$ = new BehaviorSubject<DbListe[]>([]);

// Ajouter une liste à la base de données
export const addListe = async (liste: DbListe) => {
  try {
    const id: string = await db.listes.add(liste);
    const currentLists = await getUserListes(1);
    listSubject$.next(currentLists); // Mise à jour du BehaviorSubject
  } catch (error) {
    console.error("Erreur lors de l'ajout de la liste :", error);
  }
};

// Récupérer les listes d'un utilisateur
export const getUserListes = async (userId: number): Promise<DbListe[]> => {
  try {
    const listes = await db.listes.where("userId").equals(userId).toArray();
    console.log(`Listes récupérées pour l'utilisateur ${userId}:`, listes);
    return listes;
  } catch (error) {
    console.error(`Erreur lors de la récupération des listes pour l'utilisateur ${userId}:`, error);
    return [];
  }
};

// Supprimer une liste de la base de données
export const deleteListe = async (userId:number, listeId: number): Promise<boolean> => {
  try {
    const liste = await db.listes.where("id").equals(listeId).first();
    if (!liste || !liste.id) {
      console.warn(`Aucune liste trouvée avec ID : ${listeId}`);
      return false; // Rien à supprimer
    }
    await db.listes.delete(liste.id.toString());
    const currentLists = await getUserListes(1);
    listSubject$.next(currentLists); // Mise à jour du BehaviorSubject
    console.log(`Liste avec ID ${listeId} supprimée.`);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression de la liste avec ID ${listeId}:`, error);
    return false;
  }
};