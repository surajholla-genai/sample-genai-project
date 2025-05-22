# Windows PowerShell script to run both frontend (Vite) and backend (Node) concurrently
# Installs dependencies if needed, then starts both servers

# Install dependencies for frontend
if (!(Test-Path -Path node_modules)) {
    Write-Host "Installing frontend dependencies..."
    npm install
}

# Install dependencies for backend (if any, e.g., if you have a server/package.json)
if (Test-Path -Path './server/package.json') {
    if (!(Test-Path -Path './server/node_modules')) {
        Write-Host "Installing backend dependencies..."
        cd server
        npm install
        cd ..
    }
}

# Start both servers concurrently
Write-Host "Starting frontend (Vite) and backend (Node) servers..."
Start-Process powershell -ArgumentList 'npm run dev' -NoNewWindow
Start-Process powershell -ArgumentList 'node server/index.cjs' -NoNewWindow

Write-Host "Both servers started. Frontend: http://localhost:8080  Backend: http://localhost:3001"
