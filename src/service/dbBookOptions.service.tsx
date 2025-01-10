import Dexie from "dexie";
import { DbBook, DbFavoris, DbListe, DbAvancement } from "../@types/bookItem";
import { db } from "../db";

export const toggleFavoris = async (
  userId: number,
  bookId: string
): Promise<boolean> => {
  try {
    const favoris = await db.favoris
      .where("userId")
      .equals(userId)
      .and((fav) => fav.bookId === bookId)
      .first();

    if (favoris) {
      await db.favoris
        .where("userId")
        .equals(userId)
        .and((fav) => fav.bookId === bookId)
        .delete();
      console.log(
        `Livre ${bookId} retiré des favoris pour l'utilisateur ${userId}.`
      );
    } else {
      await db.favoris.add({ userId, bookId });
      console.log(
        `Livre ${bookId} ajouté aux favoris pour l'utilisateur ${userId}.`
      );
    }

    return true;
  } catch (error) {
    console.error(
      `Erreur lors de la modification des favoris pour le livre ${bookId} et l'utilisateur ${userId}:`,
      error
    );
    return false;
  }
};

export const toggleWishlist = async (
  userId: number,
  bookId: string
): Promise<boolean> => {
  try {
    const wishlists = await db.wishlist
      .where("userId")
      .equals(userId)
      .and((wish) => wish.bookId === bookId)
      .first();

    if (wishlists) {
      await db.wishlist
        .where("userId")
        .equals(userId)
        .and((wish) => wish.bookId === bookId)
        .delete();
      console.log(
        `Livre ${bookId} retiré de la wishlist de l'utilisateur ${userId}.`
      );
    } else {
      await db.wishlist.add({ userId, bookId });
      console.log(
        `Livre ${bookId} ajouté à la wishlist de l'utilisateur ${userId}.`
      );
    }

    return true;
  } catch (error) {
    console.error(
      `Erreur lors de la modification de la wishlist pour le livre ${bookId} et l'utilisateur ${userId}:`,
      error
    );
    return false;
  }
};

export const isFavoris = async (
  userId: number,
  bookId: string
): Promise<boolean> => {
  try {
    const favoris = await db.favoris
      .where("userId")
      .equals(userId)
      .and((fav) => fav.bookId === bookId)
      .first();

    const isFav = !!favoris;
    console.log(
      `Le livre ${bookId} est ${
        isFav ? "présent" : "absent"
      } dans les favoris pour l'utilisateur ${userId}.`
    );
    return isFav;
  } catch (error) {
    console.error(
      `Erreur lors de la vérification du livre ${bookId} dans les favoris pour l'utilisateur ${userId} :`,
      error
    );
    return false;
  }
};

export const isNoted = async (
  userId: number,
  bookId: string
): Promise<boolean> => {
  try {
    const note = await db.notes
      .where("userId")
      .equals(userId)
      .and((nt) => nt.bookId === bookId)
      .first();

    const isNot = !!note;
    console.log(
      `Le livre ${bookId} est ${
        isNot ? "noté" : "non noté"
      } par l'utilisateur ${userId}.`
    );
    return isNot;
  } catch (error) {
    console.error(
      `Erreur lors de la vérification du livre ${bookId} dans les notes pour l'utilisateur ${userId} :`,
      error
    );
    return false;
  }
};

export const isComment = async (
  userId: number,
  bookId: string
): Promise<boolean> => {
  try {
    const comment = await db.commentaires
      .where("userId")
      .equals(userId)
      .and((com) => com.bookId === bookId)
      .first();

    const isCom = !!comment;
    console.log(
      `Le livre ${bookId} est ${
        isCom ? "commenté" : "non commenté"
      } par l'utilisateur ${userId}.`
    );
    return isCom;
  } catch (error) {
    console.error(
      `Erreur lors de la vérification du livre ${bookId} dans les commentaires pour l'utilisateur ${userId} :`,
      error
    );
    return false;
  }
};
export const isTracked = async (
  userId: number,
  bookId: string
): Promise<boolean> => {
  try {
    const tracked = await db.avancements
      .where("userId")
      .equals(userId)
      .and((tr) => tr.bookId === bookId)
      .first();

    const isTr = !!tracked;
    console.log(
      `Le livre ${bookId} est ${
        isTr ? "suivi" : "non suivi"
      } par l'utilisateur ${userId}.`
    );
    return isTr;
  } catch (error) {
    console.error(
      `Erreur lors de la vérification du livre ${bookId} dans les suivis pour l'utilisateur ${userId} :`,
      error
    );
    return false;
  }
};

