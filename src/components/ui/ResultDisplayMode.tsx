import React from "react";
import BookCover from "./BookCover";
import { Book } from "../../@types/api";

interface ResultDisplayModeProps {
  book: Book;
  handleDetailsClick: (identifier: string) => void;
  bookNote: number;
  bookProgress: number;
  bookFavorite: boolean;
  bookComment: boolean;
  bookIsWishlisted: boolean;
  bookUserList: number[];
}

const ResultDisplayMode: React.FC<ResultDisplayModeProps> = ({
    book,
    handleDetailsClick,
    bookNote,
    bookProgress,
    bookFavorite,
    bookComment,
    bookIsWishlisted,
    bookUserList,
  }) => {
  return (
    <div className="result-item" onClick={() => handleDetailsClick(book.identifier)}>
      <BookCover isbn={book.identifier} />
    </div>
  );
};

export default ResultDisplayMode;
