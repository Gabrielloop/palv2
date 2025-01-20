import React from "react";
import HeaderContainer from "layout/HeaderContainer";
import SearchBar from "components/core/SearchBar";
import AdvancedSearchForm from "components/core/SearchAdvancedForm";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SearchResultsList from "components/core/SearchResultsList";

const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [query, setQuery] = useState<string>("");


  // Routage en fonction de la recherche (ISBN ou texte)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setQuery(q);
      const isISBN = (query: string): boolean => {
        const isbnRegex = /^(?:\d{9}[\dX]|\d{13})$/;
        return isbnRegex.test(query.trim());
      };
      if (isISBN(q)) {
        navigate(`/livre/${q}`);
      } else {
        // recherche
      }
    }
  }, [location.search]);

  // Gestion de la recherche simple
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Gestion de l'accordéon de recherche avancée
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
              {isOpen ? <ExpandLessIcon /> : <ExpandCircleDownIcon />}
            </button>
          </div>
          {isOpen && (
            <div className={`accordion-content ${isOpen ? "open" : "closed"}`}>
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
      <SearchResultsList query={query} currentPage={1} />
    </div>
  );
};

export default Search;
