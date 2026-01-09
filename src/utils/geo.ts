/**
 * Utility to detect the user's country based on their IP address.
 * Uses the free tier of ipapi.co which doesn't require an API key.
 */

export const getCountryCode = async (): Promise<string | null> => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) {
            throw new Error('Failed to fetch country code');
        }
        const data = await response.json();
        return data.country_code || null;
    } catch (error) {
        // Silent error for best-effort detection
        console.warn('Country detection failed:', error);
        return null;
    }
};
