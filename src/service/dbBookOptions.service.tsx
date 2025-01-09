import Dexie from "dexie";
import { DbBook, DbFavoris, DbListe, DbAvancement} from "../@types/bookItem";
import { db } from "../db";

export const toggleFavoris = async (userId: number, bookId: string): Promise<boolean> => {
    try {
      const favoris = await db.favoris
        .where("userId")
        .equals(userId)
        .and((fav) => fav.bookId === bookId)
        .first();
  
      if (favoris) {
        await db.favoris.where("userId").equals(userId).and((fav) => fav.bookId === bookId).delete();
        console.log(`Livre ${bookId} retiré des favoris pour l'utilisateur ${userId}.`);
      } else {
        await db.favoris.add({ userId, bookId });
        console.log(`Livre ${bookId} ajouté aux favoris pour l'utilisateur ${userId}.`);
      }
  
      return true;
    } catch (error) {
      console.error(
        `Erreur lors de la modification des favoris pour le livre ${bookId} et l'utilisateur ${userId}:`,
        error
      );
      return false;
    }
  }

  export const toggleWishlist = async (userId: number, bookId: string): Promise<boolean> => {
    try {
      const whishlisted = await db.wishlists
        .where("userId")
        .equals(userId)
        .and((wish) => wish.bookId === bookId)
        .first();
  
      if (whishlisted) {
        await db.wishlists.where("userId").equals(userId).and((wish) => wish.bookId === bookId).delete();
        console.log(`Livre ${bookId} retiré de la wishlist de l'utilisateur ${userId}.`);
      } else {
        await db.wishlists.add({ userId, bookId });
        console.log(`Livre ${bookId} ajouté à la wishlist de l'utilisateur ${userId}.`);
      }
  
      return true;
    } catch (error) {
      console.error(
        `Erreur lors de la modification de la wishlist pour le livre ${bookId} et l'utilisateur ${userId}:`,
        error
      );
      return false;
    }
  }

export const isFavoris = async (userId: number, bookId: string): Promise<boolean> => {
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

export const isComment = async (userId: number, bookId: string): Promise<boolean> => {
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
export const isTracked = async (userId: number, bookId: string): Promise<boolean> => {
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

    export const isWishlisted = async (userId: number, bookId: string): Promise<boolean> => {
        try {
            const wishlist = await db.wishlists
            .where("userId")
            .equals(userId)
            .and((wl) => wl.bookId === bookId)
            .first();
        
            const isWl = !!wishlist;
            console.log(
            `Le livre ${bookId} est ${isWl ? "présent" : "absent"} dans la wishlist pour l'utilisateur ${userId}.`
            );
            return isWl;
        } catch (error) {
            console.error(
            `Erreur lors de la vérification du livre ${bookId} dans la wishlist pour l'utilisateur ${userId} :`,
            error
            );
            return false;
        }
        }