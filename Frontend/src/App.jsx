import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

function App() {
  const location = useLocation()
  const isDashboardPage = location.pathname === '/dashboard'
  const isLoginPage = location.pathname === '/login'
  const hideNavAndFooter = isLoginPage || isDashboardPage

  return (
    <div className="min-h-screen bg-off-white">
      {!hideNavAndFooter && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  )
}

export default App
