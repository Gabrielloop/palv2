import Dexie from "dexie";
import { DbBook, DbFavoris, DbLists, DbAvancement } from "../@types/database";
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
      console.log('delete favoris :',userId,bookId);
    } else {
      await db.favoris.add({ userId, bookId });
      console.log('add favoris :',userId,bookId);
    }

    return true;
  } catch (error) {
    console.error('error toggle favoris :',error);
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
      console.log('delete wishlist :',userId,bookId);
    } else {
      await db.wishlist.add({ userId, bookId });
      console.log('add wishlist :',userId,bookId);
    }

    return true;
  } catch (error) {
    console.error('error toggle wishlist :',error);
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
    return isFav;
  } catch (error) {
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
    return isNot;
  } catch (error) {
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
    return isCom;
  } catch (error) {
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
    return isTr;
  } catch (error) {
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
    return isWl;
  } catch (error) {
    return false;
  }
};

export const getListOfBooks = async (userId: number,isbn:string): Promise<number[]> => {
  try {
    const list = await db.liste_book
      .where("userId")
      .equals(userId)
      .and((ls) => ls.bookId === isbn)
      .toArray();

    const books = list.map((ls) => ls.listeId);
    return books;
  } catch (error) {
    return [];
  }
}

export const getNote = async (userId: number, bookId: string): Promise<number> => {
  try {
    const note = await db.notes
      .where("userId")
      .equals(userId)
      .and((nt) => nt.bookId === bookId)
      .first();

    if (note) {
      return note.note;
    }
      return 0;
  } catch (error) {
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
    return comment.commentaire;
    }
    return "";
  } catch (error) {
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
    return avancement.avancement;
    }
    return 0;
  } catch (error) {
    return 0;
  }
}

// vérifier si le livre existe dans avancement et retourner un boolean
export const isInAvancement = async (userId: number, bookId: string): Promise<boolean> => {
  try {
    const avancement = await db.avancements
      .where("userId")
      .equals(userId)
      .and((av) => av.bookId === bookId)
      .first();

    return !!avancement;
  } catch (error) {
    console.error('error checking avancement :', error);
    return false;
  }
}



export const getBooksByAvancementStep = async (userId:number, avancement: number): Promise<string[]> => {
 switch (avancement) {
  case 0:
    return (await db.avancements
      .where("userId")
      .equals(userId)
      .and((av) => av.avancement === 0)
      .toArray()).map(av => av.bookId);
  case 100:
    return (await db.avancements
      .where("userId")
      .equals(userId)
      .and((av) => av.avancement === 100)
      .toArray()).map(av => av.bookId);
  default:
    return (await db.avancements
      .where("userId")
      .equals(userId)
      .and((av) => av.avancement > 0 && av.avancement < 100)
      .toArray()).map(av => av.bookId);
  }
}

export const updateComment = async (userId: number, bookId: string, commentaire: string): Promise<string> => {
  try {
    if (await isComment(userId, bookId)) {
      await db.commentaires
      .where("userId")
      .equals(userId)
      .and((com) => com.bookId === bookId)
      .modify({ commentaire });
      console.info('update comment :',commentaire,userId,bookId);
      return commentaire;
    }
      await db.commentaires.add({ userId, bookId, commentaire, date: new Date() });
      console.info('add comment :',commentaire,userId,bookId);
      return commentaire;
  } catch (error) {
    console.error('error update comment :',error);
    return "";
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
      console.log('update note :',note,userId,bookId);
      return note;
    }
      await db.notes.add({ userId, bookId, note });
    console.log('add note :',note,userId,bookId);
      return note;
  } catch (error) {
    console.error('error update note :',error);
    return 0;
  }
}

export const updateAvancement = async (userId: number, bookId: string, avancement: number): Promise<number> => {
  try {
    const isInAvancementCt= await isInAvancement(userId, bookId);
    if (isInAvancementCt) {
      await db.avancements
      .where("userId")
      .equals(userId)
      .and((av) => av.bookId === bookId)
      .modify({ avancement });
      console.log('update avancement :',avancement,userId,bookId);
      return avancement;
    } else {
      await db.avancements.add({ userId, bookId, avancement });
    console.log('tarck ' + isInAvancementCt +' add avancement :',avancement,userId,bookId);}
      return avancement;
  } catch (error) {
    console.error('error update avancement :',error);
    return 0;
  }
}