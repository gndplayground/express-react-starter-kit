import React from 'react';

class About extends React.Component {

    render() {

        return (
            <div>
                <h2 className="route-title">About</h2>
                <p>
                    The starter kit stacks:
                </p>
                <b>Client</b>
                <ul>
                    <li>React</li>
                    <li>React Router</li>
                    <li>Redux</li>
                    <li>Redux Saga</li>
                    <li>Webpack</li>
                    <li>React hot loader</li>
                    <li>Babel</li>
                </ul>
                <br/>
                <b>Server</b>
                <ul>
                    <li>Express</li>
                    <li>Mongoose</li>
                    <li>jsonwebtoken</li>
                    <li>dotenv</li>
                </ul>
            </div>
        )
    }
}

About.propTypes = {
  children:  React.PropTypes.node
};

export default About;