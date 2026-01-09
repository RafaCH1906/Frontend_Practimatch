import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/config/constants';
import type { MetricsResponse, WaitlistFilters, PaginatedResponse, WaitlistItem } from './types';

/**
 * Get admin metrics
 */
export const getMetrics = async (): Promise<MetricsResponse> => {
    const response = await axiosInstance.get<MetricsResponse>(API_ENDPOINTS.ADMIN.METRICS);
    return response.data;
};

/**
 * Get paginated waitlist with filters
 */
export const getWaitlist = async (params: WaitlistFilters): Promise<PaginatedResponse<WaitlistItem>> => {
    const response = await axiosInstance.get<PaginatedResponse<WaitlistItem>>(API_ENDPOINTS.ADMIN.WAITLIST, {
        params
    });
    return response.data;
};
