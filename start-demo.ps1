$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host '[Glenwood Demo] Node.js was not found.' -ForegroundColor Red
    Write-Host 'Install Node.js 20.19 or newer from https://nodejs.org/ and try again.'
    exit 1
}

$npm = Get-Command npm.cmd -ErrorAction SilentlyContinue
if (-not $npm) {
    Write-Host '[Glenwood Demo] npm was not found. Reinstall Node.js with npm included.' -ForegroundColor Red
    exit 1
}

if (-not (Test-Path 'node_modules/serve/package.json')) {
    Write-Host '[Glenwood Demo] Installing the local static-server dependency...'
    & $npm.Source install --no-audit --no-fund
    if ($LASTEXITCODE -ne 0) { throw 'npm install failed.' }
}

if (-not (Test-Path 'dist/index.html')) {
    Write-Host '[Glenwood Demo] Production files are missing. Building dist...'
    & $npm.Source run build
    if ($LASTEXITCODE -ne 0) { throw 'npm run build failed.' }
}

Write-Host ''
Write-Host '[Glenwood Demo] Open http://localhost:8080' -ForegroundColor Green
Write-Host '[Glenwood Demo] Press Ctrl+C in this window to stop the server.'
Write-Host ''
& $npm.Source run 'serve:demo'
exit $LASTEXITCODE
