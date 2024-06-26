// src/components/MoviesList.jsx

import React, { useState } from 'react';
import './MoviesList.css';  // Import CSS file for component styling

const MoviesList = () => {
    // State management using useState hook
    const [movies, setMovies] = useState([
        // Initial movie data with titles, descriptions, and genres
        { title: 'Avatar', description: 'A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.', genres: ['Sci-Fi', 'Action'] },
        { title: 'The Shawshank Redemption', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.', genres: ['Drama'] },
        { title: 'The Godfather', description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.', genres: ['Crime', 'Drama'] },
        { title: 'Pulp Fiction', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', genres: ['Crime', 'Drama'] },
    ]);

    // State variables for managing UI interactions
    const [showDetails, setShowDetails] = useState(false);  // Controls visibility of movie details
    const [selectedGenres, setSelectedGenres] = useState([]);  // Stores selected genres for filtering
    const [newMovieTitle, setNewMovieTitle] = useState('');  // Holds new movie title input
    const [newMovieDescription, setNewMovieDescription] = useState('');  // Holds new movie description input
    const [newMovieGenres, setNewMovieGenres] = useState('');  // Holds new movie genres input

    // Function to add a new movie to the list
    const addMovie = () => {
        const newMovie = {
            title: newMovieTitle,
            description: newMovieDescription,
            genres: newMovieGenres.split(',').map(genre => genre.trim())  // Convert input string to array of genres
        };
        setMovies([...movies, newMovie]);  // Update movies state with new movie added
        setNewMovieTitle('');  // Clear input fields after adding movie
        setNewMovieDescription('');
        setNewMovieGenres('');
    };

    // Function to toggle movie details visibility
    const toggleDetails = () => {
        setShowDetails(!showDetails);  // Toggle showDetails state
    };

    // Function to remove a movie from the list
    const removeMovie = (indexToRemove) => {
        setMovies(movies.filter((_, index) => index !== indexToRemove));  // Filter out movie by index to remove
    };

    // Function to toggle genre filter
    const toggleGenre = (genre) => {
        if (selectedGenres.includes(genre)) {
            setSelectedGenres(selectedGenres.filter(g => g !== genre));  // Remove genre from selectedGenres
        } else {
            setSelectedGenres([...selectedGenres, genre]);  // Add genre to selectedGenres
        }
    };

    // JSX structure for rendering MoviesList component
    return (
        <div className="movies-list-container">
            <div className="genre-toggle-container">
                {/* Render genre toggle buttons dynamically */}
                {['Sci-Fi', 'Action', 'Drama', 'Crime'].map(genre => (
                    <button
                        key={genre}
                        onClick={() => toggleGenre(genre)}
                        className={selectedGenres.includes(genre) ? 'genre-button active' : 'genre-button'}
                    >
                        {genre}
                    </button>
                ))}
            </div>
            
            <div className="add-movie-container">
                {/* Input fields for adding new movie */}
                <input
                    type="text"
                    placeholder="Enter movie title"
                    value={newMovieTitle}
                    onChange={(e) => setNewMovieTitle(e.target.value)}
                    className="movie-input"
                />
                <textarea
                    placeholder="Enter movie description"
                    value={newMovieDescription}
                    onChange={(e) => setNewMovieDescription(e.target.value)}
                    className="movie-input"
                />
                <input
                    type="text"
                    placeholder="Enter movie genres (comma-separated)"
                    value={newMovieGenres}
                    onChange={(e) => setNewMovieGenres(e.target.value)}
                    className="movie-input"
                />
                <button onClick={addMovie} className="add-movie-button">Add Movie</button>
            </div>

            <ul className="movies-list">
                {/* Render filtered list of movies */}
                {movies.filter(movie => selectedGenres.length === 0 || movie.genres.some(g => selectedGenres.includes(g))).map((movie, index) => (
                    <li key={index} className="movie-item">
                        <div className="movie-details">
                            {/* Display movie title */}
                            <span className="movie-title">{movie.title}</span>
                            {/* Button to toggle movie details visibility */}
                            <button onClick={toggleDetails} className="details-button">{showDetails ? 'Hide Details' : 'Show Details'}</button>
                            {/* Display movie description if showDetails is true */}
                            {showDetails && <p className="movie-description">{movie.description}</p>}
                            {/* Display movie genres */}
                            <p className="movie-genres"><strong>Genres:</strong> {movie.genres.join(', ')}</p>
                        </div>
                        {/* Button to remove movie from the list */}
                        <button onClick={() => removeMovie(index)} className="remove-button">Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MoviesList;
