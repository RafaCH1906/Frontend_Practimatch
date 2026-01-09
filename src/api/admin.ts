import axiosInstance from '@/config/axios';
import { API_ENDPOINTS } from '@/config/constants';
import type { AdminMetrics } from './types';

/**
 * Get admin metrics
 */
export const getMetrics = async (): Promise<AdminMetrics> => {
    const response = await axiosInstance.get<AdminMetrics>(API_ENDPOINTS.ADMIN.METRICS);
    return response.data;
};
