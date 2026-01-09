import { WaitlistFilters } from '@/api/types';

interface WaitlistFiltersProps {
    filters: WaitlistFilters;
    onFilterChange: (newFilters: Partial<WaitlistFilters>) => void;
}

export const WaitlistFiltersBar = ({ filters, onFilterChange }: WaitlistFiltersProps) => {
    return (
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-6 flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-[200px]">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 px-1">Search Email</label>
                <input
                    type="text"
                    placeholder="example@mail.com"
                    value={filters.email || ''}
                    onChange={(e) => onFilterChange({ email: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                />
            </div>

            <div className="w-48">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 px-1">User Type</label>
                <select
                    value={filters.user_type || ''}
                    onChange={(e) => onFilterChange({ user_type: e.target.value || undefined })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">All Types</option>
                    <option value="student">Student</option>
                    <option value="company">Company</option>
                    <option value="university">University</option>
                </select>
            </div>

            <div className="w-32">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 px-1">Country</label>
                <input
                    type="text"
                    placeholder="PE, MX..."
                    value={filters.country || ''}
                    onChange={(e) => onFilterChange({ country: e.target.value || undefined })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="w-36">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 px-1">Device</label>
                <select
                    value={filters.device_type || ''}
                    onChange={(e) => onFilterChange({ device_type: e.target.value || undefined })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="">All Devices</option>
                    <option value="mobile">Mobile</option>
                    <option value="tablet">Tablet</option>
                    <option value="desktop">Desktop</option>
                </select>
            </div>

            <div className="w-40">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 px-1">Traffic Source</label>
                <input
                    type="text"
                    placeholder="Source..."
                    value={filters.traffic_source || ''}
                    onChange={(e) => onFilterChange({ traffic_source: e.target.value || undefined })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            <div className="w-40">
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5 px-1">Sort By</label>
                <select
                    value={filters.order_by || 'created_at_desc'}
                    onChange={(e) => onFilterChange({ order_by: e.target.value as any })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="created_at_desc">Newest First</option>
                    <option value="registration_count_desc">Most Attempts</option>
                </select>
            </div>

            <button
                onClick={() => onFilterChange({
                    email: '',
                    user_type: undefined,
                    country: undefined,
                    device_type: undefined,
                    traffic_source: undefined,
                    order_by: 'created_at_desc'
                })}
                className="px-4 py-2 text-sm text-gray-400 hover:text-indigo-600 font-medium transition-colors mb-0.5"
            >
                Clear
            </button>
        </div>
    );
};
