import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import MovieAppLayout from './MovieAppLayout';
import MovieDetails from './MovieDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Search movies route */}
        <Route exact path="/" element={<MovieAppLayout />} />

        {/* Movie Details route, now correctly includes movie ID in the URL */}
        <Route exact path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
