import React from "react";
import BookCover from "./BookCover"; 
import bookData from "../dataFake/book_data.json"; 
import { Box } from "@mui/material"; 
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import Rating from "@mui/material/Rating"; 
import ProgressBar from "./ProgressBar";

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
}

const cleanParentheses = (text: string | undefined) => {
  if (typeof text === "string") {
    return text.replace(/\s?\(.*?\)\s?/g, "").trim();
  }
  return text || "";
};

// Fonction pour nettoyer les variables
const cleanCreatorName = (creator: string | undefined) => {
  if (typeof creator === "string") {

    let cleanedCreator = creator.replace(/Auteur du texte/g, "").trim();
    return cleanParentheses(cleanedCreator);
  }
  return creator || "";
};
const cleanTitle = (title: string | undefined) => {
  if (typeof title === "string") {
    return title.split(" /")[0];
  }
  return title || "";
};
const cleanPublisher = (publisher: string | undefined) => {
  return cleanParentheses(publisher);
};

const getBookDetailsFromData = (isbn: string) => {
  const bookDetails = bookData.find((book) => book.isbn === isbn);
  return bookDetails || null;
};

const SearchResultItem: React.FC<SearchResultItemProps> = ({
  book,
  handleDetailsClick,
}) => {
  const handleClick = () => {
    handleDetailsClick(book.identifier);
  };
  const bookDetails = book.identifier
    ? getBookDetailsFromData(book.identifier)
    : null;
  const itemClass =
    book.identifier === "ISBN inconnu"
      ? "search-result-item-unknown"
      : "search-result-item";
  return (
    <div
      className={itemClass}
      style={{
        display: "flex",
        padding: "5px",
        borderBottom: "1px solid var(--black-text-tr)",
        alignItems: "center",
        cursor: "pointer",
        height: "90px",
        overflow: "hidden"
      }}
      onClick={handleClick}
    >
      {/* Colonne pour la couverture */}
      <div style={{ flex: 0.75, paddingRight: "5px", width: "75px" }}>
        <BookCover isbn={book.identifier} />
      </div>

      {/* Colonne regroupant Titre + Date et Auteur + Éditeur */}
      <div style={{ flex: 3, display: "flex", flexDirection: "column" }}>
        <div className="search-result-title search-result-item-tronc">
          {/* Titre */}
          {cleanTitle(book.title)}
        </div>
        <div className="search-result-item-tronc">
          {/* Auteur et Éditeur et Date  */}
          <span className="search-result-date">{book.date}</span>&nbsp;
          <span className="search-result-creator">
            {cleanCreatorName(book.creators)}
          </span>
        </div>
        <div className="search-result-item-tronc">
          <span className="search-result-isbn">{book.identifier}</span>&nbsp;
          <span className="search-result-editor">
            {cleanPublisher(book.publisher)}
          </span>
        </div>
        <div>
          {/* Affichage des informations du livre provenant de book_data.json */}
          {bookDetails && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                width: "100%",
              }}
            >
              <Rating
                name="size-small"
                defaultValue={bookDetails.classement}
                size="small"
              />
              {/*<ProgressBar value={bookDetails.avancement}/>*/}
            </Box>
          )}
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
        {bookDetails && (
          <BookmarkOutlinedIcon
            sx={{ color: "var(--off-white)", fontSize: "1.5rem" }}
          />
        )}
        {bookDetails && bookDetails.favoris && (
          <FavoriteOutlinedIcon
            sx={{ color: "var(--off-white)", fontSize: "1.5rem" }}
          />
        )}
        {bookDetails && bookDetails.commentaire && (
          <ChatOutlinedIcon
            sx={{ color: "var(--off-white)", fontSize: "1.5rem" }}
          />
        )}
      </Box>
    </div>
  );
};

export default SearchResultItem;
