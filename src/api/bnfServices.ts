import axios from "axios";
import { XMLParser } from "fast-xml-parser";

export interface Book {
    title: string;
    identifier: string;
    creators: string[];
    date: string;
    publisher: string;
}

const SRU_ENDPOINT = "http://localhost:5000/api/sru";

const extractValue = (value: any): string | string[] => {
    if (typeof value === "string") {
        return value;
    }
    if (Array.isArray(value)) {
        return value.flatMap((v) => extractValue(v)) as string[];
    }
    if (typeof value === "object" && value["#text"]) {
        return value["#text"];
    }
    return "Valeur inconnue";
};

const extractISBN = (identifiers: string[]): string => {
    const isbn = identifiers.find((id) => id.includes("ISBN"));
    return isbn ? isbn.replace("ISBN", "").trim() : "ISBN inconnu";
};

export const searchByQuery = async (
    query: string,
    type: "ISBN" | "Titre" | "Auteur"
): Promise<Book | Book[] | null> => {
    const finalQuery = (() => {
        switch (type) {
            case "ISBN":
                return `isbn="${query.trim()}"`;
            case "Titre":
                return `title="${query.trim()}"`;
            case "Auteur":
                return `creator="${query.trim()}"`;
            default:
                throw new Error(`Type de recherche non supporté : ${type}`);
        }
    })();

    const params = {
        version: "1.2",
        operation: "searchRetrieve",
        query: finalQuery,
        maximumRecords: type === "ISBN" ? 1 : 10,
        recordSchema: "dc",
    };

    try {
        const response = await axios.get(SRU_ENDPOINT, { params });
        const parser = new XMLParser({ ignoreAttributes: false });
        const parsedData = parser.parse(response.data);

        const records = (() => {
            const rawRecords = parsedData?.["srw:searchRetrieveResponse"]?.["srw:records"]?.["srw:record"];
            if (!rawRecords) return [];
            return Array.isArray(rawRecords) ? rawRecords : [rawRecords];
        })();

        console.log("Enregistrements extraits :", records);

        if (records.length === 0) {
            console.warn("Aucun enregistrement trouvé pour cette requête.");
            return null;
        }

        const books = records.map((record: any): Book => {
            const recordData = record["srw:recordData"]?.["oai_dc:dc"] || {};
            const identifiers = Array.isArray(recordData["dc:identifier"])
                ? (extractValue(recordData["dc:identifier"]) as string[])
                : [extractValue(recordData["dc:identifier"]) as string];

            return {
                title: extractValue(recordData["dc:title"]) as string || "Titre inconnu",
                identifier: extractISBN(identifiers),
                creators: Array.isArray(recordData["dc:creator"])
                    ? (extractValue(recordData["dc:creator"]) as string[])
                    : ["Auteur inconnu"],
                date: extractValue(recordData["dc:date"]) as string || "Date inconnue",
                publisher: extractValue(recordData["dc:publisher"]) as string || "Éditeur inconnu",
            };
        });

        if (type === "ISBN") {
            return books[0] || null;
        }

        return books;
    } catch (error: any) {
        console.error("Erreur lors de la requête SRU :", error.message);
        return null;
    }
};
