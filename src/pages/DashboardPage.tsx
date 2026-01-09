import { useState } from 'react';
import { MainLayout } from '@/layouts/MainLayout';
import { useMetrics } from '@/hooks/useMetrics';
import { useWaitlist } from '@/hooks/useWaitlist';
import { MetricCard } from '@/components/common/MetricCard';
import { WaitlistTable } from '@/components/waitlist/WaitlistTable';
import { WaitlistFiltersBar } from '@/components/waitlist/WaitlistFilters';
import { Pagination } from '@/components/common/Pagination';

export const DashboardPage = () => {
    const { metrics, isLoading: metricsLoading } = useMetrics();
    const [isExporting, setIsExporting] = useState(false);
    const {
        data: waitlistData,
        filters,
        isLoading: waitlistLoading,
        updateFilters,
        handlePageChange
    } = useWaitlist();

    const handleExportCSV = async () => {
        setIsExporting(true);
        try {
            const { getWaitlist } = await import('@/api/admin');
            const { downloadCSV } = await import('@/utils/csvExport');

            // Get all records (using a high limit) matching current filters
            const allData = await getWaitlist({
                ...filters,
                limit: 1000,
                page: 1
            });

            if (allData.items.length > 0) {
                downloadCSV(allData.items, `waitlist_export_${new Date().toISOString().split('T')[0]}`);
            } else {
                alert('No data to export');
            }
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export CSV. Please try again.');
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <MainLayout>
            <div className="space-y-8">
                {/* Header Section */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Waitlist Overview</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Monitor registrations and manage waitlist entries with real-time analytics.
                    </p>
                </div>

                {/* Metrics Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <MetricCard
                        title="Total Registrations"
                        value={metrics?.total_registrations || 0}
                        description="Unique users in waitlist"
                        isLoading={metricsLoading}
                    />
                    <MetricCard
                        title="Total Attempts"
                        value={metrics?.total_attempts || 0}
                        description="Sum of all registration tries"
                        isLoading={metricsLoading}
                    />
                    <MetricCard
                        title="Top Source"
                        value={metrics?.by_source?.[0]?.category || 'None'}
                        description={`${metrics?.by_source?.[0]?.count || 0} registrations`}
                        isLoading={metricsLoading}
                    />
                    <MetricCard
                        title="Top City"
                        value={metrics?.by_city?.[0]?.category || 'Unknown'}
                        description={`${metrics?.by_city?.[0]?.count || 0} registrations`}
                        isLoading={metricsLoading}
                    />
                </div>

                {/* Management Section */}
                <div className="bg-gray-50/50 -mx-4 px-4 py-8 rounded-3xl space-y-4">
                    <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-gray-900 px-1">Waitlist Management</h3>
                        <div className="flex items-center gap-3">
                            <button
                                onClick={handleExportCSV}
                                disabled={isExporting || !waitlistData?.total}
                                className="flex items-center gap-2 text-xs font-semibold text-indigo-600 bg-white border border-indigo-100 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors disabled:opacity-50"
                            >
                                {isExporting ? (
                                    <div className="w-3 h-3 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                )}
                                Export CSV
                            </button>
                            {waitlistData && (
                                <span className="text-xs font-semibold text-gray-400 border border-gray-200 px-2 py-1.5 rounded-lg bg-white">
                                    {waitlistData.items.length} of {waitlistData.total} records
                                </span>
                            )}
                        </div>
                    </div>

                    <WaitlistFiltersBar
                        filters={filters}
                        onFilterChange={updateFilters}
                    />

                    <WaitlistTable
                        items={waitlistData?.items || []}
                        isLoading={waitlistLoading}
                    />

                    <Pagination
                        currentPage={filters.page || 1}
                        totalPages={waitlistData?.pages || 1}
                        onPageChange={handlePageChange}
                        isLoading={waitlistLoading}
                    />
                </div>
            </div>
        </MainLayout>
    );
};
