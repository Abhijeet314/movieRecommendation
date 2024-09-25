import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movieDetails, setMovieDetails] = useState(location.state?.movie || {});

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          params: {
            api_key: 'd914204588c40cfc93aabf13fc5bc4b7',
          }
        });

        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    if (!location.state?.movie) {
      fetchMovieDetails();
    }
  }, [id, location.state?.movie]);

  return (
    <div className="container mx-auto p-6">
      {movieDetails.backdrop_path ? (
        <div 
          className="bg-cover bg-center h-96 flex items-center justify-center text-white shadow-xl rounded-lg overflow-hidden relative"
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${movieDetails.backdrop_path})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-5xl font-bold mb-4">{movieDetails.title}</h1>
            <p className="text-lg mb-4">{movieDetails.overview}</p>
            <p className="text-lg"><strong>Rating:</strong> {movieDetails.vote_average} / 10</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-white">Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;
