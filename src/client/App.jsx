import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {

    let user = state.user;

    return {
        user: user.data,
    }
};

class App extends React.Component {

    render() {
        return (
            <div className="app">
                <h1 className="page-title">Express React Starter Kit</h1>
                {this.props.user.email ? (<p className="user">You are logged as {this.props.user.email} </p>) : ''}
                <ul role="nav" className="nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    {
                        this.props.user.email ?
                            (<li><Link to="/logout">Logout</Link></li>) :
                            (<li><Link to="/login">Login</Link></li>)
                    }
                    <li><Link to="/private">Private</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
}

App.propTypes = {
    children: React.PropTypes.node,
    user: React.PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
    null,
)(App);