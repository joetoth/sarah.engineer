import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Sweeper from './Sweeper/Sweeper';
import Splash from './Splash';
import CustomSearch from './CustomSearch/CustomSearch';

export const Content = () => (
  <div>
    <Route exact={true} path="/" component={Splash} />
    <Route path="/about" component={About} />
    <Route path="/game" component={Sweeper} />
    <Route path="/experimental" component={CustomSearch} />
  </div>
);
export default Content;
