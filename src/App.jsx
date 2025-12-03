// This is the main brain of our app - it sets up everything we need!

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';
import HomePage from './pages/HomePage';
import MovieDetail from './components/MovieDetail';
import FavoritesPage from './components/FavoritesPage';
import { useState, useEffect } from 'react';
import { fetchGenres } from './utils/tmdbApi';

function App() {
    // Keep track of all movie genres (Action, Comedy, Drama, etc.)
    const [genres, setGenres] = useState([]);

    // When the app first loads, go fetch all the available genres from the movie database
    useEffect(() => {
        const loadGenres = async () => {
            try {
                const data = await fetchGenres();
                setGenres(data.genres);
            } catch (err) {
                // If something goes wrong, let us know in the console
                console.error('Failed to load genres:', err);
            }
        };
        loadGenres();
    }, []); // The empty array means "only do this once when the app starts"

    return (
        // Wrap everything in providers - these give superpowers to all components inside them
        // ThemeProvider = handles dark/light mode
        // FavoritesProvider = remembers which movies you love
        // ToastProvider = shows notification messages
        <ThemeProvider>
            <FavoritesProvider>
                <ToastProvider>
                    <Router>
                        {/* Define all the pages in our app */}
                        <Routes>
                            {/* Home page - shows all movies */}
                            <Route path="/" element={<HomePage />} />

                            {/* Individual movie page - shows details for one specific movie */}
                            <Route path="/movie/:id" element={<MovieDetail />} />

                            {/* Favorites page - shows movies you've marked as favorites */}
                            <Route path="/favorites" element={<FavoritesPage genres={genres} />} />
                        </Routes>
                    </Router>
                </ToastProvider>
            </FavoritesProvider>
        </ThemeProvider>
    );
}

export default App;
