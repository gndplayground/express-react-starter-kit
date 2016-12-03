import React from 'react';

class Home extends React.Component {

    render() {

        return (
            <div>
                <h2 className="route-title">Home page</h2>
                <p>This is our hom page.</p>
            </div>
        )
    }
}

Home.propTypes = {
    children:  React.PropTypes.node
};

export default Home;