import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { Book } from "../@types/api";
import { cleanTitle, cleanCreatorName, removeAfterFirstParentheses } from "service/CleanStringProps.service";

// Utilisation de l'API bnf
// TODO : Refacto la façon de traiter le retour de l'API (cleaner)

// Point de terminaison SRU
const SRU_ENDPOINT = "http://localhost:5000/api/sru";

// Fonction utilitaire pour extraire les valeurs des champs
const extractValue = (value: any): string | string[] => {
  if (typeof value === "string") return value;
  if (Array.isArray(value))
    return value.flatMap((v) => extractValue(v)) as string[]; // Si c'est un tableau, extraire récursivement
  if (typeof value === "object" && value["#text"]) return value["#text"]; // Si c'est un objet avec la clé "#text", retourner la valeur
  if (typeof value === "number") {
    return value.toString();
  }
  return "Valeur inconnue";
};

// Fonction pour extraire un ISBN parmi les identifiants
const extractISBN = (identifiers: string[]): string => {
  const isbn = identifiers.find((id) => id.includes("ISBN"));
  console.log("controle isbn", isbn);
  console.log("indentifier", identifiers);
  return isbn ? isbn.replace("ISBN", "").trim() : "ISBN inconnu";
};

// Fonction pour extraire le type de document, ici "texte imprimé" ou autre
const extractDocType = (types: any[]): string | undefined => {
  const type = types.find((t) =>
    t["#text"]?.toLowerCase().includes("texte imprimé")
  );
  return type ? type["#text"] : undefined;
};

// Fonction principale pour rechercher des livres
export const searchByQuery = async (
  query: string,
  page: number
): Promise<Book[] | null> => {
  const isbnRegex = /^(?:\d{9}[\dX]|\d{13})$/;
  let finalQuery: string;

  if (isbnRegex.test(query.trim())) {
    finalQuery = `isbn="${query.trim()}"`;
  } else {
    finalQuery = `bib.doctype all "a" AND title="${query.trim()}" AND bib.language any "fre"`;
  }
  const maximumRecords = isbnRegex.test(query.trim()) ? 1 : 10;
  const params = {
    version: "1.2",
    operation: "searchRetrieve",
    query: finalQuery,
    startRecord: 1 + (page - 1) * 10,
    maximumRecords: maximumRecords,
    recordSchema: "dc",
  };

  try {
    const response = await axios.get(SRU_ENDPOINT, { params });
    const parser = new XMLParser({ ignoreAttributes: false });
    const parsedData = parser.parse(response.data);
    const rawRecords =
      parsedData?.["srw:searchRetrieveResponse"]?.["srw:records"]?.["srw:record"];
    const records = Array.isArray(rawRecords)
      ? rawRecords
      : rawRecords
      ? [rawRecords]
      : [];

    if (records.length === 0) {
      console.warn("any record found");
      return [];
    }

    const books = records.map((record: any): Book => {
      const recordData = record["srw:recordData"]?.["oai_dc:dc"] || {};
      const identifiers = Array.isArray(recordData["dc:identifier"])
        ? (extractValue(recordData["dc:identifier"]) as string[])
        : [extractValue(recordData["dc:identifier"]) as string];

      const types = Array.isArray(recordData["dc:type"])
        ? (extractValue(recordData["dc:type"]) as any[])
        : [extractValue(recordData["dc:type"]) as any];
      const docType = extractDocType(types);

      return {
        title:(cleanTitle(extractValue(recordData["dc:title"]) as string)) || "Titre inconnu",
        identifier: extractISBN(identifiers),
        creators: cleanCreatorName(Array.isArray(recordData["dc:creator"])
          ? (extractValue(recordData["dc:creator"]) as string[]).join(", ")
          : (extractValue(recordData["dc:creator"]) as string)) ||
            "Auteur inconnu",
        date:
          (extractValue(recordData["dc:date"]) as string) || "Date inconnue",
        publisher:
          (extractValue(removeAfterFirstParentheses(recordData["dc:publisher"])) as string) ||
          "Éditeur inconnu",
        docType,
      };
    });
    console.log("book", records);

    return books;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("error :", error.message);
    } else {
      console.error("unknown error");
    }
    return [];
  }
};

// Fonction pour rechercher plusieurs ISBNs
export const searchByISBNs = async (isbns: string[]): Promise<Book[]> => {
  const books: Book[] = [];
  for (const isbn of isbns) {
    const book = await searchByQuery(isbn, 1);
    if (book) {
      books.push(...book);
    }
  }
  return books;
};
