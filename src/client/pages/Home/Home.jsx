/* global __ENV */

import React from 'react';
import {fetchAPI} from '../../utilities/api/fetchAPI';
import {APIUnauthorized, APIInternalError} from '../../utilities/api/apiErrors';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {

    let user = state.user;

    return {
        token: user.token,
    }
};

class Home extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            checkAPI: {}
        }
    }

    checkAPI = () => {

        fetchAPI(`${__ENV.API_LOCATION}/dev/check`, {
            mode: 'cors',
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + this.props.token
            },
        }).then((data)=> {
            this.setState({
                checkAPI: {
                    ok: true,
                    response: data.user,
                }
            })
        }).catch((e) => {
            this.setState({
                checkAPI: {
                    ok: false,
                    response: e,
                }
            })
        })

    };

    render() {


        const apiResponse = this.state.checkAPI.response;

        let checkStatus = '';

        if (this.state.checkAPI.response) {


            if (!this.state.checkAPI.ok) {

                if (apiResponse instanceof APIUnauthorized) {
                    checkStatus = '401 - No authorization token was found in header or token is invalid';
                }

                if (apiResponse instanceof APIInternalError) {
                    checkStatus = '500 -There is a problem in server. Please check your config';
                }
            }
            else {
                checkStatus = (
                    <span>Access private api success with username: ${this.state.checkAPI.response.email}
                    <br/>Token: ${this.props.token}</span>
                )
            }
        }

        return (
            <div>
                <h2 className="route-title">Home page</h2>
                <p>This is our hom page.</p>
                <br/>
                <p>Please login then try to check access to private api</p>
                <p>{`${__ENV.API_LOCATION}/dev/check`}</p>
                <button onClick={this.checkAPI}>Check access</button>
                <br/>
                <p>{checkStatus}</p>
            </div>
        )
    }
}

Home.propTypes = {
    token: React.PropTypes.string.isRequired,
    children: React.PropTypes.node
};

export default connect(
    mapStateToProps,
    null,
)(Home)