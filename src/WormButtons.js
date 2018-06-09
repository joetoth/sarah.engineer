import React from 'react';

export const WormButtons = ({ colorHandler, jumpHandler }) => (
  <div className="button-container">
    <button className="button" onClick={colorHandler}>
      Color
    </button>
    <button className="button" onClick={jumpHandler}>
      Jump
    </button>
  </div>
)

export default WormButtons;
