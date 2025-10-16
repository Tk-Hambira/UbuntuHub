// Local product data using images from the Images folder
const localProducts = [
  {
    id: 1,
    name: 'Traditional Mahangu',
    description: 'Premium quality traditional mahangu grain, organically grown in northern Namibia.',
    price: 'N$ 45.00',
    image: '/Images/Mahungu.jpeg',
    category: 'Food & Grains',
    featured: true
  },
  {
    id: 2,
    name: 'Himba Jewelry Set',
    description: 'Authentic Himba jewelry set including necklace, bracelets, and earrings.',
    price: 'N$ 280.00',
    image: '/Images/Himba Necklace.jpeg',
    category: 'Jewelry',
    featured: true
  },
  {
    id: 3,
    name: 'Premium Biltong',
    description: 'Traditional Namibian biltong made from premium game meat.',
    price: 'N$ 120.00',
    image: '/Images/Biltong Products.jpg',
    category: 'Meat Products',
    featured: true
  },
  {
    id: 5,
    name: 'Craft Bowls',
    description: 'Handcrafted wooden bowls made by local artisans.',
    price: 'N$ 150.00',
    image: '/Images/Craft Bowls.jpeg',
    category: 'Crafts',
    featured: false
  },
  {
    id: 6,
    name: 'Traditional Dress',
    description: 'Beautiful traditional Namibian dress with authentic patterns.',
    price: 'N$ 320.00',
    image: '/Images/Traditional Dress.jpg',
    category: 'Traditional Clothing',
    featured: false
  },
  {
    id: 7,
    name: 'Wood Sculptures',
    description: 'Intricate wood carvings depicting Namibian wildlife and culture.',
    price: 'N$ 250.00',
    image: '/Images/Wood sculptures.jpg',
    category: 'Crafts',
    featured: false
  },
  {
    id: 8,
    name: 'Herero Designed Ladies',
    description: 'Elegant traditional Art.',
    price: 'N$ 300.00',
    image: '/Images/Herero designed ladies.jpeg',
    category: 'Crafts',
    featured: false
  },
  {
    id: 9,
    name: 'Bottle Opener',
    description: 'Unique bottle opener crafted from local materials.',
    price: 'N$ 25.00',
    image: '/Images/Bottle Opener.jpeg',
    category: 'Crafts',
    featured: false
  },
  {
    id: 10,
    name: 'Traditional Bag',
    description: 'Handwoven traditional bag perfect for carrying essentials.',
    price: 'N$ 4000.00',
    image: '/Images/Bag\'.jpeg',
    category: 'Crafts',
    featured: false
  },

]

// Helper functions
export const getFeaturedProducts = () => {
  return localProducts.filter(product => product.featured)
}

export const getAllProducts = () => {
  return localProducts
}

export const getProductById = (id) => {
  return localProducts.find(product => product.id === parseInt(id))
}

export const getProductsByCategory = (category) => {
  return localProducts.filter(product =>
    product.category.toLowerCase().includes(category.toLowerCase())
  )
}

export const searchProducts = (query) => {
  const searchTerm = query.toLowerCase()
  return localProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.category.toLowerCase().includes(searchTerm)
  )
}

export default localProducts
