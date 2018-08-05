import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  BOMB,
  FLAG,
} from './utils';

export class Square extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.handleDoubleClick = this.handleDoubleClick.bind(this);
  // }

  /*
    Clicks:
    single - add flag
    single - remove flag
    double - reveal value
  */

  handleDoubleClick = (event) => {
    event.preventDefault();
    this.props.doubleClick(event.target.id);
  }

  handleClick = (event) => {
    event.preventDefault();
    this.props.singleClick(event.target.id);
  }

  handleKeyUp = (event) => {
    switch (event.keyCode) {
      case 32: { // spacebar
        this.props.singleClick(event.target.id);
        break;
      }
      case 13: { // enter
        this.props.doubleClick(event.target.id);
        break;
      }
      default:
        break;
    }
  }

  render() {
    const {
      status, value, id, flag,
    } = this.props;
    if (status === 'default') {
      return (
        <div
          role="button"
          tabIndex="0"
          className="square blue"
          onClick={this.handleClick}
          onDoubleClick={this.handleDoubleClick}
          onKeyUp={this.handleKeyUp}
          id={id}
        >
          {flag ? FLAG : null}
        </div>
      );
    }
    return (
      <div
        className={`flex flex-align-items-center
            flex-justify-content-center square blue
            ${value !== BOMB ? 'dimmed' : ''}`}
        role="button"
        tabIndex="0"
        onClick={this.handleClick}
        onDoubleClick={this.handleDoubleClick}
        id={id}
        onKeyUp={this.handleKeyUp}
      >
        {value !== 0 ? value : null}
      </div>
    );
  }
}

Square.propTypes = {
  doubleClick: PropTypes.func.isRequired,
  singleClick: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  id: PropTypes.string.isRequired,
  flag: PropTypes.bool,
};

Square.defaultProps = {
  flag: false,
};

export default Square;
