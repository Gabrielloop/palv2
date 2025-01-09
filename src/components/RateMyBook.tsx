import React from "react";
import { Box, Rating, Typography } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Slider from "@mui/material/Slider";
import {
  isFavoris,
  isComment,
  isTracked,
  isWishlisted,
  toggleFavoris,
  toggleWishlist,
} from "../service/dbBookOptions.service";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

// Composant pour afficher les options d'un livre (favoris, classement, avancement)
// refacto : design.

interface BookInfoProps {
  isbn: string;
}

const BookInfo: React.FC<BookInfoProps> = ({ isbn }) => {
  // Récupération des données de l'utilisateur

  const [bookInFav, setBookInFav] = React.useState<boolean>(false);
  const [bookIsCommented, setBookIsCommented] = React.useState<boolean>(false);
  const [bookIsTracked, setBookIsTracked] = React.useState<boolean>(false);
  const [bookIsWishlisted, setBookIsWishlisted] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchData = async () => {
      setBookInFav(await isFavoris(1, isbn));
      setBookIsCommented(await isComment(1, isbn));
      setBookIsTracked(await isTracked(1, isbn));
      setBookIsWishlisted(await isWishlisted(1, isbn));
    };
    fetchData();
  }, [isbn]);

  const handleToggleFav = async () => {
    const newFavoris = !bookInFav;
    setBookInFav(newFavoris);
    await toggleFavoris(1, isbn);
  };
  const handleToggleWish = async () => {
    const newWish = !bookIsWishlisted;
    setBookIsWishlisted(newWish);
    await toggleWishlist(1, isbn);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        borderTop: "1px solid rgba(255,255,255,0.2)",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Slider
          defaultValue={50}
          aria-label="Default"
          valueLabelDisplay="auto"
          sx={{ width: "90%" }}
        />
        <span>Avancement : 50 %</span>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 2,
          borderTop: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: bookInFav ? "red" : "gray",
            cursor: "pointer",
          }}
          onClick={handleToggleFav}
        >
          <FavoriteOutlinedIcon />
          <span>{bookInFav ? "Favori" : "Non favori"}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: bookIsWishlisted ? "yellow" : "gray",
            cursor: "pointer",
          }}
          onClick={handleToggleWish}
        >
{bookIsWishlisted ? (
  <span>Wish</span>
) : (
  <span>Hors Wish</span>
)}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "rgb(256,172,4)",
          }}
        >
          <Rating name="size-large" defaultValue={2} size="large" />
          <span>Ma note</span>
        </div>
      </Box>
    </Box>
  );
};

export default BookInfo;
