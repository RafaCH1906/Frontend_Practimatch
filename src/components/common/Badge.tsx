interface BadgeProps {
    children: React.ReactNode;
    variant?: 'indigo' | 'green' | 'blue' | 'gray' | 'red';
}

export const Badge = ({ children, variant = 'gray' }: BadgeProps) => {
    const baseClasses = "px-2.5 py-0.5 rounded-full text-xs font-medium capitalize";

    const variants = {
        indigo: "bg-indigo-100 text-indigo-800 border border-indigo-200",
        green: "bg-green-100 text-green-800 border border-green-200",
        blue: "bg-blue-100 text-blue-800 border border-blue-200",
        gray: "bg-gray-100 text-gray-800 border border-gray-200",
        red: "bg-red-100 text-red-800 border border-red-200",
    };

    return (
        <span className={`${baseClasses} ${variants[variant]}`}>
            {children}
        </span>
    );
};
