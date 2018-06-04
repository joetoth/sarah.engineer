import React from 'react';
import About from './About';
import SimpleGame from './SimpleGame';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

export const Menu = () => (
  <Router>
    <div>
      <div className="flex pad-30">
        <Link className="margin-10-l" to="/">Home</Link>
        <Link className="margin-10-l" to="/about">About</Link>
        <Link className="margin-10-l" to="/game">Game</Link>
      </div>
      <Route path="/" />
      <Route path="/about" component={About}/>
      <Route path="/game" component={SimpleGame}/>
    </div>
  </Router>
)
export default Menu;
