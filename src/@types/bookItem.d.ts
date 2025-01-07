export interface dbBook {
    identifier: string;
    userId: number;
}

export interface dbFavoris {
    userId: number;
    bookId: number;
}

export interface dbNote {
    userId: number;
    bookId: number;
    note: number;
}

export interface dbCommentaire {
    userId: number;
    bookId: number;
    commentaire: string;
    date: Date;
}

export interface dbListe {
    id?: number;
    userId: number;
    nom: string;
    type: string;
}

export interface liste_book {
    userId: number;
    bookId: number;
    listeId: number;
}

export interface dbAvancement {
    userId: number;
    bookId: number;
    avancement: number;
}