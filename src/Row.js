import React, { useState, useEffect } from 'react';
import axios from './axios.js';
import './Row.css';
import Movie from './Movie';
import { AiFillCaretRight, AiOutlineInfoCircle } from 'react-icons/ai';
import { Route, Link } from 'react-router-dom';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original/';

function Row({ fetchUrl }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  return (
    <div className='row'>
      <div className='row__posters'>
        {movies.map((movie) => (
          <div className='poster__card' key={movie.id}>
            <img
              className='row__poster'
              src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.original_title}
            />
            <div className='movie__text'>
              <h3>{movie.original_title}</h3>
              <div className='poster__buttons'>
                <ul>
                  <li>
                    <button class='poster__button'>
                      <AiFillCaretRight /> Watch Trailer
                    </button>
                  </li>
                  <li>
                    <Link
                      class='poster__button'
                      to={`/movie/${movie.id}`}
                      key={movie.id}>
                      <AiOutlineInfoCircle /> More Info
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Route path={`/movie/:movieId`} component={Movie} />
    </div>
  );
}

export default Row;
