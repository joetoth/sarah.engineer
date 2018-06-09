import React from 'react';
import { Route } from 'react-router-dom';
import About from './About';
import SimpleGame from './SimpleGame';
import Splash from './Splash';

export const Content = () => (
  <div>
    <Route exact path="/" component={Splash} />
    <Route path="/about" component={About} />
    <Route path="/game" component={SimpleGame} />
  </div>
)
export default Content;
