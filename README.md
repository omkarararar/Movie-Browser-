# GrantifyMovie

A fully responsive movie browsing web application built with React.js, Tailwind CSS, and The Movie Database (TMDB) API.

![Movie Browser](https://img.shields.io/badge/React-18.3-blue) ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8) ![Vite](https://img.shields.io/badge/Vite-5.4-646cff)

## ✨ Features

- 🎬 Browse popular movies with beautiful card layouts
- 🔍 Search movies by title with debounced input
- 🎭 Filter by genre, release year, and minimum rating
- 📄 Detailed movie pages with cast information
- ❤️ Add/remove movies to favorites (persisted in LocalStorage)
- 🌓 Light/Dark theme toggle (persisted in LocalStorage)
- 📱 Fully responsive design (mobile-first)
- ⚡ Fast page navigation with React Router
- 🎨 Smooth animations and loading states
- 🚨 Comprehensive error handling

## 🛠️ Tech Stack

- **React 18.3** - UI library
- **Vite 5.4** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **React Router 6** - Client-side routing
- **TMDB API** - Movie data source
- **Context API** - State management

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key (free)

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd movie-browsing-website
```

### 2. Install dependencies

```bash
npm install
```

### 3. Get your TMDB API Key

1. Go to [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to Settings → API
4. Request an API key (choose "Developer" option)
5. Copy your API key

### 4. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your TMDB API key:

```env
VITE_TMDB_API_KEY=your_actual_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_TMDB_IMAGE_BASE_URL=https://image.tmdb.org/t/p
```

### 5. Run the development server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist` folder.

To preview the production build:

```bash
npm run preview
```

## 📁 Project Structure

```
movie-browsing-website/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Header.jsx
│   │   ├── MovieCard.jsx
│   │   ├── MovieGrid.jsx
│   │   ├── Filters.jsx
│   │   ├── Pagination.jsx
│   │   ├── MovieDetail.jsx
│   │   ├── FavoritesPage.jsx
│   │   └── LoadingSkeleton.jsx
│   ├── context/         # Context API providers
│   │   ├── ThemeContext.jsx
│   │   └── FavoritesContext.jsx
│   ├── pages/           # Page components
│   │   └── HomePage.jsx
│   ├── utils/           # Utility functions
│   │   └── tmdbApi.js
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── .env.example         # Environment variables template
├── package.json
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── README.md
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🔑 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_TMDB_API_KEY` | Your TMDB API key | Required |
| `VITE_TMDB_BASE_URL` | TMDB API base URL | `https://api.themoviedb.org/3` |
| `VITE_TMDB_IMAGE_BASE_URL` | TMDB image base URL | `https://image.tmdb.org/t/p` |

## 🐛 Troubleshooting

### API Key Issues

If you see "Invalid API key" errors:
1. Verify your API key is correct in `.env`
2. Ensure the `.env` file is in the root directory
3. Restart the development server after changing `.env`

### Build Errors

If you encounter build errors:
1. Delete `node_modules` and `package-lock.json`
2. Run `npm install` again
3. Clear Vite cache: `rm -rf .vite`

### Images Not Loading

If movie posters/images don't load:
1. Check your internet connection
2. Verify TMDB API is accessible
3. Check browser console for CORS errors

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons from [Heroicons](https://heroicons.com/)
- Built with [Vite](https://vitejs.dev/) and [React](https://react.dev/)

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Enjoy browsing movies! 🎬🍿**
