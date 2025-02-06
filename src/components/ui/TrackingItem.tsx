import React from "react";
import BookCover from "./BookCover";

interface Props {
  book: {
    identifier: string;
    title: string;
    creators: string;
    publisher: string;
    date: string;
    avancement: number;
  };
}

const TrackingItem: React.FC<Props> = ({ book }) => {
  return (
    <div
      style={{
        display: "flex",
        height: "50px",
        width: "100%",
        flexDirection: "row",
        justifyContent: "stretch",
        alignItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid #ccc",
        borderTop: "1px solid #ccc",
      }}
    >
      {/* Book cover */}
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
        }}
      >
        <BookCover isbn={book.identifier} />
      </div>
      <div
        style={{
          position: "absolute",
          textAlign: "center",
          width: "100%",
          height: "50px",
          margin: 0,
          color: "white",
          textShadow: "1px 1px 7px #000",
        }}
      >
        <div
          style={{
            height: "50px",
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "1.5em",
            fontWeight: "bold",

          }}>
          {book.title}
        </div>
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: `calc(100% - ${book.avancement}%)`,
            borderLeft: "10px solid orange",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            top: "0",
            right: "0",
          }}
        ></div>
      </div>
    </div>
  );
};

export default TrackingItem;
