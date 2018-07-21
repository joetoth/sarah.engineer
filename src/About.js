import React from 'react';
import sarah from './sarah_snow_mountain.jpeg';

const About = () => (
  <div className="flex flex-column flex-align-items-center pad-30 montserrat">
    <h2>About Sarah</h2>
    <img src={sarah} className="App-logo img-round" alt="logo" />
    <div className="pad-30 max-width-300 text-align-left">
      {`I'm a NYC-based software engineer with a knack for delivering great
        user experiences, and a passion for automating everything.
        In my spare time, I enjoy working on side projects. Otherwise, I'm improving my kill/death rate in
        Call of Duty or lounging in Central Park.`}
    </div>
    <h4>Connect with Me:</h4>
    <div className="pad-30-b">
      <a href="https://github.com/sarahedkins">Github</a>
      <a className="margin-10-l" href="https://www.linkedin.com/in/sarahedkins/">LinkedIn</a>
      <a className="margin-10-l" href="https://medium.com/@edkins.sarah">Medium</a>
    </div>
  </div>
)

export default About;
