import { useState, useEffect } from 'react';

const Filters = ({ genres, onFilterChange }) => {
    const [selectedGenre, setSelectedGenre] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedRating, setSelectedRating] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [selectedContentType, setSelectedContentType] = useState('movie');

    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 50 }, (_, i) => currentYear - i);

    const languages = [
        { code: '', name: 'All Languages' },
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Spanish' },
        { code: 'fr', name: 'French' },
        { code: 'de', name: 'German' },
        { code: 'it', name: 'Italian' },
        { code: 'ja', name: 'Japanese' },
        { code: 'ko', name: 'Korean' },
        { code: 'zh', name: 'Chinese' },
        { code: 'hi', name: 'Hindi' },
        { code: 'pt', name: 'Portuguese' },
        { code: 'ru', name: 'Russian' },
        { code: 'ar', name: 'Arabic' },
    ];

    useEffect(() => {
        onFilterChange({
            genre: selectedGenre,
            year: selectedYear,
            rating: selectedRating,
            language: selectedLanguage,
            contentType: selectedContentType,
        });
    }, [selectedGenre, selectedYear, selectedRating, selectedLanguage, selectedContentType, onFilterChange]);

    const handleClearFilters = () => {
        setSelectedGenre('');
        setSelectedYear('');
        setSelectedRating('');
        setSelectedLanguage('');
        setSelectedContentType('movie');
    };

    const hasActiveFilters = selectedGenre || selectedYear || selectedRating || selectedLanguage || selectedContentType !== 'movie';

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 mb-6">
            {/* First Row - Content Type and Language */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0 mb-3">
                {/* Content Type Filter */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Content Type
                    </label>
                    <select
                        value={selectedContentType}
                        onChange={(e) => setSelectedContentType(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="movie">🎬 Movies</option>
                        <option value="tv">📺 TV Shows</option>
                    </select>
                </div>

                {/* Language Filter */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Language
                    </label>
                    <select
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {languages.map((lang) => (
                            <option key={lang.code} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Second Row - Genre, Year, Rating */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-3 md:space-y-0">
                {/* Genre Filter */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Genre
                    </label>
                    <select
                        value={selectedGenre}
                        onChange={(e) => setSelectedGenre(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Genres</option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Year Filter */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Release Year
                    </label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Years</option>
                        {years.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Rating Filter */}
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Minimum Rating
                    </label>
                    <select
                        value={selectedRating}
                        onChange={(e) => setSelectedRating(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Any Rating</option>
                        <option value="7">7+ ⭐</option>
                        <option value="8">8+ ⭐⭐</option>
                        <option value="9">9+ ⭐⭐⭐</option>
                    </select>
                </div>

                {/* Clear Button */}
                {hasActiveFilters && (
                    <div className="flex items-end">
                        <button
                            onClick={handleClearFilters}
                            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors font-medium"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Filters;
