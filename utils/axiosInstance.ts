import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", // API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Sadece tarayıcıda çalışıyorsa token'ı al
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
