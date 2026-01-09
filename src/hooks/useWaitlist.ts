import { useState, useEffect, useCallback } from 'react';
import { getWaitlist } from '@/api/admin';
import type { WaitlistItem, WaitlistFilters, PaginatedResponse } from '@/api/types';

export const useWaitlist = (initialFilters: WaitlistFilters = { page: 1, limit: 10 }) => {
    const [data, setData] = useState<PaginatedResponse<WaitlistItem> | null>(null);
    const [filters, setFilters] = useState<WaitlistFilters>(initialFilters);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchWaitlist = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await getWaitlist(filters);
            setData(response);
        } catch (err: any) {
            console.error('Failed to fetch waitlist:', err);
            setError(err.response?.data?.detail || 'Error retrieving waitlist data');
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchWaitlist();
    }, [fetchWaitlist]);

    const updateFilters = (newFilters: Partial<WaitlistFilters>) => {
        setFilters((prev: WaitlistFilters) => ({
            ...prev,
            ...newFilters,
            // Reset to page 1 when applying a new filter (except when changing page itself)
            page: newFilters.page !== undefined ? newFilters.page : 1
        }));
    };

    const handlePageChange = (newPage: number) => {
        setFilters((prev: WaitlistFilters) => ({ ...prev, page: newPage }));
    };

    return {
        data,
        filters,
        isLoading,
        error,
        updateFilters,
        handlePageChange,
        refresh: fetchWaitlist
    };
};
