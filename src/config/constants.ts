// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Storage Keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    USER: 'user',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        ME: '/api/auth/me',
    },
    ADMIN: {
        METRICS: '/api/admin/metrics',
        WAITLIST: '/api/admin/waitlist',
    },
    PUBLIC: {
        WAITLIST: '/api/waitlist',
    },
} as const;

// Route Paths
export const ROUTES = {
    LOGIN: '/login',
    DASHBOARD: '/dashboard',
    HOME: '/',
    JOIN: '/join',
} as const;
