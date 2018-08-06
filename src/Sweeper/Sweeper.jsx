import React from 'react';
import Board from './Board';
import FeedbackWidget from '../FeedbackWidget';

function Sweeper() {
  return (
    <div className="pad-10 flex flex-column flex-align-items-center">
      <div className="font-lg grand-hotel">mine♥sweeper</div>
      <Board />
      <FeedbackWidget />
    </div>
  );
}

export default Sweeper;
