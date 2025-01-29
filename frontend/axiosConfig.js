import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000", // URL del JSON Server
});

export default axiosInstance;
