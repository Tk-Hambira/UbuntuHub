// API Configuration for XAMPP Server
const API_BASE_URL = '/api' // This will proxy to http://localhost/ubuntuhub/backend

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  // Generic request handler
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      // Check if response is ok
      if (!response.ok) {
        const errorData = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorData}`)
      }

      // Try to parse as JSON, fallback to text
      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json')) {
        return await response.json()
      } else {
        return await response.text()
      }
    } catch (error) {
      console.error('API Request failed:', error)
      throw error
    }
  }

  // GET request
  async get(endpoint) {
    return this.request(endpoint, { method: 'GET' })
  }

  // POST request
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // PUT request
  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // DELETE request
  async delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' })
  }

  // Authentication endpoints
  async login(credentials) {
    return this.post('/auth/login.php', credentials)
  }

  async logout() {
    return this.post('/auth/logout.php')
  }

  async checkAuth() {
    return this.get('/auth/check.php')
  }

  // Product endpoints
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.get(`/products/list.php${queryString ? `?${queryString}` : ''}`)
  }

  async getFeaturedProducts() {
    return this.get('/products/featured.php')
  }

  async getProductsByCategory(categoryId) {
    return this.get(`/products/category.php?id=${categoryId}`)
  }

  async searchProducts(query) {
    return this.get(`/products/search.php?q=${encodeURIComponent(query)}`)
  }

  async getProduct(id) {
    return this.get(`/products/detail.php?id=${id}`)
  }

  async createProduct(productData) {
    return this.post('/products/create.php', productData)
  }

  async updateProduct(id, productData) {
    return this.put(`/products/update.php?id=${id}`, productData)
  }

  async deleteProduct(id) {
    return this.delete(`/products/delete.php?id=${id}`)
  }

  // Category endpoints
  async getCategories() {
    return this.get('/categories/list.php')
  }

  // User/Seller endpoints
  async getSellers() {
    return this.get('/users/sellers.php')
  }

  async getSellerProfile(sellerId) {
    return this.get(`/users/seller.php?id=${sellerId}`)
  }

  async updateSellerProfile(sellerId, profileData) {
    return this.put(`/users/seller.php?id=${sellerId}`, profileData)
  }

  // Contact endpoints
  async submitContactMessage(messageData) {
    return this.post('/contact/submit.php', messageData)
  }

  async getContactMessages() {
    return this.get('/contact/list.php')
  }

  async updateContactMessage(id, updateData) {
    return this.put(`/contact/update.php?id=${id}`, updateData)
  }

  // Analytics endpoints
  async getDashboardStats(userType) {
    return this.get(`/analytics/dashboard.php?type=${userType}`)
  }

  async getSellerStats(sellerId) {
    return this.get(`/analytics/seller.php?id=${sellerId}`)
  }
}

// Create a singleton instance
const apiService = new ApiService()

export default apiService
