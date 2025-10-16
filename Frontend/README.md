# Ubuntu Hub Namibia

# Frontend

A beautiful, responsive React application showcasing authentic Namibian products and connecting local artisans with global customers.

## Features

- **Modern React Application** - Built with React 18 and Vite for optimal performance
- **Responsive Design** - Beautiful UI that works perfectly on all devices
- **Tailwind CSS Styling** - Custom design system with Namibian desert-inspired colors
- **Smooth Animations** - Enhanced user experience with Framer Motion
- **Product Catalog** - Browse and filter authentic Namibian products
- **Category Filtering** - Easy navigation through different product categories
- **Contact Form** - Direct communication with the Ubuntu Hub team

## Design Theme

The application follows a cohesive design theme inspired by the Namib Desert:

- **Colors**: Desert Brown (#5C4033), Sunset Orange (#E07B39), Sand Gold (#F2C14E), Off-White (#F9F7F3)
- **Typography**: Montserrat for headings, Inter for body text
- **Layout**: Spacious, grid-based design with consistent margins
- **Components**: Rounded corners, subtle shadows, smooth hover transitions

## Tech Stack

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library for smooth transitions
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

## Installation

1. Navigate to the Frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.jsx      # Navigation component
│   ├── Footer.jsx      # Footer component
│   └── ProductCard.jsx # Product display component
├── pages/              # Page components
│   ├── Home.jsx        # Homepage with hero and featured products
│   ├── Products.jsx    # Product catalog with filtering
│   ├── About.jsx       # About page with mission and team
│   └── Contact.jsx     # Contact form and information
├── App.jsx             # Main app component with routing
├── main.jsx           # Entry point
└── index.css          # Global styles and Tailwind imports
```

## Key Components

### Navbar
- Responsive navigation with mobile menu
- Active link highlighting
- Ubuntu Hub Namibia branding

### ProductCard
- Hover animations and effects
- Category tags
- Price display
- Quick view functionality

### Hero Section
- Full-screen background image
- Call-to-action buttons
- Smooth scroll animations

### Contact Form
- Form validation
- Responsive layout
- Interactive elements

## Features in Detail

### Home Page
- Hero section with Namib Desert imagery
- Statistics showcasing impact
- Featured products grid
- About preview section

### Products Page
- Search functionality
- Category filtering
- Responsive product grid
- Product count display

### About Page
- Mission statement
- Core values section
- Team member profiles
- Impact statistics

### Contact Page
- Contact information cards
- Interactive contact form
- FAQ section
- Business hours

## Customization

### Colors
The color palette can be customized in `tailwind.config.js`:

```javascript
colors: {
  'desert-brown': '#5C4033',
  'sunset-orange': '#E07B39',
  'sand-gold': '#F2C14E',
  'off-white': '#F9F7F3',
  'charcoal': '#2E2E2E',
}
```

### Fonts
Google Fonts are imported in `index.css`:
- Montserrat (headings)
- Inter (body text)

## Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Deploy the `dist` folder to your hosting service

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is part of the Ubuntu Hub Namibia platform.

---
