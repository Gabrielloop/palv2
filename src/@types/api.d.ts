export interface BookInter {
    identifier: string;
    title: string;
    creators: string;
    publisher: string;
    date: string;
  };
  export interface Book {
    title: string;
    identifier: string;
    creators: string;
    date: string;
    publisher: string;
    docType?: string;
}