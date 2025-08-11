# OrientClock PWA

## Overview

OrientClock is a modern Progressive Web App (PWA) that dynamically transforms into four different utility applications based on device orientation. The app provides a seamless, mobile-first experience with smooth animations and responsive design. Built for a hackathon with "wow factor" features, it combines practical functionality with stunning visual presentation.

**Core Features:**
- **Portrait Upright**: Digital alarm clock with alarm setting functionality
- **Landscape Right**: Stopwatch with play/pause/reset controls and lap timing
- **Portrait Upside Down**: Countdown timer with circular progress visualization
- **Landscape Left**: Real-time weather display with location-based data

The application emphasizes smooth orientation transitions, animated gradient backgrounds, and touch-friendly controls optimized for mobile devices.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Build Tool**: Vite for fast development and optimized production builds
- **Styling**: Tailwind CSS with custom CSS variables for theming and responsive design
- **UI Components**: Comprehensive component library using Radix UI primitives with shadcn/ui styling
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **State Management**: React hooks with TanStack Query for server state management

### Backend Architecture
- **Server**: Express.js with TypeScript running in ESM mode
- **API Design**: RESTful endpoints with weather data proxy functionality
- **Middleware**: Request logging, JSON parsing, and error handling
- **Development**: Hot module replacement with Vite integration

### Database & Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect configuration
- **Schema**: User management system with username/password authentication
- **Migration**: Drizzle Kit for database schema management
- **In-Memory Storage**: MemStorage implementation for development/demo purposes

### PWA Implementation
- **Service Worker**: Custom implementation for offline caching and background sync
- **Manifest**: Comprehensive PWA manifest with fullscreen display and icon configuration
- **Caching Strategy**: Static asset caching with network-first approach for API calls
- **Offline Support**: Cached resources and graceful degradation for network failures

### Orientation Detection System
- **Primary Method**: Screen Orientation API for modern browsers
- **Fallback**: Window orientation events for broader compatibility
- **State Management**: Custom React hook (`useOrientation`) for orientation tracking
- **Mode Mapping**: Direct correlation between orientation states and application modes

### Animation & Visual Design
- **Gradient Backgrounds**: Dynamic CSS animations with mode-specific color schemes
- **Theme System**: CSS custom properties for consistent theming across modes
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance**: Optimized animations using CSS transforms and opacity changes

### Time & Utility Management
- **Clock System**: Custom hooks for real-time updates and time formatting
- **Stopwatch Logic**: Precise timing with millisecond accuracy and lap functionality
- **Timer System**: Countdown functionality with visual progress indicators
- **State Persistence**: Local component state for maintaining user interactions

## External Dependencies

### Weather Services
- **OpenWeatherMap API**: Real-time weather data with current conditions and 5-hour forecast
- **Geolocation API**: Browser-based location detection for weather positioning
- **Fallback Location**: Default to San Francisco coordinates when location unavailable

### UI & Component Libraries
- **Radix UI**: Accessible primitive components for complex UI interactions
- **Lucide React**: Consistent icon system throughout the application
- **Class Variance Authority**: Type-safe component variant management

### Development & Build Tools
- **TypeScript**: Full type coverage with strict configuration
- **ESBuild**: Fast bundling for production server builds
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **Replit Integration**: Development environment optimization with custom tooling

### Animation & Visual Libraries
- **Framer Motion**: Advanced animation capabilities with gesture support
- **Embla Carousel**: Touch-friendly carousel components
- **React Day Picker**: Calendar functionality for future features

### Database Infrastructure
- **Neon Database**: Serverless PostgreSQL with connection pooling
- **Drizzle Zod**: Schema validation and type generation
- **Connect PG Simple**: PostgreSQL session store for authentication

### PWA & Performance
- **TanStack Query**: Efficient data fetching with caching and background updates
- **React Hook Form**: Form management with validation
- **Date-fns**: Lightweight date manipulation and formatting