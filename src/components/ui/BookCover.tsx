import React, { useState, useEffect } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import {isbnConvert} from "../../service/isbnConvert";

// COmposant pour afficher la couverture d'un livre
// par défaut, charge la couverture de la BNF
// si l'ISBN n'est pas trouvé, utilise un placeholder
// charge la couverture du livre via l'API Open Library en parrallèle
// à faire : crop sur les couvertures de la BNF
// refacto : créer un placeholder dynamique/personnalisé
// à faire : afficher les erreurs depuis un composant à part
// à faire : ajouter une props pour gérer la taille des couvertures (small, medium:defaut, large)


interface BookCoverProps {
  isbn: string;
}

const BookCover: React.FC<BookCoverProps> = ({ isbn }) => {
  if (isbn.length === 10) {
    isbn = isbnConvert(isbn);
  } else {isbn = isbn}

  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // URL de la couverture BNF par défaut
  const defaultCoverUrl = `https://couverture.geobib.fr/api/v1/${isbn}/medium`;

  // URL du placeholder
  const placeholderUrl = "https://placehold.co/100x150";

  // Fonction pour récupérer la couverture du livre via l'API Open Library
  const fetchBookCover = async (isbn: string) => {
    

    const url = `http://localhost:5000/fetch-cover?isbn=${isbn}`;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(url);
      const data = await response.json();

      if (data.coverUrl) {
        setCoverUrl(data.coverUrl);  // Utilisez l'URL de la couverture renvoyée
      } else {
        setCoverUrl(defaultCoverUrl);  // Si OpenLibrary ne retourne rien, utiliser la couverture BNF par défaut
      }
    } catch (err) {
      setError("Erreur lors de la récupération des informations");
      setCoverUrl(defaultCoverUrl);  // Si erreur, afficher la couverture BNF par défaut
    } finally {
      setLoading(false);
    }
  };

  // Lors de la réception de l'ISBN, récupérer la couverture du livre
  useEffect(() => {
    if (isbn) {
      fetchBookCover(isbn);
    }
  }, [isbn]);

  // Fonction pour gérer l'erreur de chargement de l'image
  const handleImageError = () => {
    setCoverUrl(placeholderUrl);
  };

  return (
    <div className="book-cover-container" style={{ position: "relative", width: "100%", height: "100%" }}>
      {loading && (
        <div style={{ 
          position: "absolute", 
          top: "50%", 
          left: "50%", 
          transform: "translate(-50%, -50%)" 
        }}>
          <CircularProgress color="inherit" />
        </div>
      )}
      <img
        src={coverUrl || placeholderUrl}  // Afficher la couverture, ou le placeholder si aucune couverture n'est trouvée
        alt={`Couverture du livre avec ISBN ${isbn}`}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: "opacity 0.5s ease-in-out",
          opacity: loading ? 0 : 1,
        }}
        onError={handleImageError}
      />
     
    </div>
  );
};

export default BookCover;
