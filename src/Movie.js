import React, { useEffect, useState } from 'react';
import axios from './axios';
import dotenv from 'dotenv';
import { AiFillCaretRight, AiOutlineInfoCircle } from 'react-icons/ai';
dotenv.config();

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function Movie(props) {
  const { movieId } = props.match.params;
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      console.log(request);
      setMovie(request.data);
      return request;
    }
    fetchData();
  }, [movieId]);
  function truncate(str, n) {
    return str?.length > n ? `${str.substr(0, n - 1)}...` : str;
  }
  return (
    <header
      className='banner'
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path}) `,
        backgroundPosition: 'center center',
      }}>
      <div className='banner__contents'>
        <h1 className='banner__title'>
          {movie?.original_title ||
            movie?.name ||
            movie?.title ||
            movie?.original_name}
        </h1>
        <div className='banner__buttons'>
          <button class='banner__button'>
            <AiFillCaretRight /> Watch Trailer
          </button>
          <button class='banner__button'>
            <AiOutlineInfoCircle /> More Info
          </button>
        </div>
        <h2 className='banner__description'>
          {truncate(movie?.overview, 150)}
        </h2>
      </div>
    </header>
  );
}

export default Movie;
