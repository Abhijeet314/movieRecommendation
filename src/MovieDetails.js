import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [movieDetails, setMovieDetails] = useState(location.state?.movie || {});
  const [whereToWatch, setWhereToWatch] = useState({});
  const [similarMovies, setSimilarMovies] = useState([]);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: 'd914204588c40cfc93aabf13fc5bc4b7',
            append_to_response: 'watch/providers,recommendations'
          }
        });

        setMovieDetails(response.data);
        setWhereToWatch(response.data['watch/providers']?.results || {});
        setSimilarMovies(response.data.recommendations.results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (!location.state?.movie) {
      fetchMovieDetails();
    }
  }, [id, location.state?.movie]);

  const handleMovieClick = (movieId, movie) => {
    navigate(`/movie/${movieId}`, { state: { movie } });
  };

  return (
    <div className="container mx-auto p-6">
      <div 
        className="bg-cover bg-center h-96 flex items-center justify-center text-white shadow-xl rounded-lg overflow-hidden relative"
        style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
        <div className="relative z-10 text-center max-w-2xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">{movieDetails.title}</h1>
          <p className="text-lg mb-4">{movieDetails.overview}</p>
          <p className="text-lg"><strong>Release Date:</strong> {movieDetails.release_date}</p>
          <p className="text-lg"><strong>Rating:</strong> {movieDetails.vote_average} / 10</p>
        </div>
      </div>

      {Object.keys(whereToWatch).length > 0 && (
        <div className="mt-8 p-6 bg-gray-800 text-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Where to Watch</h2>
          <ul className="space-y-4">
            {Object.entries(whereToWatch).map(([country, providers]) => (
              <li key={country}>
                <strong className="text-xl">{country}:</strong> 
                <div className="mt-2 space-x-2 flex flex-wrap">
                  {providers.flatrate?.map(provider => (
                    <span key={provider.provider_id} className="bg-purple-700 px-4 py-2 rounded-md shadow-md text-sm">
                      {provider.provider_name}
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {similarMovies.length > 0 && (
        <div className="mt-8">
          <h2 className="text-3xl font-semibold mb-4 text-white">Recommended Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarMovies.map(movie => (
              <div 
                key={movie.id} 
                className="transform transition-transform duration-300 hover:scale-105 cursor-pointer"
                onClick={() => handleMovieClick(movie.id, movie)}
              >
                <img 
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} 
                  alt={movie.title} 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
                <p className="text-center text-lg mt-2 text-white">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
