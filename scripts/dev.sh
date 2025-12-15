#!/bin/bash

# Tribal Wall - Development Script

set -e

echo "🏝️  Starting Tribal Wall development server..."

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  npm install
fi

# Initialize local D1 database if needed
if [ ! -f ".wrangler/state/v3/d1/miniflare-D1DatabaseObject" ]; then
  echo "🗄️  Initializing local database..."
  npm run db:init
  echo "🌱 Seeding database with initial data..."
  npm run db:seed
fi

# Start development server
echo "🚀 Starting dev server on http://localhost:5173"
npm run dev
