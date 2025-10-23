import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser, getProfile } from '../api/authApi'
import { AuthContext } from "./AuthContext";


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check user on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    const currentPath = window.location.pathname;
    const publicPaths = ['/login', '/signup', '/'];
    
    if (!token) {
      setLoading(false);
      // Don't redirect automatically - let the Home component handle showing auth form
      // Only redirect if user tries to access protected routes directly
      if (!publicPaths.includes(currentPath)) {
        navigate('/');
      }
      return;
    }

    setLoading(true);
    getProfile()
      .then((res) => {
        setUser(res.data);
        // If user is logged in and tries to access auth pages, redirect to dashboard
        if (['/login', '/signup'].includes(currentPath)) {
          navigate('/');
        }
      })
      .catch(() => {
        localStorage.removeItem("token");
        setUser(null);
        // If token is invalid, redirect to home which will show auth form
        if (!publicPaths.includes(currentPath)) {
          navigate('/');
        }
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  // Login
  const login = async (data) => {
    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      // Clear any invalid token
      localStorage.removeItem("token");
      throw err;
    }
  };

  // Signup
  const signup = async (data) => {
    try {
      const res = await signupUser(data);
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      navigate("/");
    } catch (err) {
      console.error("Signup failed:", err.response?.data || err.message);
      // Clear any invalid token
      localStorage.removeItem("token");
      throw err;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
