#!/bin/bash
# Setup script to install dependencies for Codex environment
set -e

# Install frontend dependencies
npm ci --no-audit --progress=false

# Install backend dependencies if server/package.json exists
if [ -f server/package.json ]; then
  (cd server && npm ci --no-audit --progress=false)
fi
