import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // Backend server URL
});

// Add token to all requests automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.authorization = `Bearer ${token}`;
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
    return Promise.reject(error);
  }
);

export const loginUser = (data) => API.post("/user/login", data);
export const signupUser = (data) => API.post("/user/register", data);
export const getProfile = () => API.get("/user/me");
