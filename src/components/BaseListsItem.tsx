import { FC, useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import bookData from "../dataFake/book_data.json"; // Importer les données des livres



// Composant apeler dans la liste des basiques pour afficher un apercus de la liste (favoris, à lire, etc.)
// refacto : design de l'apercus
// à faire : gestion des datas
// refacto : element out of date

interface ListeItemProps {
  categoryId: number; 
  categoryTitle: string;
  categoryType: string;
}

const BaseListsItem: React.FC<ListeItemProps> = ({
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
  const classListColor = `liste-${categoryId}`; // Out of date

  useEffect(() => {
    const booksInList = bookData.filter((book) => book.listes.includes(categoryId));
    const isbns = booksInList.map((book) => book.isbn);
    setIsbnList(isbns);
    setBookCount(booksInList.length);
  }, [categoryId]);

  return (
    <div
      className={"apercus-base-liste"}
      style={{
        background: "#fff",
        borderRadius: "8px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        padding: "15px"
        /*,animation: "scroll-animation 20s linear infinite" */
      }}
      onClick={() => navigate(path_liste)}
    >
      <Typography variant="h6" component="div" style={{ marginBottom: "15px" }}>
        {categoryTitle}
      </Typography>

      <Typography variant="body2" component="div" style={{ marginBottom: "10px" }}>
        <strong>Nombre de livres : </strong> {bookCount}
      </Typography>

      <div style={{ marginBottom: "15px" }}>
        <strong>ISBNs des livres :</strong>
        <ul style={{ listStyleType: "none", paddingLeft: "0" }}>
          {isbnList.length > 0 ? (
            isbnList.map((isbn, index) => (
              <li key={index} style={{ fontSize: "14px", color: "#555" }}>
                {isbn}
              </li>
            ))
          ) : (
            <Typography variant="body2" component="div" color="textSecondary">
              Aucun livre dans cette liste.
            </Typography>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BaseListsItem;
