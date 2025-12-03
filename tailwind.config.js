/*
 * Tailwind CSS Configuration - Our styling system
 * 
 * Tailwind is a utility-first CSS framework. Instead of writing custom CSS,
 * we use pre-made classes like "bg-blue-500" or "text-center".
 * 
 * This file customizes Tailwind with our own colors, animations, and settings.
 */

/** @type {import('tailwindcss').Config} */
export default {
    // Tell Tailwind which files to scan for class names
    // It only includes the classes we actually use, keeping the final CSS file small
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}", // All JavaScript/TypeScript files in src folder
    ],

    // Enable dark mode using a 'dark' class on the HTML element
    // When the class is present, dark: variants will activate
    darkMode: 'class',

    theme: {
        extend: {
            // Custom color palette - shades of blue for our primary color
            colors: {
                primary: {
                    50: '#f0f9ff',   // Lightest blue
                    100: '#e0f2fe',
                    200: '#bae6fd',
                    300: '#7dd3fc',
                    400: '#38bdf8',
                    500: '#0ea5e9',  // Main blue
                    600: '#0284c7',
                    700: '#0369a1',
                    800: '#075985',
                    900: '#0c4a6e',  // Darkest blue
                },
            },

            // Custom animations we can use with animate-shimmer or animate-fade-in
            animation: {
                'shimmer': 'shimmer 2s infinite',      // Loading shimmer effect
                'fade-in': 'fadeIn 0.3s ease-in',      // Smooth fade-in
            },

            // Define what those animations actually do
            keyframes: {
                shimmer: {
                    '0%': { backgroundPosition: '-1000px 0' },
                    '100%': { backgroundPosition: '1000px 0' },
                },
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },  // Start invisible and slightly down
                    '100%': { opacity: '1', transform: 'translateY(0)' },   // End visible and in place
                },
            },
        },
    },

    // No additional plugins needed for now
    plugins: [],
}
