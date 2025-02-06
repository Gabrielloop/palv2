import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeaderContainer from "layout/HeaderContainer";
import SearchBar from "components/core/SearchBar";
import AdvancedSearchForm from "components/core/SearchAdvancedForm";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import SearchResultsList from "components/core/SearchResultsList";
import SwitchDisplayResult from "components/ui/SwitchDisplayResult";

const isISBN = (query: string): boolean => {
  const isbnRegex = /^(?:\d{9}[\dX]|\d{13})$/;
  return isbnRegex.test(query.trim());
};

const Search: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState<string>("");
  const [advanceQuery, setAdvanceQuery] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Routage en fonction de la recherche (ISBN ou texte)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q) {
      setSearchQuery(q);
      if (isISBN(q)) {
        navigate(`/livre/${q}`);
      }
    }
  }, [location.search]);

  // Gestion de la recherche simple
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query.trim());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Gestion de l'accordéon de recherche avancée
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
            <button
              onClick={toggleAccordion}
              aria-label="Toggle advanced search"
            >
            
              {isOpen ? <ExpandLessIcon /> : <ExpandCircleDownIcon />}
            </button>
          </div>
          {isOpen && (
            <div className={`accordion-content ${isOpen ? "open" : "closed"}`}>
              <AdvancedSearchForm
                advanceQuery={advanceQuery}
                setAdvanceQuery={setQuery}
                handleSearch={handleSearch}
                onSearch={(params) => console.log(params)}
              />
            </div>
            
          )}
        </div>
        
      </HeaderContainer>
      <SwitchDisplayResult />
      {query && (
      <SearchResultsList query={searchQuery} currentPage={1} />
      )}
    </div>
  );
};

export default Search;
