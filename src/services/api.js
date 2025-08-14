import axios from "axios";
import { getToken } from "../utils/authToken";

const API_URL = import.meta.env.VITE_API_DOMAIN + "/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
