import React from 'react';
import SearchBar from './SearchBar';
import SearchedMovies from './searchedmovies';

const MovieAppLayout = () => {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-transparent text-3xl font-bold bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-gradient-slow">
            Movie Hub
          </h1>
          {/* Add navigation or other header elements here */}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <SearchBar />
        <SearchedMovies />
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 py-4">
        <div className="container mx-auto px-4 text-center text-gray-400">
          {/* Footer content goes here */}
        </div>
      </footer>
    </div>
  );
};

export default MovieAppLayout;
