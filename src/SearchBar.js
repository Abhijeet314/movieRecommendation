import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchResults([]);
    setRecommendedMovies([]);
  }, [query]);

  const handleInputChange = event => {
    setQuery(event.target.value);
  }

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: 'd914204588c40cfc93aabf13fc5bc4b7',
          query: query
        }
      });
      setSearchResults(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false); 
    }
  }

  const handleRecommendation = async () => {
    if (searchResults.length === 0) {
      console.log("No movies found."); 
      return;
    }
    
    const selectedMovie = searchResults[0];
    const genreIds = selectedMovie.genre_ids;

    try {
      const recommendations = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: 'd914204588c40cfc93aabf13fc5bc4b7',
          with_genres: genreIds.join(','),
          sort_by: 'popularity.desc'
        }
      });
      setRecommendedMovies(recommendations.data.results);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  const handleMovieSelect = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } });
  };

  return (
    <div className='container mx-auto p-6'>
      <div className='flex items-center justify-center mt-10'>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={handleInputChange}
          className="w-full px-4 py-3 text-lg text-gray-900 bg-gray-200 rounded-l-md shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleSearch}
          className="px-6 py-3 text-lg text-white bg-purple-600 rounded-r-md shadow-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Search'}
        </button>
        <button 
          className="ml-4 px-6 py-3 text-lg text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500" 
          onClick={handleRecommendation}
          disabled={loading}
        >
          Recommend
        </button>
      </div>

      <div className="mt-10">
        <h1 className='text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-slow shadow-lg mb-6'>
          {loading ? 'Searching for Movies...' : 'Explore Movies'}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
          {searchResults.map((movie) => (
            <div 
              key={movie.id} 
              className="transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => handleMovieSelect(movie)}
            >
              <div className="flex flex-col items-center">
                <img 
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                  alt={movie.title} 
                  className='w-48 h-auto rounded-lg shadow-lg'
                />
                <p className='text-white mt-3 text-lg font-medium'>{movie.title}</p>
              </div>
            </div>
          ))}
        </div>

        {recommendedMovies.length > 0 && (
          <div className="mt-16">
            <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-green-500 to-yellow-500 animate-gradient-slow shadow-lg mb-6">Recommended Movies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-center">
              {recommendedMovies.map(movie => (
                <div 
                  key={movie.id} 
                  className="transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => handleMovieSelect(movie)}
                >
                  <div className="flex flex-col items-center">
                    <img 
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                      alt={movie.title} 
                      className='w-48 h-auto rounded-lg shadow-lg'
                    />
                    <p className='text-white mt-3 text-lg font-medium text-center'>{movie.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
