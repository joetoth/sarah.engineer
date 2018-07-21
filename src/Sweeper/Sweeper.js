import React, { Component } from 'react';
import Board from './Board';

class Sweeper extends Component {
  render() {
    return (
      <div className="pad-10">
        <div className="font-lg grand-hotel">mine♥sweeper</div>
        <Board />
      </div>
    );
  }

}

export default Sweeper;
