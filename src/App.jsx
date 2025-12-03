import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { FavoritesProvider } from './context/FavoritesContext';
import HomePage from './pages/HomePage';
import MovieDetail from './components/MovieDetail';
import FavoritesPage from './components/FavoritesPage';
import { useState, useEffect } from 'react';
import { fetchGenres } from './utils/tmdbApi';

function App() {
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const loadGenres = async () => {
            try {
                const data = await fetchGenres();
                setGenres(data.genres);
            } catch (err) {
                console.error('Failed to load genres:', err);
            }
        };
        loadGenres();
    }, []);

    return (
        <ThemeProvider>
            <FavoritesProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/movie/:id" element={<MovieDetail />} />
                        <Route path="/favorites" element={<FavoritesPage genres={genres} />} />
                    </Routes>
                </Router>
            </FavoritesProvider>
        </ThemeProvider>
    );
}

export default App;
