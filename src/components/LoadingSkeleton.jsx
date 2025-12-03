const LoadingSkeleton = ({ count = 20 }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} className="animate-pulse">
                    <div className="bg-gray-300 dark:bg-slate-700 rounded-lg aspect-[2/3] shimmer"></div>
                    <div className="mt-3 space-y-2">
                        <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded shimmer"></div>
                        <div className="h-3 bg-gray-300 dark:bg-slate-700 rounded w-2/3 shimmer"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default LoadingSkeleton;
