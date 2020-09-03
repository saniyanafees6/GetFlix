import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import App from './App';
import Movie from './Movie';
import Success from './Success';
import Cancel from './Cancel';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

const routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={App} />
      <Route path='/movie/:movieId' component={Movie} />
      {/* <Route path='/checkout/:movieId' component={Purchase} /> */}
      <Route path='/success/:movieId' component={Success} />
      <Route path='/cancel/:movieId' component={Cancel} />
      <Redirect from='/' exact to='/home' />
    </Switch>
  </BrowserRouter>
);
ReactDOM.render(routes, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
