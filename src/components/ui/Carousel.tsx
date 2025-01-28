import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import BookCover from "../ui/BookCover";
import ProgressBar from "../general/ProgressBar";
import { useNavigate } from "react-router-dom";
import { getBooksByAvancementStep, getAvancement } from "../../service/dbBookOptions.service";
import { searchByISBNs } from "../../api/bnf.service";


// Composant qui affiche un carrousel des livres en cours de lecture (avancement entre 0 et 100)
//TODO à faire : optimiser le précahrgement des couvertures
// à faire : ajouter des effets de supperposition/ombres sur les couvertures
// à faire : transformer en un composant qui peut etre récupéré dans d'autres pages pour afficher d'autres type de carrousel
//          ex : carrousel de livres recommandés, carrousel de livres populaires, carrousel de livres récents

const Carousel: React.FC = () => {
  // Filtrer les livres dont l'avancement est entre 0 et 100
  // Trie les livres par avancement décroissant

  const bookIsbnInProgress = getBooksByAvancementStep(1, 1); // userId , step
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [avancement, setAvancement] = useState<number>(0);
  const [booksWithAvanvement, setBooksWithAvanvement] = useState<{ avancement: number; title: string; identifier: string; creators: string; date: string; publisher: string; docType?: string }[]>([]);
  
  useEffect(() => {
    const fetchBooks = async () => {
      const isbnList = await bookIsbnInProgress;
      const books = await searchByISBNs(isbnList);
      setFilteredBooks(books);
      // Ajouter une propriété `avancement` à chaque livre
      const newBooks = [...books];
      const newBookAvancement = await Promise.all(newBooks.map(async (book) => {
        const avancement = await getAvancement(1, book.identifier); // userId, isbn
        return { ...book, avancement };
      }));
      
      setBooksWithAvanvement(newBookAvancement.sort((a, b) => b.avancement - a.avancement));

    };
    
    fetchBooks();
  }, []);

 

  // État pour garder l'index du livre actuel et les livres précédent et suivant
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [prevBook, setPrevBook] = useState<any>(null);
  const [nextBook, setNextBook] = useState<any>(null);


  const currentBook = booksWithAvanvement[currentIndex];
  
  const navigate = useNavigate();

  // Fonction pour passer au livre suivant/precedent
  // Permet grace au modulo de vérifier qu'on ne dépasse pas la longeur de la table
  const nextBookHandler = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % booksWithAvanvement.length);
  };
  const prevBookHandler = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + booksWithAvanvement.length) % booksWithAvanvement.length
    );
  };

  // Fonction pour naviguer vers la page du livre principal
  const handleBookClick = () => {
    if (currentBook.identifier) {
      navigate(`/livre/${currentBook.identifier}`);
    }
  };

  // Mettre à jour les livres précédent et suivant
  useEffect(() => {
    const prevIndex =
      (currentIndex - 1 + booksWithAvanvement.length) % booksWithAvanvement.length;
    const nextIndex = (currentIndex + 1) % booksWithAvanvement.length;
    setPrevBook(booksWithAvanvement[prevIndex]);
    setNextBook(booksWithAvanvement[nextIndex]);
  }, [currentIndex, booksWithAvanvement]);



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
              {prevBook && prevBook.identifier && <BookCover isbn={prevBook.identifier} />}
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
                {currentBook.identifier && <BookCover isbn={currentBook.identifier} />}
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
              {nextBook && nextBook.identifier && <BookCover isbn={nextBook.identifier} />}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Carousel;
