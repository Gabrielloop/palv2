import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import bookData from "../dataFake/book_data.json"; // Assurez-vous d'importer les données des livres
import BookCover from "./BookCover";
import ProgressBar from "./ProgressBar";
import { useNavigate } from "react-router-dom";

// Composant qui affiche un carrousel des livres en cours de lecture (avancement entre 0 et 100)
//TODO à faire : optimiser le précahrgement des couvertures
// à faire : ajouter des effets de supperposition/ombres sur les couvertures
// à faire : transformer en un composant qui peut etre récupéré dans d'autres pages pour afficher d'autres type de carrousel
//          ex : carrousel de livres recommandés, carrousel de livres populaires, carrousel de livres récents

const Carousel: React.FC = () => {
  // Filtrer les livres dont l'avancement est entre 0 et 100
  // Trie les livres par avancement décroissant
  const filteredBooks = bookData.filter(
    (book) => book.avancement > 0 && book.avancement < 100
  ).sort((a, b) => b.avancement - a.avancement);

  // État pour garder l'index du livre actuel et les livres précédent et suivant
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevBook, setPrevBook] = useState<any>(null);
  const [nextBook, setNextBook] = useState<any>(null);

  const currentBook = filteredBooks[currentIndex]; // Le livre actuel à afficher
  const navigate = useNavigate(); // Hook de navigation de react-router

  // Fonction pour passer au livre suivant/precedent
  // Permet grace au modulo de vérifier qu'on ne dépasse pas la longeur de la table
  const nextBookHandler = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredBooks.length);
  };
  const prevBookHandler = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredBooks.length) % filteredBooks.length
    );
  };

  // Fonction pour naviguer vers la page du livre principal
  const handleBookClick = () => {
    if (currentBook.isbn) {
      navigate(`/livre/${currentBook.isbn}`);
    }
  };

  // Mettre à jour les livres précédent et suivant
  useEffect(() => {
    const prevIndex =
      (currentIndex - 1 + filteredBooks.length) % filteredBooks.length;
    const nextIndex = (currentIndex + 1) % filteredBooks.length;
    setPrevBook(filteredBooks[prevIndex]);
    setNextBook(filteredBooks[nextIndex]);
  }, [currentIndex, filteredBooks]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        backgroundColor: "var(--black-text-tr)",
        height: "400px",
        MozBoxSizing: "border-box",
        marginBottom: "78px"
      }}
    >
      <h3>Lectures en cours</h3>
      <Box
        sx={{
          display: "flex",
          justifyContent: "start",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: "100%"
        }}
      >
        {/* Affichage du livre */}
        {currentBook && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              height: "300px",
              position: "relative",
            }}
          >
            {/* Couverture du livre précédent */}
            <Box
              sx={{
                position: "absolute",
                left: "-45%",
                top: "10px",
                cursor: "pointer",
                zIndex: 2,
                width: "150px",
              }}
              onClick={prevBookHandler}
            >
              {prevBook && prevBook.isbn && <BookCover isbn={prevBook.isbn} />}
            </Box>

            {/* Livre actuel */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                zIndex: 3,
              }}
              onClick={handleBookClick}
            >
              <Box
                sx={{ width: "200px", height: "280px", marginBottom: "10px" }}
              >
                {currentBook.isbn && <BookCover isbn={currentBook.isbn} />}
              </Box>
              <ProgressBar value={currentBook.avancement} />
            </Box>

            {/* Couverture du livre suivant */}
            <Box
              sx={{
                position: "absolute",
                right: "-45%",
                top: "10px",
                cursor: "pointer",
                width: "150px",
                zIndex: 2,
              }}
              onClick={nextBookHandler}
            >
              {nextBook && nextBook.isbn && <BookCover isbn={nextBook.isbn} />}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Carousel;
