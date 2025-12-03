import { useFavorites } from '../context/FavoritesContext';
import MovieCard from './MovieCard';

const FavoritesPage = ({ genres }) => {
    const { favorites } = useFavorites();

    if (favorites.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-center py-20">
                        <svg className="w-24 h-24 text-gray-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                        </svg>
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">No Favorites Yet</h2>
                        <p className="text-gray-600 dark:text-gray-400 text-center max-w-md">
                            Start adding movies to your favorites by clicking the heart icon on any movie card
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                    My Favorites ({favorites.length})
                </h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {favorites.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} genres={genres} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FavoritesPage;
