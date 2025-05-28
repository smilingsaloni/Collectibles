'use client';

import { Loader2 } from 'lucide-react';

const LoadingSpinner = ({
    size = 'md',
    text = 'Loading...',
    fullScreen = false,
    className = ''
}) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16'
    };

    const textSizeClasses = {
        sm: 'text-sm',
        md: 'text-base',
        lg: 'text-lg',
        xl: 'text-xl'
    };

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
                <div className="text-center">
                    <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600 mx-auto mb-4`} />
                    <p className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
                        {text}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex items-center justify-center space-x-2 ${className}`}>
            <Loader2 className={`${sizeClasses[size]} animate-spin text-blue-600`} />
            {text && (
                <span className={`${textSizeClasses[size]} text-gray-600 font-medium`}>
                    {text}
                </span>
            )}
        </div>
    );
};

// Page-level loading component
export const PageLoader = ({ text = 'Loading page...' }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
            <p className="text-lg text-gray-600 font-medium">{text}</p>
        </div>
    </div>
);

// Button loading state
export const ButtonLoader = ({ size = 'sm' }) => (
    <Loader2 className={`${size === 'sm' ? 'h-4 w-4' : 'h-5 w-5'} animate-spin`} />
);

// Card skeleton loader
export const CardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden animate-pulse">
        <div className="h-48 bg-gray-200"></div>
        <div className="p-4">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-3 bg-gray-200 rounded mb-4"></div>
            <div className="flex items-center justify-between">
                <div className="h-6 bg-gray-200 rounded w-20"></div>
                <div className="h-8 bg-gray-200 rounded w-24"></div>
            </div>
        </div>
    </div>
);

// Table skeleton loader
export const TableSkeleton = ({ rows = 5, columns = 4 }) => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="animate-pulse">
            {/* Header */}
            <div className="border-b border-gray-200 p-4">
                <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                    {Array.from({ length: columns }).map((_, i) => (
                        <div key={i} className="h-4 bg-gray-200 rounded mx-2"></div>
                    ))}
                </div>
            </div>
            {/* Rows */}
            {Array.from({ length: rows }).map((_, rowIndex) => (
                <div key={rowIndex} className="border-b border-gray-200 p-4">
                    <div className="grid" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
                        {Array.from({ length: columns }).map((_, colIndex) => (
                            <div key={colIndex} className="h-4 bg-gray-200 rounded mx-2"></div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default LoadingSpinner;
