import React, { useState, useEffect, useCallback } from "react";
import { Book } from "../../@types/api";
import { searchByQuery } from "../../api/bnf.service";
import Message from "../general/Message";
import SkeletonLoader from "../../components/ui/SearchResultSkeleton";
import SearchResultItem from "../../components/core/SearchResultItem";
import { Button, Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { viewModeSubject$ } from "../../service/viewModeService";
import SwitchDisplayResult from "components/ui/SwitchDisplayResult";

interface SearchResultsListProps {
  query: string;
  currentPage: number;
}

const SearchResultsList: React.FC<SearchResultsListProps> = ({
  query,
  currentPage,
}) => {
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(currentPage);

  const navigate = useNavigate();


  // observable pour l'affichage en liste ou en display
  const [isListView, setIsListView] = useState(true); // État local pour refléter l'observable

    useEffect(() => {
        // S'abonner à l'observable pour écouter les changements
        const subscription = viewModeSubject$.subscribe(setIsListView);

        return () => subscription.unsubscribe(); // Nettoyage de l'abonnement
    }, []);

  

  // Charger les résultats pour une page donnée
  const fetchResults = useCallback(
    async (searchTerm: string, pageToLoad: number) => {
      setLoading(true);
      setError(null);
      try {
        const books = await searchByQuery(searchTerm, pageToLoad);
        if (books) {
          setResults((prevResults) => [...prevResults, ...books]); // Ajouter à la liste existante
        } else if (pageToLoad === 1) {
          setResults([]); // Pas de résultats pour la première page
        }
      } catch (err) {
        console.error("Erreur lors de la recherche :", err);
        setError(
          "Une erreur s'est produite lors de la recherche. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Effet pour charger les résultats à la première requête ou lorsque `query` change
  useEffect(() => {
    if (query) {
      setResults([]); // Réinitialiser les résultats pour une nouvelle recherche
      setPage(currentPage); // Réinitialiser la page
      fetchResults(query, currentPage);
    }
  }, [query, currentPage, fetchResults]);

  // Charger la page suivante
  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchResults(query, nextPage);
  };

  // Redirection vers la page de détail
  const handleDetailsClick = (identifier: string) => {
    navigate(`/livre/${encodeURIComponent(identifier)}`);
  };

  // Affichage des états de chargement, d'erreur ou de résultats
  if (loading && results.length === 0) return <SkeletonLoader />;
  if (error) return <Message text={error} type="error" />;
  if (!loading && results.length === 0)
    return (
      <Message text={`Aucun livre trouvé pour "${query}"`} type="information" />
    );

  return (
    <div>
      {/* Valeur de l'affichage en liste ou en display */}


      {/* Liste des résultats */}
      

<div
  className={`${isListView ? "search-results-list" : "search-results-display"}`}
  >
      {results.map((book: Book, index: number) => (
        <SearchResultItem
          key={index} // Utiliser un ID unique si possible
          book={book}
          handleDetailsClick={handleDetailsClick}
          listView={isListView}
        />
      ))}
</div>

      {/* Bouton pour charger plus de résultats */}
      {(results.length - page * 10) == 0 && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          disabled={loading}
          style={{ margin: "1rem auto", display: "block" }}
        >
          {
            loading ? "Chargement..." : "Voir plus de résultats"
          }
        </Button>
      )}
    </div>
  );
};

export default SearchResultsList;
