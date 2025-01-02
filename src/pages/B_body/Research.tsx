import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchByQuery, Book } from "../../api/bnfServices";

const Research: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [query, setQuery] = useState<string>("");
    const [results, setResults] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Extraire la recherche depuis l'URL au chargement
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const q = params.get("q");
        if (q) {
            setQuery(q);
            performSearch(q);
        }
    }, [location.search]);

    // Fonction pour effectuer une recherche
    const performSearch = async (searchTerm: string) => {
        setLoading(true);
        setError(null);
        try {
            const books = await searchByQuery(searchTerm, "Titre");
            setResults(Array.isArray(books) ? books : []);
        } catch (err: any) {
            console.error("Erreur lors de la recherche :", err);
            setError("Une erreur s'est produite lors de la recherche. Veuillez réessayer.");
        } finally {
            setLoading(false);
        }
    };

    // Gestion de la soumission du formulaire
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/recherches?q=${encodeURIComponent(query.trim())}`);
        }
    };

    // Gestion de la navigation vers la page des détails
    const handleDetailsClick = (identifier: string) => {
        navigate(`/livre/${encodeURIComponent(identifier)}`);
    };

    // Composant pour afficher les résultats
    const renderResults = () => {
        if (loading) {
            return <p>Chargement...</p>;
        }
        if (error) {
            return <p className="error-message">{error}</p>;
        }
        if (!loading && results.length === 0) {
            return <p>Aucun résultat trouvé pour "{query}".</p>;
        }
        return (
            <ul>
    {results.map((book, index) => (
        <li key={`${book.identifier || "unknown"}-${index}`} className="search-result">
            <p>
    <img 
        src={`https://couverture.geobib.fr/api/v1/${book.identifier}/small`} 
        alt={`Couverture de ${book.title}`} 
        style={{ width: "100px", height: "auto" }}
    />
</p>
            <h3>{book.title}</h3>
            <p><strong>Auteur :</strong> {book.creators.join(", ")}</p>
            <p><strong>ISBN :</strong> {book.identifier}</p>
            <p><strong>Éditeur :</strong> {book.publisher}</p>
            <p><strong>Année :</strong> {book.date}</p>
            <button
                type="button"
                onClick={() => handleDetailsClick(book.identifier)}
            >
                Voir les détails
            </button>
        </li>
    ))}
</ul>
        );
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Rechercher un livre</h1>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher un livre par titre..."
                />
                <button type="submit">Rechercher</button>
            </form>
            {renderResults()}
        </div>
    );
};

export default Research;