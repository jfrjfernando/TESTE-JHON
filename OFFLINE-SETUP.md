# 🎴 Yu-Gi-Oh! Fusion Simulator - Offline Setup Guide

This guide will help you run the Yu-Gi-Oh! Fusion Simulator completely offline on your local machine.

## 🚀 Quick Setup (Recommended)

### Option 1: Python Server (Easiest)
If you have Python installed on your computer:

```bash
# Navigate to the project directory
cd path/to/fusion-simulator

# Build the project (if not already built)
npm run build

# Start the local server
python -m http.server 8080 --directory dist
```

Then open: **http://localhost:8080** in your browser

### Option 2: Node.js Server
If you have Node.js installed:

```bash
# Install express (one-time setup)
npm install express

# Start the local server
npm run serve-local
```

Then open: **http://localhost:8080** in your browser

### Option 3: Built-in NPM Script
Use the convenient npm script:

```bash
npm run serve-python
```

## 🔌 Offline Features

Once you visit the site, it becomes a **Progressive Web App (PWA)** with:

- ✅ **Complete offline functionality** - Works without internet
- ✅ **Installable** - Can be installed as a standalone app
- ✅ **Auto-caching** - Service worker caches all resources
- ✅ **Fast loading** - Cached assets load instantly
- ✅ **All game features** - Full fusion simulator functionality offline

## 📱 Installing as a Desktop App

1. Visit the site in Chrome, Edge, or other PWA-compatible browser
2. Look for the "Install" button in the address bar
3. Click to install as a standalone desktop application
4. Use like any other desktop app!

## 🛠️ Technical Details

The project uses:
- **Vite PWA Plugin** for service worker generation
- **Workbox** for advanced caching strategies
- **Web App Manifest** for installation capabilities
- **Service Worker** for offline functionality

## 📂 File Structure

After building, the `dist/` folder contains:
- `index.html` - Main application file
- `assets/` - Compiled JavaScript and CSS
- `sw.js` - Service worker for offline functionality
- `manifest.webmanifest` - PWA configuration
- Various favicon and app icons

## 🔧 Troubleshooting

**Problem**: Site doesn't work offline
**Solution**: Make sure you've visited the site online first to cache resources

**Problem**: Python server command not found
**Solution**: Install Python from python.org or use Node.js option

**Problem**: Changes not reflected
**Solution**: Run `npm run build` to rebuild with latest changes

## 🎯 Development

For development with hot reloading:
```bash
npm run dev
```

For production build:
```bash
npm run build
```

Enjoy your offline Yu-Gi-Oh! Fusion Simulator experience! 🃏✨