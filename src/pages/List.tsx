import React, { useState, useEffect } from "react";
import { FC } from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate, useLocation } from "react-router-dom";
import ArrowReturn from "components/ui/ArrowReturn";
import SearchResultItem from "../components/core/SearchResultItem";
import HeaderContainer from "layout/HeaderContainer";
import SkeletonLoader from "components/ui/SearchResultSkeleton";
import Message from "components/general/Message";
import ListeVideOptions from "components/core/EmptyListOptions";
import {
  getBooksFromFavoris,
  getBookUser,
  getBooksFromList,
} from "service/dbBook.service";
import { getBooksByAvancementStep } from "service/dbBookOptions.service";
import { searchByISBNs } from "../api/bnf.service";
import { BookInter } from "../@types/api";
import { set } from "react-hook-form";
import { getPresetListsTitle } from "service/dbPresetLists.service";
import { getListTitle } from "service/dbListe.service";

interface MyListProps {
  userId: number;
}
const MyList: FC<MyListProps> = ({ userId }) => {
  const [books, setBooks] = useState<BookInter[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [listTitle, setListTitle] = useState<string>("");

  const location = useLocation();
  const lastSegment = location.pathname.split("/").pop();
  const navigate = useNavigate();

  const listId: string | null = lastSegment ? lastSegment : null;

  useEffect(() => {
    const getBookFromAnyList = async (listId:any) => {
      setLoading(true);
      setError(null);
      if (!listId) {
        setError("ID de liste invalide.");
        setLoading(false);
        return;
      }
      if (!isNaN(Number(listId))) {
        const isbnList=await getBooksFromList(userId, Number(listId));
        const booksList = await searchByISBNs(isbnList);
        setBooks(booksList);
        setListTitle(await getListTitle(Number(listId)));
        setLoading(false);
      } else {
        setListTitle(getPresetListsTitle(listId));
        switch (listId) {
          case "fav":
            const favList = await getBooksFromFavoris(userId);
            const isbnListFav=favList.map(book => book.bookId.toString());
            const booksList=await searchByISBNs(isbnListFav);
            setBooks(booksList);
            break;
          case "notStart":
            const bookNoStart = await getBooksByAvancementStep(userId, 0);
            const booksListNoStart=await searchByISBNs(bookNoStart);
            setBooks(booksListNoStart);
            break;
          case "inProgress":
            const bookInProgress = await getBooksByAvancementStep(userId, 1);
            const booksListInProgress=await searchByISBNs(bookInProgress);
            setBooks(booksListInProgress);
            break;
          case "finished":
            const bookFinished = await getBooksByAvancementStep(userId, 100);
            const booksListFinished=await searchByISBNs(bookFinished);
            setBooks(booksListFinished);
            break;
          case "save":
            const bookUser = (await getBookUser(userId));
            const bookListUser = await searchByISBNs(bookUser.map(book => book.identifier.toString()));
            setBooks(bookListUser);
            break;
          default:
            setError("Liste non trouvée.");
            setLoading(false);
            return;
        }
        setLoading(false);
      }
      
    };
    getBookFromAnyList(listId);
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
        <title>Liste : {listTitle}</title>
      </Helmet>

      <HeaderContainer>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArrowReturn />
          <span>Mes listes</span>
        </Box>
      </HeaderContainer>

      <h2>
        {listTitle} ({books.length})
      </h2>

      {loading && <SkeletonLoader />}
      {error && <Message text={error} type="error" />}
      {!loading && !error && books.length === 0 && (
        <Message text="Aucun livre trouvé" type="information" />
      )}
      {books.length === 0 && <ListeVideOptions />}
      <ul className="search-results-list">
        {books.map((book, index) => (
          <SearchResultItem
            key={index}
            book={book}
            handleDetailsClick={handleDetailsClick}
          />
        ))}
      </ul>
    </>
  );
};

export default MyList;
