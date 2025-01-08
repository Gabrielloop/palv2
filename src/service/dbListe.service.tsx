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