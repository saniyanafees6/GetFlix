import React, { useState, useEffect } from 'react';
import axios from './axios.js';
import './Row.css';
import Movie from './Movie';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Route, Link } from 'react-router-dom';
import Slider from 'react-slick';
import { Header, Image } from 'semantic-ui-react';
import dotenv from 'dotenv';

dotenv.config();

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

function Row({ fetchUrl }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      console.log(request);
      return request;
    }
    fetchData();
  }, [fetchUrl]);
  let settings = {
    dots: true,
    arrows: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className='row'>
      <div className='row__posters'>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div className='poster__card' key={movie.id}>
              <Image
                className='row__poster'
                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                alt={movie.original_title}
              />
              <div className='movie__text'>
                <Header as='h3'>{movie.original_title}</Header>
                <div className='poster__buttons'>
                  <Link
                    basic
                    color='grey'
                    content='Grey'
                    className='poster__button'
                    to={`/movie/${movie.id}`}
                    key={movie.id}>
                    <AiOutlineInfoCircle /> More Info
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <Route path={`/movie/:movieId`} component={Movie} />
    </div>
  );
}

export default Row;
