import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='nav'>
      <Link to='/'>
        <h1 className='nav__title'>GetFlix</h1>
      </Link>
    </div>
  );
}

export default Nav;
