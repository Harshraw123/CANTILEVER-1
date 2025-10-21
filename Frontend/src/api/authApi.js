import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000/api", // Backend server URL
});

// Add token to all requests automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const loginUser = (data) => API.post("/user/login", data);
export const signupUser = (data) => API.post("/user/register", data);
export const getProfile = () => API.get("/user/me");
