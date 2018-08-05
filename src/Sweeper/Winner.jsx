import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable react/no-array-index-key */

const getRandomInteger = n => (Math.floor((Math.random() * n)));
const COLORS = ['blue', 'purple', 'red', 'green', 'yellow'];
const getColors = (n) => {
  const colors = [];
  for (let i = 0; i < n; i += 1) {
    const colorIndex = getRandomInteger(COLORS.length);
    const color = COLORS[colorIndex];
    const offset = getRandomInteger(99); // 0 - 99%
    const type = getRandomInteger(5);
    colors.push({ color, offset, type });
  }
  return colors;
};

// Confetti particles
export const ConfettiParticle = ({ color, offset, type }) => (
  <div
    className={`confetti-particle confetti-particle-${type} confetti-particle-${color}`}
    style={{ right: `${offset}%` }}
  />
);

ConfettiParticle.propTypes = {
  color: PropTypes.string.isRequired,
  offset: PropTypes.number.isRequired,
  type: PropTypes.number.isRequired,
};

export function Winner() {
  const colors = getColors(100);

  return (
    <div className="pad-10">
      <div className="grand-hotel">Winner!</div>
      {colors.map((colorObj, i) => (
        <ConfettiParticle
          key={`${colorObj.color}+${colorObj.offset}+${colorObj.type}+${i}`}
          color={colorObj.color}
          offset={colorObj.offset}
          type={colorObj.type}
        />)
      )}
    </div>
  );
}

export default Winner;
