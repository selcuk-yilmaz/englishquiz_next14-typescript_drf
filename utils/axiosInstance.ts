import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", // API base URL
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      // Token'ı localStorage'dan al
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // CSRF token'ı al
      const csrfTokenElement = document.querySelector(
        "[name=csrfmiddlewaretoken]"
      ) as HTMLInputElement;
      if (csrfTokenElement) {
        config.headers["X-CSRFToken"] = csrfTokenElement.value;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:8000/", // API base URL
// });

// axiosInstance.interceptors.request.use(
//   (config) => {
//     if (typeof window !== "undefined") {
//       // Sadece tarayıcıda çalışıyorsa token'ı al
//       const token = localStorage.getItem("token");
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default axiosInstance;
