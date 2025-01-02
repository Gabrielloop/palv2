import axios from "axios";


const apiClient = axios.create({
    baseURL: "https://openlibrary.org",
    timeout: 10000,
});

export default apiClient;
