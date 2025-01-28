import { FC, useEffect, useState } from "react";
import * as React from "react";
import { useNavigate } from "react-router";
import { getBooksFromFavoris, getBookUser, getBooksAdvancement} from "../../service/dbBook.service";
import { ListeItemProps } from "../../@types/props";
import { useAuth } from "hooks/useAuth";

// Composant apeler dans la liste des basiques pour afficher un apercus de la liste (favoris, à lire, etc.)
// à faire : gestion des datas
// refacto : element out of date

export const DashboardPresetListButton: React.FC<ListeItemProps> = ({
  categoryType,
  categoryTitle
}) => {
  const navigate = useNavigate();
  const [isbnList, setIsbnList] = useState<string[]>([]);
  const [bookCount, setBookCount] = useState<number>(0);
  const loginUserId = useAuth()?.loginUserId ?? 0;  // Récupération du contexte utilisateur

  const path_liste = `/listes/${categoryType}`;

  useEffect(() => {
    const fetchBooks = async () => {
      if (categoryType === "fav") {
        const favoris = await getBooksFromFavoris(loginUserId);
        setBookCount(favoris.length);
      }
      if (categoryType === "notStart") {
        const books = await getBooksAdvancement(loginUserId);
        const notStart = books.filter(book => book.avancement < 1);
        setBookCount(notStart.length);
      }
      if (categoryType === "finished") {
        const books = await getBooksAdvancement(loginUserId);
        const finished = books.filter(book => book.avancement === 100);
        setBookCount(finished.length);
      }
      if (categoryType === "inProgress") {
        const books = await getBooksAdvancement(loginUserId);
        const inProgress = books.filter(book => book.avancement > 0 && book.avancement < 100);
        setBookCount(inProgress.length);
      }
      if (categoryType === "save") {
        const save = await getBookUser(loginUserId);
        setBookCount(save.length);
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

export default DashboardPresetListButton;