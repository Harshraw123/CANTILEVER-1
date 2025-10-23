export const BASE_URL =
	typeof window !== 'undefined' && window.location.hostname === 'localhost'
		? 'http://localhost:4000'
		: (import.meta.env.VITE_API_URL || 'https://cantilever-1-zjpg.onrender.com');


export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/user/register", // Signup
    LOGIN: "/api/user/login", // Authenticate user & return JWT token
    GET_PROFILE: "/api/user/profile", // Get logged-in user details
  },
  AI: {
    GENERATE:'/api/ai/generate'
  },

  BLOG: {
    CREATE: '/api/blog/gc',
    GET_BY_ID: (blogId) => `/api/blog/${blogId}`,
    EDIT: (blogId) => `/api/blog/${blogId}/gp`,
    GET_MY_ALL: '/api/blog/gc',
    DELETE:(blogId)=>`/api/blog/${blogId}/gp`,
    GET_ALL:'/api/blog/all',
    LIKE:(blogId)=>`/api/blog/${blogId}/like`

  }

};
