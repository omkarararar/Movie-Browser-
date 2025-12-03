import { useState, useEffect, useCallback } from 'react';
import { fetchMovies, searchMovies, fetchGenres } from '../utils/tmdbApi';
import Header from '../components/Header';
import Filters from '../components/Filters';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import LoadingSkeleton from '../components/LoadingSkeleton';

const HomePage = () => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [filters, setFilters] = useState({ contentType: 'movie' });

    // Load genres when content type changes
    useEffect(() => {
        const loadGenres = async () => {
            try {
                const data = await fetchGenres(filters.contentType || 'movie');
                setGenres(data.genres);
            } catch (err) {
                console.error('Failed to load genres:', err);
            }
        };
        loadGenres();
    }, [filters.contentType]);

    // Load movies when page, search, or filters change
    useEffect(() => {
        const loadMovies = async () => {
            try {
                setLoading(true);
                setError(null);

                let data;
                if (searchQuery.trim()) {
                    data = await searchMovies(searchQuery, currentPage, filters.contentType || 'movie');
                } else {
                    data = await fetchMovies(currentPage, filters);
                }

                setMovies(data.results || []);
                setTotalPages(data.total_pages || 0);
            } catch (err) {
                setError(err.message);
                setMovies([]);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, [currentPage, searchQuery, filters]);

    const handleSearch = useCallback((query) => {
        setSearchQuery(query);
        setCurrentPage(1);
    }, []);

    const handleFilterChange = useCallback((newFilters) => {
        setFilters(newFilters);
        setCurrentPage(1);
    }, []);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            <Header onSearch={handleSearch} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {!searchQuery && <Filters genres={genres} onFilterChange={handleFilterChange} />}

                {loading ? (
                    <LoadingSkeleton count={20} />
                ) : (
                    <>
                        <MovieGrid movies={movies} genres={genres} loading={loading} error={error} />
                        {!error && movies.length > 0 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default HomePage;
