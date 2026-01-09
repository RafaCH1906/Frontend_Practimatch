/**
 * Utility to detect the user's device type based on userAgent.
 * Classified into: mobile, tablet, desktop.
 */

export const getDeviceType = (): string => {
    const ua = navigator.userAgent;

    // Tablet patterns
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet';
    }

    // Mobile patterns
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
        return 'mobile';
    }

    // Default to desktop if not mobile or tablet
    return 'desktop';
};