export const isWishlisted = async (
  userId: number,
  bookId: string
): Promise<boolean> => {
  try {
    const wishlist = await db.wishlist
      .where("userId")
      .equals(userId)
      .and((wl) => wl.bookId === bookId)
      .first();

    const isWl = !!wishlist;
    console.log(
      `Le livre ${bookId} est ${
        isWl ? "présent" : "absent"
      } dans la wishlist pour l'utilisateur ${userId}.`
    );
    return isWl;
  } catch (error) {
    console.error(
      `Erreur lors de la vérification du livre ${bookId} dans la wishlist pour l'utilisateur ${userId} :`,
      error
    );
    return false;
  }
};

export const getNote = async (userId: number, bookId: string): Promise<number> => {
  try {
    const note = await db.notes
      .where("userId")
      .equals(userId)
      .and((nt) => nt.bookId === bookId)
      .first();

    if (note) {
      console.log(
        `Note du livre ${bookId} pour l'utilisateur ${userId} : ${note.note}.`
      );
      return note.note;
    }
    console.log(
      `Aucune note trouvée pour le livre ${bookId} et l'utilisateur ${userId}.`
    );
    return 0;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de la note du livre ${bookId} pour l'utilisateur ${userId} :`,
      error
    );
    return 0;
  }
}

export const getComment = async (userId: number, bookId: string): Promise<string> => {
  try {
    const comment = await db.commentaires
      .where("userId")
      .equals(userId)
      .and((com) => com.bookId === bookId)
      .first();

    if (comment) {
      console.log(
        `Commentaire du livre ${bookId} pour l'utilisateur ${userId} : ${comment.commentaire}.`
      );
      return comment.commentaire;
    }
    console.log(
      `Aucun commentaire trouvé pour le livre ${bookId} et l'utilisateur ${userId}.`
    );
    return "";
  } catch (error) {
    console.error(
      `Erreur lors de la récupération du commentaire du livre ${bookId} pour l'utilisateur ${userId} :`,
      error
    );
    return "";
  }
}

export const getAvancement = async (userId: number, bookId: string): Promise<number> => {
  try {
    const avancement = await db.avancements
      .where("userId")
      .equals(userId)
      .and((av) => av.bookId === bookId)
      .first();

    if (avancement) {
      console.log(
        `Avancement du livre ${bookId} pour l'utilisateur ${userId} : ${avancement.avancement}.`
      );
      return avancement.avancement;
    }
    console.log(
      `Aucun avancement trouvé pour le livre ${bookId} et l'utilisateur ${userId}.`
    );
    return 0;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'avancement du livre ${bookId} pour l'utilisateur ${userId} :`,
      error
    );
    return 0;
  }
}




export const updateNote = async (userId: number, bookId: string, note: number): Promise<number> => {
  try {
    if (await isNoted(userId, bookId)) {
      await db.notes
      .where("userId")
      .equals(userId)
      .and((nt) => nt.bookId === bookId)
      .modify({ note });
      return note;
    }
      await db.notes.add({ userId, bookId, note });
    console.log(
      `Note du livre ${bookId} pour l'utilisateur ${userId} ajoutée : ${note}.`
    );
      return note;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de la note du livre ${bookId} pour l'utilisateur ${userId} :`,
      error
    );
    return 0;
  }
}

export const updateAvancement = async (userId: number, bookId: string, avancement: number): Promise<number> => {
  try {
    if (await isTracked(userId, bookId)) {
      await db.avancements
      .where("userId")
      .equals(userId)
      .and((av) => av.bookId === bookId)
      .modify({ avancement });
      return avancement;
    }
      await db.avancements.add({ userId, bookId, avancement });
    console.log(
      `Avancement du livre ${bookId} pour l'utilisateur ${userId} ajouté : ${avancement}.`
    );
      return avancement;
  } catch (error) {
    console.error(
      `Erreur lors de la mise à jour de l'avancement du livre ${bookId} pour l'utilisateur ${userId} :`,
      error
    );
    return 0;
  }
}