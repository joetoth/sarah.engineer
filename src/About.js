import React from 'react';
import sarah from './sarah_snow_mountain.jpeg';

const About = () => (
    <div className="flex flex-column flex-align-items-center pad-30 montserrat">
        <h2>About Sarah</h2>
        <img src={sarah} className="App-logo img-round" alt="logo" />
        <div className="pad-30 max-width-300 text-align-left">
            {`I'm a software engineer with a passion for delivering intuitive and
        performant user interfaces. I built this site to play around with
        in my (limited) free time - so it may be a collection of unfinished business.
        I'm currently living in NYC with a very fluffy cat named Silkie.
        When I'm not coding,
        I'm improving my kill/death rate in
        Call of Duty or lounging in Central Park.`}
        </div>
        <h4>Connect with Me:</h4>
        <div className="pad-30-b">
            <a href="https://github.com/sarahedkins">Github</a>
            <a className="margin-10-l" href="https://www.linkedin.com/in/sarahedkins/">LinkedIn</a>
            <a className="margin-10-l" href="https://medium.com/@edkins.sarah">Medium</a>
        </div>
    </div>
);

export default About;
