@echo off
echo ========================================
echo    COMPLETE NEXT.JS CACHE CLEANUP
echo ========================================

echo [1/6] Stopping all Node.js processes...
taskkill /f /im node.exe 2>nul
taskkill /f /im next.exe 2>nul
timeout /t 3 /nobreak >nul

echo [2/6] Navigating to frontend directory...
cd frontend

echo [3/6] Removing Next.js build cache...
if exist .next (
    echo Removing .next directory...
    rmdir /s /q .next
    echo .next directory removed!
) else (
    echo .next directory not found (already clean)
)

echo [4/6] Removing node_modules cache...
if exist node_modules\.cache (
    echo Removing node_modules\.cache...
    rmdir /s /q node_modules\.cache
    echo node_modules\.cache removed!
) else (
    echo node_modules\.cache not found
)

echo [5/6] Clearing npm cache...
npm cache clean --force

echo [6/6] Clearing yarn cache (if applicable)...
yarn cache clean 2>nul

echo.
echo ========================================
echo    CACHE CLEANUP COMPLETE!
echo ========================================
echo.
echo Next steps:
echo 1. Run: npm run dev
echo 2. Wait for compilation to complete
echo 3. Test the application
echo.
echo If you still see errors, try:
echo - Delete node_modules and run npm install
echo - Check for any remaining import errors
echo.

pause