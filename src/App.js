import React from 'react';
import './App.css';
import Banner from './Banner';
import Row from './Row';
import requests from './requests';
import { Tab } from 'semantic-ui-react';
import Nav from './Nav.js';
import Footer from './Footer.js';
const panes = [
  {
    menuItem: 'On Demand',
    render: () => (
      <Tab.Pane attached={false}>
        <Row fetchUrl={requests.getTrending} />
      </Tab.Pane>
    ),
  },
  {
    menuItem: 'Coming Soon',
    render: () => (
      <Tab.Pane attached={false}>
        <Row fetchUrl={requests.getUpcoming} />
      </Tab.Pane>
    ),
  },
];
export default class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Nav />
        <Banner />
        <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
        <Footer />
      </div>
    );
  }
}
