import React, { Component } from 'react';
import { WeatherView } from './WeatherView';
import { ChangeCity } from './ChangeCity';

const initialState = {
  city: '',
  weather: '',
  icon: '',
  changeCity: false,
};

export class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
  }

  componentDidMount = () => {
    this.fetchWeather('10019');
  }

  fetchWeather = (zip) => {
    fetch(`https://personal-backend.herokuapp.com/weather/${zip}/us`)
      .then(response => response.json())
      .then(data => this.setState({
        city: data.city,
        weather: data.weather,
        icon: data.icon,
      }));
  }

  changeCity = () => {
    this.setState({
      changeCity: true,
    });
  }

  submitCity = (zip) => {
    this.setState({
      ...initialState,
    }, this.fetchWeather(zip));
  }

  render() {
    if (!this.state.weather) return null;
    return (
      <div>
        {!this.state.changeCity ?
          <WeatherView
            city={this.state.city}
            weather={this.state.weather}
            icon={this.state.icon}
            changeCity={this.changeCity}
          /> :
          <ChangeCity submitCity={this.submitCity} />
        }
      </div>
    );
  }
}

export default WeatherContainer;
