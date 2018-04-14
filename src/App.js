import React, { Component } from 'react';
import sarah from './sarah_snow_mountain.jpeg';
import './App.css';
          // <img src={sarah} className="App-logo" alt="logo" />

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
    };
  }

  componentDidMount = () => {
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({ width: window.innerWidth });
  }

  render() {
    const width = window.innerWidth;

    return (
      <div className="App">
        <header className="App-header flex flex-align-items-center flex-justify-content-space-between ">
          <h1 className="App-title">
            {this.state.width > 415 ? 'sarah' :'s' }
          </h1>
          <img src={sarah} className="App-logo" alt="logo" />
        </header>
      </div>
    );
  }
}

export default App;
