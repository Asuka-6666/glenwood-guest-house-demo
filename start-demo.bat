@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 (
  echo [Glenwood Demo] Node.js was not found.
  echo Install Node.js 20.19 or newer from https://nodejs.org/ and try again.
  pause
  exit /b 1
)

where npm.cmd >nul 2>nul
if errorlevel 1 (
  echo [Glenwood Demo] npm was not found. Reinstall Node.js with npm included.
  pause
  exit /b 1
)

if not exist "node_modules\serve\package.json" (
  echo [Glenwood Demo] Installing the local static-server dependency...
  call npm.cmd install --no-audit --no-fund
  if errorlevel 1 goto :error
)

if not exist "dist\index.html" (
  echo [Glenwood Demo] Production files are missing. Building dist...
  call npm.cmd run build
  if errorlevel 1 goto :error
)

echo.
echo [Glenwood Demo] Open http://localhost:8080
echo [Glenwood Demo] Press Ctrl+C in this window to stop the server.
echo.
call npm.cmd run serve:demo
exit /b %errorlevel%

:error
echo.
echo [Glenwood Demo] Startup failed. Review the messages above.
pause
exit /b 1
