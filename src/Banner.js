import React, { useState, useEffect } from 'react';
import axios from './axios';
import requests from './requests';
import './Banner.css';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Banner() {
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.getNowPlaying);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1) || 2
        ]
      );
      return request;
    }
    fetchData();
  }, []);
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
        <h1>
          {movie?.original_title ||
            movie?.name ||
            movie?.title ||
            movie?.original_name}
        </h1>

        <div className='banner__buttons'>
          <Link
            basic
            color='grey'
            content='Grey'
            className='poster__button'
            to={`/movie/${movie?.id}`}>
            <AiOutlineInfoCircle /> More Info
          </Link>
        </div>
        <h2 className='banner__description'>
          {truncate(movie?.overview, 150)}
        </h2>
      </div>
      <div className='banner__gradient'></div>
    </header>
  );
}

export default Banner;
