import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MovieAppLayout from './movieAppLayout';
import MovieDetails from './MovieDetails'; // Import the MovieDetails component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main route showing the search page */}
          <Route path="/" element={<MovieAppLayout />} />
          
          {/* Route for showing the movie details */}
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

