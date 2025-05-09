import axios from "axios";

// Create an instance of axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // Request timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // You can add authorization tokens or other headers here
    // config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle errors
    if (error.response) {
      // Server responded with a status other than 200 range
      console.error("Error response:", error.response);
    } else if (error.request) {
      // Request was made but no response received
      console.error("Error request:", error.request);
    } else {
      // Something else happened while setting up the request
      console.error("Error message:", error.message);
    }
    return Promise.reject(error);
  }
);

export default api;
