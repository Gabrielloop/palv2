import React from "react";
import { Box, Rating, Typography } from "@mui/material";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import Slider from "@mui/material/Slider";

// Composant pour afficher les options d'un livre (favoris, classement, avancement)
// refacto : design.

interface BookInfoProps {
  fav: boolean;
  classement: number;
  avancement: number;
  isbn: string;
}

const BookInfo: React.FC<BookInfoProps> = ({
  fav,
  classement,
  avancement,
  isbn,
}) => {
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
            width: "100%"
          }}
        >
      <Slider
        defaultValue={avancement}
        aria-label="Default"
        valueLabelDisplay="auto"
        sx={{ width: "90%" }}
      />
      <span>Avancement : {avancement} %</span>
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
            color: fav ? "red" : "gray",
          }}
        >
          <FavoriteOutlinedIcon />
          <span>{fav ? "Favori" : "Non favori"}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "rgb(256,172,4)",
          }}
        >
          <Rating name="size-large" defaultValue={classement} size="large" />
          <span>Ma note</span>
        </div>
      </Box>
    </Box>
  );
};

export default BookInfo;
