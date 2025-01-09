import Dexie from "dexie";
import { DbBook, DbFavoris, DbListe, DbAvancement} from "../@types/bookItem";
import { db } from "../db";

const isFavoris = async (userId: number, bookId: string): Promise<boolean> => {
  try {
    const favoris = await db.favoris
      .where("userId")
      .equals(userId)
      .and((fav) => fav.bookId === bookId)
      .first();

    const isFav = !!favoris;
    console.log(
      `Le livre ${bookId} est ${isFav ? "présent" : "absent"} dans les favoris pour l'utilisateur ${userId}.`
    );
    return isFav;
  } catch (error) {
    console.error(
      `Erreur lors de la vérification du livre ${bookId} dans les favoris pour l'utilisateur ${userId} :`,
      error
    );
    return false;
  }
}

const isComment = async (userId: number, bookId: string): Promise<boolean> => {
    try {
        const comment = await db.commentaires
        .where("userId")
        .equals(userId)
        .and((com) => com.bookId === bookId)
        .first();
    
        const isCom = !!comment;
        console.log(
        `Le livre ${bookId} est ${isCom ? "commenté" : "non commenté"} par l'utilisateur ${userId}.`
        );
        return isCom;
    } catch (error) {
        console.error(
        `Erreur lors de la vérification du livre ${bookId} dans les commentaires pour l'utilisateur ${userId} :`,
        error
        );
        return false;
    }
    }
const isTracked = async (userId: number, bookId: string): Promise<boolean> => {
    try {
        const tracked = await db.avancements
        .where("userId")
        .equals(userId)
        .and((tr) => tr.bookId === bookId)
        .first();
    
        const isTr = !!tracked;
        console.log(
        `Le livre ${bookId} est ${isTr ? "suivi" : "non suivi"} par l'utilisateur ${userId}.`
        );
        return isTr;
    } catch (error) {
        console.error(
        `Erreur lors de la vérification du livre ${bookId} dans les suivis pour l'utilisateur ${userId} :`,
        error
        );
        return false;
    }
    }