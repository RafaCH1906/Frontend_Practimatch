import { WaitlistItem } from '@/api/types';
import { Badge } from '@/components/common/Badge';

interface WaitlistTableProps {
    items: WaitlistItem[];
    isLoading?: boolean;
}

const DeviceIcon = ({ type }: { type: WaitlistItem['device_type'] }) => {
    switch (type) {
        case 'mobile':
            return (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            );
        case 'tablet':
            return (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            );
        case 'desktop':
            return (
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            );
        default:
            return (
                <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            );
    }
};

export const WaitlistTable = ({ items, isLoading }: WaitlistTableProps) => {
    if (isLoading) {
        return (
            <div className="w-full animate-pulse">
                <div className="h-10 bg-gray-100 rounded mb-4"></div>
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-16 bg-white border-b border-gray-100 mb-2"></div>
                ))}
            </div>
        );
    }

    if (items.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                <div className="text-gray-400 mb-2 font-medium">No records found</div>
                <p className="text-sm text-gray-500">Try adjusting your filters to find what you're looking for.</p>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type / Product</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">City</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Device</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Traffic</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Activity</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.email}</div>
                                <div className="text-[10px] text-gray-400 font-mono tracking-tight uppercase">{item.source || 'Direct'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex flex-col gap-1">
                                    <Badge variant={
                                        item.user_type === 'student' ? 'blue' :
                                            item.user_type === 'company' ? 'indigo' : 'green'
                                    }>
                                        {item.user_type}
                                    </Badge>
                                    <span className="text-[11px] text-gray-500 font-medium">{item.product_of_interest}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-xs text-gray-900 font-semibold">{item.country || 'Unknown'}</div>
                                <div className="text-[11px] text-gray-500">{item.city || 'Unknown City'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <DeviceIcon type={item.device_type} />
                                    <span className="text-xs text-gray-600 capitalize">{item.device_type || 'unknown'}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold inline-block uppercase tracking-wider">
                                    {item.traffic_source || 'Direct'}
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <div className="text-xs font-bold text-gray-900">{item.registration_count} hits</div>
                                <div className="text-[10px] text-gray-400">{new Date(item.created_at).toLocaleDateString()}</div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
