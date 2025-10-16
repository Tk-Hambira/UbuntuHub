import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Lock, Eye, EyeOff, User, ShoppingBag } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import apiService from '../services/api'

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'admin' // admin or seller
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
    setError('') // Clear error when user starts typing
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      // Call the actual API
      const response = await apiService.login({
        email: formData.email,
        password: formData.password,
        role: formData.userType
      })

      // Check if login was successful
      if (response.success) {
        // Store user info in localStorage for session management
        localStorage.setItem('user', JSON.stringify(response.user))
        localStorage.setItem('token', response.token)
        
        // Redirect to dashboard with user info
        navigate(`/dashboard?type=${response.user.role}&name=${response.user.first_name}`)
      } else {
        setError(response.message || 'Login failed. Please check your credentials.')
      }
    } catch (err) {
      console.error('Login error:', err)
      
      // Check if it's a network error (XAMPP not running)
      if (err.message.includes('fetch')) {
        setError('Cannot connect to server. Please ensure XAMPP is running.')
      } else {
        setError('Login failed. Please check your credentials and try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  const demoCredentials = {
    admin: { email: 'admin@ubuntuhub.na', password: 'admin123' },
    seller: { email: 'naledi@ubuntuhub.na', password: 'seller123' }
  }

  const fillDemoCredentials = (type) => {
    setFormData({
      ...formData,
      email: demoCredentials[type].email,
      password: demoCredentials[type].password,
      userType: type
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https:/images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80)'
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <span className="font-montserrat font-bold text-2xl text-white flex items-center">
              Ubuntu <ShoppingBag className="h-8 w-8 text-sunset-orange mx-2" /> Hub
            </span>
          </Link>
          <h2 className="text-3xl font-montserrat font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-white -600">
            Sign in to your account to continue
          </p>
        </motion.div>

        {/* Demo Credentials */}


        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-2xl p-8 space-y-6"
        >
          {/* User Type Selection */}
          <div>
            <label className="block text-sm font-medium text-charcoal mb-3">
              Login as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: 'admin' })}
                className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                  formData.userType === 'admin'
                    ? 'border-desert-brown bg-desert-brown text-white'
                    : 'border-gray-200 hover:border-desert-brown text-charcoal'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Admin</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, userType: 'seller' })}
                className={`p-3 rounded-xl border-2 transition-all duration-300 flex items-center justify-center space-x-2 ${
                  formData.userType === 'seller'
                    ? 'border-sunset-orange bg-sunset-orange text-white'
                    : 'border-gray-200 hover:border-sunset-orange text-charcoal'
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Seller</span>
              </button>
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
              Email Address
            </label>
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sunset-orange focus:border-transparent transition-all duration-300"
                placeholder="Enter your email"
              />
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 pl-12 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-sunset-orange focus:border-transparent transition-all duration-300"
                placeholder="Enter your password"
              />
              <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-charcoal transition-colors duration-300"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-xl p-4"
            >
              <p className="text-sm text-red-600">{error}</p>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full bg-sunset-orange text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </motion.button>
        </motion.form>

        {/* Back to Home Button */}
        <div className="text-center mt-4">
          <Link to="/" className="text-white hover:text-sunset-orange transition-colors duration-300">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
