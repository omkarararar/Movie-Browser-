/*
 * TMDB API - This is how we talk to The Movie Database
 * 
 * All these functions fetch movie data from TMDB's servers.
 * We get info like movie titles, posters, ratings, cast, and more!
 */

// Get our API credentials from environment variables (kept secret for security)
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

// Helper function to check if the API request worked or not
const handleResponse = async (response) => {
    if (!response.ok) {
        // Something went wrong - try to get the error message from the response
        const error = await response.json().catch(() => ({ status_message: 'Network error' }));
        throw new Error(error.status_message || 'Something went wrong');
    }
    return response.json();
};

/*
 * Fetch movies or TV shows with filters
 * 
 * This is the main function for getting a list of content.
 * You can filter by genre, year, rating, language, and choose between movies or TV shows.
 */
export const fetchMovies = async (page = 1, filters = {}) => {
    const { genre, year, rating, language, contentType = 'movie' } = filters;

    // Build the URL with all the filters the user selected
    let url = `${BASE_URL}/discover/${contentType}?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`;

    // Add genre filter if selected (like "Action" or "Comedy")
    if (genre) url += `&with_genres=${genre}`;

    // Add year filter - movies and TV shows use different parameter names
    if (year) {
        if (contentType === 'movie') {
            url += `&primary_release_year=${year}`;
        } else {
            url += `&first_air_date_year=${year}`;
        }
    }

    // Add minimum rating filter (like "only show movies rated 7 or higher")
    if (rating) url += `&vote_average.gte=${rating}`;

    // Add language filter (like "en" for English, "es" for Spanish)
    if (language) url += `&with_original_language=${language}`;

    const response = await fetch(url);
    return handleResponse(response);
};

/*
 * Search for movies or TV shows by title
 * 
 * This is what happens when you type in the search bar.
 * It looks for anything that matches what you typed.
 */
export const searchMovies = async (query, page = 1, contentType = 'movie') => {
    // If the search is empty, don't bother making a request
    if (!query.trim()) return { results: [], total_pages: 0 };

    const url = `${BASE_URL}/search/${contentType}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    return handleResponse(response);
};

// Get all the details for one specific movie (title, description, runtime, etc.)
export const fetchMovieDetails = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(url);
    return handleResponse(response);
};

// Get the cast and crew for a movie (who acted in it, who directed it, etc.)
export const fetchMovieCredits = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    const response = await fetch(url);
    return handleResponse(response);
};

// Get the list of all available genres (Action, Comedy, Drama, Horror, etc.)
export const fetchGenres = async (contentType = 'movie') => {
    const url = `${BASE_URL}/genre/${contentType}/list?api_key=${API_KEY}`;
    const response = await fetch(url);
    return handleResponse(response);
};

/*
 * Image URL helpers
 * 
 * TMDB stores images on their servers. These functions build the full URL
 * to access those images. We can request different sizes to save bandwidth.
 */

// Get the URL for a movie poster or profile picture
// Sizes: w92, w154, w185, w342, w500, w780, original
export const getImageUrl = (path, size = 'w500') => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Get the URL for a backdrop image (the big wide image behind movie details)
// Sizes: w300, w780, w1280, original
export const getBackdropUrl = (path, size = 'original') => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
};
