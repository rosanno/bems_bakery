import axios from "axios";

export const publicRequest = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});
