@echo off
echo Ubuntu Hub Namibia - Backend Deployment Script
echo ================================================

:: Check if XAMPP directory exists
if not exist "C:\xampp\htdocs\" (
    echo ERROR: XAMPP not found at C:\xampp\htdocs\
    echo Please install XAMPP first or update the path in this script.
    pause
    exit /b 1
)

:: Create directory structure
echo Creating directory structure...
mkdir "C:\xampp\htdocs\ubuntuhub" 2>nul
mkdir "C:\xampp\htdocs\ubuntuhub\backend" 2>nul

:: Copy Backend files
echo Copying backend files...
xcopy /E /Y "Backend\*" "C:\xampp\htdocs\ubuntuhub\backend\"

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Backend files copied successfully!
    echo.
    echo Next steps:
    echo 1. Start XAMPP Control Panel
    echo 2. Start Apache and MySQL services
    echo 3. Open phpMyAdmin: http://localhost/phpmyadmin
    echo 4. Run the SQL script from Backend\setup_database.sql
    echo 5. Test the API: http://localhost/ubuntuhub/backend/
    echo 6. Start your React frontend: npm run dev
    echo.
    echo Demo credentials:
    echo Admin: admin@ubuntuhub.na / admin123
    echo Seller: naledi@ubuntuhub.na / seller123
    echo.
) else (
    echo ERROR: Failed to copy files!
)

pause
