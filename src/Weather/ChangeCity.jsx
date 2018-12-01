import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class ChangeCity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: '',
    };
  }

  handleInput = (e) => {
    let input = e.target.value;
    /* eslint-disable no-restricted-globals */
    if (isNaN(parseInt(input.charAt(input.length - 1), 10))) {
      input = input.slice(0, input.length - 1);
    }
    this.setState({
      city: input.length > 5 ? input.slice(0, 5) : input,
    });
  }

  handleSubmit = () => {
    this.props.submitCity(this.state.city);
  }

  render() {
    return (
      <div>
        <label htmlFor="city">Enter 5-digit US zip code:</label>
        <br />
        <input
          type="text"
          id="city"
          name="city"
          onChange={this.handleInput}
          value={this.state.city}
        />
        <br />
        <button onClick={this.handleSubmit}>
          Submit
        </button>
      </div>
    );
  }
}

ChangeCity.propTypes = {
  submitCity: PropTypes.func.isRequired,
};

export default ChangeCity;
