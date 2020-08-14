import React from 'react';
import Row from './Row';
import requests from './requests';
import { Tab } from 'semantic-ui-react';

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

const TabExampleSecondaryPointing = () => (
  <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
);

export default TabExampleSecondaryPointing;
