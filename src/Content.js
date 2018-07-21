import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import Sweeper from './Sweeper/Sweeper';
import Splash from './Splash';

export const Content = () => (
  <div>
    <Route exact path="/" component={Splash} />
    <Route path="/about" component={About} />
    <Route path="/game" component={Sweeper} />
  </div>
)
export default Content;
