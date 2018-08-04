import React, { Component } from 'react';
import {
  BOMB,
  FLAG,
} from './utils';

export class Square extends Component {
  constructor(props) {
    super(props);
    this.handleDoubleClick = this._handleDoubleClick.bind(this);
  }

  /*
    Clicks:
    single - add flag
    single - remove flag
    double - reveal value
  */

  _handleDoubleClick(event) {
    this.props.doubleClick(event.target.id);
  }

  clickHandler = (event) => {
    event.preventDefault();
    this.props.singleClick(event.target.id);
  }

  render() {
    const { status, value, id, flag } = this.props;
    if (status === "default") {
      return (
        <div
          className="square blue"
          onClick={this.clickHandler}
          onDoubleClick={this.handleDoubleClick}
          id={id}
        >
          {flag ? FLAG : null}
        </div>
      );
    } else {
      return (
        <div
          className={`flex flex-align-items-center
            flex-justify-content-center square blue
            ${value !== BOMB ? 'dimmed' : ''}`}
          onClick={this.clickHandler}
          onDoubleClick={this.handleDoubleClick}
          id={id}
        >
          {value !== 0 ? value : null}
        </div>
      );
    }
  }
}

export default Square;
