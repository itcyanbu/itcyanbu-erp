import React from 'react';

interface SkeletonProps {
    className?: string;
    count?: number;
}

export const Skeleton = ({ className = '', count = 1 }: SkeletonProps) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className={`animate-pulse bg-slate-200 rounded-lg ${className}`}
                />
            ))}
        </>
    );
};

export const TableSkeleton = () => (
    <div className="space-y-4">
        <div className="h-10 bg-slate-100 rounded-lg animate-pulse" />
        <Skeleton className="h-16" count={5} />
    </div>
);

export const CardSkeleton = () => (
    <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
        <Skeleton className="h-12 w-12" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-8 w-1/4" />
    </div>
);
