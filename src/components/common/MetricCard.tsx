import { ReactNode } from 'react';

interface CardProps {
    title: string;
    value: string | number;
    icon?: ReactNode;
    description?: string;
    isLoading?: boolean;
}

export const MetricCard = ({ title, value, icon, description, isLoading }: CardProps) => {
    if (isLoading) {
        return (
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
        );
    }

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</h3>
                {icon && <div className="text-indigo-500">{icon}</div>}
            </div>
            <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold text-gray-900">{value}</span>
            </div>
            {description && (
                <p className="mt-1 text-xs text-gray-500">{description}</p>
            )}
        </div>
    );
};
