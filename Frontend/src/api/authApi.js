import axios from "axios";
import { BASE_URL } from "../../utils/apiPath";

const API = axios.create({
  baseURL: `${BASE_URL}/api`, // Use the same BASE_URL as other components
  timeout: 80000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add token to all requests automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`; // Use uppercase A to match axiosInstance
  console.log("Making request to:", req.url, "with headers:", req.headers);
  return req;
});

// Add response interceptor for debugging
API.interceptors.response.use(
  (response) => {
    console.log("Response received:", response.status, response.data);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data || error.message);
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export const loginUser = (data) => API.post("/user/login", data);
export const signupUser = (data) => API.post("/user/register", data);
export const getProfile = () => API.get("/user/me");
