import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Box, Typography } from "@mui/material";
import { db } from "../../db"; // IndexedDB instance
import { isBookInList } from "../../service/dbBook.service"; // Service centralisé
import BookCover from "../ui/BookCover";

interface ListeItemProps {
  categoryId: number;
  categoryTitle: string;
  categoryType: string;
  userId: number; // Ajout de userId pour filtrer les données
}

const ListeItem: React.FC<ListeItemProps> = ({
  categoryId,
  categoryTitle,
  categoryType,
  userId,
}) => {
  const navigate = useNavigate();
  const [isbnList, setIsbnList] = useState<string[]>([]); // Liste des ISBN des livres
  const [bookCount, setBookCount] = useState<number>(0); // Nombre de livres dans la liste

  const path_liste =
    categoryType === "liste"
      ? `/listes/${categoryId}`
      : `/listes/${categoryType}`;

  useEffect(() => {
    const fetchBooksInList = async () => {
      try {
        // Récupérer les relations liste-livre pour l'utilisateur et la liste donnée
        const relations = await db.liste_book
          .where("userId")
          .equals(userId)
          .and((rel) => rel.listeId === categoryId)
          .toArray();
        console.log(`Relations récupérées pour la liste ${categoryId}:`, relations);
    
        if (relations.length > 0) {
          const bookIds = relations.map((rel) => rel.bookId); // Récupérer les `bookId` (identifier)
          console.log(`bookIds récupérés pour la liste ${categoryId}:`, bookIds);
    
          // Récupérer les livres en utilisant le champ `identifier`
          const books = await db.books.where("identifier").anyOf(bookIds).toArray();
          console.log(`Livres récupérés pour la liste ${categoryId}:`, books);
    
          // Extraire les ISBN des livres valides
          const isbns = books.map((book) => book.identifier);
          setIsbnList(isbns); // Mettre à jour la liste des ISBN
          setBookCount(isbns.length); // Mettre à jour le nombre de livres
        } else {
          setIsbnList([]);
          setBookCount(0);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des livres :", error);
      }
    };

    fetchBooksInList();
  }, [categoryId, userId]);

  const getRandomISBN = () => {
    if (isbnList.length === 0) return ""; // Retourner une chaîne vide si aucun ISBN
    const randomISBN = isbnList[Math.floor(Math.random() * isbnList.length)];
    return randomISBN;
  };

  const randomISBN = getRandomISBN();

  return (
    <div
      className={"apercus-liste"}
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
      {/* Affiche la couverture d'un livre au hasard */}
      <div className="apercus-liste-fond">
        <BookCover isbn={randomISBN} />
      </div>

      {/* Titre de la liste */}
      <div className="apercus-liste-titre">{categoryTitle}</div>

      {/* Badge avec le nombre de livres */}
      <div className="apercus-liste-badge">
        <strong>{bookCount}</strong>
      </div>
    </div>
  );
};

export default ListeItem;
