import React from 'react';

export const WormButtons = ({
  colorHandler,
  jumpHandler,
  moveHandler,
}) => (
  <div className="button-container">
    <button className="button" onClick={colorHandler}>
      Color
    </button>
    <button className="button" onClick={jumpHandler}>
      Jump
    </button>
    <button className="button" onClick={moveHandler}>
      Move
    </button>
  </div>
)

export default WormButtons;
