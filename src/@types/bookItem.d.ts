export interface DbBook {
    identifier: string;
    userId: number;
}

export interface DbFavoris {
    userId: number;
    bookId: number;
}

export interface DbNote {
    userID: number;
    bookId: number;
    note: number;
}

export interface DbCommentaire {
    userId: number;
    bookId: number;
    commentaire: string;
    date: Date;
}

export interface DbListe {
    id?: number;
    userId: number;
    nom: string;
    type: string;
}

export interface Liste_book {
    userId: number;
    bookId: number;
    listeId: number;
}

export interface DbAvancement {
    userId: number;
    bookId: number;
    avancement: number;
}