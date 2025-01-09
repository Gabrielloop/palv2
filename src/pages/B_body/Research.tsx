// Research.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { searchByQuery, Book } from "../../api/bnfServices";
import SearchResultItem from "../../components/SearchResultItem";
import SearchBar from "components/SearchBar";
import AdvancedSearchForm from "components/AdvancedSearchForm";
import SkeletonLoader from "components/SkeletonLoader";
import HeaderContainer from "components/HeaderContainer";
import { Button } from "@mui/material";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import Message from "components/Message";

const isISBN = (query: string): boolean => {
  const isbnRegex = /^(?:\d{9}[\dX]|\d{13})$/;
  return isbnRegex.test(query.trim());
};

const Research: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      if (isISBN(q)) {
        navigate(`/livre/${q}`);
      } else {
        performSearch(q);
      }
    }
  }, [location.search]);

  const performSearch = async (searchTerm: string) => {
    setLoading(true);
    setError(null);
    try {
      const books = await searchByQuery(searchTerm);
      setResults(books || []);
    } catch (err: any) {
      console.error("Erreur lors de la recherche :", err);
      setError(
        "Une erreur s'est produite lors de la recherche. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };

  const sortBooksByISBN = (books: Book[]) => {
    const validISBN = books.filter(
      (book) => book.identifier !== "ISBN inconnu"
    );
    const invalidISBN = books.filter(
      (book) => book.identifier === "ISBN inconnu"
    );
    return [...validISBN, ...invalidISBN];
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/recherches?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleDetailsClick = (identifier: string) => {
    navigate(`/livre/${encodeURIComponent(identifier)}`);
  };

  const renderResults = () => {
    if (loading) return <SkeletonLoader />;
    if (error) return <Message text={error} type="error" />;  
    if (!loading && results.length === 0)
      return (
        <Message text={`Aucun livre trouvé pour ${query}`} type="information" />
      );

    const sortedBooks = sortBooksByISBN(results);

    return (
      <ul className="search-results-list">
        {sortedBooks.map((book, index) => (
          <SearchResultItem
            key={`${book.identifier || "unknown"}-${index}`}
            book={book}
            handleDetailsClick={handleDetailsClick}
          />
        ))}
      </ul>
    );
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <HeaderContainer>
        <div className="accordion-container">
          <div className="accordion-header">
            <SearchBar
              query={query}
              setQuery={setQuery}
              handleSearch={handleSearch}
            />
            <button onClick={toggleAccordion}>
              {isOpen ? <ExpandLessIcon />
                : <ExpandCircleDownIcon />}
            </button>
          </div>


          {isOpen && (
             <div className={`accordion-content ${isOpen ? 'open' : 'closed'}`}>
              <AdvancedSearchForm
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                onSearch={(params) => console.log(params)}
              />
            </div>
          )}
        </div>
      </HeaderContainer>

      {renderResults()}
    </div>
  );
};

export default Research;
