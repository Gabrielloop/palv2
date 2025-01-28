import axios from "axios";

// Connexion à l'API OpenLibrary

const apiClient = axios.create({
    baseURL: "https://openlibrary.org",
    timeout: 10000,
});

export default apiClient;
