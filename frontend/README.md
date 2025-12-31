# Frontend Application Documentation

## Overview

React-based frontend for the To-Do List application with TailwindCSS styling.

## Architecture

### Components

- **App.js**: Main application component, manages global state
- **TodoList**: Container for rendering todo items
- **TodoItem**: Individual todo card with actions
- **TodoForm**: Modal form for creating/editing todos
- **TodoFilter**: Filter and sort controls
- **LoadingSpinner**: Loading state indicator
- **ErrorMessage**: Error display component

### Services

- **api.js**: Axios-based API service layer
  - Centralized API configuration
  - Request/response interceptors
  - Error handling
  - Timeout configuration

## State Management

- **Local State**: React hooks (useState, useEffect)
- **Data Flow**: Unidirectional data flow
- **Optimistic Updates**: Immediate UI updates

## Styling

- **TailwindCSS**: Utility-first CSS framework
- **Custom Classes**: Reusable component classes
- **Responsive**: Mobile-first design approach
- **Theme**: Custom color palette and typography

## Features

- **Real-time Updates**: Instant UI feedback
- **Form Validation**: Client-side validation
- **Error Handling**: User-friendly error messages
- **Loading States**: Visual feedback during API calls
- **Empty States**: Helpful messages when no data
- **Accessibility**: ARIA labels and keyboard navigation

## Responsive Breakpoints

- Mobile: Default styles
- Tablet: `md:` prefix (768px+)
- Desktop: `lg:` prefix (1024px+)

