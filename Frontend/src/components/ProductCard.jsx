import React from 'react'
import { motion } from 'framer-motion'
import { Eye, Heart } from 'lucide-react'

const ProductCard = ({ product }) => {
  const [showImages, setShowImages] = React.useState(false);

  return (
    <>
      <motion.div 
        className="card group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button className="bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors duration-200">
              <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
            </button>
          </div>
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <button
              className="bg-white text-charcoal px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center space-x-2"
              onClick={() => setShowImages(true)}
              type="button"
            >
              <Eye className="h-4 w-4" />
              <span>View Images</span>
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-2">
            <span className="text-xs text-sunset-orange bg-sand-gold bg-opacity-20 px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>
          <h3 className="font-semibold text-charcoal mb-2 group-hover:text-sunset-orange transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-xl font-bold text-desert-brown">
            {product.price}
          </p>
        </div>
      </motion.div>
      {showImages && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
              onClick={() => setShowImages(false)}
              type="button"
            >
              ✕
            </button>
            <div className="flex flex-wrap gap-4 justify-center">
              {product.images && product.images.length > 0 ? (
                product.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-32 h-32 object-cover rounded"
                  />
                ))
              ) : (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-320 h-320 object-cover rounded"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductCard
