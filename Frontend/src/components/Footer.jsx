import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-desert-brown text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <ShoppingBag className="h-8 w-8 text-sunset-orange" />
              <span className="font-montserrat font-bold text-xl">
                Ubuntu Hub <span className="text-sunset-orange">Namibia</span>
              </span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Connecting Namibian artisans and farmers with the world. Discover authentic 
              treasures from the heart of the Namib Desert.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-sunset-orange transition-colors duration-300">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-sunset-orange transition-colors duration-300">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-sunset-orange transition-colors duration-300">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-sunset-orange transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-sunset-orange transition-colors duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-sunset-orange transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-sunset-orange transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-montserrat font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-sunset-orange" />
                <span className="text-gray-300">Windhoek, Namibia</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-sunset-orange" />
                <span className="text-gray-300">+264 61 123 456</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-sunset-orange" />
                <span className="text-gray-300">info@ubuntuhub.na</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Ubuntu Hub Namibia. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
