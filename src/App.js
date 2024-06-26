// src/App.js

import React from 'react';
import './App.css';
import MoviesList from './components/MoviesList';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Favorite Movies List</h1>
            </header>
            <MoviesList />
        </div>
    );
}

export default App;
