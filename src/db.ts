import Dexie from "dexie";

export class dbBook {
  identifier!: string;
  userId!: number;
}

export class dbFavoris {
  id?: number;
  userId!: number;
  bookId!: string;
}

export class dbWishlist {
  userId!: number;
  bookId!: string;
}

export class dbNote {
  userId!: number;
  bookId!: string;
  note!: number;
}

export class dbCommentaire {
  userId!: number;
  bookId!: string;
  commentaire!: string;
  date!: Date;
}

export class dbLists {
  id?: number;
  userId!: number;
  name!: string;
  type!: string;
}

export class liste_book {
  userId!: number;
  bookId!: string;
  listeId!: number;
}

export class dbAvancement {
  userId!: number;
  bookId!: string;
  avancement!: number;
}

export class dbUser {
  userName!: string;
  userMail!: string;
}

// Déclaration de la base de données IndexedDB

export class MyDatabase extends Dexie {
  books!: Dexie.Table<dbBook, string>;
  favoris!: Dexie.Table<dbFavoris, string>;
  wishlist!: Dexie.Table<dbWishlist, string>;
  notes!: Dexie.Table<dbNote, string>;
  commentaires!: Dexie.Table<dbCommentaire, string>;
  lists!: Dexie.Table<dbLists, string>;
  liste_book!: Dexie.Table<liste_book, string>;
  avancements!: Dexie.Table<dbAvancement, string>;
  users!: Dexie.Table<dbUser, string>; 

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      books: '++id,identifier, userId',
      favoris: '++id,userId, bookId',
      wishlist: '++id,userId, bookId',
      notes: '++id,userId, bookId',
      commentaires: '++id,userId, bookId',
      lists: '++id,userId, name, type',
      liste_book: '++id,userId, bookId, listeId',
      avancements: '++id,userId, bookId, avancement',
      users: '++id,userName, userMail'
    });
  }
}
export const db = new MyDatabase();