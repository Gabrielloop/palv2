import React, { use } from "react";
import BookCover from "../ui/BookCover";
import { Box } from "@mui/material";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Rating from "@mui/material/Rating";
import ProgressBar from "../general/ProgressBar";
import { useState } from "react";
import { set } from "react-hook-form";
import { useEffect } from "react";
import { getAvancement, getNote, isFavoris, isComment, isWishlisted, getListOfBooks } from "../../service/dbBookOptions.service";
import ResultDisplayMode from "components/ui/ResultDisplayMode";

// Composant pour l'affichage d'un résultats (recherche, ou liste)
// à faire : optimiser l'utilisation des fonction (externalisé)
// à faire : lier le skeleton

interface SearchResultItemProps {
  book: {
    identifier: string;
    title: string;
    creators: string;
    publisher: string;
    date: string;
  };
  handleDetailsClick: (identifier: string) => void;
  listView: boolean;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  book,
  handleDetailsClick,
  listView
}) => {
  const handleClick = () => {
    if (book.identifier.length > 13 || book.identifier.length < 10) {
      return;
    }
    handleDetailsClick(book.identifier);
  };

  const [bookNote, setBookNote] = useState<number>(0);
  const [bookProgress, setBookProgress] = useState<number>(0);
  const [bookFavorite, setBookFavorite] = useState<boolean>(false);
  const [bookComment, setBookComment] = useState<boolean>(false);
  const [bookIsWishlisted, setBookIsWishlisted] = useState<boolean>(false);
  const [bookUserList, setBookUserList] = useState<number[]>([]);

  useEffect(() => {
    const fetchNote = async () => {
      const note:number = await getNote(1, book.identifier);
      setBookNote(note);
    };
    const fetchProgress = async () => {
      const progress:number = await getAvancement(1, book.identifier);
      setBookProgress(progress);
    }
    const fetchFavorite = async () => {
      const favorite:boolean = await isFavoris(1, book.identifier);
      setBookFavorite(favorite);
    }
    const fetchWishlisted = async () => {
      const wishlisted:boolean = await isWishlisted(1, book.identifier);
      setBookIsWishlisted(wishlisted);
    }
    const fetchComment = async () => {
      const comment:boolean = await isComment(1, book.identifier);
      setBookComment(comment);
    }
    const fetchUserList = async () => {
      const list:number[] = await getListOfBooks(1,book.identifier);
      setBookUserList(list);
    }
    fetchUserList();
    fetchComment();
    fetchWishlisted();
    fetchNote();
    fetchProgress();
    fetchFavorite();
    setBookUserList([]);
  }, [book.identifier]);

  const itemClass =
    book.identifier === "ISBN inconnu"
      ? "search-result-item-unknown"
      : "search-result-item";

  const handle =
  book.identifier === "ISBN inconnu"
  ? handleClick
   : handleClick


  return (
    <>
    {/* Affichage de chaque résultat de recherche */}
    {/* vérification si affichage liste ou display */}
    {listView ? (
    <div
      className={itemClass}
      style={{
        display: "flex",
        padding: "5px",
        borderBottom: "1px solid var(--black-text-tr)",
        alignItems: "center",
        cursor: "pointer",
        height: "90px",
        overflow: "hidden",
      }}
      
      onClick={handle}
    >
      {/* Colonne pour la couverture */}
      <div style={{ flex: 0.75, paddingRight: "5px", width: "75px" }}>
        <BookCover isbn={book.identifier} />
      </div>

      {/* Colonne regroupant Titre + Date et Auteur + Éditeur */}
      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        <div className="search-result-title search-result-item-tronc">
          {/* Titre */}
          {book.title}
        </div>
        <div className="search-result-item-tronc">
          {/* Auteur et Éditeur et Date  */}
          <span className="search-result-date">{book.date}</span>&nbsp;
          <span className="search-result-creator">
            {book.creators}
          </span>
        </div>
        <div className="search-result-item-tronc">
          <span className="search-result-isbn">{book.identifier}</span>&nbsp;
          <span className="search-result-editor">
            {book.publisher}
          </span>
        </div>
        <div>
          {/* Affichage des informations du livre provenant de book_data.json */}

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "start",
              width: "100%",
            }}
          >
            {(bookNote != null && bookNote>0) && (<Rating name="size-small" defaultValue={bookNote} size="small" />)}
            {(bookProgress==null || bookProgress === 0) && (<span className="track-badge track-notStarted">non lu</span>)}
            {(bookProgress!=null && bookProgress === 100) && (<span className="track-badge track-finished">terminé</span>)}
            {(bookProgress!=null && bookProgress > 0 && bookProgress < 100) && (<span className="track-badge track-inProgress">lu à {bookProgress}%</span>)}
          </Box>
        </div>
      </div>
      {/* Affichage de la barre laterale */}
      <Box
        sx={{
          flex: 0.25,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          borderLeft: "1px solid var(--off-white-tr)",
          gap: "1px",
        }}
      >
        {(bookUserList.length > 0) && (
          <div className="list-badge list-badge-container">
            <div className="list-badge-number">{bookUserList.length}</div>
            <div className="list-badge-icon"><BookmarkOutlinedIcon
            sx={{ color: "var(--off-white)", fontSize: "1.5rem" }}
          /></div>
          
          </div>
        )}
        {bookFavorite==true && (
          <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: bookFavorite ? "red" : "gray",
            cursor: "pointer",
          }}
        >
          <FavoriteOutlinedIcon />
        </div>
        )}
        {bookIsWishlisted==true && (
          <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: bookIsWishlisted ? "yellow" : "gray",
            cursor: "pointer",
          }}
        >
          <ShoppingCartIcon />
        </div>
        )}
        {bookComment==true && (
          <ChatOutlinedIcon
            sx={{ color: "var(--off-white)", fontSize: "1.5rem" }}
          />
        )}
      </Box>
    </div>) : (
      <div>
      <ResultDisplayMode
        book={book}
        handleDetailsClick={handleDetailsClick}
        bookNote={bookNote}
        bookProgress={bookProgress}
        bookFavorite={bookFavorite}
        bookComment={bookComment}
        bookIsWishlisted={bookIsWishlisted}
        bookUserList={bookUserList}
      />
      </div>
    )
   }
    </>
  );
};

export default SearchResultItem;
