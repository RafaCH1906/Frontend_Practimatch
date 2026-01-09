import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/config/constants';
import type { LoginRequest, LoginResponse, User } from './types';

/**
 * Login user
 */
export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosInstance.post<LoginResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
    );
    return response.data;
};

/**
 * Get current user info
 */
export const getMe = async (): Promise<User> => {
    const response = await axiosInstance.get<User>(API_ENDPOINTS.AUTH.ME);
    return response.data;
};

/**
 * Logout - clear local storage
 */
export const logout = (): void => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
};
