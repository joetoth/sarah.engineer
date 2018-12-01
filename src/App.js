import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import { Menu } from './Menu';
import { Content } from './Content';
import { Footer } from './Footer';
import { WeatherContainer } from './Weather/WeatherContainer';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      mobileView: 500,
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
    return (
      <BrowserRouter>
        <div className="App">
          <header
            className={`${this.state.width > this.state.mobileView ?
              'App-header' : 'App-header-sm'} flex flex-align-items-center
            flex-justify-content-space-between`}
          >
            <h1 className={`${this.state.width > this.state.mobileView ?
              'App-title' : 'App-title-sm'} grand-hotel`}
            >
              sarah.engineer
            </h1>
            <Menu />
          </header>
          <Content />
          <div>
            <WeatherContainer />
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
