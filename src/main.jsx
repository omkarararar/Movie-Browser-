// Hey! This is where our app starts. Think of this as the "power button" for the whole application.

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Find the 'root' div in our HTML and tell React to take over from there
// StrictMode helps us catch potential problems during development - it's like a helpful friend pointing out issues
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
