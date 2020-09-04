import React, { useEffect, useState } from 'react';
import Nav from './Nav';
import { Image } from 'semantic-ui-react';
import { AiFillCheckCircle } from 'react-icons/ai';
import axios from './axios';
import './Success.css';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

function Success(props) {
  const { movieId } = props.match.params;
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(
        `/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      setMovie(request.data);
      return request;
    }
    fetchData();
  }, [movieId]);
  console.log(movie);
  return (
    <>
      <Nav />
      <div className='icon__container'>
        <AiFillCheckCircle />
      </div>
      <p className='success__text'>Hooray, you're all set!</p>
      <Image
        className='success__image'
        src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
        alt={movie.original_title}
      />
      <p className='another__text'>
        <span className='bold__text'>{movie.original_title}</span> will be
        shipped to you within 3 business days
      </p>
    </>
  );
}

export default Success;
