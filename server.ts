const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 5000;

// Activer CORS pour toutes les origines (ou restreindre si nécessaire)
app.use(cors());

// Définir une route proxy pour l'API SRU
app.get("/api/sru", async (req, res) => {
    console.log("Paramètres reçus :", req.query);
    try {
        // Récupérer les paramètres de la requête
        const params = req.query;

        // Faire une requête vers l'API SRU
        const response = await axios.get("https://catalogue.bnf.fr/api/SRU", { params });

        // Renvoyer les données de l'API BnF au client
        res.setHeader("Content-Type", "application/xml");
        res.send(response.data);
        console.log("Réponse API SRU :", response.data);
    } catch (error) {
        console.error("Erreur avec l'API SRU :", error.message);
        res.status(500).send("Erreur avec l'API SRU.");
    }
});

// Route pour récupérer la couverture d'Open Library
app.get('/fetch-cover', async (req, res) => {
    const isbn = req.query.isbn;
  
    const openLibraryUrl = `https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`;
  
    try {
      const response = await fetch(openLibraryUrl);
      const data = await response.json();
      const bookData = data[`ISBN:${isbn}`];
  
      if (bookData && bookData.cover) {
        // Si une couverture est trouvée, on la renvoie au frontend
        return res.json({ coverUrl: bookData.cover.large });
      } else {
        // Si pas de couverture trouvée, on renvoie un message d'erreur
        return res.json({ coverUrl: null });
      }
    } catch (err) {
      console.error("Erreur lors de la récupération de la couverture Open Library:", err);
      res.status(500).json({ error: 'Erreur lors de la récupération de la couverture' });
    }
  });

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Proxy API SRU en cours d'exécution sur http://localhost:${PORT}`);
});