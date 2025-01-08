import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowReturn from "components/ArrowReturn";
import SearchResultItem from "../../components/SearchResultItem";
import { searchByISBNs, Book } from "../../api/bnfServices";
import { db } from "db"; // IndexedDB instance
import HeaderContainer from "components/HeaderContainer";
import SkeletonLoader from "components/SkeletonLoader";

export const myBaseList = [
  { key: 0, name: "Favoris", type: "fav", icon: "pink" },
  { key: 1, name: "A lire", type: "notStart", icon: "brown" },
  { key: 2, name: "En cours", type: "inProgress", icon: "brown" },
  { key: 3, name: "Terminé", type: "finished", icon: "brown" },
  { key: 4, name: "Enregistré", type: "save", icon: "orange" },
];

const MyList: FC<{ userId: number }> = ({ userId }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [listTitle, setListTitle] = useState<string>("");

  const location = useLocation();
  const lastSegment = location.pathname.split("/").pop();
  const navigate = useNavigate();

  const listId = lastSegment ? String(lastSegment) : null;

  // Centralized book fetching logic
  const fetchBooks = async (bookIds: string[]) => {
    try {
      if (bookIds.length === 0) {
        setError("Aucun livre trouvé.");
        return;
      }
  
      // Récupérer les livres par `identifier`
      const booksData = await db.books.where("identifier").anyOf(bookIds).toArray();
      const isbns = booksData.map((book) => book.identifier);
  
      if (isbns.length > 0) {
        const fetchedBooks = await searchByISBNs(isbns);
        setBooks(fetchedBooks);
      } else {
        setError("Aucun ISBN associé aux livres.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des livres :", err);
      setError("Une erreur s'est produite lors de la récupération des livres.");
    }
  };



  
  // Fetching logic for predefined lists
  const fetchBaseList = async (listType: string) => {
    try {
      let bookIds: string[] = [];
  
      switch (listType) {
        case "fav":
          const favoris = await db.favoris.where("userId").equals(userId).toArray();
          bookIds = favoris.map((fav) => fav.bookId); // `bookId` est un ISBN
          break;
        case "notStart":
          const notStarted = await db.avancements
            .where("userId")
            .equals(userId)
            .and((av) => av.avancement === 0)
            .toArray();
          bookIds = notStarted.map((av) => av.bookId); // `bookId` est un ISBN
          break;
        case "inProgress":
          const inProgress = await db.avancements
            .where("userId")
            .equals(userId)
            .and((av) => av.avancement > 0 && av.avancement < 100)
            .toArray();
          bookIds = inProgress.map((av) => av.bookId); // `bookId` est un ISBN
          break;
        case "finished":
          const finished = await db.avancements
            .where("userId")
            .equals(userId)
            .and((av) => av.avancement === 100)
            .toArray();
          bookIds = finished.map((av) => av.bookId); // `bookId` est un ISBN
          break;
        case "save":
          const allBooks = await db.books.where("userId").equals(userId).toArray();
          bookIds = allBooks.map((book) => book.identifier); // Utilisez `identifier` comme clé
          break;
        default:
          setError("Catégorie non trouvée.");
          return;
      }
  
      await fetchBooks(bookIds); // Appeler fetchBooks avec les `identifier`
    } catch (err) {
      console.error("Erreur lors de la récupération des livres :", err);
      setError("Une erreur s'est produite lors de la récupération des livres.");
    }
  };
  

  // Fetching logic for custom lists
  const fetchCustomList = async (listId: number) => {
    try {
      const listeInfo = await db.listes.where("id").equals(listId).first();
      if (!listeInfo) {
        setError("Liste non trouvée.");
        return;
      }
      setListTitle(listeInfo.nom);
      
      const userLists = await db.liste_book
        .where("userId")
        .equals(userId)
        .and((rel) => rel.listeId === listId)
        .toArray();
  
      const bookIds = userLists.map((rel) => rel.bookId); // `bookId` correspond à `identifier`
  
      await fetchBooks(bookIds); // Appeler fetchBooks avec les `identifier`
    } catch (err) {
      console.error("Erreur lors de la récupération de la liste personnalisée :", err);
      setError("Une erreur s'est produite lors de la récupération des livres.");
    }
  };

  useEffect(() => {
    const fetchListData = async () => {
      setLoading(true);
      setError(null);

      if (!listId) {
        setError("ID de liste invalide.");
        setLoading(false);
        return;
      }

      if (!isNaN(Number(listId))) {
        await fetchCustomList(Number(listId));
      } else {
        const matchedCategory = myBaseList.find((category) => category.type === listId);
        if (matchedCategory) {
          setListTitle(matchedCategory.name);
          await fetchBaseList(listId);
        } else {
          setError("Catégorie non trouvée.");
        }
      }

      setLoading(false);
    };

    fetchListData();
  }, [listId, userId]);

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
          <SearchResultItem key={index} book={book} handleDetailsClick={handleDetailsClick} />
        ))}
      </ul>
    </>
  );
};

export default MyList;
