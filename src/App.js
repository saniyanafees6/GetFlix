import React from 'react';
import './App.css';
import Panes from './Panes';
import Banner from './Banner';

export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Banner />
        <Panes />
      </div>
    );
  }
}
