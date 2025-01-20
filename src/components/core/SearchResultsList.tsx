import React, { useEffect } from "react";
import { useState } from "react";
import { Book } from "../../@types/api";
import { searchByQuery } from "../../api/bnf.service";
import Message from "../general/Message";
import SkeletonLoader from "../../components/ui/SearchResultSkeleton";
import SearchResultItem from "../../components/core/SearchResultItem";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

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
  const [pageLoaded, setPageLoaded] = useState<number>(currentPage);

  const navigate = useNavigate();

  // Gestion du bouton afficher plus de résultats
    const handleNextPage = () => {
        setPageLoaded(pageLoaded + 1);
    };

  // Gestion de la redirection vers le détail d'un livre
  const handleDetailsClick = (identifier: string) => {
    navigate(`/livre/${encodeURIComponent(identifier)}`);
  };
  // Gestion du chargement de la page suivante

  useEffect(() => {

    const performSearch = async (searchTerm: string, iPage: number) => {
      setLoading(true);
      setError(null);
      try {
        const books = await searchByQuery(searchTerm, iPage);
        if (books) {
          setResults(books);
        } else {
          setResults([]);
        }
      } catch (err: any) {
        console.error("Erreur lors de la recherche :", err);
        setError(
          "Une erreur s'est produite lors de la recherche. Veuillez réessayer."
        );
      } finally {
        setLoading(false);
      }
    };
    if (query) {
      performSearch(query, currentPage);
    }
  }, [query, currentPage]);

  console.log(results);

  if (loading) return <SkeletonLoader />;

  if (error) return <Message text={error} type="error" />;

  if (!loading && results.length === 0)
    return (
      <Message text={`Aucun livre trouvé pour ${query}`} type="information" />
    );

  return (
    <div>
      {loading && <SkeletonLoader/>}
      {error && <p>{error}</p>}
      {results.map((book: Book) => (
        <SearchResultItem book={book} handleDetailsClick={handleDetailsClick} />
      ))}
      {results.length === 10 && (
        // On recharge le composant avec la page suivante
        <>
        résultats (current) {currentPage} / {pageLoaded} (loaded)
        {pageLoaded === currentPage && (
          <Button
          variant="contained"
          color="primary"
          onClick={handleNextPage}
          style={{ margin: "1rem auto", display: "block" }}
        >
          Voir plus de résultats
        </Button>
        )}
        {pageLoaded > currentPage && (
          <SearchResultsList query={query} currentPage={currentPage + 1}/>
        )}
        </>
      )}
    </div>
  );
};

export default SearchResultsList;
