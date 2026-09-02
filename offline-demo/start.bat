@echo off
REM Offline launcher for Windows.
REM Serves offline-demo\app on http://localhost:8080 using Python's built-in
REM http.server. No internet connection required beyond a Python 3 install.

setlocal

set "SCRIPT_DIR=%~dp0"
set "APP_DIR=%SCRIPT_DIR%app"
set "PORT=8080"

if not exist "%APP_DIR%" (
    echo Error: app directory not found at %APP_DIR%
    exit /b 1
)

cd /d "%APP_DIR%"

echo Serving %APP_DIR% at http://localhost:%PORT%
echo Press Ctrl+C to stop.

py -m http.server %PORT%

endlocal
