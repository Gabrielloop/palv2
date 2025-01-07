import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Box, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowReturn from "components/ArrowReturn";
import SearchResultItem from "../../components/SearchResultItem";
import { searchByISBNs, Book } from "../../api/bnfServices";
import bookData from "../../dataFake/book_data.json";
import listesData from "../../dataFake/listes_data.json";
import HeaderContainer from "components/HeaderContainer";
import SkeletonLoader from "components/SkeletonLoader";

// à faire : gérer les errreurs

export const myBaseList = [
    {key: 0, name: "Favoris", type: "fav", icon: "pink"},
    {key: 1, name: "A lire", type: "notStart", icon: "brown"},
    {key: 2, name: "En cours", type: "inProgress", icon: "brown"},
    {key: 3, name: "Terminé", type: "finished", icon: "brown"},
    {key: 4, name: "Enregistré", type: "save", icon: "orange"}
];

const MyList: FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [listTitle, setListTitle] = useState<string>("");

  const location = useLocation();
  const lastSegment = location.pathname.split("/").pop();
  const navigate = useNavigate();

  const listId = lastSegment ? String(lastSegment) : null;

  useEffect(() => {
    setLoading(true);
    setError(null);

    let filteredBooks: any[] = [];

    if (listId) {
      if (!isNaN(Number(listId))) {
        const selectedList = listesData.find((list) => list.id === Number(listId));

        if (selectedList) {
          setListTitle(selectedList.titre);

          const booksInList = bookData.filter((book) => book.listes.includes(selectedList.id));

          const isbns = booksInList.map((book) => book.isbn);

          if (isbns.length > 0) {
            searchByISBNs(isbns)
              .then((books) => {
                setBooks(books);
              })
              .catch((err) => {
                console.error("Erreur lors de la recherche :", err);
                setError("Une erreur s'est produite lors de la recherche.");
              })
              .finally(() => {
                setLoading(false);
              });
          } else {
            setLoading(false);
            setError("Aucun ISBN associé à cette liste.");
          }
        } else {
          setError("Liste non trouvée.");
          setLoading(false);
        }
      } else {
        
        const matchedCategory = myBaseList.find((category) => category.type === listId);

        if (matchedCategory) {
          setListTitle(matchedCategory.name);
          
          switch (listId) {
            case "fav":
              filteredBooks = bookData.filter((book) => book.favoris === true);
              break;
            case "notStart":
              filteredBooks = bookData.filter((book) => book.avancement === 0);
              break;
            case "inProgress":
              filteredBooks = bookData.filter(
                (book) => book.avancement > 0 && book.avancement < 100
              );
              break;
            case "finished":
              filteredBooks = bookData.filter((book) => book.avancement === 100);
              break;
            case "save":
              filteredBooks = bookData;
              break;
            default:
              setError("Liste non trouvée");
              setLoading(false);
              return;
          }
          if (filteredBooks.length > 0) {
            const isbns = filteredBooks.map((book) => book.isbn);
            searchByISBNs(isbns)
              .then((books) => {
                setBooks(books);
              })
              .catch((err) => {
                console.error("Erreur lors de la recherche :", err);
                setError("Une erreur s'est produite lors de la recherche.");
              })
              .finally(() => {
                setLoading(false);
              });
          } else {
            setError(`Aucun livre trouvé pour la catégorie ${listId}`);
            setLoading(false);
          }
        } else {
          setError("Catégorie non trouvée.");
          setLoading(false);
        }
      }
    } else {
      setError("ID de liste invalide.");
      setLoading(false);
    }
  }, [listId]);

  const handleDetailsClick = (isbn: string) => {
    if (isbn) {
      navigate(`/livre/${encodeURIComponent(isbn)}`);
    } else {
      setError("ISBN invalide.");
    }
  };

  return (
    <>
      <Helmet>
        <title>{listTitle || "Liste"}</title>
      </Helmet>

      <HeaderContainer>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowReturn />
          <span>Mes listes</span>
        </Box>
      </HeaderContainer>

      <h2>{listTitle || "Chargement..."}</h2>

      {loading && <SkeletonLoader />}
      {error && <p>{error}</p>}
      {!loading && !error && books.length === 0 && <p>Aucun livre trouvé.</p>}

      <ul className="search-results-list">
        {books.map((book, index) => (
            <SearchResultItem book={book} handleDetailsClick={handleDetailsClick} key={index}/>
        ))}
      </ul>
    </>
  );
};

export default MyList;
