import axios from "axios";

const hostUrl = "http://localhost:8080";

// Post methode to API
export const postApiBack = (url: string, data: any) => {
  const urlFinal = hostUrl + url;

  axios
    .post(urlFinal, data, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      if (error.response) {
        console.error("Erreur serveur :", error.response.data);
        console.error("Code statut :", error.response.status);
      } else if (error.request) {
        console.error("Aucune réponse du serveur :", error.request);
      } else {
        console.error("Erreur de configuration :", error.message);
      }
    });
};
