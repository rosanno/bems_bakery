import axios from "axios";

export const publicRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});