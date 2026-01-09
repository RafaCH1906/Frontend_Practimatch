/**
 * Analytics Tracking Utilities
 * Consolidates device, browser, geolocation, and UTM metadata for professional product tracking.
 */

export interface TrackingMetadata {
    device_type: 'mobile' | 'tablet' | 'desktop';
    browser: string;
    city: string;
    region?: string;
    country: string;
    source: string;
    channel: string;
    campaign?: string;
}

/**
 * Detects the device type based on user agent
 */
export const getDeviceType = (): 'mobile' | 'tablet' | 'desktop' => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) return 'tablet';
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) return 'mobile';
    return 'desktop';
};

/**
 * Detects the browser name
 */
export const getBrowser = (): string => {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'safari';
    if (ua.includes('Firefox')) return 'firefox';
    if (ua.includes('Edg')) return 'edge';
    return 'other';
};

/**
 * Fetches detailed geolocation data
 */
export const getGeoData = async () => {
    try {
        const response = await fetch('https://ipapi.co/json/');
        if (!response.ok) throw new Error('Geo API failed');
        const data = await response.json();
        return {
            city: data.city || 'Unknown',
            region: data.region || 'Unknown',
            country: data.country_code || 'Unknown'
        };
    } catch (error) {
        console.warn('Geolocation tracking failed:', error);
        return { city: 'Unknown', region: 'Unknown', country: 'Unknown' };
    }
};

/**
 * Parses UTM parameters from current URL
 */
export const getUTMData = () => {
    const params = new URLSearchParams(window.location.search);
    return {
        source: params.get('utm_source') || 'direct',
        channel: params.get('utm_medium') || 'web',
        campaign: params.get('utm_campaign') || undefined
    };
};

/**
 * Consolidates all tracking metadata
 */
export const getTrackingMetadata = async (): Promise<TrackingMetadata> => {
    const geo = await getGeoData();
    const utm = getUTMData();

    return {
        device_type: getDeviceType(),
        browser: getBrowser(),
        ...geo,
        ...utm
    };
};
