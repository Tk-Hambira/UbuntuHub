import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Package, 
  Users, 
  MessageSquare, 
  ShoppingBag, 
  Settings,
  LogOut,
  Plus,
  TrendingUp,
  Eye
} from 'lucide-react'
import apiService from '../services/api'

const Dashboard = () => {
  const location = useLocation()
  const userType = new URLSearchParams(location.search).get('type') || 'admin'
  const userName = new URLSearchParams(location.search).get('name') || 'User'
  
  const [stats, setStats] = useState([])
  const [recentActivity, setRecentActivity] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  // Get stored user data for seller ID
  const userData = JSON.parse(localStorage.getItem('user') || '{}')
  const sellerId = userData.id

  useEffect(() => {
    fetchDashboardData()
  }, [userType, sellerId])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError('')
      
      let endpoint = `/analytics/dashboard.php?type=${userType}`
      if (userType === 'seller' && sellerId) {
        endpoint += `&seller_id=${sellerId}`
      }

      const response = await apiService.get(endpoint)
      
      if (response.success) {
        const data = response.data
        
        if (userType === 'admin') {
          setStats([
            { title: 'Total Products', value: data.stats.total_products, change: '+12%', icon: Package, color: 'bg-blue-500' },
            { title: 'Active Sellers', value: data.stats.total_sellers, change: '+5%', icon: Users, color: 'bg-green-500' },
            { title: 'Unread Messages', value: data.stats.unread_messages, change: '+3%', icon: MessageSquare, color: 'bg-yellow-500' },
            { title: 'Categories', value: data.stats.total_categories, change: '+0%', icon: TrendingUp, color: 'bg-purple-500' }
          ])
        } else {
          setStats([
            { title: 'My Products', value: data.stats.total_products, change: '+2%', icon: Package, color: 'bg-sunset-orange' },
            { title: 'Featured Products', value: data.stats.featured_products, change: '+15%', icon: Eye, color: 'bg-desert-brown' },
            { title: 'Low Stock Items', value: data.stats.low_stock_products, change: '-5%', icon: TrendingUp, color: 'bg-red-500' },
            { title: 'Active Listings', value: data.stats.total_products, change: '+8%', icon: ShoppingBag, color: 'bg-green-500' }
          ])
        }
        
        setRecentActivity(data.recent_activity || [])
      } else {
        setError('Failed to load dashboard data')
      }
    } catch (err) {
      console.error('Dashboard data error:', err)
      if (err.message.includes('fetch')) {
        setError('Cannot connect to server. Please ensure XAMPP is running.')
      } else {
        setError('Failed to load dashboard data')
      }
      
      // Fallback to demo data
      const demoStats = userType === 'admin' 
        ? [
            { title: 'Total Products', value: '10', change: '+12%', icon: Package, color: 'bg-blue-500' },
            { title: 'Active Sellers', value: '3', change: '+5%', icon: Users, color: 'bg-green-500' },
            { title: 'Messages', value: '0', change: '+3%', icon: MessageSquare, color: 'bg-yellow-500' },
            { title: 'Categories', value: '6', change: '+0%', icon: TrendingUp, color: 'bg-purple-500' }
          ]
        : [
            { title: 'My Products', value: '2', change: '+2%', icon: Package, color: 'bg-sunset-orange' },
            { title: 'Featured Products', value: '1', change: '+15%', icon: Eye, color: 'bg-desert-brown' },
            { title: 'Low Stock Items', value: '0', change: '-5%', icon: TrendingUp, color: 'bg-red-500' },
            { title: 'Active Listings', value: '2', change: '+8%', icon: ShoppingBag, color: 'bg-green-500' }
          ]
      setStats(demoStats)
    } finally {
      setIsLoading(false)
    }
  }

  const adminQuickActions = [
    { title: 'Manage Products', desc: 'View and manage all products', icon: Package, link: '#' },
    { title: 'Manage Sellers', desc: 'Approve and manage sellers', icon: Users, link: '#' },
    { title: 'View Messages', desc: 'Check contact messages', icon: MessageSquare, link: '#' },
    { title: 'Analytics', desc: 'View detailed reports', icon: BarChart3, link: '#' }
  ]

  const sellerQuickActions = [
    { title: 'Add Product', desc: 'Add a new product to sell', icon: Plus, link: '#' },
    { title: 'My Products', desc: 'Manage your products', icon: Package, link: '#' },
    { title: 'Analytics', desc: 'View your sales data', icon: BarChart3, link: '#' },
    { title: 'Profile', desc: 'Update your profile', icon: Settings, link: '#' }
  ]

  const quickActions = userType === 'admin' ? adminQuickActions : sellerQuickActions

  const handleLogout = () => {
    // Clear user session data
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    // Redirect to home page
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen bg-off-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <ShoppingBag className="h-8 w-8 text-sunset-orange" />
                <span className="font-montserrat font-bold text-xl text-charcoal">
                  Ubuntu Hub <span className="text-sunset-orange">Namibia</span>
                </span>
              </Link>
              <div className="hidden md:block">
                <span className="text-gray-400">|</span>
                <span className="ml-4 text-charcoal font-medium">
                  {userType === 'admin' ? 'Admin Dashboard' : 'Seller Dashboard'}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-charcoal">Welcome, {userName}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 text-gray-600 hover:text-sunset-orange transition-colors duration-200"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-montserrat font-bold text-charcoal mb-2">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-600">
            {userType === 'admin' 
              ? 'Manage your marketplace and monitor performance.' 
              : 'Manage your products and track your sales.'}
          </p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6"
          >
            <p className="text-sm text-yellow-600">{error}</p>
          </motion.div>
        )}

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {isLoading ? (
            // Loading skeleton
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
                  <div className="w-8 h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="w-16 h-8 bg-gray-200 rounded mb-1"></div>
                <div className="w-24 h-4 bg-gray-200 rounded"></div>
              </div>
            ))
          ) : (
            stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${stat.color} text-white`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <span className={`text-sm font-medium ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-charcoal mb-1">{stat.value}</h3>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            ))
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-montserrat font-bold text-charcoal mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <a
                key={index}
                href={action.link}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex items-center space-x-4 mb-3">
                  <div className="p-3 bg-sunset-orange bg-opacity-10 rounded-xl group-hover:bg-opacity-20 transition-colors duration-300">
                    <action.icon className="h-6 w-6 text-sunset-orange" />
                  </div>
                </div>
                <h3 className="font-semibold text-charcoal mb-2">{action.title}</h3>
                <p className="text-gray-600 text-sm">{action.desc}</p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-montserrat font-bold text-charcoal mb-6">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-gray-500 text-sm text-center py-4">
                No recent activity to show.
              </p>
            ) : (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <p className="text-charcoal font-medium">{activity.action}</p>
                    <p className="text-gray-600 text-sm">{activity.item}</p>
                  </div>
                  <span className="text-gray-500 text-sm">{activity.time}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
