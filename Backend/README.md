# Ubuntu Hub Namibia - Backend Setup Instructions

## XAMPP Setup Instructions

### 1. Database Setup
1. Start XAMPP Control Panel
2. Start Apache and MySQL services
3. Open phpMyAdmin (http://localhost/phpmyadmin)
4. Create a new database called `ubuntu_hub_namibia`
5. Run the SQL script from `../database.md` to create tables and insert demo data

### 2. Backend Deployment
1. Copy the entire `Backend` folder to your XAMPP htdocs directory:
   ```
   Copy: Backend/* 
   To: C:\xampp\htdocs\ubuntuhub\backend\
   ```

2. The final directory structure should be:
   ```
   C:\xampp\htdocs\ubuntuhub\backend\
   ├── index.php
   ├── config\
   │   └── database.php
   ├── auth\
   │   └── login.php
   ├── products\
   │   ├── featured.php
   │   ├── list.php
   │   ├── detail.php
   │   └── create.php
   ├── categories\
   │   └── list.php
   ├── contact\
   │   └── submit.php
   └── analytics\
       └── dashboard.php
   ```

### 3. Testing the API
1. Open your browser and navigate to: `http://localhost/ubuntuhub/backend/`
2. You should see a JSON response indicating the API is running
3. Test individual endpoints:
   - `http://localhost/ubuntuhub/backend/products/featured.php`
   - `http://localhost/ubuntuhub/backend/categories/list.php`

### 4. Frontend Integration
Your React frontend is already configured to call these XAMPP endpoints via the proxy configuration in `vite.config.js`. 

API calls in your React app like:
```javascript
apiService.getFeaturedProducts()
```

Will automatically be routed to:
```
http://localhost/ubuntuhub/backend/products/featured.php
```

### 5. Demo Credentials
**Admin Login:**
- Email: admin@ubuntuhub.na
- Password: admin123

**Seller Login:**
- Email: naledi@ubuntuhub.na (or johannes@ubuntuhub.na, maria@ubuntuhub.na)
- Password: seller123

### 6. Troubleshooting
- Ensure Apache and MySQL are running in XAMPP
- Check that the database `ubuntu_hub_namibia` exists and has data
- Verify the file paths are correct in htdocs
- Check browser console for CORS or network errors
- Look at XAMPP error logs if API endpoints return 500 errors

### 7. Production Notes
For production deployment:
- Update database credentials in `config/database.php`
- Implement proper password hashing (currently using demo passwords)
- Add proper JWT-based authentication
- Enable HTTPS and secure headers
- Add input validation and sanitization
- Implement proper error logging

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login.php` | User authentication |
| GET | `/products/featured.php` | Get featured products |
| GET | `/products/list.php` | Get all products with filtering |
| GET | `/products/detail.php?id={id}` | Get single product details |
| POST | `/products/create.php` | Create new product |
| GET | `/categories/list.php` | Get all categories |
| POST | `/contact/submit.php` | Submit contact message |
| GET | `/analytics/dashboard.php?type={admin\|seller}` | Get dashboard statistics |

All endpoints return JSON responses with the following structure:
```json
{
  "success": true/false,
  "message": "descriptive message",
  "data": {...} // actual response data
}
```
