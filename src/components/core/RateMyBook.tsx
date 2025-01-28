import React from "react";
import { Box, Rating, Typography } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Slider from "@mui/material/Slider";
import {
  isFavoris,
  isComment,
  getNote,
  isTracked,
  isWishlisted,
  toggleFavoris,
  toggleWishlist,
  updateNote,
  updateAvancement,
  getAvancement
} from "../../service/dbBookOptions.service";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { set } from "react-hook-form";

// Composant pour afficher les options d'un livre (favoris, classement, avancement)
// refacto : design.

interface BookInfoProps {
  isbn: string;
}

const BookInfo: React.FC<BookInfoProps> = ({ isbn }) => {
  // Récupération des données de l'utilisateur

  const [bookInFav, setBookInFav] = React.useState<boolean>(false);
  const [bookNote, setBookNote] = React.useState<number>(0);
  const [bookAvancement, setBookAvancement] = React.useState<number>(0);
  const [bookIsWishlisted, setBookIsWishlisted] =
    React.useState<boolean>(false);
  const [sliderValue, setSliderValue] = React.useState<number>(0);
  
  React.useEffect(() => {
    const fetchData = async () => {
      setBookInFav(await isFavoris(1, isbn));
      const note = await getNote(1, isbn);
      setBookNote(note);
      setBookAvancement(await getAvancement(1, isbn));
      setBookIsWishlisted(await isWishlisted(1, isbn));
      setSliderValue(await getAvancement(1, isbn));
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
  const handleChangeNote = async (value:number) => {
    setBookNote(value);
    await updateNote(1, isbn,value);
  };

let timer: NodeJS.Timeout;

const handleChangeAvancement = async (value:number) => {
  // ajouter un timer pour éviter de spammer la base de données
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(async () => {
    setBookAvancement(value);
    await updateAvancement(1, isbn, value);
  }, 250);}
  
const handleChangeAvancementValue = (event: Event, value: number | number[]) => {
  setSliderValue(value as number);
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
          aria-label="Default"
          value={sliderValue}
          valueLabelDisplay="auto"
          sx={{ width: "90%" }}
          onChange={handleChangeAvancementValue}
          onChangeCommitted={(event, value) => {
            handleChangeAvancement(value as number);
          }}
        />
        <span>Avancement : {bookAvancement ? bookAvancement : "0"} %</span>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "end",
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
          <span>{bookInFav ? "Favori" : "Favori"}</span>
        </div>
        <div
          className={`wishlist-toggle ${
            bookIsWishlisted ? "wishlisted" : "not-wishlisted"
          }`}
          onClick={handleToggleWish}
        >
          {bookIsWishlisted ? (
            <>
              <ShoppingCartIcon />
              <span>Wishlist</span>
            </>
          ) : (
            <>
              <AddShoppingCartIcon />
              <span>Whislist</span>
            </>
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
          <Rating
          name="size-large" defaultValue={0}
          value={bookNote}
          onChange={(event, newValue) => {
            handleChangeNote(newValue?newValue:0);
          }}
          size="large"
          />
          <span>Ma note</span>
        </div>
      </Box>
    </Box>
  );
};

export default BookInfo;
