import { FC, useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import bookData from "../dataFake/book_data.json";
import BookCover from "./BookCover";

// Composant pour afficher un apercus d'une liste de l'utilisateur
// à faire : fusionner avec baselisteitem

interface ListeItemProps {
  categoryId: number;
  categoryTitle: string;
  categoryType: string;
}

const ListeItem: React.FC<ListeItemProps> = ({
  categoryId,
  categoryTitle,
  categoryType,
}) => {
  const navigate = useNavigate();
  const [isbnList, setIsbnList] = useState<string[]>([]);
  const [bookCount, setBookCount] = useState<number>(0);

  const path_liste =
    categoryType === "liste"
      ? `/listes/${categoryId}`
      : `/listes/${categoryType}`;
  const classListColor = `liste-${categoryId}`;

  useEffect(() => {
    const booksInList = bookData.filter((book) =>
      book.listes.includes(categoryId)
    );
    const isbns = booksInList.map((book) => book.isbn);
    setIsbnList(isbns);
    setBookCount(booksInList.length);
  }, [categoryId]);


  const getRandomISBN = () => {
    const randomISBN = isbnList[Math.floor(Math.random() * isbnList.length)];
    return randomISBN;
  };
  const randomISBN = getRandomISBN();
  return (
    <>
      <div
        className={"apercus-liste"}
        style={{
          background: "var(--black-text-tr)",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          overflow: "hidden"
        }}
        onClick={() => navigate(path_liste)}
      >
        <div className="apercus-liste-fond">
        <BookCover isbn={randomISBN} />
        </div>
        <div className="apercus-liste-titre">
          {categoryTitle}
        </div><div className="apercus-liste-badge">
          <strong>{bookCount}</strong>
        </div>
      </div>
    </>
  );
};

export default ListeItem;
