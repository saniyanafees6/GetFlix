import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Row from './Row';
import requests from './requests';

function App() {
  return (
    <div className='App'>
      <Row title='Trending Now' fetchUrl={requests.getTrending} />
      {/* <header className='App-header'>

        <img src={logo} className='App-logo' alt='logo' />
      </header> */}
    </div>
  );
}

export default App;
