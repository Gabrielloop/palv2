import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { searchByQuery, Book } from "../../api/bnfServices";
import BookCover from "../../components/BookCover";
import HeaderContainer from "components/HeaderContainer";
import ArrowReturn from "components/ArrowReturn";
import AddToListForm from "components/AddToList";
import { Box } from "@mui/material";
import bookData from "../../dataFake/book_data.json";
import RateMyBook from "components/RateMyBook";
import TextField from "@mui/material/TextField";
import { getComment, updateComment } from "service/dbBookOptions.service";
// à faire : gestion des erreurs

const BookDetails: React.FC = () => {
  const { isbn } = useParams<{ isbn: string }>();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bookComment, setBookComment] = useState<string | null>(null);

  useEffect(() => {
    if (isbn) {
      fetchBookDetails(isbn);
    }
  }, [isbn]);

  
  const fetchBookDetails = async (isbn: string) => {
    setLoading(true);
    setError(null);
    setBookComment(await getComment(1, isbn));

    try {
      const result = await searchByQuery(isbn);
      if (result && result.length > 0) {
        setBook(result[0]);
      } else {
        setError("Aucun livre trouvé pour cet ISBN.");
      }
    } catch (err) {
      console.error("Erreur lors de la récupération des détails :", err);
      setError(
        "Impossible de récupérer les détails du livre. Veuillez réessayer."
      );
    } finally {
      setLoading(false);
    }
  };


  const renderAuthors = (creators: string | string[]) => {
    if (Array.isArray(creators)) {
      return creators.join(", ");
    }
    return creators || "Auteur inconnu";
  };

  // Fonction pour afficher l'année correctement
  const renderYear = (year: any) => {
    if (typeof year === "string" && !isNaN(Number(year))) {
      return Number(year).toString();
    }
    return "Année inconnue";
  };

  // Fonction pour afficher l'ISBN
  const renderISBN = () => {
    return isbn || "ISBN inconnu";
  };


  const handleUpdateComment = async (value:string) => {
    setBookComment(value);
    if (isbn) {
      await updateComment(1, isbn, value);
    }
  }

  if (loading) return <p>Chargement des détails...</p>;
  if (error) return <p>{error}</p>;
  if (!book) return <p>Aucun détail disponible pour cet ISBN.</p>;
  return (
    <>
      <HeaderContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "5px",
            padding: "5px",
          }}
        >
          <ArrowReturn />
          <AddToListForm isbn={book.identifier} userId={1}/>
        </Box>
      </HeaderContainer>

      <div style={{ padding: "5px" }}>

        <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
          <div
            style={{ position: "sticky", top: "0", zIndex: -1, margin: "-5px" }}
          >
            {isbn && <BookCover isbn={isbn} />}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              backgroundColor: "rgba(0,0,0,0.8)",
              borderRadius: "20px",
              padding: "10px",
              backdropFilter: "blur(10px)",
            }}
          >
            <h2>{book.title}</h2>
            <span>{renderAuthors(book.creators)}</span>
            
              <RateMyBook
                isbn={renderISBN() || ""}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              backgroundColor: "rgba(0,0,0,0.8)",
              borderRadius: "20px",
              padding: "10px",
              backdropFilter: "blur(10px)",
            }}
          >
            <p>
              <strong>ISBN :</strong> {renderISBN()}
            </p>
            <p>
              <strong>Éditeur :</strong> {book.publisher}
            </p>
            <p>
              <strong>Année :</strong> {renderYear(book.date)}
            </p>
          </div>


              <Box
                component="form"
                sx={{ "& .MuiTextField-root": {
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.8)",
                  borderRadius: "20px",
                  backdropFilter: "blur(10px)",
                  
                 } }}
                noValidate
                autoComplete="off"
              >
                <TextField
                  id="outlined-multiline-static"
                  label="Mon commentaire sur ce livre"
                  multiline
                  rows={4}
                  defaultValue={bookComment}
                  InputProps={{
                    style: { color: "white" }, // Couleur du texte
                  }}
                  InputLabelProps={{
                    style: { color: "white" }, // Couleur du label
                  }}
                  onChange={(e) => setBookComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleUpdateComment((e.target as HTMLInputElement).value);
                    }
                  }}
                />
              </Box>
        </div>
      </div>
    </>
  );
};

export default BookDetails;