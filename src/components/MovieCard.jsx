import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { getImageUrl } from '../utils/tmdbApi';

const MovieCard = ({ movie, genres }) => {
    const navigate = useNavigate();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites(movie);
        }
    };

    const movieGenres = movie.genre_ids
        ?.map(id => genres.find(g => g.id === id)?.name)
        .filter(Boolean)
        .slice(0, 2) || [];

    const posterUrl = getImageUrl(movie.poster_path);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    return (
        <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            className="group cursor-pointer transform transition-all duration-300 hover:scale-105 animate-fade-in"
        >
            <div className="relative overflow-hidden rounded-lg shadow-lg">
                {/* Poster Image */}
                <div className="aspect-[2/3] bg-gray-200 dark:bg-slate-700">
                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity"
                            loading="lazy"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-slate-500">
                            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    fillRule="evenodd"
                                    d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                    )}
                </div>

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className="absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all transform hover:scale-110"
                    aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <svg
                        className={`w-5 h-5 ${favorite ? 'text-red-500 fill-current' : 'text-white'}`}
                        fill={favorite ? 'currentColor' : 'none'}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>

                {/* Rating Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm flex items-center space-x-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-white text-sm font-semibold">{rating}</span>
                </div>
            </div>

            {/* Movie Info */}
            <div className="mt-3 space-y-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {movie.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{year}</p>
                {movieGenres.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {movieGenres.map((genre, index) => (
                            <span
                                key={index}
                                className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieCard;
