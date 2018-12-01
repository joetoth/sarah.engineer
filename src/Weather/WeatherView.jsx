import React from 'react';
import PropTypes from 'prop-types';

export const WeatherView = props => (
  <div>
    <div className="flex flex-column">
      <div>
        <img src={props.icon} alt={props.weather} />
      </div>
      <div>
        {props.weather} in
        <div
          onClick={props.changeCity}
          onKeyDown={props.changeCity}
          role="button"
          tabIndex="0"
        >
          {props.city}
        </div>
      </div>
    </div>
  </div>
);

WeatherView.propTypes = {
  icon: PropTypes.string.isRequired,
  weather: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  changeCity: PropTypes.func.isRequired,
};

export default WeatherView;
