import { useState, useEffect, useCallback } from 'react';
import { getMetrics } from '@/api/admin';
import type { MetricsResponse } from '@/api/types';

export const useMetrics = () => {
    const [metrics, setMetrics] = useState<MetricsResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchMetrics = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await getMetrics();
            setMetrics(data);
        } catch (err: any) {
            console.error('Failed to fetch metrics:', err);
            setError(err.response?.data?.detail || 'Failed to load metrics. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchMetrics();
    }, [fetchMetrics]);

    return {
        metrics,
        isLoading,
        error,
        refresh: fetchMetrics
    };
};
