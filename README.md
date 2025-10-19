# Ubuntu Hub Namibia - Frontend

A modern, Namibian-themed online catalog and marketplace web application built with React and Tailwind CSS.

## Description

Ubuntu Hub Namibia is a web-based platform designed to showcase and manage products in a marketplace setting. The frontend provides a beautiful, responsive user interface with Namibian-inspired design elements, focusing on user experience for browsing products, accessing information, and managing accounts.

## Features

- **Home Page**: Featured products display with smooth animations
- **Products Page**: Browse all available products with search and filtering
- **About Page**: Information about Ubuntu Hub Namibia
- **Contact Page**: Contact form for inquiries
- **Login Page**: Authentication for admin and seller accounts
- **Dashboard**: Admin/seller dashboard with analytics and management tools
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Namibian Theme**: Desert-inspired color palette and typography
- **Animations**: Framer Motion for smooth transitions and interactions

## Tech Stack

- **React**: Frontend framework for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for React
- **React Router**: Client-side routing
- **Lucide React**: Icon library
- **Vite**: Build tool and development server

## Installation and Setup

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Steps

1. **Clone the repository** (if applicable) or navigate to the Frontend directory:
   ```
   cd UbuntuHub/Frontend
   ```

2. **Install dependencies**:
   ```
   npm install
   ```

3. **Start the development server**:
   ```
   npm run dev
   ```

   The application will be available at `http://localhost:3001` (configured to proxy API calls to XAMPP backend).

4. **Build for production**:
   ```
   npm run build
   ```

## Usage

- **Navigation**: Use the navbar to navigate between pages
- **Login**: Use demo credentials for testing:
  - Admin: `admin@ubuntuhub.na` / `admin123`
  - Seller: `naledi@ubuntuhub.na` / `seller123`
- **Dashboard**: Access analytics and management features after login
- **Contact**: Submit inquiries via the contact form

## Project Structure

```
Frontend/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   └── ProductCard.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Login.jsx
│   │   └── Dashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── data/
│   │   └── products.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

## API Integration

The frontend is designed to integrate with a PHP/MySQL backend running on XAMPP. API calls are proxied through Vite to `http://localhost/api/`. Ensure the backend is set up and running for full functionality.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please contact the development team or refer to the backend setup documentation.
