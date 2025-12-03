/*
 * Favorites Context - This remembers which movies you love ❤️
 * 
 * This keeps track of all your favorite movies and saves them to your browser
 * so they're still there even if you close the tab and come back later.
 */

import { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

// Custom hook to easily access favorites from any component
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    // Load favorites from browser storage when the app starts
    // If there aren't any saved, start with an empty list
    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem('favorites');
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    // Whenever favorites change, save them to browser storage
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Add a movie to favorites (but only if it's not already there)
    const addToFavorites = (movie) => {
        setFavorites(prev => {
            // Check if this movie is already in favorites
            if (prev.find(fav => fav.id === movie.id)) {
                return prev; // Already there, don't add it again
            }
            return [...prev, movie]; // Add it to the list
        });
    };

    // Remove a movie from favorites by its ID
    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    };

    // Quick check to see if a movie is already favorited
    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    };

    // Share these functions and the favorites list with all components
    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
