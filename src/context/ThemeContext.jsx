/*
 * Theme Context - This handles switching between light and dark mode
 * 
 * Think of this as a light switch for the entire app. When you flip it,
 * every component that uses this context will know about it and update accordingly.
 */

import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

// This is a custom hook that makes it easy for any component to access the theme
// Just call useTheme() and you get the current theme and a function to toggle it
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        // If someone tries to use this outside of ThemeProvider, let them know they can't
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

export const ThemeProvider = ({ children }) => {
    // Check if the user has a saved preference, otherwise default to light mode
    const [theme, setTheme] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme || 'light';
    });

    // Whenever the theme changes, save it and update the page
    useEffect(() => {
        // Save the preference so it persists even after closing the browser
        localStorage.setItem('theme', theme);

        // Add or remove the 'dark' class on the HTML element
        // This is what actually makes Tailwind apply dark mode styles
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    // Simple function to flip between light and dark
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    // Provide the theme and toggle function to all children components
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
