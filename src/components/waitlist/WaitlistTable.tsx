import { WaitlistItem } from '@/api/types';
import { Badge } from '@/components/common/Badge';

interface WaitlistTableProps {
    items: WaitlistItem[];
    isLoading?: boolean;
}

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
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">At</th>
                        <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Count</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                    {items.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900">{item.email}</div>
                                <div className="text-xs text-gray-500">{item.source || 'Direct'}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <Badge variant={
                                    item.user_type === 'student' ? 'blue' :
                                        item.user_type === 'company' ? 'indigo' : 'green'
                                }>
                                    {item.user_type}
                                </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {item.product_of_interest}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                {item.country || '--'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {new Date(item.created_at).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium text-gray-900">
                                {item.registration_count}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
