import { FC, useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import bookData from "../dataFake/book_data.json"; // Importer les données des livres
import { getBooksFromFavoris, getBookUser, getBooksAdvancement } from "../service/dbBook.service"; // Importer la fonction pour récupérer les livres d'une liste
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

// Composant apeler dans la liste des basiques pour afficher un apercus de la liste (favoris, à lire, etc.)
// refacto : design de l'apercus
// à faire : gestion des datas
// refacto : element out of date

interface ListeItemProps {
  categoryType: string;
  categoryTitle: string;
}
export const BaseListsItem: React.FC<ListeItemProps> = ({
  categoryType,
  categoryTitle
}) => {
  const navigate = useNavigate();
  const [isbnList, setIsbnList] = useState<string[]>([]);
  const [bookCount, setBookCount] = useState<number>(0);

  const path_liste = `/listes/${categoryType}`;

  useEffect(() => {
    const fetchBooks = async () => {
      if (categoryType === "fav") {
        const favoris = await getBooksFromFavoris(1);
        setBookCount(favoris.length);
        console.log("Favoris :", favoris);
      }
      if (categoryType === "notStart") {
        const books = await getBooksAdvancement(1);
        const notStart = books.filter(book => book.avancement === 0);
        setBookCount(notStart.length);
        console.log("A lire :", notStart);
      }
      if (categoryType === "finished") {
        const books = await getBooksAdvancement(1);
        const finished = books.filter(book => book.avancement === 100);
        setBookCount(finished.length);
        console.log("Terminé :", finished);
      }
      if (categoryType === "inProgress") {
        const books = await getBooksAdvancement(1);
        const inProgress = books.filter(book => book.avancement > 0 && book.avancement < 100);
        setBookCount(inProgress.length);
        console.log("A lire :", inProgress);
      }

      if (categoryType === "save") {
        const save = await getBookUser(1);
        setBookCount(save.length);
        console.log("Save :", save);
      }
    };
    fetchBooks();
  }, [categoryType]);

  return (
    <div
      className={`apercus-base-liste fond-${categoryType}`}
      style={{
      background: "var(--black-text-tr)",
      borderRadius: "8px",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      cursor: "pointer",
      transition: "transform 0.3s ease",
      overflow: "hidden",
      }}
      onClick={() => navigate(path_liste)}
    >
      <div className="apercus-base-liste-titre">{categoryTitle}</div>
      <div className="apercus-base-liste-badge"><strong>{bookCount}</strong></div>
    </div>
  );
};

export default BaseListsItem;