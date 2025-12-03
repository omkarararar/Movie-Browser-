/*
 * Movie Card Component - The individual movie tiles you see in the grid
 * 
 * Each card shows a movie poster, title, year, rating, and genres.
 * You can click the card to see details, or click the heart to favorite it.
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { getImageUrl } from '../utils/tmdbApi';

const MovieCard = ({ movie, genres }) => {
    const navigate = useNavigate();
    const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
    const { showToast } = useToast();
    const favorite = isFavorite(movie.id);

    // State for 3D tilt effect
    const [tilt, setTilt] = useState({ x: 0, y: 0 });
    const [isPulsing, setIsPulsing] = useState(false);

    // Handle clicking the favorite button (the heart icon)
    const handleFavoriteClick = (e) => {
        e.stopPropagation(); // Don't trigger the card click (which would navigate to details)

        // Trigger pulse animation
        setIsPulsing(true);
        setTimeout(() => setIsPulsing(false), 300);

        if (favorite) {
            removeFromFavorites(movie.id);
            showToast(`Removed "${movie.title}" from favorites`, 'error');
        } else {
            addToFavorites(movie);
            showToast(`Added "${movie.title}" to favorites`, 'success');
        }
    };

    // 3D tilt effect on mouse move
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Mouse X position within the card
        const y = e.clientY - rect.top;  // Mouse Y position within the card

        // Calculate rotation based on mouse position (max 10 degrees)
        const rotateY = ((x / rect.width) - 0.5) * 20;  // -10 to 10 degrees
        const rotateX = ((y / rect.height) - 0.5) * -20; // -10 to 10 degrees

        setTilt({ x: rotateX, y: rotateY });
    };

    // Reset tilt when mouse leaves
    const handleMouseLeave = () => {
        setTilt({ x: 0, y: 0 });
    };

    // Convert genre IDs to genre names (like 28 → "Action")
    // Only show the first 2 genres to keep it clean
    const movieGenres = movie.genre_ids
        ?.map(id => genres.find(g => g.id === id)?.name)
        .filter(Boolean) // Remove any undefined values
        .slice(0, 2) || [];

    const posterUrl = getImageUrl(movie.poster_path);
    const year = movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A';
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

    return (
        <div
            onClick={() => navigate(`/movie/${movie.id}`)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="group cursor-pointer animate-fade-in"
            style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${tilt.x !== 0 || tilt.y !== 0 ? 1.05 : 1})`,
                transition: 'transform 0.3s ease',
            }}
        >
            <div className="relative overflow-hidden rounded-lg shadow-lg group-hover:shadow-2xl transition-shadow duration-300">
                {/* Poster Image */}
                <div className="aspect-[2/3] bg-gray-200 dark:bg-slate-700">
                    {posterUrl ? (
                        <img
                            src={posterUrl}
                            alt={movie.title}
                            className="w-full h-full object-cover group-hover:opacity-75 transition-opacity duration-300"
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

                {/* Favorite Button with pulse animation */}
                <button
                    onClick={handleFavoriteClick}
                    className={`absolute top-2 right-2 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-all transform hover:scale-110 ${isPulsing ? 'animate-pulse-once' : ''}`}
                    aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    <svg
                        className={`w-5 h-5 transition-colors duration-200 ${favorite ? 'text-red-500 fill-current' : 'text-white'}`}
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

                {/* Rating Badge with glow effect */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm flex items-center space-x-1 animate-glow">
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
