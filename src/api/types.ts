export interface User {
    id: string | number;
    email: string;
    username?: string;
    role?: string;
    [key: string]: unknown;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    token_type: string;
    user?: User;
}

export interface WaitlistItem {
    id: number;
    email: string;
    user_type: 'student' | 'company' | 'university';
    product_of_interest: string;
    registration_count: number;
    source?: string | null;
    country?: string | null;
    created_at: string;
    updated_at?: string | null;
}

export interface PaginatedResponse<T> {
    total: number;
    page: number;
    limit: number;
    pages: number;
    items: T[];
}

export interface MetricsByCategory {
    category: string;
    count: number;
}

export interface TopEmail {
    email: string;
    registration_count: number;
}

export interface LatestByType {
    user_type: string;
    email: string;
    created_at: string;
    registration_count: number;
}

export interface MetricsResponse {
    total_registrations: number;
    total_attempts: number;
    by_user_type: MetricsByCategory[];
    by_source: MetricsByCategory[];
    by_country: MetricsByCategory[];
    top_emails: TopEmail[];
    latest_by_type: LatestByType[];
}

export interface WaitlistFilters {
    page?: number;
    limit?: number;
    user_type?: string;
    product_of_interest?: string;
    source?: string;
    country?: string;
    email?: string;
    order_by?: 'created_at_desc' | 'registration_count_desc';
}
