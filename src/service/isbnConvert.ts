import e from "express";

/**
 * Convertit un ISBN-10 en ISBN-13
 * @param isbn10 - Le code ISBN-10 à convertir (format : 9 chiffres + clé de contrôle)
 * @returns Le code ISBN-13 ou une erreur si l'entrée est invalide
 */
export function isbnConvert(isbn10: string): string {
    // Validation initiale de l'ISBN-10
    if (!/^\d{9}[0-9X]$/.test(isbn10)) {
        throw new Error("ISBN-10 invalide. Doit contenir 9 chiffres suivis d'un chiffre ou 'X'.");
    }

    // Extraire les 9 premiers chiffres de l'ISBN-10
    const isbnBase = isbn10.substring(0, 9);

    // Ajouter le préfixe "978" pour commencer à convertir en ISBN-13
    const isbn13WithoutChecksum = "978" + isbnBase;

    // Calculer la clé de contrôle de l'ISBN-13
    const checksum = calculateISBN13Checksum(isbn13WithoutChecksum);

    // Retourner l'ISBN-13 complet
    return isbn13WithoutChecksum + checksum;
}

/**
 * Calcule la clé de contrôle (checksum) d'un ISBN-13 sans clé de contrôle
 * @param isbn13WithoutChecksum - Les 12 premiers chiffres d'un ISBN-13
 * @returns Le chiffre de contrôle
 */
function calculateISBN13Checksum(isbn13WithoutChecksum: string): number {
    // Vérifier que l'entrée contient 12 chiffres
    if (!/^\d{12}$/.test(isbn13WithoutChecksum)) {
        throw new Error("Les 12 premiers chiffres de l'ISBN-13 sont invalides.");
    }

    let sum = 0;

    // Calculer la somme pondérée
    for (let i = 0; i < 12; i++) {
        const digit = parseInt(isbn13WithoutChecksum[i], 10);
        // Alterner les coefficients : 1 pour les positions impaires, 3 pour les positions paires
        sum += digit * (i % 2 === 0 ? 1 : 3);
    }

    // Calculer le chiffre de contrôle
    const remainder = sum % 10;
    return remainder === 0 ? 0 : 10 - remainder;
}

export default isbnConvert;