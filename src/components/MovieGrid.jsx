import MovieCard from './MovieCard';

const MovieGrid = ({ movies, genres, loading, error }) => {
    if (loading) {
        return null; // Loading handled by LoadingSkeleton in parent
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Oops! Something went wrong</h3>
                <p className="text-gray-600 dark:text-gray-400">{error}</p>
            </div>
        );
    }

    if (!movies || movies.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
                    />
                </svg>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">No movies found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} genres={genres} />
            ))}
        </div>
    );
};

export default MovieGrid;
