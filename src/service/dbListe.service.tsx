import { BehaviorSubject } from 'rxjs';
import { dbListe } from '../@types/bookItem';
import { db } from '../db';

// Déclaration des observables
export const listSubject$ = new BehaviorSubject<dbListe[]>([]);


// Ajouter une liste à la base de données
export const addListe = async (liste: dbListe) => {
  try {
    
    const id: string = await db.listes.add(liste);
    console.log("Liste ajoutée avec ID :", id);
    // Ajout de l'observable
    const currentLists = listSubject$.value || [];
    console.log("IndexDB : Liste actuelle :", currentLists);
    console.log("IndexDB : Liste ajoutée :", liste);
    listSubject$.next([...currentLists, { ...liste, id: Number(id) }]); // Mise à jour du BehaviorSubject
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