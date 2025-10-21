import React from 'react'
import Header from './components/landingComponents/Header'
import { BrowserRouter, Routes,Route } from 'react-router-dom'

import { AuthProvider } from './context/AuthProvider'
import AuthPage from './components/authComponents/AuthPage'
import Home from './pages/Home'
import ProtectedRoute from './components/landingComponents/ProtectedRoute'
import Community from './pages/Community'
import CreateBlog from './pages/CreateBlog'
import MyBlogs from './pages/MyBlogs'
import ViewBlog from './pages/ViewBlog'

const App = () => {
  return (

    <BrowserRouter>

    <AuthProvider>

      <Header/>
      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/community" element={<Community />} />
        <Route path="/create/:id" element={<CreateBlog/>} />
        <Route path="/my-blogs" element={<MyBlogs/>} />
        <Route path="/viewBlog/:id" element={<ViewBlog/>} />

       
        
      </Routes>
    </AuthProvider>
  </BrowserRouter>

  )
}

export default App
