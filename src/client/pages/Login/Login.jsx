import React from 'react';
import {connect} from 'react-redux';
import auth from '../../auth';

const mapDispatchToProps = (dispatch) => {

    return {

        loginSubmit: (formData) => {
            dispatch(auth.actions.userLogin(formData));
        },

        logout: () => {
            dispatch({type: 'USER_LOGOUT'});
        }
    }
};

const mapStateToProps = (state) => {

    let user = state.user;

    return {
        token: user.token,
        unauthorized: user.unauthorized,
        fetching: user.fetching,
        fetchFailed: user.fetchFailed
    }
};

class Login extends React.Component {

    componentWillMount() {

        let location = this.props.location;

        if (location.pathname === '/logout' || location.pathname === 'logout') {
            this.props.logout();
            this.props.router.replace('/login');
        }
    }

    componentWillUpdate(nextProps) {
        if (nextProps.token) {
            this.props.router.push('/private');
        }
    }

    render() {

        let unauthorized = this.props.unauthorized ? (
            <div className="pop-error">Your credentical is invalid.</div>) : '';
        let failed = this.props.fetchFailed ? (
            <div className="pop-error">Sorry, there is a problem when trying connect to server. Please try
                again.</div>) : '';

        return (
            <div>
                <h2>This is our login page</h2>
                <p>Please login to visit our private page.</p>
                <p>If you run dev setup so the account with the default setting, or in demo online. The account will be</p>
                <p>giang.nguyen.dev@gmail.com/123456</p>
                {unauthorized}
                {failed}
                <form onSubmit={this.login} ref="form">
                    <label>Email</label>
                    <br/>
                    <input type="email" name="email"/>
                    <br/>
                    <br/>
                    <label>Password</label>
                    <br/>
                    <input type="password" name="password"/>
                    <br/>
                    <br/>
                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

    login = (e) => {

        e.preventDefault();

        this.props.loginSubmit(new FormData(this.refs.form));

    }
}

Login.propTypes = {
    logout: React.PropTypes.func.isRequired,
    location: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
    loginSubmit: React.PropTypes.func.isRequired,
    unauthorized: React.PropTypes.bool.isRequired,
    fetching: React.PropTypes.bool.isRequired,
    fetchFailed: React.PropTypes.bool.isRequired,
    children: React.PropTypes.node
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(Login);