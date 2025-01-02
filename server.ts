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

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Proxy API SRU en cours d'exécution sur http://localhost:${PORT}`);
});