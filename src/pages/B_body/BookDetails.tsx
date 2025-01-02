import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchByQuery, Book } from "../../api/bnfServices";

const BookDetails: React.FC = () => {
    const { isbn } = useParams<{ isbn: string }>();
console.log("ISBN reçu depuis les paramètres :", isbn);
    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Charge les détails du livre lorsqu'un ISBN est disponible
    useEffect(() => {
        if (isbn) {
            console.log("ISBN reçu :", isbn);
            fetchBookDetails(isbn);
        }
    }, [isbn]);

    // Fonction pour récupérer les détails d'un livre par ISBN
    const fetchBookDetails = async (isbn: string) => {
        setLoading(true);
        setError(null);

        try {
            const result = await searchByQuery(isbn, "ISBN");
            if (result) {
                setBook(result as Book); // Cast le résultat en type `Book`
            } else {
                setError("Aucun livre trouvé pour cet ISBN.");
            }
        } catch (err: any) {
            console.error("Erreur lors de la récupération des détails :", err);
            setError("Impossible de récupérer les détails du livre. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    // Gestion des différents états
    if (loading) return <p>Chargement des détails...</p>;
    if (error) return <p className="error-message">{error}</p>;
    if (!book) return <p>Aucun détail disponible pour cet ISBN.</p>;

    // Rendu des détails du livre
    return (
        <div style={{ padding: "20px" }}>
            <h1>Détails du Livre</h1>
            <div className="book-details">
                <h2>{book.title}</h2>
                <p><strong>Auteur(s) :</strong> {book.creators.join(", ")}</p>
                <p><strong>ISBN :</strong> {book.identifier}</p>
                <p><strong>Éditeur :</strong> {book.publisher}</p>
                <p><strong>Année :</strong> {book.date}</p>
            </div>
        </div>
    );
};

export default BookDetails;