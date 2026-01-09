// User type
export interface User {
    id: string | number;
    email: string;
    username?: string;
    role?: string;
    [key: string]: unknown;
}

// Auth API types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user?: User;
}

// Admin API types
export interface AdminMetrics {
    [key: string]: unknown; // Generic metrics object - adapt based on actual API response
}
