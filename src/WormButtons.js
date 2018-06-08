import React from 'react';

export const WormButtons = ({ colorHandler, jumpHandler }) => (
  <div className="button-container">
    <button className="button" onClick={colorHandler}>
      Color
    </button>
  </div>
)

export default WormButtons;
