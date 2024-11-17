# SevenApps Task - Rick and Morty Character Search

A React Native application built with Expo that implements a multi-select autocomplete component to search for characters from the Rick and Morty API.

## Features

-   🔍 Real-time character search with API integration
-   ✨ Multi-select functionality with smooth animations
-   🖼️ Character display with images and episode counts
-   🔤 Text highlighting for search queries
-   ⚡ Optimized performance with debounced search
-   🎨 Sleek dark theme UI with NativeWind

## Tech Stack

-   **Framework**: React Native with Expo
-   **Navigation**: Expo Router
-   **Styling**: NativeWind (Tailwind CSS for React Native)
-   **State Management**:
    -   Zustand for global state
    -   TanStack Query v5 for server state
-   **Animations**: React Native Reanimated
-   **API Integration**: Axios
-   **Type Safety**: TypeScript

## Project Structure

```
├── app/ # Expo Router pages
│ ├── (tabs)/ # Tab navigation
│ └── layout.tsx # Root layout
├── components/
│ └── character-search/ # Character search components
├── utils/ # Utility functions and stores
├── types/ # TypeScript definitions
└── assets/ # Images and fonts
```

## Key Components

-   `CharacterSearch`: Main component handling search functionality
-   `SearchInput`: Input field with toggle animation
-   `SearchResults`: Results list with loading states
-   `SelectedCharacter`: Selected character display
-   `Skeleton`: Loading animation component

## Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm expo start
```

## Features in Detail

### Search Functionality

-   Debounced API calls for optimal performance
-   Real-time character filtering
-   Error handling with user-friendly messages

### UI/UX

-   Smooth animations for selections and transitions
-   Loading skeletons during API calls
-   Sleek dark theme optimized interface

### State Management

-   Global state for selected characters using Zustand
-   Server state and caching with TanStack Query
-   Optimistic updates for better user experience

## Performance Optimizations

-   Debounced search queries
-   Cached API responses
-   Optimized re-renders
-   Lazy loading of images
-   Animated transitions using native drivers

## API Integration

The app uses the Rick and Morty API to fetch character data:

-   Base URL: `https://rickandmortyapi.com/api`
-   Endpoint: `/character`
