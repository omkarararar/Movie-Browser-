import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchMovieDetails, fetchMovieCredits, getImageUrl, getBackdropUrl } from '../utils/tmdbApi';
import { useFavorites } from '../context/FavoritesContext';

const MovieDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

    const favorite = movie ? isFavorite(movie.id) : false;

    useEffect(() => {
        const loadMovieData = async () => {
            try {
                setLoading(true);
                setError(null);
                const [movieData, creditsData] = await Promise.all([
                    fetchMovieDetails(id),
                    fetchMovieCredits(id),
                ]);
                setMovie(movieData);
                setCast(creditsData.cast.slice(0, 10)); // Top 10 cast members
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadMovieData();
    }, [id]);

    const handleFavoriteClick = () => {
        if (favorite) {
            removeFromFavorites(movie.id);
        } else {
            addToFavorites({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
                genre_ids: movie.genres.map(g => g.id),
            });
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-96 bg-gray-300 dark:bg-slate-700 rounded-lg shimmer mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-8 bg-gray-300 dark:bg-slate-700 rounded shimmer w-3/4"></div>
                            <div className="h-4 bg-gray-300 dark:bg-slate-700 rounded shimmer w-1/2"></div>
                            <div className="h-32 bg-gray-300 dark:bg-slate-700 rounded shimmer"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-slate-900 pt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col items-center justify-center py-20">
                        <svg className="w-16 h-16 text-red-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Error Loading Movie</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                        >
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!movie) return null;

    const backdropUrl = getBackdropUrl(movie.backdrop_path);
    const posterUrl = getImageUrl(movie.poster_path, 'w500');
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            {/* Backdrop */}
            {backdropUrl && (
                <div className="relative h-96 md:h-[500px]">
                    <img
                        src={backdropUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-50 dark:from-slate-900 via-transparent to-transparent"></div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-4 flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="font-medium">Back</span>
                </button>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Poster */}
                    <div className="flex-shrink-0">
                        <div className="w-64 md:w-80 rounded-lg overflow-hidden shadow-2xl">
                            {posterUrl ? (
                                <img src={posterUrl} alt={movie.title} className="w-full" />
                            ) : (
                                <div className="w-full aspect-[2/3] bg-gray-300 dark:bg-slate-700 flex items-center justify-center">
                                    <svg className="w-20 h-20 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            fillRule="evenodd"
                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">{movie.title}</h1>
                        {movie.tagline && (
                            <p className="text-lg text-gray-600 dark:text-gray-400 italic mb-4">{movie.tagline}</p>
                        )}

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center space-x-1">
                                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                                <span className="text-gray-900 dark:text-gray-100 font-semibold">{rating}</span>
                            </div>
                            <span className="text-gray-600 dark:text-gray-400">{year}</span>
                            <span className="text-gray-600 dark:text-gray-400">{runtime}</span>
                        </div>

                        {/* Genres */}
                        {movie.genres && movie.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {movie.genres.map((genre) => (
                                    <span
                                        key={genre.id}
                                        className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Favorite Button */}
                        <button
                            onClick={handleFavoriteClick}
                            className={`mb-6 px-6 py-3 rounded-lg font-medium transition-all flex items-center space-x-2 ${favorite
                                    ? 'bg-red-500 hover:bg-red-600 text-white'
                                    : 'bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-900 dark:text-gray-100'
                                }`}
                        >
                            <svg className="w-5 h-5" fill={favorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            <span>{favorite ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                        </button>

                        {/* Overview */}
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">Overview</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{movie.overview || 'No overview available.'}</p>
                        </div>

                        {/* Cast */}
                        {cast.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">Cast</h2>
                                <div className="flex overflow-x-auto space-x-4 pb-4">
                                    {cast.map((actor) => (
                                        <div key={actor.id} className="flex-shrink-0 w-32">
                                            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 dark:bg-slate-700 mb-2">
                                                {actor.profile_path ? (
                                                    <img
                                                        src={getImageUrl(actor.profile_path, 'w185')}
                                                        alt={actor.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 text-center">{actor.name}</p>
                                            <p className="text-xs text-gray-600 dark:text-gray-400 text-center">{actor.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
