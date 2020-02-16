import axios from "axios";
import { getToken } from "./auth";

const api = axios.create({
    baseURL: "http://127.0.0.1:3333",
    headers: { 'x-access-token': getToken() }
});

export default api;