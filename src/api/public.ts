import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from '@/config/constants';

interface WaitlistCreate {
    email: string;
    user_type: string;
    product_of_interest: string;
    source?: string;
    channel?: string;
    campaign?: string;
    country?: string;
    city?: string;
    region?: string;
    device_type?: string;
    browser?: string;
}

/**
 * Register a user to the waitlist (Public)
 * This does NOT use the auth-intercepted axiosInstance
 */
export const registerToWaitlist = async (data: WaitlistCreate) => {
    const response = await axios.post(`${API_BASE_URL}${API_ENDPOINTS.PUBLIC.WAITLIST}`, data, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};
