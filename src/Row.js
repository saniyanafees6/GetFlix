import React, { useState, useEffect } from 'react';
import axios from './axios.js';
import './Row.css';

const base_url = 'https://image.tmdb.org/t/p/w500';

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  console.log(movies);
  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.map((movie) => (
          <div className='poster__card' key={movie.id}>
            <img
              className='row__poster'
              src={`${base_url}${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div className='movie__text'>
              <h3>{movie.original_title}</h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
