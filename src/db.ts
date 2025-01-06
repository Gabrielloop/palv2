import Dexie from "dexie";

export const createDb = (dbName: string, version: number, schema: { [tableName: string]: string | null }) => {
  const db = new Dexie(dbName);

  // Déclare la version et le schéma des tables
  db.version(version).stores(schema);

  return db;
};

// Exemple d'utilisation
export const dbmybooks = createDb('DBMB', 1, {
  books: '++id,isbn,listes,favoris,avancement,classement,commentaire,utilisateur_id'
});
