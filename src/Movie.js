import React, { useEffect, useState } from 'react';
import { Image, Header } from 'semantic-ui-react';
import axios from './axios';
import './Movie.css';
import { loadStripe } from '@stripe/stripe-js';
import Nav from './Nav';

let numeral = require('numeral');

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500/';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51HMmfxLq0yPvXqQ0roUoxUqEUsLnamjo5nmqr1cYTChlPZNeOT6w4OpsL1c2SCu18RoPsbCZdin9qMVcTzjWlnMw006Bt82Vse'
);

function Movie(props) {
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
  function nestedDataToString(nestedData) {
    let nestedArray = [],
      resultString;
    if (nestedData !== undefined) {
      nestedData.forEach(function (item) {
        nestedArray.push(item.name);
      });
    }
    resultString = nestedArray.join(', '); // array to string
    return resultString;
  }

  const handleClick = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1HN8xvLq0yPvXqQ0BvYxQOBN', // Replace with the ID of your price
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: `http://localhost:3000/success/${movie.id}`,
      cancelUrl: `http://localhost:3000/movie/${movie.id}`,
    });
    // If `redirectToCheckout` fails due to a browser or network
    // error, display the localized error message to your customer
    // using `error.message`.
  };
  let genre = movie.genres,
    genresList = nestedDataToString(genre),
    totalRevenue = movie.revenue,
    noData = '-';
  if (totalRevenue === 'undefined' || totalRevenue === 0) {
    totalRevenue = noData;
  } else {
    totalRevenue = numeral(movie.revenue).format('($0,0)');
  }

  return (
    <>
      <Nav />
      <div id='gradient__container'></div>
      <div
        id='card__container'
        style={{
          backgroundSize: 'cover',
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie?.backdrop_path}) `,
          backgroundPosition: 'center center',
        }}>
        <div className='movie__card'>
          <div className='movie__image'>
            <Image
              className='card__poster'
              src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.original_title}
            />
          </div>
          <div className='movie__detail'>
            <Header as='h2'>{movie?.original_title}</Header>
            <span className='tagline'>{movie?.tagline}</span>
            <p className='movie__overview'>{movie?.overview}</p>
            <div className='additional-details'>
              <span className='genre-list'>{genresList}</span>
              <span className='production-list'>{}</span>
              <div className='row padding release-details'>
                <div className='movie__stats'>
                  Original Release:{' '}
                  <span className='meta-data'>{movie.release_date}</span>
                </div>
                <div className='movie__stats'>
                  Running Time:{' '}
                  <span className='meta-data'>{movie.runtime} mins</span>{' '}
                </div>
                <div className='movie__stats'>
                  Box Office: <span className='meta-data'>{totalRevenue}</span>
                </div>
                <div className='movie__stats'>
                  Vote Average:{' '}
                  <span className='meta-data'>{movie.vote_average}/10</span>
                </div>
              </div>
            </div>
            <button
              role='link'
              onClick={handleClick}
              color='grey'
              content='Grey'
              className='movie__button'>
              Purchase for $30
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
