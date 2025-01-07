import Dexie from "dexie";

export class dbBook {
  identifier!: string;
  userId!: number;
}

export class dbFavoris {
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

export class dbListe {
  id?: number;
  userId!: number;
  nom!: string;
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

// Déclaration de la base de données IndexedDB

export class MyDatabase extends Dexie {
  books!: Dexie.Table<dbBook, string>;
  favoris!: Dexie.Table<dbFavoris, string>;
  notes!: Dexie.Table<dbNote, string>;
  commentaires!: Dexie.Table<dbCommentaire, string>;
  listes!: Dexie.Table<dbListe, string>;
  liste_book!: Dexie.Table<liste_book, string>;
  avancements!: Dexie.Table<dbAvancement, string>;

  constructor() {
    super('MyDatabase');
    this.version(1).stores({
      books: '++id,identifier, userId',
      favoris: '++id,userId, bookId',
      notes: '++id,userId, bookId',
      commentaires: '++id,userId, bookId',
      listes: '++id,userId, nom, type',
      liste_book: '++id,userId, bookId, listeId',
      avancements: '++id,userId, bookId, avancement'
    });
  }
}
export const db = new MyDatabase();