import { useState, useEffect } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { getMetrics } from '@/api/admin';
import type { AdminMetrics } from '@/api/types';

export const DashboardPage = () => {
    const [metrics, setMetrics] = useState<AdminMetrics | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const data = await getMetrics();
                setMetrics(data);
            } catch (err) {
                console.error('Failed to fetch metrics:', err);
                setError('Failed to load metrics. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    return (
        <MainLayout>
            <div className="space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
                    <p className="mt-1 text-sm text-gray-600">
                        Admin metrics and statistics
                    </p>
                </div>

                {isLoading && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <div className="text-center text-gray-600">Loading metrics...</div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                        <div className="text-red-800">{error}</div>
                    </div>
                )}

                {metrics && !isLoading && !error && (
                    <div className="bg-white shadow rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Metrics Data
                        </h3>
                        <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-sm text-gray-800">
                            {JSON.stringify(metrics, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};
