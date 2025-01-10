export interface DbBook {
    identifier: string;
    userId: number;
}

export interface DbFavoris {
    userId: number;
    bookId: string;
}

export interface DbWishlist {
    userId: number;
    bookId: string;
}

export interface DbNote {
    userID: number;
    bookId: string;
    note: number;
}

export interface DbCommentaire {
    userId: number;
    bookId: string;
    commentaire: string;
    date: Date;
}

export interface DbLists {
    id?: number;
    userId: number;
    name: string;
    type: string;
}

export interface Liste_book {
    userId: number;
    bookId: string;
    listeId: number;
}

export interface DbAvancement {
    userId: number;
    bookId: string;
    avancement: number;
}

export interface DbUser {
    userId: number;
    userName: string;
    userMail: string;
}