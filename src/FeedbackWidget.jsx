import React, { Component } from 'react';

class FeedbackWidget extends Component {
  constructor() {
    super();
    this.state = {
      shouldRender: false,
      submitted: false,
    };
  }

  componentDidMount() {
    setTimeout(this.setToRender, 10000);
  }

  setToRender = () => {
    this.setState({ shouldRender: true });
  }

  setToHide = () => {
    this.setState({ shouldRender: false });
  }

  clickHandler = () => {
    this.setState({ submitted: true });
    setTimeout(this.setToHide, 10000);
  }

  render() {
    return (
      <div>
        { this.state.shouldRender && !this.state.submitted ? (
          <div className="feedback-widget">
            <p> Are you enjoying the game? </p>
            <button onClick={this.clickHandler}>yes</button>
            <button onClick={this.clickHandler}>no</button>
          </div>
        ) : null}

        { this.state.shouldRender && this.state.submitted ? (
          <div className="feedback-widget">
            <p> Thanks! </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default FeedbackWidget;
