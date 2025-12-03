const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';

// Helper function to handle API errors
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json().catch(() => ({ status_message: 'Network error' }));
        throw new Error(error.status_message || 'Something went wrong');
    }
    return response.json();
};

// Fetch popular content with pagination and filters
export const fetchMovies = async (page = 1, filters = {}) => {
    const { genre, year, rating, language, contentType = 'movie' } = filters;

    let url = `${BASE_URL}/discover/${contentType}?api_key=${API_KEY}&page=${page}&sort_by=popularity.desc`;

    if (genre) url += `&with_genres=${genre}`;
    if (year) {
        if (contentType === 'movie') {
            url += `&primary_release_year=${year}`;
        } else {
            url += `&first_air_date_year=${year}`;
        }
    }
    if (rating) url += `&vote_average.gte=${rating}`;
    if (language) url += `&with_original_language=${language}`;

    const response = await fetch(url);
    return handleResponse(response);
};

// Search content by title
export const searchMovies = async (query, page = 1, contentType = 'movie') => {
    if (!query.trim()) return { results: [], total_pages: 0 };

    const url = `${BASE_URL}/search/${contentType}?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
    const response = await fetch(url);
    return handleResponse(response);
};

// Fetch movie details
export const fetchMovieDetails = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`;
    const response = await fetch(url);
    return handleResponse(response);
};

// Fetch movie credits (cast)
export const fetchMovieCredits = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`;
    const response = await fetch(url);
    return handleResponse(response);
};

// Fetch all genres
export const fetchGenres = async (contentType = 'movie') => {
    const url = `${BASE_URL}/genre/${contentType}/list?api_key=${API_KEY}`;
    const response = await fetch(url);
    return handleResponse(response);
};

// Get image URL
export const getImageUrl = (path, size = 'w500') => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Get backdrop URL
export const getBackdropUrl = (path, size = 'original') => {
    if (!path) return null;
    return `${IMAGE_BASE_URL}/${size}${path}`;
};
