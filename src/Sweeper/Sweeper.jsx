import React from 'react';
import Board from './Board';

function Sweeper() {
  return (
    <div className="pad-10 flex flex-column flex-align-items-center">
      <div className="font-lg grand-hotel">mine♥sweeper</div>
      <Board />
    </div>
  );
}

export default Sweeper;
