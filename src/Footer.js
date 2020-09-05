import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <div className='container'>
        <p>&copy; {new Date().getFullYear()}</p>
        <p className='powered-by'>
          Powered by:{' '}
          <img
            className='TMDB'
            src='https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg'
            alt='TMDB'
          />
          {' & '}
          <img
            className='stripe'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/1280px-Stripe_Logo%2C_revised_2016.svg.png'
            alt='stripe'
          />
        </p>
      </div>
    </footer>
  );
}

export default Footer;
