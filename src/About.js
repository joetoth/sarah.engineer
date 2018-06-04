import React from 'react';
import sarah from './sarah_snow_mountain.jpeg';

const About = () => (
  <div className="flex flex-column flex-align-items-center pad-30">
    <h2>About Sarah</h2>
    <img src={sarah} className="App-logo img-round" alt="logo" />

    <h4>Connect with Me:</h4>
    <div>
      <a href="https://github.com/sarahedkins">Github</a>
      <a className="margin-10-l" href="https://www.linkedin.com/in/sarahedkins/">LinkedIn</a>
      <a className="margin-10-l" href="https://medium.com/@edkins.sarah">Medium</a>
    </div>
  </div>
)

export default About;
