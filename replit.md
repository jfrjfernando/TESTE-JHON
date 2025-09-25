# Overview

Yu-Gi-Oh! Fusion Simulator is a fan-made Progressive Web App (PWA) that simulates card fusions from the Yu-Gi-Oh! universe. The application allows users to create custom card pools, perform fusion simulations, view card statistics, and share card groups. Built with modern web technologies, it provides a responsive, cross-platform gaming experience that can run in browsers or be installed as a standalone app.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: Preact (React alternative) with TypeScript for type safety and better development experience
- **Routing**: Preact Router for client-side navigation with support for dynamic routes like `/cards/:id` and `/groups/:id`
- **State Management**: React Context API with multiple contexts:
  - `DataContext`: Global card and group data
  - `SimulatorContext`: Game simulation state and hand management
  - `FusionContext`: Fusion animation and queue management
  - `StorageContext`: Local storage and user preferences
- **Styling**: Tailwind CSS with custom CSS variables for theming, using a dark Yu-Gi-Oh themed color scheme
- **UI Components**: Radix UI primitives with shadcn/ui design system for consistent, accessible components

## Data Management
- **Data Loading**: Compressed JSON data files loaded asynchronously (using pako for gzip decompression in production)
- **Local Storage**: Browser localStorage for user preferences, custom groups, and simulator settings
- **Card Data Structure**: TypeScript models for different card types (Monster, Equip, Trap, etc.) with fusion relationships
- **Virtualization**: React Window for efficiently rendering large lists and grids of cards

## Game Logic
- **Fusion System**: Complex fusion resolution algorithm that handles card-to-card fusions and equipment interactions
- **Hand Management**: 5-card hand system with priority-based selection for fusion chains
- **Animation System**: Custom CSS animations for card movements during fusion sequences
- **Prediction Engine**: Real-time fusion prediction system showing possible outcomes

## Progressive Web App Features
- **Service Worker**: Automatic updates and offline capabilities through Vite PWA plugin
- **Responsive Design**: Mobile-first approach with touch-friendly interfaces
- **Performance Optimization**: Code splitting, lazy loading, and manual chunk optimization for faster load times

## Build System
- **Bundler**: Vite for fast development and optimized production builds
- **TypeScript**: Strict type checking with path mapping for clean imports
- **Asset Optimization**: Automatic image optimization and compression
- **SEO**: Dynamic meta tags, sitemap generation, and structured routing for search engines

# Recent Changes

**2025-09-25**: Successfully imported and configured project for Replit environment
- Configured Vite server to run on 0.0.0.0:5000 for Replit proxy compatibility
- Set up Frontend Server workflow with automatic port 5000 binding
- Configured autoscale deployment with npm build and preview commands
- All dependencies installed and development server running successfully
- Environment variables warnings noted (VITE_DOMAIN, VITE_GOOGLE_VERIFICATION) but non-blocking

# External Dependencies

## Core Framework Dependencies
- **Preact**: Lightweight React alternative (10.26.4) with compatibility layer for React ecosystem
- **TypeScript**: Static type checking and enhanced developer experience
- **Vite**: Modern build tool with fast HMR and optimized bundling

## UI and Styling
- **Tailwind CSS**: Utility-first CSS framework (4.0.8) with custom theming
- **Radix UI**: Headless UI components for accessibility and consistency
- **Lucide React**: Icon library for consistent iconography
- **shadcn/ui**: Pre-built component library built on Radix UI

## Data and Performance
- **Pako**: Gzip compression/decompression for efficient data loading
- **React Window**: Virtualization library for rendering large datasets efficiently
- **Class Variance Authority**: Dynamic class name generation for component variants

## Development Tools
- **Vite PWA Plugin**: Service worker generation and PWA manifest creation
- **Vite Sitemap Plugin**: Automatic sitemap generation for SEO
- **Yup**: Schema validation for data models and user input

## Asset Management
- Assets served from external CDN (configured via VITE_ASSETS_API)
- Compressed JSON data files for card information and fusion rules
- Optimized WebP images with multiple sizes for responsive loading
- Custom pixelated fonts and UI elements maintaining retro game aesthetic

# Replit Configuration

## Development Server
- **Host**: 0.0.0.0 (required for Replit proxy)
- **Port**: 5000 (required for Replit environment)
- **Workflow**: Frontend Server running `npm run dev`

## Deployment
- **Type**: Autoscale (stateless web application)
- **Build**: `npm run build`
- **Run**: `npm run preview`